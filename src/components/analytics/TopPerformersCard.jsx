import { memo } from 'react';
import PropTypes from 'prop-types';
import { Award, Crown } from 'lucide-react';

/** Formats currency compactly */
const fmt = (val) => {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000)     return `$${(val / 1_000).toFixed(0)}K`;
  return `$${val}`;
};

/** Medal colour for top 3 */
const MEDAL = ['text-amber-500 dark:text-amber-400', 'text-slate-400 dark:text-slate-400', 'text-amber-700 dark:text-amber-500'];

/**
 * TopPerformersCard Component
 *
 * Ranked list of sales reps by Closed-Won revenue.
 *
 * @param {Array} data - [{name, value}] from getTopPerformers(), sorted desc.
 * @returns {React.JSX.Element}
 */
const TopPerformersCard = memo(({ data = [] }) => {
  const maxVal = data[0]?.value || 1;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" strokeWidth={2} />
          Top Performers
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Sales reps ranked by Closed-Won revenue</p>
      </div>

      {/* Ranked rows */}
      <div className="flex flex-col gap-4 flex-1">
        {data.slice(0, 6).map((rep, idx) => {
          const barWidth = Math.round((rep.value / maxVal) * 100);
          const isTopDog = idx === 0;

          return (
            <div key={rep.name} className="flex items-center gap-3">
              {/* Rank badge */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
                idx < 3 ? 'bg-amber-50 dark:bg-amber-950/40' : 'bg-slate-100 dark:bg-slate-700/50'
              }`}>
                {idx === 0
                  ? <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  : <span className={idx < 3 ? MEDAL[idx] : 'text-slate-400 dark:text-slate-400'}>{idx + 1}</span>
                }
              </div>

              {/* Name + bar */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold truncate ${isTopDog ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {rep.name}
                  </span>
                  <span className={`text-xs font-extrabold tabular-nums shrink-0 ml-2 ${isTopDog ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400'}`}>
                    {fmt(rep.value)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${isTopDog ? 'bg-amber-500' : 'bg-blue-500'}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer: total closed */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
        <span className="text-slate-400 dark:text-slate-400 font-medium">Total Closed-Won</span>
        <span className="font-extrabold text-slate-800 dark:text-slate-205">
          {fmt(data.reduce((s, d) => s + d.value, 0))}
        </span>
      </div>
    </div>
  );
});

TopPerformersCard.displayName = 'TopPerformersCard';

TopPerformersCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.number })
  ),
};

export default TopPerformersCard;
