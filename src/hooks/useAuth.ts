"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setUser, clearUser } from "@/store/slices/authSlice";
import {
  useLoginMutation,
  usePatientRegisterMutation,
  useDoctorRegisterMutation,
} from "./queries/authQueries";
import { LoginPayload, RegisterPayload } from "@/types";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const login = useLoginMutation();
  const patientRegister = usePatientRegisterMutation();
  const doctorRegister = useDoctorRegisterMutation();

  const loginWithRedux = async (data: LoginPayload) => {
    const res = await login.mutateAsync(data);
    dispatch(setUser(res.user));
    return res;
  };

  const patientRegisterWithRedux = async (data: RegisterPayload) => {
    const res = await patientRegister.mutateAsync(data);
    dispatch(setUser(res.user));
    return res;
  };

  const doctorRegisterWithRedux = async (data: RegisterPayload) => {
    const res = await doctorRegister.mutateAsync(data);
    dispatch(setUser(res.user));
    return res;
  };

  const logout = () => dispatch(clearUser());

  return {
    user,
    login: loginWithRedux,
    patientRegister: patientRegisterWithRedux,
    doctorRegister: doctorRegisterWithRedux,
    logout,
    isLoggedIn: !!user,
  };
};
