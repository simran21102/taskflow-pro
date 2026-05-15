import { Moon, Monitor, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SectionCard, ToggleSwitch } from './SettingsPrimitives';

const themes = [
  ['light', 'Light mode', Sun],
  ['dark', 'Dark mode', Moon],
  ['system', 'System theme', Monitor],
];

const AppearanceSettings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('taskflow_theme') || 'light');
  const [compact, setCompact] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('taskflow_theme', theme);
  }, [theme]);

  return (
    <SectionCard title="Appearance Settings" description="Personalize how TaskFlow Pro looks and feels on this device.">
      <div className="grid gap-3 md:grid-cols-3">
        {themes.map(([value, label, Icon]) => (
          <button
            key={value}
            onClick={() => {
              setTheme(value);
              toast.success(`${label} selected`);
            }}
            className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft ${theme === value ? 'border-primary bg-indigo-50 text-primary dark:bg-indigo-500/15' : 'bg-slate-50 dark:bg-slate-950'}`}
          >
            <Icon className="mb-3 h-5 w-5" />
            <p className="font-black">{label}</p>
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-3">
        <ToggleSwitch checked={compact} onChange={setCompact} label="Compact mode" description="Reduce spacing density for data-heavy workflows." />
        <ToggleSwitch checked={reduceMotion} onChange={setReduceMotion} label="Reduce motion" description="Minimize animated transitions where possible." />
      </div>
    </SectionCard>
  );
};

export default AppearanceSettings;
