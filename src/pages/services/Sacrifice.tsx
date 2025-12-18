import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SacrificePage() {
const [animal, setAnimal] = useState<"sheep" | "goat" | "cow" | "camel">("sheep");
  const [intention, setIntention] = useState("udhiyah");
  const [location, setLocation] = useState("local");
  const [price, setPrice] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const prices = {
    sheep: 180,
    goat: 200,
    cow: 700,
    camel: 1500,
  };

  const handleCalculate = () => {
    setPrice(prices[animal]);
    setConfirmed(true);
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-24 pb-16 transition-colors">
      <div className="max-w-3xl mx-auto px-6">
        {/* 🕌 العنوان */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-green-700 dark:text-green-400 mb-6"
        >
          تنفيذ الأضحية 🐑
        </motion.h1>

        {/* 📖 مقدمة */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 dark:text-gray-300 mb-10 leading-relaxed"
        >
          الأضحية من أعظم القربات إلى الله، وتُجزئ عن الفرد وأهل بيته.  
          يمكنك من خلال هذه الصفحة اختيار نوع الأضحية ومكان التنفيذ بسهولة.
        </motion.p>

        {/* 🧮 نموذج الاختيار */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 text-center mb-4">
            اختر تفاصيل الأضحية
          </h2>

          {/* 🐄 نوع الأضحية */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              نوع الأضحية:
            </label>
            <select
              value={animal}
  onChange={(e) => setAnimal(e.target.value as "sheep" | "goat" | "cow" | "camel")}
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            >
              <option value="sheep">خروف - 180 دينار</option>
              <option value="goat">ماعز - 200 دينار</option>
              <option value="cow">عجل - 700 دينار</option>
              <option value="camel">جمل - 1500 دينار</option>
            </select>
          </div>

          {/* 🎯 النية */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              النية:
            </label>
            <select
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            >
              <option value="udhiyah">أضحية</option>
              <option value="aqiqah">عقيقة</option>
              <option value="sadaqah">صدقة</option>
            </select>
          </div>

          {/* 🌍 مكان التنفيذ */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              مكان التنفيذ:
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            >
              <option value="local">داخل البلد</option>
              <option value="abroad">خارج البلد</option>
            </select>
          </div>

          {/* 🔘 زر الحساب */}
          <button
            onClick={handleCalculate}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg transition mt-4"
          >
            احسب قيمة الأضحية
          </button>

          {/* 💰 النتيجة */}
          {confirmed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6"
            >
              <p className="text-lg text-gray-700 dark:text-gray-200">
                قيمة الأضحية المختارة:
              </p>
              <h3 className="text-3xl font-bold text-green-700 dark:text-green-400 mt-2">
                {price.toFixed(2)} دينار
              </h3>

              <Link
                to={`/donate?amount=${price.toFixed(2)}&type=sacrifice`}
                className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition text-lg"
              >
                نفّذ الأضحية الآن
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
