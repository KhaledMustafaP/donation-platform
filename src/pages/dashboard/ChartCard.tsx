import type { ReactNode } from "react";

export default function ChartCard({
  title,
  value,
  chart,
}: {
  title: string;
  value: string;
  chart: ReactNode;
}) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex flex-col justify-center">
      <h2 className="text-center text-sm font-semibold mb-3 text-green-700 dark:text-green-400">
        {title}
      </h2>

      {chart}

      <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
        {value}
      </p>
    </div>
  );
}
