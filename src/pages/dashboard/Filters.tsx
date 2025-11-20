interface FiltersProps {
  typeFilter: string;
  amountFilter: number;
  sortOrder: string;
  setTypeFilter: (value: string) => void;
  setAmountFilter: (value: number) => void;
  setSortOrder: (value: string) => void;
}

export default function Filters({
  typeFilter,
  amountFilter,
  sortOrder,
  setTypeFilter,
  setAmountFilter,
  setSortOrder,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
      
      {/* Filter Type */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Type:</label>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none"
        >
          <option value="all">All</option>
          <option value="once">One-time</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Min Amount */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Min amount ($):</label>
        <input
          type="number"
          value={amountFilter}
          onChange={(e) => setAmountFilter(Number(e.target.value))}
          className="w-24 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none"
        />
      </div>

      {/* Sort Order */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Sort:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

    </div>
  );
}
