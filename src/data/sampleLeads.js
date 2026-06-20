/**
 * Sample CRM Leads Data Asset
 * Realistic mock dataset of 6 initial leads.
 * Used as the fallback initial state when local storage is uninitialized.
 * Features Indian names, Indian companies, and varied statuses matching prompt requirements.
 */
export const sampleLeads = [
  {
    id: 1,
    name: 'Aarav Sharma',
    company: 'Alpha Tech Solutions',
    email: 'aarav@alphatech.in',
    phone: '+91 98765 43210',
    status: 'New',
    source: 'Website',
    dateAdded: '2026-06-15T10:00:00Z',
    value: 12000,
  },
  {
    id: 2,
    name: 'Priya Patel',
    company: 'Quantum Commerce',
    email: 'priya@quantumcom.in',
    phone: '+91 87654 32109',
    status: 'New',
    source: 'LinkedIn',
    dateAdded: '2026-06-16T14:30:00Z',
    value: 8500,
  },
  {
    id: 3,
    name: 'Vikram Malhotra',
    company: 'Apex Digital Systems',
    email: 'vikram@apexdigital.com',
    phone: '+91 76543 21098',
    status: 'Contacted',
    source: 'Referral',
    dateAdded: '2026-06-14T09:15:00Z',
    value: 4500,
  },
  {
    id: 4,
    name: 'Ananya Iyer',
    company: 'Blue Sky Ventures',
    email: 'ananya@bluesky.co',
    phone: '+91 65432 10987',
    status: 'Won',
    source: 'Email Campaign',
    dateAdded: '2026-06-11T11:20:00Z',
    value: 22000,
  },
  {
    id: 5,
    name: 'Rohan Deshmukh',
    company: 'Vanguard Logistics',
    email: 'rohan@vanguard.co.in',
    phone: '+91 54321 09876',
    status: 'Lost',
    source: 'Cold Call',
    dateAdded: '2026-06-08T08:00:00Z',
    value: 3000,
  },
  {
    id: 6,
    name: 'Meera Sen',
    company: 'Hindustan Analytics',
    email: 'meera@hindustananaly.in',
    phone: '+91 43210 98765',
    status: 'Meeting Scheduled',
    source: 'LinkedIn',
    dateAdded: '2026-06-13T17:10:00Z',
    value: 15000,
  },
];

export default sampleLeads;
