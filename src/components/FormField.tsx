"use client";

import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<TFormValues extends FieldValues> {
  label: string;
  id: Path<TFormValues>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
}

function FormField<TFormValues extends FieldValues>({
  label,
  id,
  type = "text",
  placeholder,
  register,
  errors,
}: InputProps<TFormValues>) {
  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <div className="mb-4">
      <label htmlFor={id as string} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id as string}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={cn(
          "w-full px-3 py-2 border text-sm border-neutral-200 shadow-2xs rounded-md outline-none focus:ring-2 focus:border-transparent focus:ring-[#208acd]",
          errorMessage && "border-destructive focus:ring-destructive"
        )}
      />
      {errorMessage && (
        <p className="text-destructive text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

export default FormField;
