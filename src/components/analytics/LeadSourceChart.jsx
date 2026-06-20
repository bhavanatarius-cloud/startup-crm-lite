import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Globe } from 'lucide-react';
import { SOURCE_COLORS } from '../../constants/analyticsColors';
import EmptyAnalyticsState from './EmptyAnalyticsState';

/** Custom tooltip */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-bold text-slate-800 dark:text-slate-200 mb-0.5">{payload[0].payload.name}</p>
      <p className="text-blue-600 dark:text-blue-400 font-semibold">
        {payload[0].value} <span className="text-slate-400 dark:text-slate-500">leads</span>
      </p>
    </div>
  );
};

/**
 * LeadSourceChart Component
 *
 * Horizontal bar chart displaying lead counts grouped by acquisition source.
 *
 * @param {Array} data - [{name, value}] from getLeadSourceStats().
 * @returns {React.JSX.Element}
 */
const LeadSourceChart = memo(({ data = [] }) => {
  // Recharts horizontal bar expects "value" key mapped to the measure axis
  const chartData = data.map((d) => ({ ...d, Leads: d.value }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400" strokeWidth={2} />
          Lead Sources
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Acquisition channel performance</p>
      </div>

      {chartData.length === 0 ? (
        <EmptyAnalyticsState message="No source data yet" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            layout="vertical"
            data={chartData}
            barSize={14}
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="var(--chart-grid)" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: 'var(--chart-axis-light)' }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--chart-axis)' }}
              axisLine={false}
              tickLine={false}
              width={72}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--chart-tooltip-cursor)' }} />
            <Bar dataKey="Leads" radius={[0, 6, 6, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={SOURCE_COLORS[entry.name] || '#64748B'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});

LeadSourceChart.displayName = 'LeadSourceChart';

LeadSourceChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.number })
  ),
};

export default LeadSourceChart;
