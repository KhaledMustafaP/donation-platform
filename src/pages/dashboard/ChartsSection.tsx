import ChartCard from "./ChartCard";
import { Line, Pie, Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import formatCurrency from "../../utils/formatCurrency";

interface ChartsSectionProps {
  lineData: any;
  lineOptions: any;
  pieData: any;
  pieOptions: any;
  barData: any;
  barOptions: any;
  campaignPieData: any;
  campaignPieOptions: any;
  totalAmount: number;
  monthly: number;
  total: number;
  monthlyTotals: Record<string, number>;
  campaignLabels: string[];
}

export default function ChartsSection({
  lineData,
  lineOptions,
  pieData,
  pieOptions,
  barData,
  barOptions,
  campaignPieData,
  campaignPieOptions,
  totalAmount,
  monthly,
  total,
  monthlyTotals,
  campaignLabels,
}: ChartsSectionProps) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">

      <ChartCard
        title={t("dashboard.over_time")}
        value={formatCurrency(totalAmount)}
        chart={<Line data={lineData} options={lineOptions} />}
      />

      <ChartCard
        title={t("dashboard.donation_type_ratio")}
        value={`${((monthly / total) * 100).toFixed(1)}% ${t("dashboard.monthly_suffix")}`}
        chart={<Pie data={pieData} options={pieOptions} />}
      />

      <ChartCard
        title={t("dashboard.monthly_totals")}
        value={`${Object.keys(monthlyTotals).length} ${t("dashboard.months_suffix")}`}
        chart={<Bar data={barData} options={barOptions} />}
      />

      {campaignLabels.length > 0 && (
        <ChartCard
          title={t("dashboard.donations_per_campaign")}
          value={`${campaignLabels.length} ${t("dashboard.campaigns_suffix")}`}
          chart={<Pie data={campaignPieData} options={campaignPieOptions} />}
        />
      )}
    </div>
  );
}
