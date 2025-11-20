import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import formatCurrency from "../../utils/formatCurrency";

// مؤقتًا: نفس بيانات الحملات من CampaignsPage
const campaignsData = [
  {
    id: 1,
    title: "Emergency Relief for Gaza Families",
    category: "Emergency",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80",
    description:
      "Help provide food, medicine, and shelter for displaced families in Gaza.",
    longDescription:
      "Thousands of families in Gaza are currently displaced and in desperate need of essential aid. Your donation will directly provide food parcels, clean water, medicine, and temporary shelter for those most affected. Every contribution makes a difference and brings hope to those in need.",
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
    longDescription:
      "This campaign aims to rebuild a primary school destroyed in Rafah, allowing hundreds of children to return to education. Donations will fund building materials, furniture, and school supplies. Together we can restore learning and dreams.",
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
    longDescription:
      "Clean water is a basic human right, yet many communities in Gaza and nearby areas lack it. This campaign funds the drilling of sustainable water wells and the installation of filtration systems to provide families with fresh, safe water year-round.",
    goal: 12000,
    raised: 9000,
  },
];

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const { t } = useTranslation();

  // نجيب الحملة المطلوبة بناءً على ID من الرابط
  const campaign = campaignsData.find((c) => c.id === Number(id));

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-gray-300">
        <p>{t("campaigns.not_found") || "Campaign not found."}</p>
      </div>
    );
  }

  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 transition-colors">
      <div className="max-w-5xl mx-auto px-6">
        {/* الصورة العلوية */}
        <motion.img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-72 object-cover rounded-xl shadow-md mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* العنوان والتفاصيل */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
            {campaign.title}
          </h1>
          <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm mb-6">
            {t(`campaigns.${campaign.category.toLowerCase()}`, { defaultValue: campaign.category })}
          </span>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {campaign.longDescription}
          </p>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {formatCurrency(campaign.raised)} / {formatCurrency(campaign.goal)}
              </p>
          </div>

          {/* أزرار */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to={`/donate?campaign=${encodeURIComponent(campaign.title)}`}
              className="bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white px-6 py-2 rounded-lg transition"
            >
              {t("campaigns.donate_now")}
            </Link>

            <Link
              to="/campaigns"
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              ← {t("campaigns.back")}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
