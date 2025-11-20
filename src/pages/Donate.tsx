import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useDonations } from "../hooks/useDonations";

export default function Donate() {
  const { t, i18n } = useTranslation();
const location = useLocation();
const params = new URLSearchParams(location.search);
const campaignName = params.get("campaign");
const { addDonation } = useDonations();

  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    type: "once", // 🔹 نوع التبرع (مرة واحدة / شهري)
    day: "",
    message: "",
      campaign: campaignName || "", // ✅ حملنا اسم الحملة لو موجود

  });
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.amount) {
    alert(t("donate.fill_fields"));
    return;
  }

  const newDonation = {
    id: Date.now().toString(),
    name: form.name,
    email: form.email,
    amount: form.amount,
    type: form.type as "once" | "monthly",
    day: form.day,
    message: form.message,
    campaign: form.campaign,
    date: new Date().toLocaleString(),
  };

  // ✅ نحفظ التبرع في localStorage عبر useDonations
  addDonation(newDonation);

  console.log("✅ Donation saved:", newDonation);

  setSuccess(true);
  setTimeout(() => {
    setSuccess(false);
    setForm({
      name: "",
      email: "",
      amount: "",
      type: "once",
      day: "",
      message: "",
      campaign: campaignName || "",
    });
  }, 2500);
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-24 pb-16 transition-colors">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
            {t("donate.title")}
          </h1>

          {!success ? (
            <form
              onSubmit={handleSubmit}
              className={`flex flex-col gap-4 ${
                i18n.language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {/* الاسم */}
              <label className="text-sm font-medium">{t("donate.name")}</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              />

              {/* البريد */}
              <label className="text-sm font-medium">{t("donate.email")}</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              />

              {/* المبلغ */}
              <label className="text-sm font-medium">{t("donate.amount")}</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              />

              {/* نوع التبرع */}
              <label className="text-sm font-medium">{t("donate.type")}</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              >
                <option value="once">{t("donate.once")}</option>
                <option value="monthly">{t("donate.monthly")}</option>
              </select>

              {/* خيار إضافي إذا اختار شهري */}
              {form.type === "monthly" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("donate.day_label")}
                  </label>
                  <input
                    type="number"
                    name="day"
                    value={form.day}
                    min={1}
                    max={30}
                    placeholder={t("donate.day_placeholder")}
                    onChange={handleChange}
                    className="p-2 w-24 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
                  />
                </div>
              )}

              {/* ملاحظة */}
              <label className="text-sm font-medium">{t("donate.note")}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="p-2 h-24 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none resize-none"
              ></textarea>

              {/* الزر */}
              <button
                type="submit"
                className="mt-4 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white py-2 rounded-lg transition"
              >
                {t("donate.button")}
              </button>
            </form>
          ) : (
            <motion.p
              className="text-green-600 dark:text-green-400 font-semibold text-center text-lg py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {t("donate.success")}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
