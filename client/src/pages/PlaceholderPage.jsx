import { CalendarDays, Settings, BarChart3 } from 'lucide-react';

const iconMap = {
  Calendar: CalendarDays,
  Reports: BarChart3,
  Settings,
};

const PlaceholderPage = ({ title, description }) => {
  const Icon = iconMap[title] || Settings;

  return (
    <div className="space-y-6">
      <section className="surface overflow-hidden p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-primary dark:bg-indigo-500/15">
              <Icon className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">{title}</h1>
            <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">{description}</p>
          </div>
          <button className="btn-primary">Coming soon</button>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {['Planning', 'Visibility', 'Automation'].map((item) => (
          <div key={item} className="surface p-5">
            <p className="text-sm font-bold text-primary">{item}</p>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">This workspace module is styled and ready for the next functional iteration.</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PlaceholderPage;
