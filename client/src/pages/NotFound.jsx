import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="grid min-h-screen place-items-center bg-[#F8FAFC] px-6 text-center dark:bg-slate-950">
    <div className="max-w-md">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-indigo-50 text-primary dark:bg-indigo-500/15">
        <Compass className="h-10 w-10" />
      </div>
      <p className="mt-6 text-sm font-black uppercase tracking-wide text-primary">404</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 dark:text-white">Page not found</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">This view is not available, but your workspace is one click away.</p>
      <Link to="/dashboard" className="btn-primary mt-6">Back to dashboard</Link>
    </div>
  </div>
);

export default NotFound;
