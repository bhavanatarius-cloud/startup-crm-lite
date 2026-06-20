/**
 * RecentLeads Component â€” with full dark mode support.
 */

const getStatusBadgeStyle = (status) => {
  if (!status) return 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-600';
  const n = status.trim().toLowerCase();
  switch (n) {
    case 'new':       return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40';
    case 'contacted': return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-900/40';
    case 'qualified': return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40';
    case 'proposal':  return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40';
    case 'won':       return 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-900/40';
    case 'lost':      return 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900/40';
    default:          return 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-600';
  }
};

const getInitials = (name) => {
  if (!name) return '?';
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
};

const getAvatarStyle = (name) => {
  const styles = [
    'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40',
    'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-300 border border-green-100 dark:border-green-900/40',
    'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40',
    'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-300 border border-amber-100 dark:border-amber-900/40',
    'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 border border-rose-100 dark:border-rose-900/40',
    'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40',
  ];
  if (!name) return styles[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return styles[Math.abs(hash) % styles.length];
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return dateString; }
};

export default function RecentLeads({ leads = [] }) {
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between h-full transition-colors duration-200">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Leads</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">The latest additions to your pipeline</p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-400">
            Last 5
          </span>
        </div>

        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <div className="inline-block min-w-full align-middle px-4 sm:px-6">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-700">
              <thead>
                <tr>
                  {['Name', 'Company', 'Status', 'Date Added'].map((h) => (
                    <th key={h} scope="col" className="py-3.5 text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {recentLeads.length > 0 ? (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors duration-150">
                      <td className="py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getAvatarStyle(lead.name)}`}>
                            {getInitials(lead.name)}
                          </div>
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{lead.name}</span>
                        </div>
                      </td>
                      <td className="py-3 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{lead.company}</td>
                      <td className="py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeStyle(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {formatDate(lead.dateAdded)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-sm text-slate-400 dark:text-slate-500">
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
  );
}
