import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HandHeart, CreditCard, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      id: 1,
      icon: <HandHeart size={40} className="text-green-600 dark:text-green-400" />,
      title: t("home.step1_title"),
      desc: t("home.step1_desc"),
    },
    {
      id: 2,
      icon: <CreditCard size={40} className="text-green-600 dark:text-green-400" />,
      title: t("home.step2_title"),
      desc: t("home.step2_desc"),
    },
    {
      id: 3,
      icon: <CheckCircle size={40} className="text-green-600 dark:text-green-400" />,
      title: t("home.step3_title"),
      desc: t("home.step3_desc"),
    },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900 text-center transition-colors">
      <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-12">
        {t("home.how_it_works")}
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6">
        {steps.map((s, index) => (
          <motion.div
            key={s.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="mb-4">{s.icon}</div>
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
              {s.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
