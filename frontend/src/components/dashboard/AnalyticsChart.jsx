import { useState } from 'react';
import { TrendingUp, Calendar, ChevronDown } from 'lucide-react';

export default function AnalyticsChart() {
  const [activeRange, setActiveRange] = useState('7D');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Mock data representing activity/growth over time
  const data = [
    { label: 'Mon', value: 32 },
    { label: 'Tue', value: 40 },
    { label: 'Wed', value: 35 },
    { label: 'Thu', value: 55 },
    { label: 'Fri', value: 48 },
    { label: 'Sat', value: 70 },
    { label: 'Sun', value: 65 },
  ];

  // SVG dimensions
  const width = 600;
  const height = 240;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  // Calculate coordinates
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const maxVal = Math.max(...data.map(d => d.value)) * 1.1;

  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.value / maxVal) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  // SVG Paths
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <div className="premium-card p-6 flex flex-col justify-between h-[360px]">
      <div>
        {/* Header Grid */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-void-950 flex items-center space-x-2">
              <span>System Activity & Operations</span>
              <span className="flex items-center text-xs font-sans font-medium text-forest-700 bg-mint-100 px-2.5 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                +12.4%
              </span>
            </h3>
            <p className="text-xs text-void-700/60 mt-1">Operational ledger executions and throughput status.</p>
          </div>
          {/* Controls */}
          <div className="flex space-x-2">
            {['7D', '30D', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all ${
                  activeRange === range
                    ? 'bg-forest-800 text-white shadow-void-glow'
                    : 'bg-canvas-50 hover:bg-canvas-100 border border-canvas-200/50 text-void-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="relative w-full overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#064e3b" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
              const y = paddingTop + ratio * chartHeight;
              const valueLabel = Math.round(maxVal * (1 - ratio));
              return (
                <g key={index} className="opacity-40">
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 4}
                    fill="#334155"
                    fontSize="10"
                    textAnchor="end"
                    fontFamily="sans-serif"
                    className="font-semibold text-void-700/40"
                  >
                    {valueLabel}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            <path d={areaPath} fill="url(#chartGradient)" />

            {/* Main Line Stroke */}
            <path
              d={linePath}
              fill="none"
              stroke="#064e3b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Interaction Nodes */}
            {points.map((p, i) => (
              <g
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* Invisible hover helper */}
                <circle cx={p.x} cy={p.y} r="12" fill="transparent" />

                {/* Visible indicator */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIndex === i ? '6' : '4'}
                  fill={hoveredIndex === i ? '#d1fae5' : '#ffffff'}
                  stroke="#064e3b"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />

                {/* X-Axis labels */}
                <text
                  x={p.x}
                  y={height - 8}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="middle"
                  className="font-semibold"
                >
                  {p.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Interactive Tooltip Overlay */}
          {hoveredIndex !== null && (
            <div
              className="absolute bg-void-950 text-white p-2.5 rounded-lg shadow-xl text-xs font-sans pointer-events-none border border-white/5 transition-all duration-100"
              style={{
                left: `${(points[hoveredIndex].x / width) * 100}%`,
                top: `${(points[hoveredIndex].y / height) * 100 - 24}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <p className="font-semibold text-white/50">{points[hoveredIndex].label}</p>
              <p className="text-mint-100 font-bold mt-0.5">{points[hoveredIndex].value} Executions</p>
            </div>
          )}
        </div>
      </div>

      {/* Chart Footer Meta */}
      <div className="flex justify-between items-center border-t border-canvas-200/50 pt-4 text-xs text-void-700/60 mt-4">
        <span className="flex items-center">
          <Calendar className="w-3.5 h-3.5 mr-1 text-void-700/40" />
          Data current as of 10m ago
        </span>
        <button className="flex items-center text-forest-800 hover:text-forest-900 font-semibold transition-colors">
          <span>Export Ledger PDF</span>
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </div>
    </div>
  );
}
