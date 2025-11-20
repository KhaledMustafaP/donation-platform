import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { t, i18n } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // مؤقتًا: دخول أدمن بناء على الإيميل
    if (email === "admin@demo.com" && password === "123456") {
      login(email, "admin"); // ← صحيح الآن
      navigate("/admin/dashboard");
    } else {
      login(email, "user"); // ← صحيح الآن
      navigate("/");
    }
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-6">
          {t("auth.login_title")}
        </h1>

        <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
          {t("auth.email")}
        </label>
        <input
          type="email"
          placeholder={t("auth.email_placeholder")}
          className="w-full p-2 mb-4 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
          {t("auth.password")}
        </label>
        <input
          type="password"
          placeholder={t("auth.password_placeholder")}
          className="w-full p-2 mb-6 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white py-2 rounded-md transition"
        >
          {t("auth.login_btn")}
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          {t("auth.no_account")}{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            {t("auth.register_here")}
          </Link>
        </p>
      </form>
    </div>
  );
}
