import { memo } from 'react';
import PropTypes from 'prop-types';
import { BarChart2 } from 'lucide-react';

/**
 * EmptyAnalyticsState Component
 *
 * Displays a friendly empty state when a chart section has no data.
 *
 * @param {string} message - Custom message to display.
 * @param {string} [height] - Tailwind min-height class for the container.
 * @returns {React.JSX.Element}
 */
const EmptyAnalyticsState = memo(({ message = 'No data available yet', height = 'min-h-[200px]' }) => (
  <div
    className={`flex flex-col items-center justify-center ${height} text-center px-6 py-10 gap-3`}
  >
    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mb-1">
      <BarChart2 className="w-7 h-7 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
    </div>
    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{message}</p>
    <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed">
      Add leads and track their progress to start seeing analytics data here.
    </p>
  </div>
));

EmptyAnalyticsState.displayName = 'EmptyAnalyticsState';

EmptyAnalyticsState.propTypes = {
  message: PropTypes.string,
  height: PropTypes.string,
};

export default EmptyAnalyticsState;
