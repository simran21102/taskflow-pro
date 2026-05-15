import { Lock, Mail, Save, Shield, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <section className="surface overflow-hidden p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-2xl object-cover shadow-sm" />
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-primary">Account</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{user.name}</h1>
              <p className="mt-1 text-slate-500">{user.email}</p>
            </div>
          </div>
          <button className="btn-primary"><Save className="h-4 w-4" /> Save changes</button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="surface p-6">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Profile details</h2>
          <div className="mt-5 grid gap-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Full name<input defaultValue={user.name} className="field mt-2" /></label>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Email<input defaultValue={user.email} className="field mt-2" /></label>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Role<input value={user.role} readOnly className="field mt-2 bg-slate-50 dark:bg-slate-950" /></label>
          </div>
        </div>
        <div className="space-y-4">
          {[
            ['Authentication', 'JWT secured session', Lock],
            ['Role', user.role, Shield],
            ['Contact', user.email, Mail],
            ['Profile', 'Editable workspace identity', UserRound],
          ].map(([label, value, Icon]) => (
            <div key={label} className="surface flex items-center gap-4 p-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-primary dark:bg-indigo-500/15">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <p className="font-black text-slate-950 dark:text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
