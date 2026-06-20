import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import layout components
import SidebarLayout from '../components/layout/SidebarLayout';
import PageLoader from '../components/common/PageLoader';

/**
 * Lazy load application pages for code splitting and performance optimization.
 * Files are only downloaded when the corresponding route is requested.
 */
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads     = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Settings  = lazy(() => import('../pages/Settings'));
const NotFound  = lazy(() => import('../pages/NotFound'));


/**
 * AppRoutes Component
 * Sets up and maps route paths to their corresponding view components inside the SidebarLayout parent component.
 * Each lazy-loaded page route is individually wrapped in a <Suspense> boundary
 * to ensure that navigating between paths does not unmount or visual-flicker the main navigation panels.
 *
 * @returns {React.JSX.Element} The route matching table.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* 
        Parent route maps the common shell structure (sidebar + mobile headers).
        Children routes will be loaded in the <Outlet /> slot inside SidebarLayout.
      */}
      <Route path="/" element={<SidebarLayout />}>
        
        {/* Index route "/" mounts the sales dashboard dashboard homepage */}
        <Route 
          index 
          element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          } 
        />
        
        {/* Route "/leads" mounts the Lead Management database screen */}
        <Route 
          path="leads" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Leads />
            </Suspense>
          } 
        />
        
        {/* Route "/analytics" mounts the business intelligence overview */}
        <Route 
          path="analytics" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Analytics />
            </Suspense>
          } 
        />

        {/* Route "/settings" mounts the CRM Settings page */}
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <Settings />
            </Suspense>
          }
        />
        
        {/* Catch-all route "*" maps any unmatched URLs to the 404 NotFound page */}
        <Route 
          path="*" 
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          } 
        />
        
      </Route>
    </Routes>
  );
}
