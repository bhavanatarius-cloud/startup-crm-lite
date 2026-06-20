import PropTypes from 'prop-types';

/**
 * StatusBadge Component
 * Renders a pill-shaped badge representing a lead's stage in the CRM funnel.
 * Uses consistent color mappings for standard CRM statuses.
 *
 * @param {Object} props - The component props.
 * @param {string} props.status - The current status of the lead.
 * @returns {React.JSX.Element} The rendered StatusBadge component.
 */
export default function StatusBadge({ status }) {
  const getBadgeStyle = (rawStatus) => {
    if (!rawStatus) return 'bg-slate-50 text-slate-600 border-slate-200';
    
    // Normalize status for mapping
    const normalized = rawStatus.trim().toLowerCase();
    
    switch (normalized) {
      case 'new':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 border-slate-200 dark:border-slate-700';
      case 'contacted':
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/30';
      case 'meeting scheduled':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30';
      case 'proposal sent':
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-900/30';
      case 'won':
        return 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-100 dark:border-green-900/30';
      case 'lost':
        return 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900/30';
      default:
        return 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-450 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(status)} transition-colors duration-200`}>
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
