import { memo } from 'react';

/**
 * SkeletonBlock
 * A single animated shimmer block.
 *
 * @param {string} className - Tailwind sizing/shaping classes.
 */
const SkeletonBlock = memo(({ className = '' }) => (
  <div
    className={`bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite] rounded-xl ${className}`}
  />
));
SkeletonBlock.displayName = 'SkeletonBlock';

/**
 * StatCardSkeleton
 * Mimics the layout of a StatsCard while data is loading.
 */
export const StatCardSkeleton = memo(() => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-5 flex items-center gap-4">
    <SkeletonBlock className="w-12 h-12 rounded-xl shrink-0" />
    <div className="flex-1 space-y-2">
      <SkeletonBlock className="h-3 w-24" />
      <SkeletonBlock className="h-7 w-32" />
      <SkeletonBlock className="h-3 w-20" />
    </div>
  </div>
));
StatCardSkeleton.displayName = 'StatCardSkeleton';

/**
 * ChartCardSkeleton
 * Mimics the layout of a chart card while data is loading.
 *
 * @param {string} height - Tailwind height class for the chart area (default: h-60).
 */
export const ChartCardSkeleton = memo(({ height = 'h-60' }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
    <div className="space-y-3 mb-5">
      <SkeletonBlock className="h-4 w-40" />
      <SkeletonBlock className="h-3 w-56" />
    </div>
    <SkeletonBlock className={`w-full ${height} rounded-xl`} />
  </div>
));
ChartCardSkeleton.displayName = 'ChartCardSkeleton';

/**
 * LoadingSkeleton
 * Full-page skeleton matching the Analytics page grid layout.
 *
 * @returns {React.JSX.Element} Full skeleton layout.
 */
const LoadingSkeleton = memo(() => (
  <div className="space-y-6">
    {/* Stats Row */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Charts Row 1 */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ChartCardSkeleton height="h-64" />
      <ChartCardSkeleton height="h-64" />
      <ChartCardSkeleton height="h-64" />
    </div>

    {/* Charts Row 2 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCardSkeleton height="h-56" />
      <ChartCardSkeleton height="h-56" />
    </div>

    {/* Charts Row 3 */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ChartCardSkeleton height="h-48" />
      <ChartCardSkeleton height="h-48" />
      <ChartCardSkeleton height="h-48" />
    </div>
  </div>
));
LoadingSkeleton.displayName = 'LoadingSkeleton';

export default LoadingSkeleton;
