import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function DonateRecurring() {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState<number | "">("");
  const [frequency, setFrequency] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !name || !email) {
      alert(t("donateRecurring.fill_fields"));
      return;
    }
    // لاحقًا: إرسال إلى Backend
    console.log("Recurring Donation:", { name, email, amount, frequency });
    alert(t("donateRecurring.thank_you"));
    // إعادة ضبط النموذج
    setAmount("");
    setName("");
    setEmail("");
    setFrequency("monthly");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-16">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-colors">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6">
          {t("donateRecurring.title")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t("donateRecurring.name")}</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              placeholder={t("donateRecurring.name_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("donateRecurring.email")}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              placeholder={t("donateRecurring.email_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("donateRecurring.amount")}</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              placeholder={t("donateRecurring.amount_placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("donateRecurring.frequency")}</label>
            <select
              value={frequency}
              onChange={e => setFrequency(e.target.value as any)}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            >
              <option value="monthly">{t("donateRecurring.monthly")}</option>
              <option value="quarterly">{t("donateRecurring.quarterly")}</option>
              <option value="yearly">{t("donateRecurring.yearly")}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white py-2 rounded-md transition"
          >
            {t("donateRecurring.donate_btn")}
          </button>
        </form>
      </div>
    </div>
  );
}
