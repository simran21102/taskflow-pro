import { Bell, Link2, Monitor, Shield, SlidersHorizontal, Trash2, UserRound, WalletCards } from 'lucide-react';

export const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'account', label: 'Account', icon: WalletCards },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Monitor },
  { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'danger', label: 'Danger Zone', icon: Trash2 },
];

const SettingsSidebar = ({ activeTab, setActiveTab }) => (
  <aside className="surface p-2">
    <nav className="grid gap-1" aria-label="Settings sections">
      {settingsTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
            activeTab === tab.id
              ? 'bg-indigo-50 text-primary dark:bg-indigo-500/15 dark:text-indigo-300'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'
          }`}
        >
          <tab.icon className="h-5 w-5" />
          {tab.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default SettingsSidebar;
