import { useState } from "react";
import { signin } from "../services/authService";

type FieldName = "email" | "password";

export const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<FieldName, string>>({
    email: "",
    password: "",
  });

  const handleChange = (name: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signin(formData.email, formData.password);
      console.log("Logged in:", data);
    } catch (error) {
      console.error("Sign-in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};

//Authentication flow
//api.ts -> authService.ts -> useSignin.tsx