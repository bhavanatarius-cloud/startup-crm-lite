import { memo } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * DarkModeToggle Component
 *
 * Animated pill-style toggle switch with Sun/Moon icons.
 * Reads and updates theme state from ThemeContext.
 *
 * @returns {React.JSX.Element}
 */
const DarkModeToggle = memo(() => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      id="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer shrink-0 ${
        isDarkMode ? 'bg-blue-600' : 'bg-slate-200'
      }`}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 w-4 h-4 flex items-center justify-center">
        <Sun className={`w-3 h-3 transition-opacity duration-200 ${isDarkMode ? 'opacity-0' : 'opacity-100 text-amber-500'}`} />
      </span>
      <span className="absolute right-1.5 w-4 h-4 flex items-center justify-center">
        <Moon className={`w-3 h-3 transition-opacity duration-200 ${isDarkMode ? 'opacity-100 text-blue-200' : 'opacity-0'}`} />
      </span>

      {/* Sliding knob */}
      <span
        className={`absolute w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
          isDarkMode ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
});

DarkModeToggle.displayName = 'DarkModeToggle';

export default DarkModeToggle;
