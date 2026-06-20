import PropTypes from 'prop-types';
import { Check, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import DarkModeToggle from '../common/DarkModeToggle';

export default function ThemeSection({ onSave }) {
  const { isDarkMode, toggleTheme } = useTheme();

  const THEMES = [
    {
      id:    'light',
      label: 'Light Mode',
      desc:  'Clean white background with dark text',
      icon:  Sun,
      preview: 'bg-gradient-to-br from-slate-100 to-white',
      iconColor: 'text-amber-500',
    },
    {
      id:    'dark',
      label: 'Dark Mode',
      desc:  'Dark background with light text',
      icon:  Moon,
      preview: 'bg-gradient-to-br from-slate-800 to-slate-900',
      iconColor: 'text-blue-300',
    },
    {
      id:    'system',
      label: 'System Default',
      desc:  'Follows your OS / browser preference',
      icon:  Monitor,
      preview: 'bg-gradient-to-br from-blue-50 via-white to-slate-100',
      iconColor: 'text-blue-500',
    },
  ];

  const activeTheme = isDarkMode ? 'dark' : 'light';

  const handleSelect = (themeId) => {
    if (themeId === 'light' && isDarkMode)  toggleTheme();
    if (themeId === 'dark'  && !isDarkMode) toggleTheme();
    if (themeId === 'system') {
      const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (sysDark !== isDarkMode) toggleTheme();
    }
    onSave(`Switched to ${themeId === 'system' ? 'system default' : themeId + ' mode'}!`);
  };

  const ACCENT_COLORS = [
    { bg: 'bg-blue-500',   ring: 'ring-blue-500',   active: true  },
    { bg: 'bg-violet-500', ring: 'ring-violet-500',  active: false },
    { bg: 'bg-emerald-500',ring: 'ring-emerald-500', active: false },
    { bg: 'bg-rose-500',   ring: 'ring-rose-500',    active: false },
    { bg: 'bg-amber-500',  ring: 'ring-amber-500',   active: false },
    { bg: 'bg-cyan-500',   ring: 'ring-cyan-500',    active: false },
  ];

  return (
    <div className="space-y-8">
      {/* Theme cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Color Theme</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Choose how the CRM looks. Changes are instant and saved automatically.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {THEMES.map((theme) => {
            const Icon = theme.icon;
            const selected = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelect(theme.id)}
                className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                  selected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-slate-800/50'
                }`}
                aria-label={`Select ${theme.label}`}
              >
                {/* Preview swatch */}
                <div className={`w-full h-16 rounded-xl ${theme.preview} mb-3 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-600/30`}>
                  <Icon className={`w-6 h-6 ${selected ? theme.iconColor : 'text-slate-400'}`} />
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{theme.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{theme.desc}</p>
                {selected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick toggle pill */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">Quick Toggle</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Currently:{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </p>
        </div>
        <DarkModeToggle />
      </div>

      {/* Accent colour swatches */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Accent Colour</h3>
        <div className="flex items-center gap-3 flex-wrap">
          {ACCENT_COLORS.map((c, i) => (
            <button
              key={i}
              type="button"
              title={`Accent color option ${i + 1}`}
              aria-label={`Select accent color option ${i + 1}`}
              className={`w-8 h-8 rounded-full ${c.bg} cursor-pointer hover:scale-110 transition-transform duration-200 shadow-sm ${
                c.active ? `ring-2 ring-offset-2 ${c.ring} dark:ring-offset-slate-800` : ''
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          Accent color customization coming in the Pro version.
        </p>
      </div>
    </div>
  );
}

ThemeSection.propTypes = {
  onSave: PropTypes.func.isRequired,
};
