import { useState, useEffect } from "react";

type UserRole = "admin" | "user";

interface User {
  email: string;
  role: UserRole;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);

        if (
          typeof parsed.email === "string" &&
          (parsed.role === "admin" || parsed.role === "user")
        ) {
          setUser(parsed);
        } else {
          localStorage.removeItem("authUser");
        }
      } catch {
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  const login = (email: string, role: UserRole) => {
    const safeEmail = String(email);

    const newUser: User = { email: safeEmail, role };
    localStorage.setItem("authUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return { user, login, logout };
}
