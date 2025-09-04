"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { loginSchema, registrationSchema } from "@/lib/auth-schema";

import Logo from "./Logo";
import FormField from "./FormField";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { LoginPayload, RegisterPayload } from "@/types";
import { toast } from "sonner";
import { LuLoader } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type?: "login" | "register";
  className?: string;
}

type AuthFormData =
  | z.infer<typeof loginSchema>
  | z.infer<typeof registrationSchema>;

const AuthForm = ({ type = "login", className }: AuthFormProps) => {
  const router = useRouter();
  const { login, patientRegister, doctorRegister } = useAuth();

  const [role, setRole] = useState<"DOCTOR" | "PATIENT">("PATIENT");

  const schema = type === "login" ? loginSchema : registrationSchema;
  const defaultValues =
    type === "login"
      ? { email: "", password: "", role }
      : {
          role,
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          photo_url: "",
        };

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  // Sync role with RHF
  useEffect(() => {
    setValue("role", role, { shouldValidate: true });
    if (role === "PATIENT") {
      // Clear specialization when role is PATIENT;
      setValue("specialization", "");
    }
  }, [role, setValue]);
  const onSubmit = async (data: AuthFormData) => {
    try {
      switch (type) {
        case "login":
          const response = await login(data as LoginPayload);
          router.push(
            response?.data?.role === "DOCTOR"
              ? "/doctor/dashboard"
              : "/patient/dashboard"
          );
          toast.success(response?.message || "Login successful!");
          reset();
          break;

        case "register":
          switch (role) {
            // Patient registration
            case "PATIENT":
              const patientResponse = await patientRegister(
                data as RegisterPayload
              );
              router.push("/login");
              toast.success(
                patientResponse?.message || "Registration successful!"
              );
              reset();
              break;

            // Doctor registration
            case "DOCTOR":
              const doctorResponse = await doctorRegister(
                data as RegisterPayload
              );
              router.push("/login");
              toast.success(
                doctorResponse?.message || "Registration successful!"
              );
              reset();
              break;

            default:
              break;
          }
          break;

        default:
          break;
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        register={formRegister}
        errors={errors}
      />

      <FormField
        label="Password"
        id="password"
        type="password"
        placeholder="Enter your password"
        register={formRegister}
        errors={errors}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#208acd] text-sm cursor-pointer text-white py-2 rounded-md hover:bg-[#208acd]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#208acd]"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <LuLoader className="animate-spin size-4" />
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex gap-3 w-full justify-center mb-2">
        {(["PATIENT", "DOCTOR"] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={cn(
              "flex-1 py-2 px-3 font-medium transition-colors cursor-pointer capitalize rounded-md border",
              role === option
                ? "bg-[#208acd] text-white border-transparent"
                : "hover:bg-neutral-100"
            )}
            onClick={() => setRole(option)}
          >
            {option.toLowerCase()}
          </button>
        ))}
      </div>

      <FormField
        label="Name"
        id="name"
        type="text"
        placeholder="Enter your name"
        register={formRegister}
        errors={errors}
      />

      {role === "DOCTOR" && (
        <FormField
          label="Specialization"
          id="specialization"
          type="text"
          placeholder="Enter your specialization"
          register={formRegister}
          errors={errors}
        />
      )}

      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        register={formRegister}
        errors={errors}
      />

      <FormField
        label="Password"
        id="password"
        type="password"
        placeholder="Enter your password"
        register={formRegister}
        errors={errors}
      />

      <FormField
        label="Confirm Password"
        id="confirm_password"
        type="password"
        placeholder="Confirm your password"
        register={formRegister}
        errors={errors}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#208acd] text-sm cursor-pointer text-white py-2 rounded-md hover:bg-[#208acd]/90  transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#208acd]"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <LuLoader className="animate-spin size-4" />
            Registering...
          </span>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );

  return (
    <div
      className={cn(
        "flex-1 p-10 flex flex-col gap-5 justify-between",
        className
      )}
    >
      <Logo />

      <div className="max-w-md w-full mx-auto">
        <header className="text-center space-y-2 mb-6">
          <h1 className="text-3xl font-bold text-neutral-800">
            {type === "login" ? "Login to your account" : "Create an Account"}
          </h1>
          <p className="text-muted-foreground">
            {type === "login"
              ? "Access your dashboard and appointments."
              : "Join now to streamline your experience from day one."}
          </p>
        </header>

        {type === "login" ? renderLoginForm() : renderRegisterForm()}

        <div className="flex items-center my-4">
          <hr className="flex-1 border-neutral-200" />
          <span className="px-2 text-muted-foreground text-sm">
            Or Continue With
          </span>
          <hr className="flex-1 border-neutral-200" />
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex cursor-pointer items-center justify-center gap-2 border rounded-md py-2  transition-colors hover:bg-neutral-100">
            <FcGoogle size={20} /> Google
          </button>
          <button className="flex-1 flex cursor-pointer items-center justify-center gap-2 border rounded-md py-2  transition-colors hover:bg-neutral-100">
            <FaFacebook size={20} className="text-blue-500" /> Facebook
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-muted-foreground">
          {type === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#208acd] font-semibold">
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-[#208acd] font-semibold">
                Login
              </Link>
            </>
          )}
        </p>
      </div>

      <footer className="text-sm gap-3 text-muted-foreground flex items-center justify-between">
        <p>&copy; {new Date().getFullYear()} Medicare. All rights reserved.</p>
        <p>
          Made with ❤️ by{" "}
          <Link
            href="https://www.linkedin.com/in/mdnuruzzamannirobdev/"
            className="font-semibold text-[#208acd] whitespace-nowrap"
          >
            Md. Nuruzzaman
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default AuthForm;
