/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import sampleLeads from '../data/sampleLeads';

/**
 * LeadContext Context
 * Central context instance governing all CRM lead operations and states.
 */
const LeadContext = createContext(null);

/**
 * LeadProvider Component
 * Supplies the global leads state synchronized with localStorage.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child elements that consume this context.
 * @returns {React.JSX.Element} The context provider mapping children to leads values.
 */
export function LeadProvider({ children }) {
  // Use custom useLocalStorage hook to initialize and persist leads state under key 'startup-crm-leads'
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  const value = useMemo(() => ({ leads, setLeads }), [leads, setLeads]);

  return (
    <LeadContext.Provider value={value}>
      {children}
    </LeadContext.Provider>
  );
}

LeadProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom Hook: useLeads
 * Reusable React Hook to retrieve current global leads state and dispatchers.
 *
 * @returns {{ leads: Array, setLeads: Function }} Active LeadContext values.
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used inside a LeadProvider');
  }
  return context;
}
