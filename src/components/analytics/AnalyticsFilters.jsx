import { memo } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'lucide-react';

const RANGES = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: 'All Time', value: 'all' },
];

/**
 * AnalyticsFilters Component
 *
 * Renders a pill-toggle date-range selector header bar for the Analytics page.
 *
 * @param {string}   range     - Currently active range value.
 * @param {Function} onChange  - Callback fired when user picks a new range.
 * @returns {React.JSX.Element}
 */
const AnalyticsFilters = memo(({ range, onChange }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Left: Page title */}
    <div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
        Analytics
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
        Sales performance, pipeline health &amp; revenue forecasting
      </p>
    </div>

    {/* Right: Range toggle pills */}
    <div
      role="group"
      aria-label="Select analytics time range"
      className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-xs self-start sm:self-auto"
    >
      {RANGES.map(({ label, value }) => (
        <button
          key={value}
          id={`analytics-filter-${value}`}
          onClick={() => onChange(value)}
          aria-pressed={range === value}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap ${
            range === value
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
));

AnalyticsFilters.displayName = 'AnalyticsFilters';

AnalyticsFilters.propTypes = {
  range:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AnalyticsFilters;
