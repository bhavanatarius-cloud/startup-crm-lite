import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import EmptyAnalyticsState from './EmptyAnalyticsState';

/** Custom tooltip */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-bold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
      <p className="text-green-600 dark:text-green-400 font-semibold">
        {payload[0].value}% <span className="text-slate-400 dark:text-slate-400">conversion rate</span>
      </p>
    </div>
  );
};

/**
 * LineChartCard Component
 *
 * Renders a smooth line chart of monthly lead-to-Won conversion rates.
 *
 * @param {Array} data - [{name, 'Conversion Rate'}] from getConversionByMonth().
 * @returns {React.JSX.Element}
 */
const LineChartCard = memo(({ data = [] }) => {
  const hasData = data.some((d) => d['Conversion Rate'] > 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" strokeWidth={2} />
          Conversion Rate Trend
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Monthly Won% â€” Lead-to-close velocity over time</p>
      </div>

      {!hasData ? (
        <EmptyAnalyticsState message="No conversion data yet" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--chart-grid)" vertical={false} />
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
              unit="%"
              domain={[0, 100]}
            />
            {/* Industry benchmark reference line */}
            <ReferenceLine
              y={20}
              stroke="#FCD34D"
              strokeDasharray="4 3"
              label={{ value: 'Target 20%', position: 'insideTopRight', fontSize: 9, fill: '#F59E0B' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="Conversion Rate"
              stroke="#22C55E"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#22C55E', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#16A34A' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});

LineChartCard.displayName = 'LineChartCard';

LineChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, 'Conversion Rate': PropTypes.number })
  ),
};

export default LineChartCard;
