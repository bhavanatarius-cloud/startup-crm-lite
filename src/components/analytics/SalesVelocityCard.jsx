import { memo } from 'react';
import PropTypes from 'prop-types';
import { Zap, TrendingUp } from 'lucide-react';

/** Formats currency compactly */
const fmt = (val) => {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000)     return `$${(val / 1_000).toFixed(0)}K`;
  return `$${val}`;
};

/**
 * SalesVelocityCard Component
 *
 * Displays the computed Sales Velocity formula result with component breakdown.
 * Formula: Velocity = (Opportunities Ã— Win Rate Ã— Avg Deal Size) / Cycle Length
 *
 * @param {{ value: number, change: number }} salesVelocity - Velocity data from getSalesVelocity().
 * @param {number} totalLeads     - Total leads in range.
 * @param {number} conversionRate - Win rate percentage.
 * @param {number} avgSalesCycle  - Average deal cycle in days.
 * @returns {React.JSX.Element}
 */
const SalesVelocityCard = memo(({ salesVelocity, totalLeads, conversionRate, avgSalesCycle }) => {
  const { value, change } = salesVelocity;
  const isPositive = change >= 0;

  // Component metrics for the breakdown grid
  const breakdown = [
    { label: 'Opportunities', value: totalLeads, suffix: '' },
    { label: 'Win Rate',      value: `${conversionRate}`, suffix: '%' },
    { label: 'Cycle Length',  value: `${avgSalesCycle}`, suffix: 'd' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-md p-6 text-white flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            </div>
            <p className="text-xs font-bold text-blue-100 uppercase tracking-wider">Sales Velocity</p>
          </div>
          <p className="text-3xl font-black tracking-tight">{fmt(value)}<span className="text-sm font-semibold text-blue-200 ml-1">/day</span></p>
        </div>

        {/* Change badge */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
          isPositive ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'
        }`}>
          <TrendingUp className={`w-3 h-3 ${!isPositive ? 'rotate-180' : ''}`} />
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-3 gap-3 mt-2 pt-4 border-t border-white/15">
        {breakdown.map(({ label, value: bVal, suffix }) => (
          <div key={label} className="text-center">
            <p className="text-base font-extrabold">{bVal}{suffix}</p>
            <p className="text-[10px] text-blue-200 font-semibold mt-0.5 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Formula hint */}
      <p className="text-[10px] text-blue-300 mt-3 leading-relaxed">
        Velocity = (Opps Ã— Win% Ã— Avg Deal) Ã· Cycle Length
      </p>
    </div>
  );
});

SalesVelocityCard.displayName = 'SalesVelocityCard';

SalesVelocityCard.propTypes = {
  salesVelocity:  PropTypes.shape({ value: PropTypes.number, change: PropTypes.number }).isRequired,
  totalLeads:     PropTypes.number.isRequired,
  conversionRate: PropTypes.number.isRequired,
  avgSalesCycle:  PropTypes.number.isRequired,
};

export default SalesVelocityCard;
