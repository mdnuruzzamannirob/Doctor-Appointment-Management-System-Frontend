import { z } from "zod";

/* =========================
   Login Schema
========================= */
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["DOCTOR", "PATIENT"]),
});

export type LoginInput = z.infer<typeof loginSchema>;

/* =========================
   Base Registration Schema
========================= */
const baseRegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(6, "Confirm Password is required"),
  // allow either a valid URL or an empty string
  photo_url: z.union([z.string().url(), z.literal("")]).optional(),
});

/* =========================
   Patient Registration Schema
========================= */
const patientRegisterSchema = baseRegisterSchema
  .extend({
    role: z.literal("PATIENT"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

/* =========================
   Doctor Registration Schema
========================= */
const doctorRegisterSchema = baseRegisterSchema
  .extend({
    role: z.literal("DOCTOR"),
    specialization: z.string().min(1, "Specialization is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

/* =========================
   Unified Registration Schema
========================= */
export const registrationSchema = z.discriminatedUnion("role", [
  patientRegisterSchema,
  doctorRegisterSchema,
]);

export type RegistrationInput = z.infer<typeof registrationSchema>;
