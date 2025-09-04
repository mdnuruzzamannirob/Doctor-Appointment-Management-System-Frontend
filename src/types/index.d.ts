export type Role = "DOCTOR" | "PATIENT";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  photo_url?: string;
  specialization?: string;
};

export type Doctor = {
  _id: string;
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
