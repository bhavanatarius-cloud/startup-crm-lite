/**
 * @typedef {Object} Lead
 * @property {string|number} id - Unique identifier for the lead.
 * @property {string} name - Name of the lead.
 * @property {string} company - Company name.
 * @property {string} status - Current pipeline status of the lead (e.g. "New", "Contacted", "Qualified", "Proposal", "Won", "Lost").
 * @property {string} dateAdded - ISO format date string when the lead was added.
 */

/**
 * @typedef {Object} PipelineOverviewProps
 * @property {Lead[]} leads - The list of all active leads.
 */

/**
 * Standard configurations for CRM lead stages.
 * Provides color mappings to maintain consistent branding.
 */
const STATUS_CONFIGS = {
  New: { label: 'New', colorClass: 'bg-blue-600Class', bgClass: 'bg-blue-600', dotClass: 'bg-blue-600', borderClass: 'border-blue-600' },
  Contacted: { label: 'Contacted', colorClass: 'bg-amber-500Class', bgClass: 'bg-amber-500', dotClass: 'bg-amber-500', borderClass: 'border-amber-500' },
  Qualified: { label: 'Qualified', colorClass: 'bg-indigo-500Class', bgClass: 'bg-indigo-500', dotClass: 'bg-indigo-500', borderClass: 'border-indigo-500' },
  Proposal: { label: 'Proposal', colorClass: 'bg-purple-500Class', bgClass: 'bg-purple-500', dotClass: 'bg-purple-500', borderClass: 'border-purple-500' },
  Won: { label: 'Won', colorClass: 'bg-green-500Class', bgClass: 'bg-green-500', dotClass: 'bg-green-500', borderClass: 'border-green-500' },
  Lost: { label: 'Lost', colorClass: 'bg-red-500Class', bgClass: 'bg-red-500', dotClass: 'bg-red-500', borderClass: 'border-red-500' },
};

/**
 * PipelineOverview Component
 * Analyzes the array of leads, aggregates counts per stage,
 * and renders a beautiful, segmented bar chart that represents the CRM pipeline.
 *
 * @param {PipelineOverviewProps} props - The component props.
 * @returns {React.JSX.Element} The rendered PipelineOverview component.
 */
export default function PipelineOverview({ leads = [] }) {
  const totalLeads = leads.length;

  // Aggregate frequencies
  const counts = {};
  leads.forEach((lead) => {
    if (!lead || !lead.status) return;
    const rawStatus = lead.status.trim();
    // Normalize status (Capitalized first letter, lowercase rest)
    const normalized = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();
    counts[normalized] = (counts[normalized] || 0) + 1;
  });

  // Build the list of stages to display, ensuring standard pipeline stages are always represented
  const stages = [];
  const processedKeys = new Set();

  // 1. Add predefined standard stages
  Object.entries(STATUS_CONFIGS).forEach(([key, config]) => {
    const count = counts[key] || 0;
    const percentage = totalLeads > 0 ? ((count / totalLeads) * 100) : 0;
    stages.push({
      key,
      label: config.label,
      bgClass: config.bgClass,
      dotClass: config.dotClass,
      count,
      percentage,
    });
    processedKeys.add(key);
  });

  // 2. Safely capture any custom stages present in the leads list that aren't in the standard schema
  Object.keys(counts).forEach((key) => {
    if (!processedKeys.has(key)) {
      const count = counts[key];
      const percentage = totalLeads > 0 ? ((count / totalLeads) * 100) : 0;
      stages.push({
        key,
        label: key,
        bgClass: 'bg-slate-400',
        dotClass: 'bg-slate-400',
        count,
        percentage,
      });
    }
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Pipeline Overview</h3>
            <p className="text-xs text-slate-500">Distribution of leads across sales stages</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-600">
            Total Leads: {totalLeads}
          </span>
        </div>

        {/* Horizontal Stacked Bar */}
        <div className="h-4 w-full bg-slate-100 rounded-full flex overflow-hidden my-6">
          {totalLeads > 0 ? (
            stages
              .filter((stage) => stage.count > 0)
              .map((stage) => (
                <div
                  key={stage.key}
                  style={{ width: `${stage.percentage}%` }}
                  className={`${stage.bgClass} h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
                  title={`${stage.label}: ${stage.count} (${stage.percentage.toFixed(1)}%)`}
                />
              ))
          ) : (
            <div className="w-full bg-slate-200 h-full rounded-full flex items-center justify-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                No Leads in Pipeline
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Legend / Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-2">
        {stages.map((stage) => (
          <div
            key={stage.key}
            className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-50/50 border border-slate-100/50 hover:bg-slate-50 hover:border-slate-100 transition-all duration-300"
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${stage.dotClass}`} />
              <span className="text-xs font-bold text-slate-700 truncate" title={stage.label}>
                {stage.label}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-slate-900">{stage.count}</span>
              <span className="text-[10px] text-slate-400 font-medium">
                ({stage.percentage.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
