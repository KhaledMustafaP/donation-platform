import { motion } from "framer-motion";
import { Copy, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function SmsDonationPage() {
  const [copied, setCopied] = useState(false);

  const smsOptions = [
    {
      project: "إطعام أسرة محتاجة 🍞",
      code: "1",
      amount: "دينار واحد",
      number: "94444",
    },
    {
      project: "كفالة يتيم 👶",
      code: "2",
      amount: "5 دنانير",
      number: "94444",
    },
    {
      project: "علاج مريض ❤️‍🩹",
      code: "3",
      amount: "10 دنانير",
      number: "94444",
    },
    {
      project: "بناء مسجد 🕌",
      code: "4",
      amount: "20 دينار",
      number: "94444",
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8"
      >
        {/* العنوان */}
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
          📱 التبرع عبر الرسائل القصيرة
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          يمكنك دعم المشاريع الخيرية بإرسال رسالة قصيرة من هاتفك المحمول — بكل سهولة!
        </p>

        {/* خيارات الرسائل */}
        <div className="space-y-6">
          {smsOptions.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 text-right"
            >
              <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                {item.project}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                أرسل الرمز{" "}
                <span className="font-semibold text-green-700 dark:text-green-400">
                  {item.code}
                </span>{" "}
                إلى الرقم{" "}
                <span className="font-semibold text-green-700 dark:text-green-400">
                  {item.number}
                </span>{" "}
                للتبرع بمبلغ <b>{item.amount}</b>.
              </p>

              {/* أزرار النسخ والإرسال */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleCopy(`أرسل ${item.code} إلى ${item.number}`)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                >
                  <Copy size={18} />{" "}
                  {copied ? "تم النسخ ✅" : "نسخ النص"}
                </button>

                <a
                  href={`sms:${item.number}?body=${item.code}`}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  <MessageCircle size={18} /> أرسل الآن
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
