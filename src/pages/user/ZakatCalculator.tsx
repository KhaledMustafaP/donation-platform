import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout"; // أو Layout للمستخدم إذا موجود
// يمكنك استخدام UserLayout إذا حابب

export default function ZakatCalculator() {
  const [assets, setAssets] = useState<number>(0);
  const [debts, setDebts] = useState<number>(0);
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);
  const [eligible, setEligible] = useState<boolean>(false);

  // قيمة النصاب تقريبية — يمكن تحديثها أو إدخالها ديناميكياً
  const nisab = 10000; // مثلا بـدولار أو العملة المحلية

  const handleCalculate = () => {
    const net = assets - debts;
    const isEligible = net >= nisab;
    setEligible(isEligible);
    if (isEligible) {
      const zak = Number((net * 0.025).toFixed(2));
      setZakatAmount(zak);
    } else {
      setZakatAmount(0);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow‐lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text‐green‐700 dark:text‐green‐400">
          حاسبة الزكاة
        </h2>

        <div className="mb-4">
          <label className="block mb-1">قيمة الأصول الزكوية:</label>
          <input
            type="number"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            value={assets}
            onChange={(e) => setAssets(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">قيمة الديون/المطلوبات:</label>
          <input
            type="number"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            value={debts}
            onChange={(e) => setDebts(Number(e.target.value))}
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white py-2 rounded-md mb-4 transition"
        >
          احسب الزكاة
        </button>

        {zakatAmount !== null && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
            {eligible ? (
              <p className="text-lg font-bold">
                مستحق الدفع: <span className="text-green-700 dark:text-green-300">{zakatAmount} $</span>
              </p>
            ) : (
              <p className="text-lg text-red-600 dark:text-red-400">
                لم تبلغ النصاب بعد.
              </p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
