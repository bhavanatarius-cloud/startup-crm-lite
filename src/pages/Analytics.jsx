import { useState } from 'react';
import { useLeads } from '../context/LeadContext';
import useAnalytics from '../hooks/useAnalytics';

// Layout helpers
import AnalyticsFilters  from '../components/analytics/AnalyticsFilters';
import LoadingSkeleton   from '../components/analytics/LoadingSkeleton';

// KPI row
import StatsCards        from '../components/analytics/StatsCards';

// Chart cards
import PieChartCard      from '../components/analytics/PieChartCard';
import BarChartCard      from '../components/analytics/BarChartCard';
import LineChartCard     from '../components/analytics/LineChartCard';
import RevenueChartCard  from '../components/analytics/RevenueChartCard';
import FunnelChartCard   from '../components/analytics/FunnelChartCard';
import LeadSourceChart   from '../components/analytics/LeadSourceChart';

// Insight cards
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard      from '../components/analytics/ForecastCard';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import ActivityHeatmap   from '../components/analytics/ActivityHeatmap';

/**
 * Analytics Page
 *
 * Assembles the full analytics dashboard by:
 *  1. Reading leads from LeadContext
 *  2. Deriving all metrics via useAnalytics (with date-range filter)
 *  3. Rendering a responsive multi-section grid layout
 *
 * @returns {React.JSX.Element}
 */
export default function Analytics() {
  // Active date-range filter: '7d' | '30d' | '90d' | 'all'
  const [range, setRange] = useState('30d');

  // Pull global leads array
  const { leads } = useLeads();

  // Derive all metrics (memoized inside the hook)
  const {
    filteredLeads,
    totalLeads,
    wonRevenue,
    pipelineValue,
    conversionRate,
    avgSalesCycle,
    lostRate,
    salesVelocity,
    forecastRevenue,
    statusDistribution,
    monthlyLeads,
    conversionByMonth,
    revenueByMonth,
    leadSourceStats,
    funnelData,
    topPerformers,
    activityHeatmap,
  } = useAnalytics(leads, range);

  // Show skeleton while leads array is literally null (initial hydration edge case)
  if (leads === null) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 space-y-4 sm:space-y-6 md:space-y-8">

        {/* â”€â”€ 0. Header + Filters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <AnalyticsFilters range={range} onChange={setRange} />

        {/* â”€â”€ 1. KPI Stats Row (6 cards) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section aria-label="Key performance indicators">
          <StatsCards
            totalLeads={totalLeads}
            wonRevenue={wonRevenue}
            pipelineValue={pipelineValue}
            conversionRate={conversionRate}
            avgSalesCycle={avgSalesCycle}
            lostRate={lostRate}
          />
        </section>

        {/* â”€â”€ 2. Primary Charts Row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section
          aria-label="Primary analytics charts"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <PieChartCard    data={statusDistribution} />
          <BarChartCard    data={monthlyLeads} />
          <LineChartCard   data={conversionByMonth} />
        </section>

        {/* â”€â”€ 3. Revenue + Funnel Row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section
          aria-label="Revenue and funnel charts"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <RevenueChartCard data={revenueByMonth} />
          <FunnelChartCard  data={funnelData} />
        </section>

        {/* â”€â”€ 4. Insight Cards Row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section
          aria-label="Sales intelligence cards"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <SalesVelocityCard
            salesVelocity={salesVelocity}
            totalLeads={totalLeads}
            conversionRate={conversionRate}
            avgSalesCycle={avgSalesCycle}
          />
          <ForecastCard forecastRevenue={forecastRevenue} />
          <LeadSourceChart  data={leadSourceStats} />
        </section>

        {/* â”€â”€ 5. Bottom Row: Top Performers + Activity Heatmap â”€â”€ */}
        <section
          aria-label="Performance leaderboard and activity heatmap"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <TopPerformersCard data={topPerformers} />
          <ActivityHeatmap   data={activityHeatmap} />
        </section>

        {/* â”€â”€ Footer note â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 pb-4">
          Showing data for{' '}
          <span className="font-semibold text-slate-600 dark:text-slate-350">{filteredLeads.length}</span>{' '}
          lead{filteredLeads.length !== 1 ? 's' : ''} in the selected period.
          {leads.length !== filteredLeads.length && (
            <> &nbsp;Â·&nbsp; {leads.length} total in CRM.</>
          )}
        </p>

      </div>
    </div>
  );
}
