import { memo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * StatsCard Component â€” with full dark mode support.
 */
function StatsCard({ title, value, icon: Icon, change, color }) {
  const colorMap = {
    primary: { bg: 'bg-blue-50 dark:bg-blue-950/40',   text: 'text-blue-600 dark:text-blue-400' },
    success: { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-500 dark:text-green-400' },
    warning: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-500 dark:text-amber-400' },
    danger:  { bg: 'bg-red-50 dark:bg-red-950/40',     text: 'text-red-500 dark:text-red-400' },
  };

  const theme    = colorMap[color] || colorMap.primary;
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isZero     = change === 0;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${theme.bg} ${theme.text} transition-colors duration-200`}>
          {Icon && <Icon className="w-5 h-5 stroke-[2]" />}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          {isPositive && (
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400">
              <TrendingUp className="w-3.5 h-3.5" />+{change}%
            </span>
          )}
          {isNegative && (
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
              <TrendingDown className="w-3.5 h-3.5" />{change}%
            </span>
          )}
          {isZero && (
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
              <Minus className="w-3.5 h-3.5" />{change}%
            </span>
          )}
          <span className="text-slate-400 dark:text-slate-500 text-xs">vs last month</span>
        </div>
      </div>
    </div>
  );
}

export default memo(StatsCard);
