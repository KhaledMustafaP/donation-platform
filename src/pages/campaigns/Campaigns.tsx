import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import formatCurrency from "../../utils/formatCurrency";

type Campaign = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  goal: number;
  raised: number;
};

const campaignsData: Campaign[] = [
  {
    id: 1,
    title: "Emergency Relief for Gaza Families",
    category: "Emergency",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80",
    description:
      "Help provide food, medicine, and shelter for displaced families in Gaza.",
    goal: 10000,
    raised: 7800,
  },
  {
    id: 2,
    title: "Rebuild a School in Rafah",
    category: "Education",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=900&q=80",
    description:
      "Contribute to rebuilding a destroyed school and giving kids hope again.",
    goal: 15000,
    raised: 4500,
  },
  {
    id: 3,
    title: "Water Wells for Villages",
    category: "Development",
    image: "https://images.unsplash.com/photo-1609137144813-0a1f71c3eabf?auto=format&fit=crop&w=900&q=80",
    description:
      "Support drilling clean water wells for remote Palestinian communities.",
    goal: 12000,
    raised: 9000,
  },
  {
    id: 4,
    title: "Support Orphan Children",
    category: "Charity",
    image: "https://images.unsplash.com/photo-1593113598332-cd0d5b0c68df?auto=format&fit=crop&w=900&q=80",
    description:
      "Your monthly donation helps feed, clothe, and educate orphans in Gaza.",
    goal: 8000,
    raised: 4200,
  },
  {
    id: 5,
    title: "Healthcare for the Injured",
    category: "Medical",
    image: "https://images.unsplash.com/photo-1606813909357-7ec2e07e3b2f?auto=format&fit=crop&w=900&q=80",
    description:
      "Help provide medicine and surgeries for those injured in the ongoing crisis.",
    goal: 20000,
    raised: 15600,
  },
  {
    id: 6,
    title: "Solar Energy for Hospitals",
    category: "Development",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=900&q=80",
    description:
      "Install solar panels to keep life-saving equipment running during power cuts.",
    goal: 25000,
    raised: 11200,
  },
];

export default function CampaignsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCampaigns = campaignsData.filter((c) => {
    const matchesCategory = filter === "all" || c.category === filter;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 text-center mb-8">
          {t("campaigns.title")}
        </h1>

        {/* 🔍 فلاتر البحث */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder={t("campaigns.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">{t("campaigns.all")}</option>
            <option value="Emergency">{t("campaigns.emergency")}</option>
            <option value="Education">{t("campaigns.education")}</option>
            <option value="Development">{t("campaigns.development")}</option>
            <option value="Charity">{t("campaigns.charity")}</option>
            <option value="Medical">{t("campaigns.medical")}</option>
          </select>
        </div>

        {/* 🧱 عرض الحملات */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCampaigns.map((c) => {
            const progress = Math.min((c.raised / c.goal) * 100, 100);
            return (
              <motion.div
                key={c.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <img src={c.image} alt={t(`campaigns.items.${c.id}.title`, { defaultValue: c.title })} className="h-48 w-full object-cover" />
                <div className="p-5 flex flex-col grow">
                      <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
                        {t(`campaigns.items.${c.id}.title`, { defaultValue: c.title })}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 grow">
                        {t(`campaigns.items.${c.id}.description`, { defaultValue: c.description })}
                      </p>

                  {/* 🔹 Progress Bar */}
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {formatCurrency(c.raised)} / {formatCurrency(c.goal)}
                  </p>

                  {/* 🟢 أزرار التحكم */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link
                      to={`/campaigns/${c.id}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white text-center py-2 rounded-lg transition"
                    >
                      {t("campaigns.view_details")}
                    </Link>

                    <Link
                      to={`/donate?campaign=${encodeURIComponent(c.title)}`}
                      className="inline-block bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white text-center py-2 rounded-lg transition"
                    >
                      {t("campaigns.donate_now")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 🧭 Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white"
              }`}
            >
              {t("campaigns.prev")}
            </button>

            <span className="text-gray-700 dark:text-gray-300">
              {t("campaigns.page")} {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white"
              }`}
            >
              {t("campaigns.next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
