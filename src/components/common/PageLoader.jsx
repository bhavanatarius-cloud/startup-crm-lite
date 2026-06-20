import { Loader2 } from 'lucide-react';

/**
 * PageLoader Component
 * Centered fallback loader displayed when lazy-loaded page modules are being resolved.
 * Features a spinning Lucide loader and smooth, uppercase status text.
 *
 * @returns {React.JSX.Element} The rendered loading spinner interface.
 */
export default function PageLoader() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4 py-16 animate-fade-in"
      role="status"
      aria-label="Loading page content"
    >
      {/* Decorative spinning ring */}
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin stroke-[2]" />
        <div className="absolute w-12 h-12 rounded-full border-4 border-blue-500/10" />
      </div>

      {/* Loading status message */}
      <span className="text-slate-400 text-xs font-bold tracking-widest uppercase mt-2 select-none">
        Loading workspace...
      </span>
    </div>
  );
}
