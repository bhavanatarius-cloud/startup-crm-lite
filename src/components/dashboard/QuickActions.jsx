import { memo } from 'react';
import { Plus, Eye, Download } from 'lucide-react';

/**
 * QuickActions Component â€” with full dark mode support.
 */
function QuickActions({ onAddLead, onViewAllLeads, onExportData }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between h-full transition-colors duration-200">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Commonly used workspace tools</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onAddLead}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add New Lead
          </button>

          <button
            onClick={onViewAllLeads}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none"
          >
            <Eye className="w-4 h-4 stroke-[2]" />
            View All Leads
          </button>

          <button
            onClick={onExportData}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-100 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none"
          >
            <Download className="w-4 h-4 stroke-[2]" />
            Export Data
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-slate-50/60 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700">
        <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
          Pro CRM Tip
        </span>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Keep your pipeline up-to-date by moving leads to their corresponding stage weekly.
        </p>
      </div>
    </div>
  );
}

export default memo(QuickActions);
