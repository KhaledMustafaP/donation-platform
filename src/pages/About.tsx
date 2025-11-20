import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          className="text-4xl font-bold text-green-700 dark:text-green-400 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("about.title")}
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t("about.description")}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* الرؤية */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-3">
              {t("about.vision_title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {t("about.vision_text")}
            </p>
          </div>

          {/* الرسالة */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-3">
              {t("about.mission_title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {t("about.mission_text")}
            </p>
          </div>

          {/* القيم */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-3">
              {t("about.values_title")}
            </h3>
            <ul className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed list-disc list-inside">
              <li>{t("about.values.0")}</li>
              <li>{t("about.values.1")}</li>
              <li>{t("about.values.2")}</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
