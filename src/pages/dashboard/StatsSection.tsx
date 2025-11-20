import StatCard from "./StatCard";

export default function StatsSection({
  totalAmount,
  totalDonations,
  recurringDonations,
  lastDonor,
}: {
  totalAmount: number;
  totalDonations: number;
  recurringDonations: number;
  lastDonor: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard label="Total Donations" value={`$${totalAmount.toFixed(2)}`} color="green" />
      <StatCard label="Number of Donations" value={totalDonations} color="blue" />
      <StatCard label="Monthly Recurring" value={recurringDonations} color="yellow" />
      <StatCard label="Last Donor" value={lastDonor} color="purple" />
    </div>
  );
}
