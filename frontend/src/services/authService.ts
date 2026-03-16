import api from "./api";

export const signin = async (email: string, password: string) => {
  const response = await api.post("/auth/signin", { email, password });
  return response.data;
};

export const checkAuth = async () => {
  const response = await api.get("/auth/me");
  return response.data;
}

export const logout = async () => {
  await api.post("/auth/logout");
};

//Authentication flow
//api.ts -> authService.ts -> useSignin.tsx