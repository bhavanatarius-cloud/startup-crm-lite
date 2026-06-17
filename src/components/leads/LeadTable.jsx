import PropTypes from 'prop-types';
import { Mail, Phone, Pencil, Trash2, Calendar, Tag } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * Extracts initials from the lead's name.
 * @param {string} name - Full name of the lead.
 * @returns {string} The computed initials.
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
 * Generates an avatar style based on initials hash.
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
 * LeadTable Component
 * Renders lead records in a high-density, accessible table layout.
 *
 * @param {Object} props - The component props.
 * @param {Object[]} props.leads - The array of lead records.
 * @param {Function} props.onEdit - Callback function invoked on edit click.
 * @param {Function} props.onDelete - Callback function invoked on delete click.
 * @returns {React.JSX.Element} The rendered LeadTable component.
 */
export default function LeadTable({ leads, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                Source
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                Date Added
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 bg-white">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                  {/* Name column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarStyle(lead.name)}`}>
                        {getInitials(lead.name)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 leading-tight">
                          {lead.name}
                        </span>
                        {lead.phone && (
                          <span className="text-[10px] text-slate-400 font-medium md:hidden flex items-center gap-1 mt-0.5">
                            <Phone className="w-2.5 h-2.5" /> {lead.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  {/* Company column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                    {lead.company}
                  </td>
                  {/* Status column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={lead.status} />
                  </td>
                  {/* Email column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {lead.email}
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">No email</span>
                    )}
                  </td>
                  {/* Source column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {lead.source ? (
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                        {lead.source}
                      </span>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                  {/* Date Added column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(lead.dateAdded)}
                    </span>
                  </td>
                  {/* Actions column */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEdit(lead)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        aria-label={`Edit lead ${lead.name}`}
                        title="Edit Lead"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        aria-label={`Delete lead ${lead.name}`}
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-lg">📂</span>
                    <p className="font-semibold text-slate-500">No leads match the filters</p>
                    <p className="text-xs text-slate-400">Try adjusting your search query or status filter.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

LeadTable.propTypes = {
  leads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string,
      status: PropTypes.string.isRequired,
      source: PropTypes.string,
      dateAdded: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
