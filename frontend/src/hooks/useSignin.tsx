import { useState } from "react";
import { signin } from "../services/authService";

type FieldName = "email" | "password";

export const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState<{ message?: string }>({});

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
    setError({});
    try {
      const data = await signin(formData.email, formData.password);
      console.log("Logged in:", data);
    } catch (err: any) {

      const detail = err.response?.data?.detail;

      const message =
        Array.isArray(detail) ? detail[0]?.msg :
        detail || "Something went wrong";

      setError({ message });

    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, hasError };
};

//Authentication flow
//api.ts -> authService.ts -> useSignin.tsx