/**
 * CRM Charting Color Palette Constants
 * Establishes consistent brand color systems for leads statuses, sources, and graphs.
 */

// Colors matching specified requirements for Lead Status Distributions
export const STATUS_COLORS = {
  New: '#94A3B8',           // Slate-400
  Contacted: '#2563EB',     // Primary Blue-600
  Meeting: '#F59E0B',       // Warning Amber-500
  Proposal: '#7C3AED',      // Purple-600
  Won: '#22C55E',           // Success Green-500
  Lost: '#EF4444',          // Danger Red-500
};

// Colors mapping for Lead acquisition channels
export const SOURCE_COLORS = {
  Website: '#3B82F6',        // Blue-500
  Referral: '#10B981',       // Emerald-500
  LinkedIn: '#0284C7',       // Sky-600
  Instagram: '#EC4899',      // Pink-500
  Ads: '#F43F5E',            // Rose-500
  'Cold Email': '#8B5CF6',   // Violet-500
  Other: '#64748B',          // Slate-500
};

// General charting theme colors
export const THEME_COLORS = {
  primary: '#2563EB',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  slateLight: '#F8FAFC',
  borderLight: '#E2E8F0',
};

export default {
  STATUS_COLORS,
  SOURCE_COLORS,
  THEME_COLORS,
};
