import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import formatCurrency from "../utils/formatCurrency";

export default function CampaignsPreview() {
  const { t } = useTranslation();

  // 🟢 بيانات الحملات التجريبية
  const campaigns = [
    {
      id: 1,
      title: t("home.campaign_food"),
      desc: t("home.campaign_food_desc"),
      image:
        "https://images.unsplash.com/photo-1606944835108-7d9dbbba7d6f?auto=format&fit=crop&w=1200&q=80",
      raised: 7400,
      goal: 10000,
    },
    {
      id: 2,
      title: t("home.campaign_rebuild"),
      desc: t("home.campaign_rebuild_desc"),
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      raised: 5600,
      goal: 8000,
    },
    {
      id: 3,
      title: t("home.campaign_medical"),
      desc: t("home.campaign_medical_desc"),
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
      raised: 9100,
      goal: 15000,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800 text-center transition-colors">
      <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-10">
        {t("home.featured_campaigns")}
      </h2>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {campaigns.map((c) => {
          const progress = Math.min((c.raised / c.goal) * 100, 100);

          return (
            <motion.div
              key={c.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                  {c.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {c.desc}
                </p>

                {/* 🔹 شريط التقدم */}
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-2">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {formatCurrency(c.raised)} / {formatCurrency(c.goal)}
                </p>

                <Link
                  to={`/donate?campaign=${encodeURIComponent(c.title)}`}
                  className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-500 transition"
                >
                  {t("home.donate_now")}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* View All Campaigns Button (Moved Outside the Map) */}
      <div className="text-center mt-8 max-w-6xl mx-auto">
        <Link
          to="/campaigns"
          className="bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white px-5 py-2 rounded-lg transition"
        >
          {t("home.view_all_campaigns")}
        </Link>
      </div>
    </section>
  );
}