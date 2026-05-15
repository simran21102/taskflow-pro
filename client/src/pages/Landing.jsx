import { ArrowRight, BarChart3, CheckCircle2, KanbanSquare, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="min-h-screen bg-slate-950 text-white">
    <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white font-black text-primary">T</div>
          <span className="text-xl font-black">TaskFlow Pro</span>
        </Link>
        <div className="flex gap-3">
          <Link to="/login" className="rounded-2xl px-4 py-2 text-sm font-bold hover:bg-white/10">Log in</Link>
          <Link to="/signup" className="rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-950 hover:bg-indigo-50">Sign up</Link>
        </div>
      </div>
    </header>
    <main className="relative min-h-screen overflow-hidden pt-20">
      <img
        src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=80"
        alt="Modern team workspace"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/82 to-indigo-950/70" />
      <section className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-10 px-6 pb-20 pt-20 lg:grid-cols-[1fr_460px] lg:items-center">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-indigo-100 backdrop-blur">Premium SaaS project operations</p>
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">TaskFlow Pro</h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-200">Manage projects, assign tasks, and track progress effortlessly with an enterprise-grade workspace for modern teams.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-950 hover:bg-indigo-50">
              Start managing <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/login" className="rounded-2xl border border-white/20 px-5 py-3 font-black text-white hover:bg-white/10">Open workspace</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-soft backdrop-blur">
          {[
            ['Dashboard analytics', BarChart3],
            ['Secure role workflows', Shield],
            ['Kanban delivery boards', KanbanSquare],
            ['Task execution tables', CheckCircle2],
          ].map(([label, Icon]) => (
            <div key={label} className="mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 last:mb-0">
              <Icon className="h-6 w-6 text-indigo-200" />
              <span className="font-bold">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

export default Landing;
