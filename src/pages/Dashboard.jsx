import { useState } from 'react';
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
 * Initial sample leads database.
 * Real data integration will be performed in Phase 8.
 * @type {Lead[]}
 */
const INITIAL_SAMPLE_LEADS = [
  { id: 1, name: 'Alice Johnson', company: 'Acme Corp', status: 'Won', dateAdded: '2026-06-15T10:00:00Z', value: 12000 },
  { id: 2, name: 'Bob Smith', company: 'Initech', status: 'Proposal', dateAdded: '2026-06-14T14:30:00Z', value: 8500 },
  { id: 3, name: 'Charlie Brown', company: 'Snoopy Inc', status: 'Contacted', dateAdded: '2026-06-12T09:15:00Z', value: 4500 },
  { id: 4, name: 'Diana Prince', company: 'Wayne Enterprises', status: 'New', dateAdded: '2026-06-15T16:45:00Z', value: 15000 },
  { id: 5, name: 'Evan Wright', company: 'Stark Industries', status: 'Qualified', dateAdded: '2026-06-11T11:20:00Z', value: 22000 },
  { id: 6, name: 'Fiona Gallagher', company: 'Patsy\'s Pies', status: 'Lost', dateAdded: '2026-06-08T08:00:00Z', value: 3000 },
  { id: 7, name: 'George Costanza', company: 'Vandelay Industries', status: 'Contacted', dateAdded: '2026-06-13T17:10:00Z', value: 6000 },
  { id: 8, name: 'Hannah Abbott', company: 'Leaky Cauldron', status: 'Won', dateAdded: '2026-06-05T13:40:00Z', value: 9500 },
  { id: 9, name: 'Ian Malcolm', company: 'Jurassic Park', status: 'Proposal', dateAdded: '2026-06-10T15:30:00Z', value: 35000 },
  { id: 10, name: 'Julia Roberts', company: 'Pretty Woman Ltd', status: 'New', dateAdded: '2026-06-16T02:00:00Z', value: 11000 },
];

/**
 * Dashboard Component
 * Assembles and displays the primary user dashboard for Startup CRM Lite.
 * Shows high-level statistics, pipeline stage distribution, a list of recent leads,
 * and quick-action shortcuts in a fully responsive layout.
 *
 * @returns {React.JSX.Element} The rendered Dashboard page.
 */
export default function Dashboard() {
  const [leads, setLeads] = useState(INITIAL_SAMPLE_LEADS);

  // Dynamic calculations for Stats Cards
  const totalLeads = leads.length;
  
  // Pipeline Value (Sum of all active, non-lost leads value)
  const totalValue = leads
    .filter(lead => lead.status !== 'Lost')
    .reduce((sum, lead) => sum + lead.value, 0);

  // Won Deals count
  const wonCount = leads.filter(lead => lead.status === 'Won').length;

  // Lost Deals count
  const lostCount = leads.filter(lead => lead.status === 'Lost').length;

  // Conversion rate (Percentage of Won deals relative to total leads)
  const conversionRate = totalLeads > 0 ? ((wonCount / totalLeads) * 100).toFixed(1) : '0.0';

  // Format monetary value
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(totalValue);

  // Get current date string
  const currentDateString = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Action Callbacks
  const handleAddLead = () => {
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
  };

  const handleViewAllLeads = () => {
    toast(`Redirecting to Leads Management...`, {
      icon: '👁️',
      style: {
        borderRadius: '12px',
        background: '#334155',
        color: '#fff',
        fontSize: '14px',
      },
    });
  };

  const handleExportData = () => {
    toast.success(`Exporting ${leads.length} leads as CSV...`, {
      icon: '📥',
      style: {
        borderRadius: '12px',
        background: '#334155',
        color: '#fff',
        fontSize: '14px',
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Toast Notification Provider */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Welcome back! Here is a summary of your sales funnel and recent pipeline activity.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-white border border-slate-200/80 rounded-xl px-4 py-2 shadow-xs transition-all duration-300">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-slate-600">
              {currentDateString}
            </span>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Bottom Details Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PipelineOverview leads={leads} />
            <RecentLeads leads={leads} />
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1">
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
