import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * @typedef {Object} StatsCardProps
 * @property {string} title - The display title of the metric.
 * @property {string|number} value - The main metric value to display (e.g. "$12,450" or "148").
 * @property {React.ComponentType<{className?: string}>} icon - The Lucide React icon component to render.
 * @property {number} change - The percentage change compared to the previous period (e.g. 12.5 or -3.2).
 * @property {'primary' | 'success' | 'warning' | 'danger'} color - The color theme for the card icon background.
 */

/**
 * StatsCard Component
 * Displays a single key performance metric card with custom iconography, formatting,
 * and trend directions for comparison against the prior month.
 *
 * @param {StatsCardProps} props - The props for the StatsCard component.
 * @returns {React.JSX.Element} The rendered StatsCard component.
 */
export default function StatsCard({ title, value, icon: Icon, change, color }) {
  // Map color themes to Tailwind classes for background and icon text color
  const colorMap = {
    primary: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-500',
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-500',
    },
    danger: {
      bg: 'bg-red-50',
      text: 'text-red-500',
    },
  };

  const theme = colorMap[color] || colorMap.primary;

  const isPositive = change > 0;
  const isNegative = change < 0;
  const isZero = change === 0;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-500 text-sm font-medium tracking-wide">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${theme.bg} ${theme.text} transition-colors duration-300`}>
          {Icon && <Icon className="w-5 h-5 stroke-[2]" />}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          {value}
        </h3>

        <div className="flex items-center gap-1.5 mt-1">
          {isPositive && (
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">
              <TrendingUp className="w-3.5 h-3.5" />
              +{change}%
            </span>
          )}
          {isNegative && (
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600">
              <TrendingDown className="w-3.5 h-3.5" />
              {change}%
            </span>
          )}
          {isZero && (
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-50 text-slate-500">
              <Minus className="w-3.5 h-3.5" />
              {change}%
            </span>
          )}
          <span className="text-slate-400 text-xs">vs last month</span>
        </div>
      </div>
    </div>
  );
}
