import { CheckCircle2, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

const features = [
  ['Executive dashboards', Layers3],
  ['Role-based workflows', ShieldCheck],
  ['Fast team execution', CheckCircle2],
];

const AuthLayout = () => (
  <div className="min-h-screen bg-slate-950 text-white">
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
          alt="Team collaborating around a planning wall"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-indigo-950/75" />
        <Link to="/" className="relative z-10 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-primary">T</div>
          <span className="text-xl font-black">TaskFlow Pro</span>
        </Link>
        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-indigo-100">
            <Sparkles className="h-4 w-4" />
            Premium work management
          </div>
          <h1 className="text-5xl font-black leading-tight">Bring projects, priorities, and people into one polished workspace.</h1>
          <div className="mt-8 grid gap-3">
            {features.map(([label, Icon]) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <Icon className="h-5 w-5 text-indigo-200" />
                <span className="font-bold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid place-items-center bg-[#F8FAFC] p-6 text-slate-950 dark:bg-slate-950 dark:text-white">
        <Outlet />
      </section>
    </div>
  </div>
);

export default AuthLayout;
