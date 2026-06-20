import { useState } from 'react';
import PropTypes from 'prop-types';
import { Trash2 } from 'lucide-react';
import { FIELD_CLASS, LABEL_CLASS } from '../../constants';

export default function AccountSection({ onSave }) {
  const [deleteInput, setDeleteInput] = useState('');

  return (
    <div className="space-y-6">
      {/* Current plan */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-white shadow-lg shadow-blue-600/20">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-200">Current Plan</p>
            <h3 className="text-xl font-extrabold mt-0.5">Startup Lite</h3>
            <p className="text-sm text-blue-200 mt-1">Free forever Â· 250 leads Â· 1 user seat</p>
          </div>
          <span className="text-4xl" role="img" aria-label="Rocket ship">ðŸš€</span>
        </div>
        <button
          type="button"
          className="mt-4 px-4 py-2 text-sm font-bold bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          onClick={() => onSave('Redirecting to upgrade page...')}
        >
          Upgrade to Pro â†’
        </button>
      </div>

      {/* Data export */}
      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Export Your Data</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
          Download all your CRM data including leads, analytics, and settings.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onSave("Lead data export started â€” you'll receive an email shortly!")}
            className="px-4 py-2 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            ðŸ“¥ Export All Leads (CSV)
          </button>
          <button
            type="button"
            onClick={() => onSave('Analytics report export queued!')}
            className="px-4 py-2 text-sm font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 hover:bg-violet-100 dark:hover:bg-violet-900/50 rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          >
            ðŸ“Š Export Analytics (PDF)
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border-2 border-red-200 dark:border-red-900/60 p-5">
        <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">âš ï¸ Danger Zone</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
          Deleting your account is permanent and irreversible. All leads, analytics data, and
          settings will be erased and cannot be recovered.
        </p>
        <div className="space-y-3">
          <div>
            <label htmlFor="account-delete-confirm" className={LABEL_CLASS}>
              Type <span className="text-red-500 font-mono normal-case tracking-normal">DELETE</span> to enable the button
            </label>
            <input
              id="account-delete-confirm"
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder="Type DELETE to confirm"
              className={`${FIELD_CLASS} w-full sm:w-72`}
            />
          </div>
          <button
            type="button"
            disabled={deleteInput !== 'DELETE'}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

AccountSection.propTypes = {
  onSave: PropTypes.func.isRequired,
};
