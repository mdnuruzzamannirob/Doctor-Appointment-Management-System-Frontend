import axios from "axios";
// import { useAuthStore } from "@/store/auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().token;
  const token = null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
