import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Activity } from 'lucide-react';

/**
 * Returns a Tailwind background class based on activity count intensity.
 * @param {number} count
 * @returns {string}
 */
const getCellColor = (count) => {
  if (count === 0) return 'bg-slate-100 dark:bg-slate-700/50';
  if (count === 1) return 'bg-blue-200 dark:bg-blue-900/40';
  if (count === 2) return 'bg-blue-400 dark:bg-blue-700/60';
  if (count === 3) return 'bg-blue-500 dark:bg-blue-600/80';
  return 'bg-blue-700 dark:bg-blue-500';
};

/**
 * ActivityHeatmap Component
 *
 * Renders a GitHub-style 30-day activity calendar grid.
 * Each cell represents a day; intensity reflects number of lead actions (created / contacted / meeting).
 *
 * @param {Array} data - [{date: string, count: number}] from getActivityHeatmapData().
 * @returns {React.JSX.Element}
 */
const ActivityHeatmap = memo(({ data = [] }) => {
  const totalActions = useMemo(() => data.reduce((s, d) => s + d.count, 0), [data]);
  const activeDays   = useMemo(() => data.filter((d) => d.count > 0).length, [data]);

  // Split 30 days into 5-day columns of 6 rows for a compact grid (6 cols Ã— 5 rows)
  const grid = useMemo(() => {
    const cols = [];
    for (let c = 0; c < 6; c++) {
      cols.push(data.slice(c * 5, c * 5 + 5));
    }
    return cols;
  }, [data]);

  /**
   * Format a yyyy-mm-dd date string to a short readable label.
   * @param {string} dateStr
   */
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2} />
            Activity Heatmap
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Last 30 days of CRM activity</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-450">{totalActions} actions</p>
          <p className="text-[10px] text-slate-300 dark:text-slate-400">{activeDays} active days</p>
        </div>
      </div>

      {/* Grid */}
      <div className="flex gap-1.5 flex-1 items-start">
        {grid.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-1.5 flex-1">
            {col.map((cell) => (
              <div
                key={cell.date}
                title={`${formatDate(cell.date)}: ${cell.count} action${cell.count !== 1 ? 's' : ''}`}
                className={`w-full aspect-square rounded-md ${getCellColor(cell.count)} transition-colors duration-150 cursor-default`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Intensity legend */}
      <div className="mt-4 flex items-center gap-1.5">
        <span className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold mr-1">Less</span>
        {['bg-slate-100 dark:bg-slate-700/50', 'bg-blue-200 dark:bg-blue-900/40', 'bg-blue-400 dark:bg-blue-700/60', 'bg-blue-500 dark:bg-blue-600/80', 'bg-blue-700 dark:bg-blue-500'].map((cls) => (
          <div key={cls} className={`w-3.5 h-3.5 rounded-sm ${cls}`} />
        ))}
        <span className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold ml-1">More</span>
      </div>
    </div>
  );
});

ActivityHeatmap.displayName = 'ActivityHeatmap';

ActivityHeatmap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ date: PropTypes.string, count: PropTypes.number })
  ),
};

export default ActivityHeatmap;
