import { useState } from 'react';
import PropTypes from 'prop-types';
import { Camera, Save } from 'lucide-react';
import { FIELD_CLASS, LABEL_CLASS } from '../../constants';

export default function ProfileSection({ onSave }) {
  const [form, setForm] = useState({
    firstName: 'Sarah',
    lastName:  'Connor',
    email:     'sarah.connor@crmlite.io',
    phone:     '+1 (555) 019-2834',
    role:      'Sales Director',
    company:   'CRM Lite Inc.',
    bio:       'Sales leader with 10+ years in B2B SaaS. Passionate about building high-performance sales teams and closing enterprise deals.',
    timezone:  'America/New_York',
    language:  'English (US)',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('Profile updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar row */}
      <div className="flex items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-700">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-blue-500/20 select-none">
            SC
          </div>
          <button
            type="button"
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
            title="Change photo"
            aria-label="Change profile photo"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Profile Photo</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">JPG, PNG or GIF Â· max 2 MB</p>
          <button 
            type="button" 
            className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            aria-label="Upload a new profile photo file"
          >
            Upload new photo
          </button>
        </div>
      </div>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-first-name" className={LABEL_CLASS}>First Name</label>
          <input 
            id="profile-first-name" 
            type="text" 
            name="firstName" 
            value={form.firstName} 
            onChange={handleChange} 
            className={FIELD_CLASS} 
          />
        </div>
        <div>
          <label htmlFor="profile-last-name" className={LABEL_CLASS}>Last Name</label>
          <input 
            id="profile-last-name" 
            type="text" 
            name="lastName" 
            value={form.lastName} 
            onChange={handleChange} 
            className={FIELD_CLASS} 
          />
        </div>
      </div>

      {/* Email / Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-email" className={LABEL_CLASS}>Email Address</label>
          <input 
            id="profile-email" 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            className={FIELD_CLASS} 
          />
        </div>
        <div>
          <label htmlFor="profile-phone" className={LABEL_CLASS}>Phone Number</label>
          <input 
            id="profile-phone" 
            type="tel" 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
            className={FIELD_CLASS} 
          />
        </div>
      </div>

      {/* Role / Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-role" className={LABEL_CLASS}>Job Title / Role</label>
          <input 
            id="profile-role" 
            type="text" 
            name="role" 
            value={form.role} 
            onChange={handleChange} 
            className={FIELD_CLASS} 
          />
        </div>
        <div>
          <label htmlFor="profile-company" className={LABEL_CLASS}>Company</label>
          <input 
            id="profile-company" 
            type="text" 
            name="company" 
            value={form.company} 
            onChange={handleChange} 
            className={FIELD_CLASS} 
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="profile-bio" className={LABEL_CLASS}>Short Bio</label>
        <textarea
          id="profile-bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          className={`${FIELD_CLASS} resize-none`}
        />
      </div>

      {/* Timezone / Language */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-timezone" className={LABEL_CLASS}>Timezone</label>
          <div className="relative">
            <select 
              id="profile-timezone" 
              name="timezone" 
              value={form.timezone} 
              onChange={handleChange} 
              className={`${FIELD_CLASS} appearance-none cursor-pointer pr-10`}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">GMT / London</option>
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 dark:text-slate-500">
              <span className="text-xs">â–¼</span>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="profile-language" className={LABEL_CLASS}>Language</label>
          <div className="relative">
            <select 
              id="profile-language" 
              name="language" 
              value={form.language} 
              onChange={handleChange} 
              className={`${FIELD_CLASS} appearance-none cursor-pointer pr-10`}
            >
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 dark:text-slate-500">
              <span className="text-xs">â–¼</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <Save className="w-4 h-4" />
          Save Profile
        </button>
      </div>
    </form>
  );
}

ProfileSection.propTypes = {
  onSave: PropTypes.func.isRequired,
};
