import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Gift,
  PlusCircle,
  LogOut,
  X,
} from "lucide-react";

interface SidebarAdminProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SidebarAdmin({
  isOpen = false,
  onClose,
}: SidebarAdminProps) {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleLogout = () => {
    logout();
    // بعد تسجيل الخروج، يُنقل المستخدم
    window.location.href = "/login"; // أو استخدم navigate لو في hook
  };

  // تحديد الجانب بناءً على اللغة
  const sideClass = i18n.language === "ar" ? "right-0" : "left-0";
  const transformOpen = isOpen ? "translate-x-0" : (i18n.language === "ar" ? "translate-x-full" : "-translate-x-full");

  return (
    <>
      {/* Backdrop للـ mobile */}
      <div
        aria-hidden={!isOpen}
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <aside
        className={`fixed top-0 h-screen w-64 bg-white dark:bg-gray-900 shadow-xl flex flex-col transition-transform duration-300 z-40 ${sideClass} ${transformOpen} md:translate-x-0`}
      >
        {/* زر الإغلاق في الموبايل */}
        <div className="flex items-center justify-between px-4 py-3 md:hidden border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-semibold text-green-700 dark:text-green-400">
            {t("navbar.brand")}
          </h1>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* اللوجو */}
        <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
            {t("navbar.brand")}
          </h1>
        </div>

        {/* التنقل */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            {t("sidebar.dashboard")}
          </NavLink>

          <NavLink
            to="/admin/campaigns"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            <Gift className="w-5 h-5" />
            {t("sidebar.campaigns")}
          </NavLink>

          <NavLink
            to="/admin/campaigns/add"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            <PlusCircle className="w-5 h-5" />
            {t("sidebar.add_campaign")}
          </NavLink>

          <NavLink
            to="/user/zakat-calculator"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            <Gift className="w-5 h-5" /> {/* أو أي أيقونة مناسبة */}
            {t("sidebar.zakat_calculator")}
          </NavLink>
        </nav>

        {/* تسجيل الخروج */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            {t("sidebar.logout")}
          </button>
        </div>
      </aside>
    </>
  );
}
