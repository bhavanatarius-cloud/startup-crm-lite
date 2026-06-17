import { useState, useEffect } from 'react';
import { Plus, LayoutGrid, Table, Search, Filter, X, Trash2, ShieldAlert } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Import custom components
import LeadForm from '../components/leads/LeadForm';
import LeadCard from '../components/leads/LeadCard';
import LeadTable from '../components/leads/LeadTable';

/**
 * @typedef {Object} Lead
 * @property {string|number} id - Unique identifier for the lead.
 * @property {string} name - Name of the lead.
 * @property {string} company - Company name.
 * @property {string} email - Email address.
 * @property {string} phone - Contact phone number.
 * @property {string} status - Pipeline stage status.
 * @property {string} source - Origin/source of the lead.
 * @property {string} dateAdded - ISO timestamp.
 */

/**
 * Mock leads data for initial state.
 * Real integration with database/backend occurs in Phase 8.
 * @type {Lead[]}
 */
const INITIAL_SAMPLE_LEADS = [
  {
    id: 1,
    name: 'Alice Johnson',
    company: 'Acme Corp',
    email: 'alice@acme.com',
    phone: '(555) 123-4567',
    status: 'Won',
    source: 'LinkedIn',
    dateAdded: '2026-06-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'Bob Smith',
    company: 'Initech',
    email: 'bob@initech.com',
    phone: '(555) 987-6543',
    status: 'Proposal Sent',
    source: 'Website',
    dateAdded: '2026-06-14T14:30:00Z',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    company: 'Snoopy Inc',
    email: 'charlie@snoopy.com',
    phone: '(555) 456-7890',
    status: 'Contacted',
    source: 'Referral',
    dateAdded: '2026-06-12T09:15:00Z',
  },
  {
    id: 4,
    name: 'Diana Prince',
    company: 'Wayne Enterprises',
    email: 'diana@wayne.com',
    phone: '(555) 234-5678',
    status: 'New',
    source: 'Cold Call',
    dateAdded: '2026-06-15T16:45:00Z',
  },
  {
    id: 5,
    name: 'Evan Wright',
    company: 'Stark Industries',
    email: 'evan@stark.com',
    phone: '(555) 876-5432',
    status: 'Meeting Scheduled',
    source: 'Email Campaign',
    dateAdded: '2026-06-11T11:20:00Z',
  },
  {
    id: 6,
    name: 'Fiona Gallagher',
    company: "Patsy's Pies",
    email: 'fiona@patsys.com',
    phone: '(555) 345-6789',
    status: 'Lost',
    source: 'Other',
    dateAdded: '2026-06-08T08:00:00Z',
  },
  {
    id: 7,
    name: 'George Costanza',
    company: 'Vandelay Industries',
    email: 'george@vandelay.com',
    phone: '(555) 765-4321',
    status: 'Contacted',
    source: 'Referral',
    dateAdded: '2026-06-13T17:10:00Z',
  },
];

/**
 * Leads Page Component
 * Oversees lead lookup, updates, creation, and deletion.
 * Houses filtering criteria, view mode configurations, and interactive dialogs.
 *
 * @returns {React.JSX.Element} The rendered Leads management page.
 */
export default function Leads() {
  const [leads, setLeads] = useState(INITIAL_SAMPLE_LEADS);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToDeleteId, setLeadToDeleteId] = useState(null);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  // Handle ESC key to close modal windows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter leads based on query, status, and source
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone && lead.phone.includes(searchQuery));
      
    const matchesStatus = statusFilter ? lead.status === statusFilter : true;
    const matchesSource = sourceFilter ? lead.source === sourceFilter : true;

    return matchesSearch && matchesStatus && matchesSource;
  });

  // Open modal for Creating new lead
  const handleOpenAddModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  // Open modal for Editing existing lead
  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  // Open confirmation modal for deleting lead
  const handleOpenDeleteConfirm = (leadId) => {
    setLeadToDeleteId(leadId);
    setIsDeleteModalOpen(true);
  };

  // Handle Form Submission (Create or Update)
  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      // Update Mode
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id
            ? { ...lead, ...formData }
            : lead
        )
      );
      toast.success(`Lead for "${formData.name}" updated successfully!`, {
        style: {
          borderRadius: '12px',
          background: '#22C55E',
          color: '#fff',
          fontSize: '14px',
        },
      });
    } else {
      // Create Mode
      const newLead = {
        id: Date.now(),
        ...formData,
        dateAdded: new Date().toISOString(),
      };
      setLeads((prev) => [newLead, ...prev]);
      toast.success(`Lead for "${formData.name}" created successfully!`, {
        style: {
          borderRadius: '12px',
          background: '#22C55E',
          color: '#fff',
          fontSize: '14px',
        },
      });
    }
    setIsModalOpen(false);
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = () => {
    const leadToDelete = leads.find((lead) => lead.id === leadToDeleteId);
    setLeads((prev) => prev.filter((lead) => lead.id !== leadToDeleteId));
    setIsDeleteModalOpen(false);
    
    if (leadToDelete) {
      toast.error(`Lead for "${leadToDelete.name}" deleted successfully.`, {
        style: {
          borderRadius: '12px',
          background: '#EF4444',
          color: '#fff',
          fontSize: '14px',
        },
      });
    }
  };

  // Reset filter inputs
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setSourceFilter('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      {/* Toast Notification Provider */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Lead Management
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Add, search, edit, and track leads through your sales pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher (Desktop only, mobile forces grid/card) */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200/50">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Table View"
                aria-label="Switch to Table View"
              >
                <Table className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Card View"
                aria-label="Switch to Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Add Lead Button */}
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold bg-[#2563EB] text-white hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Add Lead
            </button>
          </div>
        </header>

        {/* Filters and Search Bar Section */}
        <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            {/* Status Dropdown Filter */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-9 pr-8 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white appearance-none cursor-pointer text-slate-600"
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Meeting Scheduled">Meeting Scheduled</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <span className="text-[10px]">▼</span>
              </div>
            </div>

            {/* Source Dropdown Filter */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </span>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-9 pr-8 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white appearance-none cursor-pointer text-slate-600"
              >
                <option value="">All Sources</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Email Campaign">Email Campaign</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <span className="text-[10px]">▼</span>
              </div>
            </div>

            {/* Clear Button */}
            {(searchQuery || statusFilter || sourceFilter) ? (
              <button
                onClick={handleClearFilters}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors border border-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            ) : (
              <div className="hidden lg:flex items-center text-xs font-semibold text-slate-400 justify-center">
                Active Leads Count: {filteredLeads.length}
              </div>
            )}
          </div>
        </section>

        {/* Content Section */}
        {filteredLeads.length > 0 ? (
          <>
            {/* Desktop View */}
            <div className="hidden md:block">
              {viewMode === 'table' ? (
                <LeadTable
                  leads={filteredLeads}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteConfirm}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onEdit={handleOpenEditModal}
                      onDelete={handleOpenDeleteConfirm}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Mobile View (Always forces Card grid layout) */}
            <div className="block md:hidden">
              <div className="grid grid-cols-1 gap-4">
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onEdit={handleOpenEditModal}
                    onDelete={handleOpenDeleteConfirm}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center flex flex-col items-center justify-center gap-3">
            <span className="text-4xl">📭</span>
            <h3 className="text-lg font-bold text-slate-900">No leads found</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              We couldn't find any lead entries matching your query. Click "Add Lead" to insert a brand new item.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-xs cursor-pointer"
            >
              Add New Lead
            </button>
          </div>
        )}

        {/* CREATE / EDIT MODAL DIALOG */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div 
              className="bg-white w-full max-w-lg rounded-2xl border border-slate-100 shadow-xl overflow-hidden relative max-h-[90vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                <h3 id="modal-title" className="text-lg font-bold text-slate-900">
                  {selectedLead ? 'Edit Lead Profile' : 'Create New Lead'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer focus:outline-none"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-4 overflow-y-auto">
                <LeadForm
                  initialData={selectedLead}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div 
              className="bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-xl overflow-hidden relative p-6 flex flex-col gap-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-title"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 id="delete-title" className="text-base font-bold text-slate-900">
                    Confirm Deletion
                  </h3>
                  <p className="text-xs text-slate-500">
                    This action is permanent and cannot be undone.
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Are you absolutely sure you want to remove this lead? All associated contacts and CRM status progress will be lost.
              </p>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Lead
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
