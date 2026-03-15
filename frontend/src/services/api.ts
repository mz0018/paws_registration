import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PYTHON_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

//Authentication flow
//api.ts -> authService.ts -> useSignin.tsx