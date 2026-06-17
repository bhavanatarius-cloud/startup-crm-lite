import { Plus, Eye, Download } from 'lucide-react';

/**
 * @typedef {Object} QuickActionsProps
 * @property {function} [onAddLead] - Callback function invoked when the "Add New Lead" button is clicked.
 * @property {function} [onViewAllLeads] - Callback function invoked when the "View All Leads" button is clicked.
 * @property {function} [onExportData] - Callback function invoked when the "Export Data" button is clicked.
 */

/**
 * QuickActions Component
 * Provides a clean panel of shortcut buttons for executing primary actions in the CRM.
 * Each button features rich animations (hover scale, active shrink) and clean Lucide iconography.
 *
 * @param {QuickActionsProps} props - The component props.
 * @returns {React.JSX.Element} The rendered QuickActions component.
 */
export default function QuickActions({ onAddLead, onViewAllLeads, onExportData }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
        <p className="text-xs text-slate-500 mb-5">Commonly used workspace tools</p>

        <div className="flex flex-col gap-3">
          {/* Add New Lead Button */}
          <button
            onClick={onAddLead}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add New Lead
          </button>

          {/* View All Leads Button */}
          <button
            onClick={onViewAllLeads}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-200 shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500/10"
          >
            <Eye className="w-4 h-4 stroke-[2]" />
            View All Leads
          </button>

          {/* Export Data Button */}
          <button
            onClick={onExportData}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100 hover:text-slate-700 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500/10"
          >
            <Download className="w-4 h-4 stroke-[2]" />
            Export Data
          </button>
        </div>
      </div>

      {/* Premium Tip Container */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50/60 border border-slate-100">
        <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
          Pro CRM Tip
        </span>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Keep your pipeline up-to-date by moving leads to their corresponding stage weekly.
        </p>
      </div>
    </div>
  );
}
