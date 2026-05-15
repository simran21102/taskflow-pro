import { CalendarDays, CheckCircle2, Clock, Flag } from 'lucide-react';
import Badge from './Badge';
import { formatDate, isOverdue } from '../utils/format';

const priorityLegend = [
  ['High priority', 'bg-red-500'],
  ['Medium priority', 'bg-amber-500'],
  ['Low priority', 'bg-emerald-500'],
];

const CalendarSidebar = ({ tasks = [] }) => {
  const now = new Date();
  const thisMonth = tasks.filter((task) => {
    const due = new Date(task.dueDate);
    return due.getMonth() === now.getMonth() && due.getFullYear() === now.getFullYear();
  });
  const overdue = tasks.filter(isOverdue);
  const completed = tasks.filter((task) => task.status === 'COMPLETED');
  const upcoming = [...tasks]
    .filter((task) => new Date(task.dueDate) >= new Date() && task.status !== 'COMPLETED')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <aside className="space-y-4">
      <section className="surface p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-primary dark:bg-indigo-500/15">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black text-slate-950 dark:text-white">Calendar focus</h2>
            <p className="text-sm text-slate-500">Task deadlines at a glance</p>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <Flag className="mb-2 h-4 w-4 text-primary" />
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">This month</p>
            <p className="text-2xl font-black">{thisMonth.length}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
              <Clock className="mb-2 h-4 w-4 text-danger" />
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Overdue</p>
              <p className="text-2xl font-black">{overdue.length}</p>
            </div>
            <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
              <CheckCircle2 className="mb-2 h-4 w-4 text-success" />
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Done</p>
              <p className="text-2xl font-black">{completed.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="surface p-5">
        <h2 className="font-black text-slate-950 dark:text-white">Priority legend</h2>
        <div className="mt-4 space-y-3">
          {priorityLegend.map(([label, color]) => (
            <div key={label} className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
              <span className={`h-3 w-3 rounded-full ${color}`} />
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="surface p-5">
        <h2 className="font-black text-slate-950 dark:text-white">Upcoming deadlines</h2>
        <div className="mt-4 space-y-3">
          {upcoming.length === 0 ? (
            <p className="text-sm text-slate-500">No upcoming deadlines.</p>
          ) : upcoming.map((task) => (
            <div key={task.id} className="rounded-2xl border bg-slate-50 p-3 dark:bg-slate-950">
              <div className="flex items-start justify-between gap-3">
                <p className="font-bold text-slate-950 dark:text-white">{task.title}</p>
                <Badge value={task.priority} />
              </div>
              <p className="mt-1 text-sm text-slate-500">{task.project?.name}</p>
              <p className="mt-2 text-xs font-bold text-slate-400">{formatDate(task.dueDate)}</p>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default CalendarSidebar;
