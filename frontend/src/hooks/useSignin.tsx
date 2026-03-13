import { useState } from "react";
import api from "../services/api";

type FieldName = "username" | "password";

export const useSignin = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Record<FieldName, string>>({
    username: "",
    password: "",
  });

  const handleChange = (name: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/signin", formData);

      console.log("API RESPONSE:", response.data);

    } catch (error) {
      console.error("Sign-in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};