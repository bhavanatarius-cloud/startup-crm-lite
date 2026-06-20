import { useState } from 'react';
import PropTypes from 'prop-types';
import { Save } from 'lucide-react';

export default function NotificationsSection({ onSave }) {
  const [prefs, setPrefs] = useState({
    emailLeadCreated:   true,
    emailLeadUpdated:   true,
    emailDailyDigest:   false,
    emailWeeklyReport:  true,
    desktopNewLead:     true,
    desktopStatusChange:false,
    desktopTeamActivity:true,
    inAppWonDeal:       true,
    inAppLostDeal:      true,
    inAppReminders:     true,
  });

  const handleToggle = (key) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const GROUPS = [
    {
      title: 'Email Notifications',
      desc:  'Receive alerts in your inbox',
      emoji: 'ðŸ“§',
      items: [
        { key: 'emailLeadCreated',  label: 'New lead created',         desc: 'When a lead is added to the CRM'         },
        { key: 'emailLeadUpdated',  label: 'Lead status updated',      desc: 'When a lead moves through the pipeline'  },
        { key: 'emailDailyDigest',  label: 'Daily digest',             desc: 'Summary of daily CRM activity'           },
        { key: 'emailWeeklyReport', label: 'Weekly performance report', desc: 'Weekly sales metrics and insights'       },
      ],
    },
    {
      title: 'Desktop Alerts',
      desc:  'Browser push notifications',
      emoji: 'ðŸ–¥ï¸',
      items: [
        { key: 'desktopNewLead',      label: 'New lead alert',      desc: 'Pop-up when a lead is created'       },
        { key: 'desktopStatusChange', label: 'Status change alert', desc: 'Pop-up when a lead changes status'   },
        { key: 'desktopTeamActivity', label: 'Team activity',       desc: 'Notify about team member actions'    },
      ],
    },
    {
      title: 'In-App Notifications',
      desc:  'Alerts inside the CRM interface',
      emoji: 'ðŸ””',
      items: [
        { key: 'inAppWonDeal',   label: 'Won deal celebration', desc: 'Celebrate when a deal is closed-won'     },
        { key: 'inAppLostDeal',  label: 'Lost deal alert',      desc: 'Alert when a deal is marked as lost'     },
        { key: 'inAppReminders', label: 'Follow-up reminders',  desc: 'Remind about pending lead follow-ups'    },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {GROUPS.map((group) => (
        <div
          key={group.title}
          className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Group header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
            <span className="text-xl" role="img" aria-label={group.title}>{group.emoji}</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{group.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{group.desc}</p>
            </div>
          </div>

          {/* Toggle rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between px-5 py-3.5 gap-4">
                <div className="min-w-0">
                  <p id={`notif-label-${item.key}`} className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{item.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.desc}</p>
                </div>
                {/* Toggle switch */}
                <button
                  id={`notif-switch-${item.key}`}
                  type="button"
                  onClick={() => handleToggle(item.key)}
                  aria-checked={prefs[item.key]}
                  aria-labelledby={`notif-label-${item.key}`}
                  role="switch"
                  className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                    prefs[item.key] ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                      prefs[item.key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onSave('Notification preferences saved!')}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
      </div>
    </div>
  );
}

NotificationsSection.propTypes = {
  onSave: PropTypes.func.isRequired,
};
