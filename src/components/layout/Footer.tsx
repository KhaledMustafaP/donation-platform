import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

export default function Footer() {
  const { t, i18n } = useTranslation();
  // theme is available from hook if needed later; avoid unused var by not destructuring
  useTheme();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ✅ القسم العلوي */}
        <div
          className={`flex flex-col md:flex-row ${
            i18n.language === "ar" ? "md:flex-row-reverse" : ""
          } justify-between items-center gap-6`}
        >
          {/* 🔹 الشعار */}
          <Link to="/" className="text-2xl font-bold text-green-700 dark:text-green-400">
            {t('navbar.brand')}
          </Link>

          {/* 🔸 روابط سريعة */}
          <nav
            className={`flex gap-6 ${
              i18n.language === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <Link
              to="/"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              {t("navbar.home")}
            </Link>
            <Link
              to="/campaigns"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              {t("navbar.campaigns")}
            </Link>
            <Link
              to="/about"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              {t("navbar.about")}
            </Link>
            <Link
              to="/donate"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              {t("navbar.donate")}
            </Link>
          </nav>

          {/* 🔸 وسائل التواصل */}
          <div className="flex gap-4 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* ✅ خط فاصل */}
        <div className="border-t border-gray-300 dark:border-gray-700 my-6" />

        {/* ✅ القسم السفلي */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} {t('navbar.brand')}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
