import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  TrendingUp, DollarSign, Layers, Clock, AlertCircle, Zap,
} from 'lucide-react';

/**
 * Formats a numeric dollar value into a compact string (e.g. 1200000 â†’ "$1.2M").
 * @param {number} val
 * @returns {string}
 */
const formatCurrency = (val) => {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000)     return `$${(val / 1_000).toFixed(1)}K`;
  return `$${val}`;
};

const getIconBgStyle = (bgClass) => {
  switch (bgClass) {
    case 'bg-blue-50': return 'bg-blue-50 dark:bg-blue-950/40';
    case 'bg-green-50': return 'bg-green-50 dark:bg-green-950/40';
    case 'bg-violet-50': return 'bg-violet-50 dark:bg-violet-950/40';
    case 'bg-sky-50': return 'bg-sky-50 dark:bg-sky-950/40';
    case 'bg-amber-50': return 'bg-amber-50 dark:bg-amber-950/40';
    case 'bg-red-50': return 'bg-red-50 dark:bg-red-950/40';
    default: return bgClass;
  }
};

const getIconColorStyle = (colorClass) => {
  switch (colorClass) {
    case 'text-blue-600': return 'text-blue-600 dark:text-blue-400';
    case 'text-green-600': return 'text-green-600 dark:text-green-400';
    case 'text-violet-600': return 'text-violet-600 dark:text-violet-400';
    case 'text-sky-600': return 'text-sky-600 dark:text-sky-400';
    case 'text-amber-500': return 'text-amber-500 dark:text-amber-450';
    case 'text-red-500': return 'text-red-500 dark:text-red-450';
    default: return colorClass;
  }
};

const getSubColorClass = (colorClass) => {
  switch (colorClass) {
    case 'text-slate-400': return 'text-slate-400 dark:text-slate-500';
    case 'text-green-500': return 'text-green-500 dark:text-green-400';
    case 'text-violet-500': return 'text-violet-500 dark:text-violet-400';
    case 'text-amber-500': return 'text-amber-500 dark:text-amber-400';
    case 'text-red-500': return 'text-red-500 dark:text-red-400';
    default: return colorClass;
  }
};

/** Single KPI card */
const KpiCard = memo(({ icon: Icon, iconBg, iconColor, label, value, sub, subColor = 'text-green-500' }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-200">
    <div className={`p-3 rounded-xl ${getIconBgStyle(iconBg)} shrink-0`}>
      <Icon className={`w-5 h-5 ${getIconColorStyle(iconColor)}`} strokeWidth={2} />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider truncate">{label}</p>
      <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-0.5 truncate">{value}</p>
      {sub && (
        <p className={`text-xs font-semibold mt-0.5 truncate ${getSubColorClass(subColor)}`}>{sub}</p>
      )}
    </div>
  </div>
));
KpiCard.displayName = 'KpiCard';

/**
 * StatsCards Component
 *
 * Renders a 6-card responsive KPI row using derived analytics data.
 *
 * @param {number} totalLeads     - Total number of leads in selected range.
 * @param {number} wonRevenue     - Sum of all Won deal values.
 * @param {number} pipelineValue  - Sum of active (non-Won, non-Lost) deal values.
 * @param {number} conversionRate - Lead-to-Won percentage.
 * @param {number} avgSalesCycle  - Average days from created to Won.
 * @param {number} lostRate       - Percentage of leads that are Lost.
 * @returns {React.JSX.Element}
 */
const StatsCards = memo(({
  totalLeads,
  wonRevenue,
  pipelineValue,
  conversionRate,
  avgSalesCycle,
  lostRate,
}) => {
  const cards = [
    {
      icon: Layers,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      label: 'Total Leads',
      value: totalLeads.toLocaleString(),
      sub: 'In selected period',
      subColor: 'text-slate-400',
    },
    {
      icon: DollarSign,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      label: 'Won Revenue',
      value: formatCurrency(wonRevenue),
      sub: 'Closed-Won deals',
      subColor: 'text-green-500',
    },
    {
      icon: Zap,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
      label: 'Pipeline Value',
      value: formatCurrency(pipelineValue),
      sub: 'Active opportunities',
      subColor: 'text-violet-500',
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      label: 'Conversion Rate',
      value: `${conversionRate}%`,
      sub: conversionRate >= 20 ? 'â†‘ Healthy' : 'â†“ Needs attention',
      subColor: conversionRate >= 20 ? 'text-green-500' : 'text-amber-500',
    },
    {
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      label: 'Avg Sales Cycle',
      value: `${avgSalesCycle}d`,
      sub: 'Days to close a deal',
      subColor: 'text-slate-400',
    },
    {
      icon: AlertCircle,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      label: 'Lost Rate',
      value: `${lostRate}%`,
      sub: lostRate < 30 ? 'Within healthy range' : 'High churn â€” review',
      subColor: lostRate < 30 ? 'text-green-500' : 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <KpiCard key={card.label} {...card} />
      ))}
    </div>
  );
});

StatsCards.displayName = 'StatsCards';

StatsCards.propTypes = {
  totalLeads:     PropTypes.number.isRequired,
  wonRevenue:     PropTypes.number.isRequired,
  pipelineValue:  PropTypes.number.isRequired,
  conversionRate: PropTypes.number.isRequired,
  avgSalesCycle:  PropTypes.number.isRequired,
  lostRate:       PropTypes.number.isRequired,
};

export default StatsCards;
