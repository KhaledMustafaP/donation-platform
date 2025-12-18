import { useState } from "react";
import { motion } from "framer-motion";

export default function GiftPage() {
  const [occasion, setOccasion] = useState("");
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!occasion || !fromName || !toName) {
      alert("يرجى تعبئة جميع الحقول المطلوبة ❗");
      return;
    }
    setShowCard(true);
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
          🎁 صفحة الإهداء
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          أهدِ تبرعًا باسم من تُحب في مناسبة خاصة واجعل الخير يصل إليه 💚
        </p>

        {!showCard ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            {/* المناسبة */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">المناسبة:</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              >
                <option value="">اختر المناسبة</option>
                <option value="زواج">زواج</option>
                <option value="مولود">مولود جديد</option>
                <option value="نجاح">نجاح</option>
                <option value="ذكرى">ذكرى سنوية</option>
                <option value="شفاء">دعاء بالشفاء</option>
                <option value="عام">إهداء عام</option>
              </select>
            </div>

            {/* من */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">من:</label>
              <input
                type="text"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="اسم المُهدي"
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              />
            </div>

            {/* إلى */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">إلى:</label>
              <input
                type="text"
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                placeholder="اسم المُهدى إليه"
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
              />
            </div>

            {/* الرسالة */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">رسالة الإهداء (اختياري):</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالة قصيرة"
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none h-24 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg transition"
            >
              إنشاء الإهداء 🎉
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/40 p-6 rounded-2xl mt-6"
          >
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
              🌸 بطاقة الإهداء
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-3">
              {occasion} — من <b>{fromName}</b> إلى <b>{toName}</b>
            </p>
            {message && (
              <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                “{message}”
              </p>
            )}

            <button
              onClick={() => alert("سيتم التبرع باسم المُهدى إليه ❤️")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
            >
              تبرع الآن باسم {toName}
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
