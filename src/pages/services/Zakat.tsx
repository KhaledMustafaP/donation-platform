import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ZakatPage() {
  const [gold, setGold] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);
  const [business, setBusiness] = useState<number>(0);
  const [totalZakat, setTotalZakat] = useState<number | null>(null);

  const nisab = 5950; // نصاب الزكاة بالدينار أو ما يعادله بالعملة المحلية

  const calculateZakat = () => {
    const total = gold + cash + business;
    if (total < nisab) {
      setTotalZakat(0);
      return;
    }
    setTotalZakat(total * 0.025); // 2.5%
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
          حاسبة الزكاة 💰
        </motion.h1>

        {/* 📖 مقدمة */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 dark:text-gray-300 mb-10 leading-relaxed"
        >
          الزكاة هي الركن الثالث من أركان الإسلام، وواجب مالي يهدف لتحقيق التكافل الاجتماعي.
          يمكنك حساب مقدار الزكاة الواجب إخراجه بسهولة من خلال هذه الأداة.
        </motion.p>

        {/* 🧮 نموذج الحساب */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 text-center mb-4">
            أدخل أموالك الخاضعة للزكاة:
          </h2>

          <div className="space-y-4">
            <InputField
              label="قيمة الذهب (بالدينار)"
              value={gold}
              onChange={setGold}
            />
            <InputField
              label="النقود السائلة (بالدينار)"
              value={cash}
              onChange={setCash}
            />
            <InputField
              label="أموال التجارة (بالدينار)"
              value={business}
              onChange={setBusiness}
            />
          </div>

          <button
            onClick={calculateZakat}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg transition mt-4"
          >
            احسب الزكاة الآن
          </button>

          {/* 💰 النتيجة */}
          {totalZakat !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6"
            >
              {totalZakat === 0 ? (
                <p className="text-yellow-600 dark:text-yellow-400 text-lg font-semibold">
                  لم تبلغ النصاب بعد، الزكاة غير واجبة حاليًا.
                </p>
              ) : (
                <>
                  <p className="text-lg text-gray-700 dark:text-gray-200">
                    مقدار الزكاة الواجبة عليك هو:
                  </p>
                  <h3 className="text-3xl font-bold text-green-700 dark:text-green-400 mt-2">
                    {totalZakat.toFixed(2)} دينار
                  </h3>

                  <Link
                    to={`/donate?amount=${totalZakat.toFixed(2)}&type=zakat`}
                    className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition text-lg"
                  >
                    تبرّع بزكاتك الآن
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// 🧩 مكوّن إدخال رقمي بسيط
function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
      />
    </div>
  );
}
