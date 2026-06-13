export default function MetricCard({ title, value, change, changeType, icon: Icon }) {
  return (
    <div className="premium-card p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-void-700/50 uppercase tracking-wider font-sans">{title}</p>
          <h3 className="text-3xl font-serif font-bold text-void-950 mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-canvas-50 border border-canvas-200/50 rounded-xl">
          <Icon className="w-5 h-5 text-forest-800" />
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          changeType === 'increase'
            ? 'bg-mint-100 text-mint-800'
            : 'bg-red-50 text-red-700'
        }`}>
          {change}
        </span>
        <span className="text-[11px] text-void-700/40 font-sans">vs last month</span>
      </div>
    </div>
  );
}
