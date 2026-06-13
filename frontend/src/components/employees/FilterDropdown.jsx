export default function FilterDropdown({ activeFilter, setActiveFilter, departments }) {
  return (
    <div className="relative">
      <select
        value={activeFilter}
        onChange={(e) => setActiveFilter(e.target.value)}
        className="px-4 py-2.5 bg-white border border-canvas-200 rounded-xl text-xs font-semibold text-void-700/80 shadow-[0_1px_2px_0_rgba(9,13,22,0.02)] focus:outline-none focus:border-forest-800 focus:ring-4 focus:ring-forest-800/5 cursor-pointer appearance-none pr-10"
      >
        <option value="All">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      <div className="absolute right-3.5 top-3.5 pointer-events-none w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-void-700/50"></div>
    </div>
  );
}
