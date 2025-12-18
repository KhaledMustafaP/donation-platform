import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* الصورة */}
        <motion.img
          src="imgs/donate1.jpg"
          alt={t('about.image_alt')}
          className="rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* النص */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
            {t("about.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {t("about.description")}
          </p>

          <Link
            to="/about"
            className="inline-block bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white py-2 px-5 rounded-lg transition"
          >
            {t("about.learn_more")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
