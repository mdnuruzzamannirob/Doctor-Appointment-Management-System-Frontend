export type Role = "DOCTOR" | "PATIENT";
export interface LoginPayload {
  email: string;
  password: string;
  role: Role;
}
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  specialization?: string;
  photo_url?: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  photo_url?: string;
  specialization?: string;
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  photo_url?: string;
};

export type AppointmentStatus = "PENDING" | "CANCELLED" | "COMPLETE";

export type Appointment = {
  _id: string;
  doctor: Doctor | string;
  patient: User | string;
  date: string;
  status: AppointmentStatus;
};
