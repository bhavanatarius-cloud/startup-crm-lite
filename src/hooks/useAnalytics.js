import { useMemo } from 'react';
import {
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueByMonth,
  getPipelineValue,
  getWonRevenue,
  getAverageSalesCycle,
  getLostRate,
  getLeadSourceStats,
  getFunnelData,
  getSalesVelocity,
  getForecastRevenue,
  getTopPerformers,
  getActivityHeatmapData,
} from '../utils/analyticsHelpers';

/**
 * useAnalytics Custom Hook
 *
 * Derives and memoizes all 14 analytics metrics from a leads array.
 * Accepts an optional `range` filter ('7d' | '30d' | '90d' | 'all') to
 * narrow down the lead set before computing metrics.
 *
 * @param {Array}  leads - Full leads array from LeadContext.
 * @param {string} range - Date range filter key.
 * @returns {Object} All computed analytics metrics.
 */
export default function useAnalytics(leads = [], range = '30d') {
  // 1. Filter leads by the selected time range
  const filteredLeads = useMemo(() => {
    if (!range || range === 'all') return leads;

    const daysMap = { '7d': 7, '30d': 30, '90d': 90 };
    const days = daysMap[range];
    if (!days) return leads;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return leads.filter((lead) => {
      if (!lead) return false;
      const dateStr = lead.createdAt || lead.dateAdded;
      if (!dateStr) return false;
      const d = new Date(dateStr);
      return !isNaN(d.getTime()) && d >= cutoff;
    });
  }, [leads, range]);

  // 2. Memoize each metric independently so only affected ones recompute
  const statusDistribution = useMemo(() => getStatusDistribution(filteredLeads), [filteredLeads]);
  const monthlyLeads      = useMemo(() => getMonthlyLeads(filteredLeads), [filteredLeads]);
  const conversionByMonth = useMemo(() => getConversionByMonth(filteredLeads), [filteredLeads]);
  const revenueByMonth    = useMemo(() => getRevenueByMonth(filteredLeads), [filteredLeads]);
  const pipelineValue     = useMemo(() => getPipelineValue(filteredLeads), [filteredLeads]);
  const wonRevenue        = useMemo(() => getWonRevenue(filteredLeads), [filteredLeads]);
  const avgSalesCycle     = useMemo(() => getAverageSalesCycle(filteredLeads), [filteredLeads]);
  const lostRate          = useMemo(() => getLostRate(filteredLeads), [filteredLeads]);
  const leadSourceStats   = useMemo(() => getLeadSourceStats(filteredLeads), [filteredLeads]);
  const funnelData        = useMemo(() => getFunnelData(filteredLeads), [filteredLeads]);
  const salesVelocity     = useMemo(() => getSalesVelocity(filteredLeads), [filteredLeads]);
  const forecastRevenue   = useMemo(() => getForecastRevenue(filteredLeads), [filteredLeads]);
  const topPerformers     = useMemo(() => getTopPerformers(filteredLeads), [filteredLeads]);
  const activityHeatmap   = useMemo(() => getActivityHeatmapData(leads), [leads]); // always full 30 days

  // 3. Derived summary scalars
  const totalLeads      = filteredLeads.length;
  const wonLeadsCount   = useMemo(
    () => filteredLeads.filter((l) => l && (l.status || '').toLowerCase().startsWith('won')).length,
    [filteredLeads]
  );
  const conversionRate  = totalLeads > 0 ? Math.round((wonLeadsCount / totalLeads) * 100) : 0;

  return {
    // raw filtered set
    filteredLeads,
    totalLeads,
    // scalar KPIs
    wonRevenue,
    pipelineValue,
    avgSalesCycle,
    lostRate,
    conversionRate,
    salesVelocity,
    forecastRevenue,
    // chart series
    statusDistribution,
    monthlyLeads,
    conversionByMonth,
    revenueByMonth,
    leadSourceStats,
    funnelData,
    topPerformers,
    activityHeatmap,
  };
}
