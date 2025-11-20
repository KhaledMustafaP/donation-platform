import { useTranslation } from "react-i18next";
import formatCurrency from "../../utils/formatCurrency";

interface Donation {
  id: string;
  name: string;
  email?: string;
  amount: number | string;
  type: "once" | "monthly";
  campaign?: string;
  date: string;
}

interface DonationsTableProps {
  donations: Donation[];
  clearDonations: () => void;
}

export default function DonationsTable({
  donations,
  clearDonations,
}: DonationsTableProps) {
  const { t } = useTranslation();
  return (
    <>
      {donations.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          {t("dashboard.no_filtered")}
        </p>
      ) : (
        <>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-green-100 dark:bg-green-900/40 text-left">
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">Name</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">Email</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">{t("dashboard.table.amount")}</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">{t("dashboard.table.type")}</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">{t("dashboard.table.campaign")}</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">{t("dashboard.table.date")}</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td className="p-3 border-b border-gray-300 dark:border-gray-700">{d.name}</td>
                  <td className="p-3 border-b border-gray-300 dark:border-gray-700">{d.email || "-"}</td>
                  <td className="p-3 border-b border-gray-300 dark:border-gray-700">{formatCurrency(Number(d.amount))}</td>
                  <td className="p-3 border-b border-gray-300 dark:border-gray-700">{d.type === "once" ? t("profile.type.once") : t("profile.type.monthly")}</td>
                  <td className="p-3 border-b border-gray-300 dark:border-gray-700">{d.campaign || "-"}</td>
                  <td className="p-3 border-b border-gray-300 dark:border-gray-700">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={clearDonations}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            {t("dashboard.clear_all")}
          </button>
        </>
      )}
    </>
  );
}
