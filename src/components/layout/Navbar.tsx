import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Grid layout: left/actions | center/nav | right/logo
  // For RTL we will swap order using order classes
  const isRtl = i18n.language === "ar";

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">

          {/* Left: actions (login, cart, search, theme) */}
          <div className={`${isRtl ? "order-3" : "order-1"} flex items-center gap-3`}> 
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <Link to="/login" className="text-sm text-gray-700 dark:text-gray-200 hover:underline">
                    {t("navbar.login")}
                  </Link>
                  <Link to="/register" className="hidden sm:inline-block bg-green-50 dark:bg-green-800 text-green-700 dark:text-green-300 px-3 py-1 rounded-md text-sm">
                    {t("navbar.register")}
                  </Link>
                </>
              ) : (
                <>
                  {user.role === "admin" && (
                    <Link to="/admin/dashboard" className="text-sm text-gray-700 dark:text-gray-200 hover:underline">
                      {t("navbar.admin")}
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-sm text-red-600 dark:text-red-400 hover:underline">{t("navbar.logout")}</button>
                </>
              )}
              <button onClick={toggleLang} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                {i18n.language === "en" ? t("navbar.lang_ar") : t("navbar.lang_en")}
              </button>
              {/* Compact action area (language + theme + auth) */}
              <button onClick={toggleTheme} aria-label={t("navbar.toggle_theme")} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </div>

            {/* Mobile icons */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={t("navbar.toggle_menu")} className="text-2xl p-2">
                  ☰
                </button>
            </div>
          </div>

          {/* Center: main nav */}
          <div className={`flex justify-center ${isRtl ? "order-2" : "order-2"}`}>
            <ul className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-200">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "text-green-700 font-semibold" : "hover:text-green-600"}>{t("navbar.home")}</NavLink>
              </li>
              <li>
                <NavLink to="/campaigns" className={({ isActive }) => isActive ? "text-green-700 font-semibold" : "hover:text-green-600"}>{t("navbar.campaigns")}</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => isActive ? "text-green-700 font-semibold" : "hover:text-green-600"}>{t("navbar.about")}</NavLink>
              </li>
              <li>
                <Link to="/donate" className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-700 transition">{t("navbar.donate")}</Link>
              </li>
            </ul>
          </div>

          {/* Right: logo */}
          <div className={`${isRtl ? "order-1" : "order-3"} flex justify-end items-center`}> 
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo192.png" alt={t("navbar.logo_alt")} className="w-10 h-10 rounded-full border-2 border-green-600" />
              <span className="hidden sm:inline-block text-lg font-bold text-green-700 dark:text-green-400">{t("navbar.brand")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer/menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3 space-y-2">
            <NavLink to="/" onClick={() => setMobileOpen(false)} className="block text-gray-700 dark:text-gray-200">{t("navbar.home")}</NavLink>
            <NavLink to="/campaigns" onClick={() => setMobileOpen(false)} className="block text-gray-700 dark:text-gray-200">{t("navbar.campaigns")}</NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)} className="block text-gray-700 dark:text-gray-200">{t("navbar.about")}</NavLink>
            <Link to="/donate" onClick={() => setMobileOpen(false)} className="block bg-green-600 text-white px-4 py-2 rounded-md">{t("navbar.donate")}</Link>
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-gray-700 dark:text-gray-200">{t("navbar.login")}</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block text-gray-700 dark:text-gray-200">{t("navbar.register")}</Link>
              </>
            ) : (
              <>
                {user.role === "admin" && <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)} className="block text-gray-700 dark:text-gray-200">{t("navbar.admin")}</Link>}
                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="block text-red-600">{t("navbar.logout")}</button>
              </>
            )}
            <div className="flex items-center gap-2 pt-2">
              <button onClick={toggleLang} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{i18n.language === "en" ? t("navbar.lang_ar") : t("navbar.lang_en")}</button>
                <button onClick={toggleTheme} aria-label={t("navbar.toggle_theme")} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{theme === "dark" ? "☀️" : "🌙"}</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
