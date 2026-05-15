import { useMemo, useState } from 'react';
import AccountSettings from '../components/settings/AccountSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import DangerZone from '../components/settings/DangerZone';
import IntegrationsSettings from '../components/settings/IntegrationsSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import PreferencesSettings from '../components/settings/PreferencesSettings';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import SettingsSidebar, { settingsTabs } from '../components/settings/SettingsSidebar';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const active = settingsTabs.find((tab) => tab.id === activeTab) || settingsTabs[0];

  const panel = useMemo(() => ({
    profile: <ProfileSettings user={user} />,
    account: <AccountSettings user={user} />,
    security: <SecuritySettings />,
    notifications: <NotificationSettings />,
    appearance: <AppearanceSettings />,
    preferences: <PreferencesSettings />,
    integrations: <IntegrationsSettings />,
    danger: <DangerZone />,
  }), [user]);

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-wide text-primary">Workspace controls</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Settings</h1>
        <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">Manage profile, account security, notifications, appearance, preferences, integrations, and sensitive actions from one enterprise-ready center.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm dark:bg-slate-900">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-primary dark:bg-indigo-500/15">
              <active.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-400">Selected section</p>
              <h2 className="font-black text-slate-950 dark:text-white">{active.label}</h2>
            </div>
          </div>
          {panel[activeTab]}
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
