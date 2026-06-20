import { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, LayoutGrid, Table, Search, Filter, X, Trash2, ShieldAlert } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Import custom components
import LeadForm from '../components/leads/LeadForm';
import LeadCard from '../components/leads/LeadCard';
import LeadTable from '../components/leads/LeadTable';
import { STATUS_OPTIONS, SOURCE_OPTIONS } from '../constants';

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

import { useLeads } from '../context/LeadContext';

/**
 * Leads Page Component
 * Oversees lead lookup, updates, creation, and deletion.
 * Houses filtering criteria, view mode configurations, and interactive dialogs.
 *
 * @returns {React.JSX.Element} The rendered Leads management page.
 */
export default function Leads() {
  const { leads, setLeads } = useLeads();
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

  // Filter leads based on query, status, and source â€” memoized
  const filteredLeads = useMemo(() => leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      lead.name.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.phone && lead.phone.includes(searchQuery));
    const matchesStatus = statusFilter ? lead.status === statusFilter : true;
    const matchesSource = sourceFilter ? lead.source === sourceFilter : true;
    return matchesSearch && matchesStatus && matchesSource;
  }), [leads, searchQuery, statusFilter, sourceFilter]);

  // Open modal for Creating new lead
  const handleOpenAddModal = useCallback(() => {
    setSelectedLead(null);
    setIsModalOpen(true);
  }, []);

  // Open modal for Editing existing lead
  const handleOpenEditModal = useCallback((lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  }, []);

  // Open confirmation modal for deleting lead
  const handleOpenDeleteConfirm = useCallback((leadId) => {
    setLeadToDeleteId(leadId);
    setIsDeleteModalOpen(true);
  }, []);

  // Handle Form Submission (Create or Update)
  const handleFormSubmit = useCallback((formData) => {
    if (selectedLead) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id ? { ...lead, ...formData } : lead
        )
      );
      toast.success(`Lead for "${formData.name}" updated successfully!`, {
        style: { borderRadius: '12px', background: '#22C55E', color: '#fff', fontSize: '14px' },
      });
    } else {
      const newLead = { id: Date.now(), ...formData, dateAdded: new Date().toISOString() };
      setLeads((prev) => [newLead, ...prev]);
      toast.success(`Lead for "${formData.name}" created successfully!`, {
        style: { borderRadius: '12px', background: '#22C55E', color: '#fff', fontSize: '14px' },
      });
    }
    setIsModalOpen(false);
  }, [selectedLead, setLeads]);

  // Handle Delete Confirmation
  const handleDeleteConfirm = useCallback(() => {
    const leadToDelete = leads.find((lead) => lead.id === leadToDeleteId);
    setLeads((prev) => prev.filter((lead) => lead.id !== leadToDeleteId));
    setIsDeleteModalOpen(false);
    if (leadToDelete) {
      toast.error(`Lead for "${leadToDelete.name}" deleted successfully.`, {
        style: { borderRadius: '12px', background: '#EF4444', color: '#fff', fontSize: '14px' },
      });
    }
  }, [leads, leadToDeleteId, setLeads]);

  // Reset filter inputs
  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('');
    setSourceFilter('');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans antialiased transition-colors duration-200">
      {/* Toast Notification Provider */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
        
        {/* Header Section */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Lead Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5 sm:mt-1">
              Add, search, edit, and track leads through your sales pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Switcher â€” hidden on mobile (card view forced) & desktop (table view forced) */}
            <div className="hidden md:flex lg:hidden items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200/50 dark:border-slate-700/50">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2.5 rounded-lg transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Table View"
                aria-label="Switch to Table View"
              >
                <Table className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2.5 rounded-lg transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Card View"
                aria-label="Switch to Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Add Lead Button â€” touch-friendly 44px+ */}
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 sm:py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[44px]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Add Lead</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        {/* Filters and Search Bar Section */}
        <section className="bg-white dark:bg-slate-800 p-3 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col gap-3 sm:gap-4 mb-6 md:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Search Input */}
            <div className="relative sm:col-span-2 lg:col-span-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </span>
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 pl-9 pr-4 py-3 sm:py-2.5 text-sm transition-all focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 min-h-[44px]"
              />
            </div>

            {/* Status Dropdown Filter */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 pl-9 pr-8 py-3 sm:py-2.5 text-sm transition-all focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 appearance-none cursor-pointer text-slate-600 dark:text-slate-300 min-h-[44px]"
              >
                <option value="" className="dark:bg-slate-800">All Statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="dark:bg-slate-800">{s}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 dark:text-slate-500">
                <span className="text-[10px]">â–¼</span>
              </div>
            </div>

            {/* Source Dropdown Filter */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </span>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 pl-9 pr-8 py-3 sm:py-2.5 text-sm transition-all focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 appearance-none cursor-pointer text-slate-600 dark:text-slate-300 min-h-[44px]"
              >
                <option value="" className="dark:bg-slate-800">All Sources</option>
                {SOURCE_OPTIONS.map((s) => (
                  <option key={s} value={s} className="dark:bg-slate-800">{s}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 dark:text-slate-500">
                <span className="text-[10px]">â–¼</span>
              </div>
            </div>

            {/* Clear Button */}
            {(searchQuery || statusFilter || sourceFilter) ? (
              <button
                onClick={handleClearFilters}
                className="w-full flex items-center justify-center gap-2 py-3 sm:py-2.5 px-4 rounded-xl text-sm font-bold bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer min-h-[44px]"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            ) : (
              <div className="hidden lg:flex items-center text-xs font-semibold text-slate-400 dark:text-slate-500 justify-center">
                Active Leads Count: {filteredLeads.length}
              </div>
            )}
          </div>
        </section>

        {/* Content Section */}
        {filteredLeads.length > 0 ? (
          <>
            {/* Desktop View (Always Table View) */}
            <div className="hidden lg:block">
              <LeadTable
                leads={filteredLeads}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteConfirm}
              />
            </div>

            {/* Tablet View (Hybrid - Switchable Table or Cards) */}
            <div className="hidden md:block lg:hidden">
              {viewMode === 'table' ? (
                <LeadTable
                  leads={filteredLeads}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteConfirm}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Mobile View (Always Card View) */}
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-12 text-center flex flex-col items-center justify-center gap-3">
            <span className="text-4xl">ðŸ“­</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No leads found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
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

        {/* CREATE / EDIT MODAL DIALOG â€” fullscreen on mobile, centered on tablet+ */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-stretch md:items-center justify-center z-50 md:p-4 transition-opacity duration-300">
            <div 
              className="bg-white dark:bg-slate-800 w-full h-full rounded-none md:h-auto md:max-w-lg md:rounded-2xl border-0 md:border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden relative md:max-h-[90vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-100 dark:border-slate-700 shrink-0">
                <h3 id="modal-title" className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                  {selectedLead ? 'Edit Lead Profile' : 'Create New Lead'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2.5 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-all cursor-pointer focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-4 md:px-6 py-4 overflow-y-auto flex-1">
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
              className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden relative p-6 flex flex-col gap-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-title"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 id="delete-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Confirm Deletion
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    This action is permanent and cannot be undone.
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Are you absolutely sure you want to remove this lead? All associated contacts and CRM status progress will be lost.
              </p>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-700 pt-4 mt-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl transition-all cursor-pointer"
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
