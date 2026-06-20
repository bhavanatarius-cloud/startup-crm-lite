/**
 * PipelineOverview Component â€” with full dark mode support.
 */
const STATUS_CONFIGS = {
  New:       { label: 'New',       bgClass: 'bg-blue-600',   dotClass: 'bg-blue-600'   },
  Contacted: { label: 'Contacted', bgClass: 'bg-amber-500',  dotClass: 'bg-amber-500'  },
  Qualified: { label: 'Qualified', bgClass: 'bg-indigo-500', dotClass: 'bg-indigo-500' },
  Proposal:  { label: 'Proposal',  bgClass: 'bg-purple-500', dotClass: 'bg-purple-500' },
  Won:       { label: 'Won',       bgClass: 'bg-green-500',  dotClass: 'bg-green-500'  },
  Lost:      { label: 'Lost',      bgClass: 'bg-red-500',    dotClass: 'bg-red-500'    },
};

export default function PipelineOverview({ leads = [] }) {
  const totalLeads = leads.length;
  const counts = {};
  leads.forEach((lead) => {
    if (!lead || !lead.status) return;
    const raw = lead.status.trim();
    const norm = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    counts[norm] = (counts[norm] || 0) + 1;
  });

  const stages = [];
  const seen = new Set();
  Object.entries(STATUS_CONFIGS).forEach(([key, config]) => {
    const count = counts[key] || 0;
    const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
    stages.push({ key, label: config.label, bgClass: config.bgClass, dotClass: config.dotClass, count, percentage });
    seen.add(key);
  });
  Object.keys(counts).forEach((key) => {
    if (!seen.has(key)) {
      const count = counts[key];
      const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
      stages.push({ key, label: key, bgClass: 'bg-slate-400', dotClass: 'bg-slate-400', count, percentage });
    }
  });

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between h-full transition-colors duration-200">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pipeline Overview</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Distribution of leads across sales stages</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 text-slate-600 dark:text-slate-300">
            Total Leads: {totalLeads}
          </span>
        </div>

        {/* Stacked progress bar */}
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full flex overflow-hidden my-6">
          {totalLeads > 0 ? (
            stages.filter((s) => s.count > 0).map((stage) => (
              <div
                key={stage.key}
                style={{ width: `${stage.percentage}%` }}
                className={`${stage.bgClass} h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
                title={`${stage.label}: ${stage.count} (${stage.percentage.toFixed(1)}%)`}
              />
            ))
          ) : (
            <div className="w-full bg-slate-200 dark:bg-slate-600 h-full rounded-full flex items-center justify-center">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                No Leads in Pipeline
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 pt-2">
        {stages.map((stage) => (
          <div
            key={stage.key}
            className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-700/40 border border-slate-100/50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-100 dark:hover:border-slate-600 transition-all duration-200"
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${stage.dotClass}`} />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate" title={stage.label}>
                {stage.label}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-slate-900 dark:text-white">{stage.count}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                ({stage.percentage.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
