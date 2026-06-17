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
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'contacted':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'meeting scheduled':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'proposal sent':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'won':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'lost':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
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
