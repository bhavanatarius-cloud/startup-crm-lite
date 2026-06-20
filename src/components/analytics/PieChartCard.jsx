import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { STATUS_COLORS } from '../../constants/analyticsColors';
import EmptyAnalyticsState from './EmptyAnalyticsState';

/** Custom tooltip rendered on slice hover */
const CustomTooltip = ({ active, payload, total }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-bold text-slate-800 dark:text-slate-200 mb-0.5">{name}</p>
      <p className="text-slate-500 dark:text-slate-400">{value} leads</p>
      <p className="text-slate-400 dark:text-slate-500">{total > 0 ? Math.round((value / total) * 100) : 0}% of total</p>
    </div>
  );
};

/** Custom legend item */
const CustomLegend = ({ payload, total }) => (
  <ul className="flex flex-col gap-1.5 mt-3">
    {payload.map((entry) => (
      <li key={entry.value} className="flex items-center justify-between text-xs gap-3">
        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-350 font-medium">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: entry.color }}
          />
          {entry.value}
        </span>
        <span className="text-slate-400 dark:text-slate-500 font-semibold tabular-nums">
          {entry.payload.value}&nbsp;
          <span className="text-slate-300 dark:text-slate-605">({total > 0 ? Math.round((entry.payload.value / total) * 100) : 0}%)</span>
        </span>
      </li>
    ))}
  </ul>
);

/**
 * PieChartCard Component
 *
 * Displays a doughnut chart of lead status distribution with a centre total.
 *
 * @param {Array}  data - [{name, value}] status distribution from analyticsHelpers.
 * @returns {React.JSX.Element}
 */
const PieChartCard = memo(({ data = [] }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2} />
          Lead Status Distribution
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Breakdown of leads by current pipeline stage</p>
      </div>

      {/* Chart or empty state */}
      {data.length === 0 ? (
        <EmptyAnalyticsState message="No status data yet" />
      ) : (
        <div className="flex-1 flex flex-col">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={STATUS_COLORS[entry.name] || '#94A3B8'}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip total={total} />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Centre total label â€” overlaid via absolute positioning trick */}
          <div className="relative -mt-[130px] mb-[90px] flex flex-col items-center justify-center pointer-events-none select-none">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{total}</span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Leads</span>
          </div>

          {/* Custom legend */}
          <CustomLegend
            payload={data.map((d) => ({
              value: d.name,
              color: STATUS_COLORS[d.name] || '#94A3B8',
              payload: d,
            }))}
            total={total}
          />
        </div>
      )}
    </div>
  );
});

PieChartCard.displayName = 'PieChartCard';

PieChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.number })
  ),
};

export default PieChartCard;
