import PropTypes from 'prop-types';
import { Mail, Phone, Pencil, Trash2, Calendar, Tag } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * Extracts initials from the lead's name.
 * @param {string} name - Full name of the lead.
 * @returns {string} The computed initials (up to 2 chars).
 */
const getInitials = (name) => {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

/**
 * Generates an aesthetic background/text class combination for the user avatar based on initials hash.
 * @param {string} name - Full name of the lead.
 * @returns {string} Tailwind CSS class string.
 */
const getAvatarStyle = (name) => {
  const styles = [
    'bg-blue-50 text-blue-600 border border-blue-100',
    'bg-green-50 text-green-600 border border-green-100',
    'bg-purple-50 text-purple-600 border border-purple-100',
    'bg-amber-50 text-amber-600 border border-amber-100',
    'bg-rose-50 text-rose-600 border border-rose-100',
    'bg-indigo-50 text-indigo-600 border border-indigo-100',
  ];
  if (!name) return styles[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % styles.length;
  return styles[index];
};

/**
 * Formats ISO date string to a human-readable format.
 * @param {string} dateString - ISO format date.
 * @returns {string} Formatted date.
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

/**
 * LeadCard Component
 * Displays a detailed card visualization of a lead, optimized for mobile stacked views.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.lead - The lead data object.
 * @param {Function} props.onEdit - Callback function invoked on edit click.
 * @param {Function} props.onDelete - Callback function invoked on delete click.
 * @returns {React.JSX.Element} The rendered LeadCard component.
 */
export default function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-4">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getAvatarStyle(lead.name)}`}>
            {getInitials(lead.name)}
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 leading-snug truncate max-w-[150px]" title={lead.name}>
              {lead.name}
            </h4>
            <p className="text-xs text-slate-500 font-medium truncate max-w-[150px]" title={lead.company}>
              {lead.company}
            </p>
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      {/* Details List */}
      <div className="flex flex-col gap-2 text-xs text-slate-600 border-t border-slate-50 pt-3">
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {lead.email ? (
            <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors truncate" title={lead.email}>
              {lead.email}
            </a>
          ) : (
            <span className="text-slate-400 italic">No email provided</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {lead.phone ? (
            <span className="truncate" title={lead.phone}>{lead.phone}</span>
          ) : (
            <span className="text-slate-400 italic">No phone provided</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-medium">Source: <span className="text-slate-900 font-semibold">{lead.source || 'N/A'}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400">Added: {formatDate(lead.dateAdded)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 border-t border-slate-50 pt-3 mt-auto">
        <button
          onClick={() => onEdit(lead)}
          className="flex items-center justify-center p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label={`Edit lead ${lead.name}`}
          title="Edit Lead"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(lead.id)}
          className="flex items-center justify-center p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/20"
          aria-label={`Delete lead ${lead.name}`}
          title="Delete Lead"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

LeadCard.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    status: PropTypes.string.isRequired,
    source: PropTypes.string,
    dateAdded: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
