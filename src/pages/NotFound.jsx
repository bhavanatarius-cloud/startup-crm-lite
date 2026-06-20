import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

/**
 * NotFound Component
 * Standard 404 error page displayed when a user navigates to an undefined route.
 * Renders a stylized card with dynamic hover states, a spinning compass SVG,
 * and a primary back-to-dashboard home button.
 *
 * @returns {React.JSX.Element} The rendered 404 error view.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans antialiased text-slate-800">
      <div className="bg-white max-w-md w-full rounded-2xl border border-slate-100 shadow-lg p-8 flex flex-col items-center text-center gap-6 transition-all hover:shadow-xl duration-300">
        
        {/* Animated Compass Icon Container */}
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shadow-inner relative overflow-hidden group">
          <Compass className="w-8 h-8 animate-[spin_10s_linear_infinite] group-hover:scale-115 transition-transform duration-300" />
          <div className="absolute inset-0 bg-red-500/5 rounded-full scale-75 animate-ping" />
        </div>

        {/* 404 Typography Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            404
          </h1>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Lost in Space?
          </h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed mt-1">
            We couldn't find the page you were looking for. The route might have been renamed, moved, or deleted.
          </p>
        </div>

        {/* Navigational Redirect Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full mt-2"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          Return to Dashboard
        </Link>

        {/* Support Help Text */}
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
          CRM LITE â€¢ CLIENT PORTAL
        </span>
      </div>
    </div>
  );
}
