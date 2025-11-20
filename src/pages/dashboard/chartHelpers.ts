import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import i18n from "../../i18n";

export function chartHelpers(donations: any[]) {
  // 🔹 Line Chart Data
  const currency = i18n.t("campaigns.currency_symbol");

  const lineData = {
    labels: donations.map((d) => d.date.split(",")[0]),
    datasets: [
      {
        label: `${i18n.t("dashboard.chart_label")} (${currency})`,
        data: donations.map((d) => Number(d.amount)),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  // 🔹 Donation Type Pie Chart
  const once = donations.filter((d) => d.type === "once").length;
  const monthly = donations.filter((d) => d.type === "monthly").length;
  const total = once + monthly || 1;

  const pieData = {
    labels: [i18n.t("profile.type.once"), i18n.t("profile.type.monthly")],
    datasets: [
      {
        data: [once, monthly],
        backgroundColor: ["#22c55e", "#8b5cf6"],
        borderColor: ["#14532d", "#5b21b6"],
        borderWidth: 1.5,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: { position: "bottom" as const, labels: { color: "#ccc" } },
    },
  };

  // 🔹 Monthly Totals Bar Chart
  const monthlyTotals = donations.reduce((acc: Record<string, number>, d) => {
    const month = new Date(d.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + Number(d.amount);
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: `${i18n.t("dashboard.monthly_totals")} (${currency})`,
        data: Object.values(monthlyTotals),
        backgroundColor: "rgba(59,130,246,0.5)",
        borderColor: "#2563eb",
        borderWidth: 1.5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  // 🔹 Donations per Campaign Pie Chart
  const campaignTotals = donations.reduce((acc: Record<string, number>, d) => {
    if (!d.campaign) return acc;
    acc[d.campaign] = (acc[d.campaign] || 0) + Number(d.amount);
    return acc;
  }, {});

  const campaignLabels = Object.keys(campaignTotals);
  const campaignValues = Object.values(campaignTotals);

  const campaignPieData = {
    labels: campaignLabels,
    datasets: [
      {
        data: campaignValues,
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#a855f7",
          "#f97316",
          "#ef4444",
          "#14b8a6",
        ],
        borderColor: "#111827",
        borderWidth: 1.5,
      },
    ],
  };

  const campaignPieOptions = {
    plugins: {
      legend: { position: "bottom" as const, labels: { color: "#ccc" } },
    },
  };

  return {
    lineData,
    lineOptions,
    pieData,
    pieOptions,
    barData,
    barOptions,
    campaignPieData,
    campaignPieOptions,
    monthly,
    total,
    monthlyTotals,
    campaignLabels,
  };
}
