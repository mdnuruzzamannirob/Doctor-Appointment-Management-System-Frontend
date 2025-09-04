import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { LoginPayload, RegisterPayload } from "@/types";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (data: LoginPayload) =>
      api.post("/auth/login", data).then((res) => res.data),
  });

export const usePatientRegisterMutation = () =>
  useMutation({
    mutationFn: (data: RegisterPayload) =>
      api.post("/auth/register/patient", data).then((res) => res.data),
  });

export const useDoctorRegisterMutation = () =>
  useMutation({
    mutationFn: (data: RegisterPayload) =>
      api.post("/auth/register/doctor", data).then((res) => res.data),
  });
