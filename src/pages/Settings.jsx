import { useState } from 'react';
import {
  User, Palette, Bell, Shield, Settings2,
  ChevronRight,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Import subcomponents
import ProfileSection from '../components/settings/ProfileSection';
import ThemeSection from '../components/settings/ThemeSection';
import NotificationsSection from '../components/settings/NotificationsSection';
import SecuritySection from '../components/settings/SecuritySection';
import AccountSection from '../components/settings/AccountSection';

/* â”€â”€â”€ Tab configuration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const TABS = [
  { id: 'profile',       label: 'Profile',       icon: User,     desc: 'Personal information'  },
  { id: 'theme',         label: 'Theme',          icon: Palette,  desc: 'Appearance settings'   },
  { id: 'notifications', label: 'Notifications',  icon: Bell,     desc: 'Alert preferences'     },
  { id: 'security',      label: 'Security',       icon: Shield,   desc: 'Password & 2FA'        },
  { id: 'account',       label: 'Account',        icon: Settings2, desc: 'Manage account'       },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = (msg) => {
    toast.success(msg, {
      style: { borderRadius: '12px', background: '#334155', color: '#fff', fontSize: '14px' },
    });
  };

  const activeTabData = TABS.find((t) => t.id === activeTab);

  const renderSection = () => {
    switch (activeTab) {
      case 'profile':       return <ProfileSection       onSave={handleSave} />;
      case 'theme':         return <ThemeSection         onSave={handleSave} />;
      case 'notifications': return <NotificationsSection onSave={handleSave} />;
      case 'security':      return <SecuritySection      onSave={handleSave} />;
      case 'account':       return <AccountSection       onSave={handleSave} />;
      default:              return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans antialiased transition-colors duration-200">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* â”€â”€ Page Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Manage your profile, appearance, notifications, and account preferences.
          </p>
        </header>

        {/* â”€â”€ Layout: sidebar + content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Sidebar tab list */}
          <nav
            className="w-full lg:w-60 shrink-0"
            aria-label="Settings navigation"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`settings-tab-${tab.id}`}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-150 cursor-pointer border-l-2 ${
                      active
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                        : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg transition-colors duration-150 ${
                        active
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-bold truncate ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {tab.label}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{tab.desc}</p>
                    </div>
                    {active && <ChevronRight className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Main content panel */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              {/* Panel header */}
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  {activeTabData && (
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                      <activeTabData.icon className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                      {activeTabData?.label}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activeTabData?.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel body */}
              <div className="p-6">
                {renderSection()}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
