import { useDonations } from "../../hooks/useDonations";
import { useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useTranslation } from "react-i18next";
import formatCurrency from "../../utils/formatCurrency";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

export default function Dashboard() {
  const { donations, clearDonations } = useDonations();
  const [filter, setFilter] = useState("all");

  const totalAmount = donations.reduce((sum, d) => sum + Number(d.amount), 0);
  const totalDonations = donations.length;
  const monthlyDonations = donations.filter((d) => d.type === "monthly").length;

  const { t } = useTranslation();

  const last = donations.length > 0 ? donations[donations.length - 1] : null;
  const lastDonation = last ? `${formatCurrency(Number(last.amount))} — ${last.name}` : t("dashboard.last_none");

  const filteredDonations = useMemo(() => {
    if (filter === "all") return donations;
    return donations.filter((d) => d.type === filter);
  }, [filter, donations]);

  // Line chart
  const lineData = {
    labels: donations.map((d) => d.date),
    datasets: [
      {
        label: t("dashboard.chart_label"),
        data: donations.map((d) => Number(d.amount)),
        borderColor: "#0f7b42",
        backgroundColor: "rgba(15,123,66,0.15)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: "#d4af37",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#e5e7eb" } },
    },
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-8 sm:space-y-12">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f5132]">
            {t("dashboard.title")}
          </h1>
          <p className="text-base sm:text-lg text-[#6b7280] mt-1">
            {t("dashboard.subtitle")}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatBox title={t("dashboard.total_amount")} value={formatCurrency(totalAmount)} color="green" />
          <StatBox title={t("dashboard.total_donations")} value={totalDonations} color="gold" />
          <StatBox title={t("dashboard.monthly_donations")} value={monthlyDonations} color="green" />
          <StatBox title={t("dashboard.last_donation")} value={lastDonation} color="gold" />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-[#d4af37]/20 h-[250px] sm:h-[350px]">
          <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-[#0f5132]">
            {t("dashboard.over_time")}
          </h2>
          <div className="h-full">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Table Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f5132]">
            {t("dashboard.recent_donations")}
          </h2>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-[#d4af37] rounded-lg px-3 py-2 bg-white text-[#0f5132] shadow-sm w-full sm:w-auto"
          >
            <option value="all">{t("campaigns.all")}</option>
            <option value="once">{t("profile.type.once")}</option>
            <option value="monthly">{t("profile.type.monthly")}</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-3 rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0f5132] text-white text-left">
                <th className="p-2 sm:p-3">{t("dashboard.table.name")}</th>
                <th className="p-2 sm:p-3">{t("dashboard.table.email")}</th>
                <th className="p-2 sm:p-3">{t("dashboard.table.amount")}</th>
                <th className="p-2 sm:p-3">{t("dashboard.table.type")}</th>
                <th className="p-2 sm:p-3">{t("dashboard.table.date")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((d) => (
                <tr
                  key={d.id}
                  className="border-b hover:bg-[#0f5132]/10 transition"
                >
                  <td className="p-2 sm:p-3">{d.name}</td>
                  <td className="p-2 sm:p-3">{d.email || t("dashboard.not_provided")}</td>
                  <td className="p-2 sm:p-3 text-[#0f5132] font-semibold">
                    {formatCurrency(Number(d.amount))}
                  </td>
                  <td className="p-2 sm:p-3 capitalize">{d.type === "once" ? t("profile.type.once") : t("profile.type.monthly")}</td>
                  <td className="p-2 sm:p-3">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Button */}
        <button
          onClick={clearDonations}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow w-full sm:w-auto"
        >
          {t("dashboard.clear_all")}
        </button>
      </div>
    </AdminLayout>
  );
}

function StatBox({ title, value, color }: { title: string; value: string | number; color: "green" | "gold" }) {
  const bg = color === "green" ? "bg-[#0f7b42]" : "bg-[#d4af37]";
  return (
    <div className={`${bg} text-white rounded-xl px-4 py-4 sm:py-6 shadow-md`}>
      <p className="text-xs sm:text-sm opacity-90">{title}</p>
      <h3 className="text-lg sm:text-2xl font-extrabold">{value}</h3>
    </div>
  );
}
