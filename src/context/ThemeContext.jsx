/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * ThemeContext Context
 * Central context instance governing active layout theme state (Light / Dark).
 */
const ThemeContext = createContext(null);

/**
 * ThemeProvider Component
 * Supplies dark mode preference states and theme togglers persisted in localStorage.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child elements that consume this context.
 * @returns {React.JSX.Element} The context provider rendering children.
 */
export function ThemeProvider({ children }) {
  /**
   * Resolver function for the initial dark mode value.
   * Priority order:
   *   1. Saved localStorage preference ('startup-crm-theme')  â€” handled inside useLocalStorage
   *   2. OS / browser system preference via prefers-color-scheme
   *   3. Default: light mode (false)
   *
   * This resolver is only called when localStorage has no saved key yet,
   * ensuring the initial React state always matches the anti-FOUC script in index.html.
   */
  const systemPrefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', systemPrefersDark);

  // Side-effect hook that synchronizes document DOM indicators when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle active dark mode theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom Hook: useTheme
 * Reusable React Hook to retrieve current dark mode theme settings and togglers.
 *
 * @returns {{ isDarkMode: boolean, toggleTheme: Function }} Active ThemeContext values.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return context;
}
