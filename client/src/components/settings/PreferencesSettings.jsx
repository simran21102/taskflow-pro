import toast from 'react-hot-toast';
import { useState } from 'react';
import { SectionCard } from './SettingsPrimitives';

const PreferencesSettings = () => {
  const [prefs, setPrefs] = useState({
    dashboard: 'Executive overview',
    calendar: 'Month',
    dateFormat: 'MMM D, YYYY',
    timeFormat: '12-hour',
    timezone: 'Asia/Kolkata',
    language: 'English',
  });

  const update = (key, value) => setPrefs((current) => ({ ...current, [key]: value }));

  return (
    <SectionCard title="Preferences" description="Set defaults for dashboards, calendar behavior, localization, and time display.">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Default dashboard view<select value={prefs.dashboard} onChange={(e) => update('dashboard', e.target.value)} className="field mt-2"><option>Executive overview</option><option>Task operations</option><option>Project portfolio</option></select></label>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Default calendar view<select value={prefs.calendar} onChange={(e) => update('calendar', e.target.value)} className="field mt-2"><option>Month</option><option>Week</option><option>Day</option></select></label>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Date format<select value={prefs.dateFormat} onChange={(e) => update('dateFormat', e.target.value)} className="field mt-2"><option>MMM D, YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option></select></label>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Time format<select value={prefs.timeFormat} onChange={(e) => update('timeFormat', e.target.value)} className="field mt-2"><option>12-hour</option><option>24-hour</option></select></label>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Time zone<select value={prefs.timezone} onChange={(e) => update('timezone', e.target.value)} className="field mt-2"><option>Asia/Kolkata</option><option>UTC</option><option>America/New_York</option><option>Europe/London</option></select></label>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Language<select value={prefs.language} onChange={(e) => update('language', e.target.value)} className="field mt-2"><option>English</option><option>Hindi</option><option>Spanish</option><option>French</option></select></label>
      </div>
      <button onClick={() => toast.success('Preferences saved')} className="btn-primary mt-6">Save preferences</button>
    </SectionCard>
  );
};

export default PreferencesSettings;
