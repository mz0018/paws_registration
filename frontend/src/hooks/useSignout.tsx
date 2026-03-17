import { signout } from "../services/authService";
import { useAuthStore } from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";

export const useSignout = () => {

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await signout();      // backend cookie deletion
      logout();             // clear zustand store
      navigate("/login");   // redirect user
    } catch (error) {
      console.error("Signout failed", error);
    }
  };

  return { handleSignout };
};