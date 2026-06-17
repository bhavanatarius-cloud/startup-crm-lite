
/**
 * @typedef {Object} Lead
 * @property {string|number} id - Unique identifier for the lead.
 * @property {string} name - Name of the lead.
 * @property {string} company - Company name.
 * @property {string} status - Current pipeline status of the lead.
 * @property {string} dateAdded - ISO format date string when the lead was added.
 */

/**
 * @typedef {Object} RecentLeadsProps
 * @property {Lead[]} leads - The list of all active leads.
 */

/**
 * Maps lead status to modern, colorful Tailwind classes for the status badges.
 * @param {string} status - The lead status.
 * @returns {string} Tailwind CSS class string.
 */
const getStatusBadgeStyle = (status) => {
  if (!status) return 'bg-slate-50 text-slate-700 border-slate-100';
  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case 'new':
      return 'bg-blue-50/80 text-blue-700 border border-blue-100';
    case 'contacted':
      return 'bg-amber-50/80 text-amber-700 border border-amber-100';
    case 'qualified':
      return 'bg-indigo-50/80 text-indigo-700 border border-indigo-100';
    case 'proposal':
      return 'bg-purple-50/80 text-purple-700 border border-purple-100';
    case 'won':
      return 'bg-green-50/80 text-green-700 border border-green-100';
    case 'lost':
      return 'bg-red-50/80 text-red-700 border border-red-100';
    default:
      return 'bg-slate-50/80 text-slate-700 border border-slate-100';
  }
};

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
 * @returns {string} Formatted date (e.g. "Jun 16, 2026").
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
 * RecentLeads Component
 * Retrieves, sorts, and renders the latest 5 leads in an elegant table layout.
 *
 * @param {RecentLeadsProps} props - The component props.
 * @returns {React.JSX.Element} The rendered RecentLeads component.
 */
export default function RecentLeads({ leads = [] }) {
  // Sort leads by date added in descending order and slice the top 5
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Leads</h3>
            <p className="text-xs text-slate-500">The latest additions to your pipeline</p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-50 text-slate-400">
            Last 5
          </span>
        </div>

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle px-6">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-slate-100">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Date Added
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentLeads.length > 0 ? (
                    recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                        <td className="py-3 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getAvatarStyle(lead.name)}`}>
                              {getInitials(lead.name)}
                            </div>
                            <span className="text-sm font-semibold text-slate-900">
                              {lead.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 whitespace-nowrap text-sm text-slate-600">
                          {lead.company}
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeStyle(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3 whitespace-nowrap text-sm text-slate-500">
                          {formatDate(lead.dateAdded)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-sm text-slate-400">
                        No recent leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
