import { Download, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { SectionCard } from './SettingsPrimitives';

const AccountSettings = ({ user }) => {
  const rows = [
    ['Role', user?.role || 'MEMBER'],
    ['Account creation date', 'May 15, 2026'],
    ['Last login', 'Today at 10:42 AM'],
    ['Workspace name', 'TaskFlow Pro Workspace'],
  ];

  return (
    <SectionCard title="Account Settings" description="Review account metadata and manage account-level actions.">
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-1 font-black text-slate-950 dark:text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => toast.success('Account export prepared')} className="btn-secondary"><Download className="h-4 w-4" /> Export account data</button>
        <button onClick={() => toast.success('All sessions signed out')} className="btn-secondary"><LogOut className="h-4 w-4" /> Sign out all devices</button>
      </div>
    </SectionCard>
  );
};

export default AccountSettings;
