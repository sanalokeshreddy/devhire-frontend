import React from "react";

const FilterSortBar = ({ filterScore, setFilterScore, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div>
        <label className="block mb-1 font-medium">🎯 Minimum Match Score</label>
        <input
          type="number"
          min="0"
          max="100"
          value={filterScore}
          onChange={(e) => setFilterScore(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 w-48"
          placeholder="e.g., 70"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">🔃 Sort by Match Score</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-48"
        >
          <option value="desc">Highest First</option>
          <option value="asc">Lowest First</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;
