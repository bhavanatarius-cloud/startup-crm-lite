import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { BarChart2 } from 'lucide-react';
import EmptyAnalyticsState from './EmptyAnalyticsState';

/** Custom tooltip */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-bold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
      <p className="text-blue-600 dark:text-blue-400 font-semibold">
        {payload[0].value} <span className="text-slate-400 dark:text-slate-400">leads</span>
      </p>
    </div>
  );
};

/**
 * BarChartCard Component
 *
 * Displays a bar chart of monthly lead generation counts for the last 6 months.
 *
 * @param {Array} data - [{name, Leads}] from getMonthlyLeads().
 * @returns {React.JSX.Element}
 */
const BarChartCard = memo(({ data = [] }) => {
  const hasData = data.some((d) => d.Leads > 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2} />
          Lead Volume â€” Last 6 Months
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Monthly count of new leads entering the pipeline</p>
      </div>

      {!hasData ? (
        <EmptyAnalyticsState message="No monthly lead data yet" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barSize={28} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="var(--chart-grid)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--chart-axis)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--chart-axis-light)' }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--chart-tooltip-cursor)' }} />
            <Bar
              dataKey="Leads"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});

BarChartCard.displayName = 'BarChartCard';

BarChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, Leads: PropTypes.number })
  ),
};

export default BarChartCard;
