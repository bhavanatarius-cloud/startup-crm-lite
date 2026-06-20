import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DollarSign } from 'lucide-react';
import EmptyAnalyticsState from './EmptyAnalyticsState';

/** Currency formatter */
const fmt = (val) => {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000)     return `$${(val / 1_000).toFixed(0)}K`;
  return `$${val}`;
};

/** Custom tooltip */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-bold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
      <p className="text-green-600 dark:text-green-400 font-semibold">
        {fmt(payload[0].value)} <span className="text-slate-400 dark:text-slate-400">closed-won</span>
      </p>
    </div>
  );
};

/**
 * RevenueChartCard Component
 *
 * Gradient area chart showing Won revenue by month for the past 6 months.
 *
 * @param {Array} data - [{name, Revenue}] from getRevenueByMonth().
 * @returns {React.JSX.Element}
 */
const RevenueChartCard = memo(({ data = [] }) => {
  const hasData = data.some((d) => d.Revenue > 0);
  const totalRevenue = data.reduce((s, d) => s + d.Revenue, 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" strokeWidth={2} />
            Won Revenue â€” Last 6 Months
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Closed-Won contract values over time</p>
        </div>
        {hasData && (
          <div className="text-right shrink-0">
            <p className="text-xs text-slate-400 dark:text-slate-400 font-semibold uppercase tracking-wide">6M Total</p>
            <p className="text-lg font-extrabold text-green-600 dark:text-green-450">{fmt(totalRevenue)}</p>
          </div>
        )}
      </div>

      {!hasData ? (
        <EmptyAnalyticsState message="No won revenue yet" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22C55E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.02} />
              </linearGradient>
            </defs>
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
              tickFormatter={fmt}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="Revenue"
              stroke="#22C55E"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={{ r: 4, fill: '#22C55E', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#16A34A' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});

RevenueChartCard.displayName = 'RevenueChartCard';

RevenueChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, Revenue: PropTypes.number })
  ),
};

export default RevenueChartCard;
