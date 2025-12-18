import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function RecurringDonationPage() {
  const [amount, setAmount] = useState<number | null>(null);
  const [interval, setInterval] = useState("شهري");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      alert("يرجى اختيار مبلغ التبرع أولًا 💰");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
          💳 التبرع الدوري
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          ساهم معنا بتبرع شهري مستمر لدعم المشاريع الخيرية المستدامة 🌿
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 text-right">
            {/* اختيار المبلغ */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                اختر مبلغ التبرع:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 20, 50, 100, 200].map((value) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setAmount(value)}
                    className={`p-3 rounded-md border text-lg font-semibold transition ${
                      amount === value
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {value} د.أ
                  </button>
                ))}
              </div>
            </div>

            {/* اختيار الفترة */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                تكرار التبرع:
              </label>
              <select
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              >
                <option value="شهري">شهري</option>
                <option value="كل 3 شهور">كل 3 شهور</option>
                <option value="سنوي">سنوي</option>
              </select>
            </div>

            {/* زر التفعيل */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg transition"
            >
              تفعيل التبرع الدوري ✅
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-8"
          >
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
              تم تفعيل تبرعك بنجاح 🎉
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              شكراً لمساهمتك المستمرة! سيتم التبرع بمبلغ{" "}
              <b>{amount} د.أ</b> {interval}.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-2 rounded-md transition"
            >
              تعديل التبرع
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
