import { KeyRound, LogOut, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { InputField, SectionCard, ToggleSwitch } from './SettingsPrimitives';

const SecuritySettings = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  const [password, setPassword] = useState({ current: '', next: '', confirm: '' });
  const sessions = ['Chrome on Windows', 'Edge on Windows', 'Mobile Safari'];

  const savePassword = (event) => {
    event.preventDefault();
    if (password.next.length < 8 || password.next !== password.confirm) {
      toast.error('Password must match and be at least 8 characters');
      return;
    }
    toast.success('Password updated');
    setPassword({ current: '', next: '', confirm: '' });
  };

  return (
    <div className="space-y-5">
      <SectionCard title="Change Password" description="Use a strong password that is unique to TaskFlow Pro.">
        <form onSubmit={savePassword} className="grid gap-4 md:grid-cols-3">
          <InputField label="Current password" type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} />
          <InputField label="New password" type="password" value={password.next} onChange={(e) => setPassword({ ...password, next: e.target.value })} />
          <InputField label="Confirm password" type="password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} />
          <button className="btn-primary md:col-span-3"><KeyRound className="h-4 w-4" /> Update password</button>
        </form>
      </SectionCard>
      <SectionCard title="Two-Factor Authentication" description="Add an extra verification step when signing in.">
        <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} label="Enable two-factor authentication" description="UI-only toggle for this demo workspace." />
      </SectionCard>
      <SectionCard title="Active Sessions" description="Review devices currently signed in to your account.">
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <div key={session} className="flex items-center justify-between gap-4 rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-bold text-slate-950 dark:text-white">{session}</p>
                  <p className="text-sm text-slate-500">{index === 0 ? 'Current session' : `${index + 1} days ago`}</p>
                </div>
              </div>
              <button onClick={() => toast.success(`${session} signed out`)} className="btn-secondary px-3 py-2"><LogOut className="h-4 w-4" /> Sign out</button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default SecuritySettings;
