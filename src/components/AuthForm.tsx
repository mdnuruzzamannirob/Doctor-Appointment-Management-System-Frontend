"use client";

import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { registrationSchema } from "@/lib/auth-schema";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { LuLoader } from "react-icons/lu";

interface AuthFormProps {
  type?: "login" | "register";
  className?: string;
}

// Infer TypeScript type from Zod schema
type AuthFormData = z.infer<typeof registrationSchema>;

const AuthForm = ({ type = "login", className }: AuthFormProps) => {
  const [role, setRole] = useState<"DOCTOR" | "PATIENT">("PATIENT");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange", // enables real-time validation
  });

  const onSubmit = (data: AuthFormData) => {
    console.log("Form data:", data);
    // TODO: call API for login/signup
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        errors={errors}
      />

      <FormField
        label="Password"
        id="password"
        type="password"
        placeholder="Enter your password"
        register={register}
        errors={errors}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#208acd] text-sm cursor-pointer text-white py-2 rounded-md hover:bg-[#208acd]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#208acd]"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <LuLoader className="animate-spin size-4" />
            Submitting...
          </span>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <FormField
        label="Name"
        id="name"
        type="text"
        placeholder="Enter your name"
        register={register}
        errors={errors}
      />

      {role === "DOCTOR" && (
        <FormField
          label="Specialization"
          id="specialization"
          type="text"
          placeholder="Enter your specialization"
          register={register}
          errors={errors}
        />
      )}

      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        errors={errors}
      />

      <FormField
        label="Password"
        id="password"
        type="password"
        placeholder="Enter your password"
        register={register}
        errors={errors}
      />

      <FormField
        label="Confirm Password"
        id="confirm_password"
        type="password"
        placeholder="Confirm your password"
        register={register}
        errors={errors}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#208acd] text-sm cursor-pointer text-white py-2 rounded-md hover:bg-[#208acd]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#208acd]"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <LuLoader className="animate-spin size-4" />
            Submitting...
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
            Create an Account
          </h1>
          <p className="text-muted-foreground">
            Join now to streamline your experience from day one.
          </p>
        </header>

        {type === "login" ? (
          renderLoginForm()
        ) : (
          <>
            <div className="flex gap-3 w-full justify-center mb-4">
              {(["PATIENT", "DOCTOR"] as ("DOCTOR" | "PATIENT")[]).map(
                (option, index) => (
                  <button
                    key={index}
                    className={cn(
                      "flex-1 py-2 px-3 font-medium transition-all  cursor-pointer capitalize rounded-md border",
                      role === option
                        ? "bg-[#208acd] text-white border-transparent"
                        : "hover:bg-neutral-100"
                    )}
                    onClick={() => setRole(option)}
                  >
                    {option.toLowerCase()}
                  </button>
                )
              )}
            </div>

            {/* Render the registration form */}
            {renderRegisterForm()}
          </>
        )}

        <div className="flex items-center my-4">
          <hr className="flex-1 border-neutral-200" />
          <span className="px-2 text-muted-foreground text-sm">
            Or Register With
          </span>
          <hr className="flex-1 border-neutral-200" />
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex cursor-pointer items-center justify-center gap-2 border rounded-md py-2 transition-all hover:bg-neutral-100">
            <FcGoogle size={20} /> Google
          </button>
          <button className="flex-1 flex cursor-pointer items-center justify-center gap-2 border rounded-md py-2 transition-all hover:bg-neutral-100">
            <FaFacebook size={20} className="text-blue-500" /> Facebook
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-muted-foreground">
          Already Have An Account?{" "}
          <Link href="/login" className="text-[#208acd] font-semibold">
            Login
          </Link>
        </p>
      </div>

      <footer className="text-sm gap-3 text-muted-foreground flex items-center justify-between">
        <p className="">
          &copy; {new Date().getFullYear()} Medicare. All rights reserved.
        </p>
        <p className="">
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
