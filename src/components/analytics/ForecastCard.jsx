import { memo } from 'react';
import PropTypes from 'prop-types';
import { Target, TrendingUp } from 'lucide-react';

/** Formats currency compactly */
const fmt = (val) => {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000)     return `$${(val / 1_000).toFixed(0)}K`;
  return `$${val}`;
};

/**
 * ForecastCard Component
 *
 * Displays next-month revenue forecast with a confidence score ring and trend badge.
 *
 * @param {{ value: number, confidence: number, trend: number }} forecastRevenue
 * @returns {React.JSX.Element}
 */
const ForecastCard = memo(({ forecastRevenue }) => {
  const { value, confidence, trend } = forecastRevenue;

  // SVG ring dimensions
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (confidence / 100) * circumference;

  // Colour based on confidence level
  const ringColor =
    confidence >= 75 ? '#22C55E' :
    confidence >= 50 ? '#F59E0B' :
    '#EF4444';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Target className="w-4 h-4 text-violet-600 dark:text-violet-400" strokeWidth={2} />
          Revenue Forecast
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Next month projection based on pipeline trends</p>
      </div>

      {/* Main content: ring + value side-by-side */}
      <div className="flex items-center gap-6">
        {/* Confidence ring */}
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Track */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke="var(--chart-grid)"
              strokeWidth="10"
            />
            {/* Progress */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke={ringColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">{confidence}%</span>
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wide">Conf.</span>
          </div>
        </div>

        {/* Forecast value + trend */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Projected Revenue</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{fmt(value)}</p>

          <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-bold ${
            trend >= 0 ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400'
          }`}>
            <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
            {trend >= 0 ? '+' : ''}{trend}% vs last month
          </div>
        </div>
      </div>

      {/* Confidence legend */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Low', range: '<50%', color: 'text-red-400' },
          { label: 'Medium', range: '50â€“75%', color: 'text-amber-500' },
          { label: 'High', range: '>75%', color: 'text-green-500' },
        ].map(({ label, range, color }) => (
          <div key={label}>
            <p className={`text-xs font-bold ${color}`}>{label}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-400">{range}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

ForecastCard.displayName = 'ForecastCard';

ForecastCard.propTypes = {
  forecastRevenue: PropTypes.shape({
    value:      PropTypes.number.isRequired,
    confidence: PropTypes.number.isRequired,
    trend:      PropTypes.number.isRequired,
  }).isRequired,
};

export default ForecastCard;
