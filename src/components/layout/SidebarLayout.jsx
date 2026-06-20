import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutGrid, Users, BarChart3, Menu, X, Activity, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * SidebarLayout Component
 *
 * Fully responsive navigation shell:
 *   â€¢ Mobile  (<768 px): Fixed bottom tab bar with icon-only nav + hamburger for full drawer
 *   â€¢ Tablet  (â‰¥768 px): Collapsible left sidebar with icons + text labels
 *   â€¢ Desktop (â‰¥1024 px): Wider sidebar with full navigation + sub-labels
 *
 * @returns {React.JSX.Element}
 */
export default function SidebarLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileOpen(false);
  }, [location]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  /* â”€â”€ Nav item definitions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const navItems = [
    { to: '/',          label: 'Dashboard',       subLabel: 'Overview & metrics',    shortLabel: 'Home',   icon: LayoutGrid, end: true  },
    { to: '/leads',     label: 'Lead Management', subLabel: 'Manage prospects',      shortLabel: 'Leads',  icon: Users,      end: false },
    { to: '/analytics', label: 'Analytics',       subLabel: 'Data insights',         shortLabel: 'Stats',  icon: BarChart3,  end: false },
    { to: '/settings',  label: 'Settings',        subLabel: 'App preferences',       shortLabel: 'Settings', icon: Settings, end: false },
  ];

  /* â”€â”€ Desktop/Tablet sidebar link classes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const getSidebarLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 select-none cursor-pointer outline-none min-h-[44px] ${
      isActive
        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30'
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent'
    }`;

  /* â”€â”€ Mobile bottom-bar link classes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const getBottomNavClass = ({ isActive }) =>
    `flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer outline-none select-none min-w-[48px] min-h-[48px] px-3 py-2 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row font-sans antialiased text-slate-800 dark:text-slate-100 transition-colors duration-300">

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          1. TABLET + DESKTOP SIDEBAR (Tablet: md:w-56, Desktop: lg:w-72)
      â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <aside className="hidden md:flex md:w-56 lg:w-72 md:flex-col md:fixed md:inset-y-0 bg-white dark:bg-slate-950 border-r border-slate-100/80 dark:border-slate-800/80 shadow-xs z-30 justify-between p-4 lg:p-6 transition-all duration-300">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-2 py-4 mb-6 select-none">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-none uppercase truncate">
                CRM Lite
              </h2>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mt-0.5 inline-block">
                Startup Suite
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} end={item.end} className={getSidebarLinkClass}>
                  <Icon className="w-5 h-5 stroke-[2] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate leading-tight">{item.label}</span>
                    <span className="hidden lg:block text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5 leading-tight truncate">
                      {item.subLabel}
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar footer â€” user + theme toggle */}
        <div className="flex flex-col gap-4 border-t border-slate-100 dark:border-slate-800 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center font-extrabold text-sm border border-blue-200 dark:border-blue-900 select-none shadow-xs shrink-0">
              SC
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                Sarah Connor
              </h4>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate">
                Sales Director
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode
                ? <Sun className="w-4.5 h-4.5 text-amber-500 fill-amber-400" />
                : <Moon className="w-4.5 h-4.5" />
              }
            </button>
          </div>
        </div>
      </aside>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          2. MOBILE TOP HEADER (< md)
      â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="flex items-center justify-between h-14 px-4 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20 md:hidden shadow-xs transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 tracking-wider uppercase">
            CRM Lite
          </span>
        </div>
        <div className="flex items-center gap-1">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition-colors cursor-pointer outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode
              ? <Sun className="w-5 h-5 text-amber-500 fill-amber-400" />
              : <Moon className="w-5 h-5" />
            }
          </button>
          {/* Hamburger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition-colors cursor-pointer outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </header>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          3. MOBILE BOTTOM NAV BAR (< md)
             Fixed at bottom, icons only, 44px+ tap targets
      â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <nav
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-colors duration-300"
        aria-label="Bottom Navigation"
      >
        <div className="flex items-center justify-around px-4 py-2 safe-area-inset-bottom">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.to} 
                to={item.to} 
                end={item.end} 
                className={getBottomNavClass}
                title={item.label}
              >
                <Icon className="w-6 h-6 stroke-[2]" />
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          4. MOBILE SLIDE-OUT DRAWER (< md)
      â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {isMobileOpen && (
        <div className="relative z-50 md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-xs transform bg-white dark:bg-slate-950 p-6 shadow-2xl flex flex-col justify-between h-full border-l border-slate-100 dark:border-slate-800 transition-colors duration-300">
              <div>
                {/* Drawer header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase">
                      CRM Navigation
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer navigation links */}
                <nav className="flex flex-col gap-1.5" aria-label="Drawer Navigation">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink key={item.to} to={item.to} end={item.end} className={getSidebarLinkClass}>
                        <Icon className="w-4.5 h-4.5 stroke-[2]" />
                        {item.label}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer footer */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center font-extrabold text-xs shrink-0">
                    SC
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">Sarah Connor</h4>
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate">Sales Director</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode
                    ? <Sun className="w-4.5 h-4.5 text-amber-500 fill-amber-400" />
                    : <Moon className="w-4.5 h-4.5" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          5. MAIN CONTENT AREA
             pb-20 on mobile for bottom nav clearance
      â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <main className="flex-1 md:pl-56 lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
        <div className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
