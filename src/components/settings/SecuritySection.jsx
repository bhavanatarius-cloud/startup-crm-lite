import { useState } from 'react';
import PropTypes from 'prop-types';
import { Shield, EyeOff, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { FIELD_CLASS, LABEL_CLASS } from '../../constants';

export default function SecuritySection({ onSave }) {
  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow]         = useState({ current: false, new: false, confirm: false });
  const [twoFA, setTwoFA]       = useState(false);

  const SESSIONS = [
    { device: 'Chrome on Windows 11',  location: 'New York, US',       time: 'Active now',   current: true  },
    { device: 'Safari on iPhone 15',   location: 'Boston, US',         time: '2 hours ago',  current: false },
    { device: 'Firefox on macOS',      location: 'San Francisco, US',  time: '3 days ago',   current: false },
  ];

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passForm.current || !passForm.newPass || !passForm.confirm) return;
    if (passForm.newPass !== passForm.confirm) {
      toast.error('Passwords do not match.', { 
        style: { borderRadius: '12px', background: '#EF4444', color: '#fff', fontSize: '14px' } 
      });
      return;
    }
    setPassForm({ current: '', newPass: '', confirm: '' });
    onSave('Password updated successfully!');
  };

  const pwInput = (key, showKey, label) => (
    <div key={key}>
      <label htmlFor={`sec-${key}`} className={LABEL_CLASS}>{label}</label>
      <div className="relative">
        <input
          id={`sec-${key}`}
          type={show[showKey] ? 'text' : 'password'}
          value={passForm[key]}
          onChange={(e) => setPassForm((prev) => ({ ...prev, [key]: e.target.value }))}
          className={FIELD_CLASS}
          placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
        />
        <button
          type="button"
          onClick={() => setShow((prev) => ({ ...prev, [showKey]: !prev[showKey] }))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
          tabIndex={-1}
          aria-label={show[showKey] ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
        >
          {show[showKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Password change */}
      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Change Password</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Use a strong password â€” at least 8 characters with a mix of letters and numbers.</p>
        </div>
        <form onSubmit={handlePasswordSubmit} className="p-5 space-y-4">
          {pwInput('current', 'current', 'Current Password')}
          {pwInput('newPass', 'new',     'New Password')}
          {pwInput('confirm', 'confirm', 'Confirm New Password')}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <Shield className="w-4 h-4" />
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* 2FA */}
      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Two-Factor Authentication</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Add an extra layer of security using an authenticator app.
            </p>
            <span
              className={`inline-block mt-2 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                twoFA
                  ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              {twoFA ? 'âœ“ Enabled' : 'Disabled'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setTwoFA((v) => !v);
              onSave(twoFA ? '2FA has been disabled.' : '2FA is now enabled!');
            }}
            className={`shrink-0 px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              twoFA
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {twoFA ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      {/* Active sessions */}
      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Sessions</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Devices currently signed in to your account.</p>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
          {SESSIONS.map((s, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5 gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{s.device}</p>
                  {s.current && (
                    <span className="text-[10px] font-bold bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full">
                      This device
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {s.location} Â· {s.time}
                </p>
              </div>
              {!s.current && (
                <button
                  type="button"
                  className="shrink-0 text-xs font-bold text-red-500 hover:text-red-700 dark:hover:text-red-400 cursor-pointer transition-colors focus:outline-none"
                  onClick={() => onSave('Session revoked.')}
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

SecuritySection.propTypes = {
  onSave: PropTypes.func.isRequired,
};
