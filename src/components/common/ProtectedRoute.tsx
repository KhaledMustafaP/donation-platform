import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
  role = "user",
}: {
  children: JSX.Element;
  role?: "admin" | "user";
}) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  // فقط الأدمن يسمح له بالدخول لمسار الأدمن
  if (role === "admin" && user.role !== "admin")
    return <Navigate to="/" replace />;

  return children;
}
