import { useMemo, useCallback } from 'react';
import { useLeads } from '../context/LeadContext';
import { Users, DollarSign, Percent, XCircle, Calendar } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Import components
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';

/**
 * @typedef {Object} Lead
 * @property {string|number} id - Unique identifier for the lead.
 * @property {string} name - Name of the lead.
 * @property {string} company - Company name.
 * @property {string} status - Current pipeline status of the lead.
 * @property {string} dateAdded - ISO format date string when the lead was added.
 * @property {number} value - The estimated contract value of the lead.
 */

/**
 * Dashboard Component
 * Assembles and displays the primary user dashboard for Startup CRM Lite.
 * Shows high-level statistics, pipeline stage distribution, a list of recent leads,
 * and quick-action shortcuts in a fully responsive layout.
 *
 * @returns {React.JSX.Element} The rendered Dashboard page.
 */
export default function Dashboard() {
  const { leads, setLeads } = useLeads();

  // Dynamic calculations for Stats Cards
  const { totalLeads, totalValue, lostCount, conversionRate } = useMemo(() => {
    const total = leads.length;
    const value = leads
      .filter((lead) => lead && lead.status !== 'Lost')
      .reduce((sum, lead) => sum + lead.value, 0);
    const won = leads.filter((lead) => lead && lead.status === 'Won').length;
    const lost = leads.filter((lead) => lead && lead.status === 'Lost').length;
    
    return {
      totalLeads: total,
      totalValue: value,
      lostCount: lost,
      conversionRate: total > 0 ? ((won / total) * 100).toFixed(1) : '0.0',
    };
  }, [leads]);

  // Format monetary value
  const formattedValue = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(totalValue);
  }, [totalValue]);

  // Get current date string
  const currentDateString = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  // Action Callbacks
  const handleAddLead = useCallback(() => {
    // Generate a simple mock lead to show interactivity
    const mockLeadNames = [
      'Peter Parker (Web Slinger)',
      'Bruce Banner (Gamma Tech)',
      'Tony Stark (Stark Corp)',
      'Steve Rogers (Shield Co)',
      'Natasha Romanoff (Black Widow Inc)'
    ];
    const mockCompanies = ['Daily Bugle', 'S.H.I.E.L.D.', 'Stark Holdings', 'Avengers LLC', 'Red Room Corp'];
    const mockStatuses = ['New', 'Contacted', 'Qualified', 'Proposal'];
    
    const randomIdx = Math.floor(Math.random() * mockLeadNames.length);
    const randomStatusIdx = Math.floor(Math.random() * mockStatuses.length);
    
    const newLead = {
      id: Date.now(),
      name: mockLeadNames[randomIdx],
      company: mockCompanies[randomIdx],
      status: mockStatuses[randomStatusIdx],
      dateAdded: new Date().toISOString(),
      value: Math.floor(Math.random() * 20 + 5) * 1000 // $5,000 to $25,000
    };

    setLeads(prev => [newLead, ...prev]);
    toast.success(`Lead for "${newLead.name}" added successfully!`, {
      style: {
        borderRadius: '12px',
        background: '#334155',
        color: '#fff',
        fontSize: '14px',
      },
    });
  }, [setLeads]);

  const handleViewAllLeads = useCallback(() => {
    toast(`Redirecting to Leads Management...`, {
      icon: 'ðŸ‘ï¸',
      style: {
        borderRadius: '12px',
        background: '#334155',
        color: '#fff',
        fontSize: '14px',
      },
    });
  }, []);

  const handleExportData = useCallback(() => {
    toast.success(`Exporting ${leads.length} leads as CSV...`, {
      icon: 'ðŸ“¥',
      style: {
        borderRadius: '12px',
        background: '#334155',
        color: '#fff',
        fontSize: '14px',
      },
    });
  }, [leads.length]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans antialiased transition-colors duration-200">
      {/* Toast Notification Provider */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5 sm:mt-1">
              Welcome back! Here is a summary of your sales funnel and recent pipeline activity.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl px-3 sm:px-4 py-2 shadow-xs transition-all duration-300">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300">
              {currentDateString}
            </span>
          </div>
        </header>

        {/* Stats Grid â€” 1 col mobile, 2 col tablet, 4 col desktop */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
          <StatsCard
            title="Total Leads"
            value={totalLeads}
            icon={Users}
            change={15.4}
            color="primary"
          />
          <StatsCard
            title="Pipeline Value"
            value={formattedValue}
            icon={DollarSign}
            change={8.2}
            color="warning"
          />
          <StatsCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={Percent}
            change={5.3}
            color="success"
          />
          <StatsCard
            title="Lost Deals"
            value={lostCount}
            icon={XCircle}
            change={-10.0}
            color="danger"
          />
        </section>

        {/* Bottom Details Grid â€” stacked on mobile/tablet, 2 col on desktop */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
          <PipelineOverview leads={leads} />
          <RecentLeads leads={leads} />
          <div className="lg:col-span-2">
            <QuickActions
              onAddLead={handleAddLead}
              onViewAllLeads={handleViewAllLeads}
              onExportData={handleExportData}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
