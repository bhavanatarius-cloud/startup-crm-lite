import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS, SOURCE_OPTIONS } from '../../constants';

/**
 * LeadForm Component
 * Renders a validation-enabled form for creating or updating lead details.
 * Supports inline validation errors and visual accessibility cues.
 *
 * @param {Object} props - The component props.
 * @param {Object} [props.initialData] - Pre-populated lead details if in edit mode.
 * @param {Function} props.onSubmit - Callback function invoked with form values on successful submission.
 * @param {Function} props.onCancel - Callback function invoked on cancel click.
 * @returns {React.JSX.Element} The rendered LeadForm component.
 */
const LeadForm = memo(function LeadForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    source: 'Website',
  });

  const [errors, setErrors] = useState({});

  // Sync state if initialData is provided/modified (useful when component is reused)
  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: initialData.name || '',
        company: initialData.company || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        status: initialData.status || 'New',
        source: initialData.source || 'Website',
      });
    } else {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        status: 'New',
        source: 'Website',
      });
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear errors inline as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-slate-700 dark:text-slate-200" noValidate>
      {/* Name Input */}
      <div>
        <label htmlFor="lead-name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="lead-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ${
            errors.name
              ? 'border-red-300 dark:border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20'
          }`}
          placeholder="e.g. Tony Stark"
          required
        />
        {errors.name && (
          <p className="text-xs font-semibold text-red-500 mt-1" id="name-error">
            {errors.name}
          </p>
        )}
      </div>

      {/* Company Input */}
      <div>
        <label htmlFor="lead-company" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="lead-company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ${
            errors.company
              ? 'border-red-300 dark:border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20'
          }`}
          placeholder="e.g. Stark Industries"
          required
        />
        {errors.company && (
          <p className="text-xs font-semibold text-red-500 mt-1" id="company-error">
            {errors.company}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="lead-email" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="lead-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ${
            errors.email
              ? 'border-red-300 dark:border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20'
          }`}
          placeholder="e.g. tony@stark.com"
          required
        />
        {errors.email && (
          <p className="text-xs font-semibold text-red-500 mt-1" id="email-error">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Input */}
      <div>
        <label htmlFor="lead-phone" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Phone Number
        </label>
        <input
          type="tel"
          id="lead-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-600 px-3.5 py-2.5 text-sm transition-all focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          placeholder="e.g. (555) 019-2834"
        />
      </div>

      {/* Dropdown Options Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status Dropdown */}
        <div>
          <label htmlFor="lead-status" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Status Stage
          </label>
          <div className="relative">
            <select
              id="lead-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 px-3.5 py-2.5 text-sm transition-all focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} className="dark:bg-slate-800">
                  {status}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 dark:text-slate-500">
              <span className="text-xs">â–¼</span>
            </div>
          </div>
        </div>

        {/* Source Dropdown */}
        <div>
          <label htmlFor="lead-source" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Lead Source
          </label>
          <div className="relative">
            <select
              id="lead-source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 px-3.5 py-2.5 text-sm transition-all focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
            >
              {SOURCE_OPTIONS.map((source) => (
                <option key={source} value={source} className="dark:bg-slate-800">
                  {source}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 dark:text-slate-500">
              <span className="text-xs">â–¼</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Footer */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-700 pt-4 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl transition-all cursor-pointer focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {initialData ? 'Save Changes' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
});

LeadForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    status: PropTypes.string,
    source: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LeadForm;
