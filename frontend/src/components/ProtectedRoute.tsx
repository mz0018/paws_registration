import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};