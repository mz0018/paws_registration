import { useState } from "react";
import api from "../services/api";

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
      const response = await api.post("/auth/signin", formData);

      console.log("API RESPONSE:", response.data);
      console.log(formData)

    } catch (error) {
      console.error("Sign-in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};