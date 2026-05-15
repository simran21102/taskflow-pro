import { AlertTriangle, BarChart3, CheckCircle2, ListChecks, Percent, TimerReset } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import StatCard from '../components/StatCard';
import SkeletonLoader from '../components/SkeletonLoader';
import TaskPriorityChart from '../components/TaskPriorityChart';
import TaskProgressChart from '../components/TaskProgressChart';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';

const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading } = useApi('/dashboard/stats');

  if (loading) return <SkeletonLoader rows={5} />;

  const completedTasks = data.completedTasks || 0;
  const totalTasks = data.totalTasks || 0;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const highPriorityTasks = data.tasksByPriority?.find((item) => item.name === 'HIGH')?.value || 0;

  const cards = [
    { label: 'Total Tasks', value: totalTasks, icon: BarChart3, tone: 'cyan', change: '+9%' },
    { label: 'Completed Tasks', value: completedTasks, icon: CheckCircle2, tone: 'emerald', change: '+24%' },
    { label: 'Completion Rate', value: `${completionRate}%`, icon: Percent, tone: 'indigo', change: '+12%' },
    { label: 'High Priority', value: highPriorityTasks, icon: AlertTriangle, tone: 'rose', change: highPriorityTasks ? 'Needs focus' : 'Clear' },
  ];

  const activity = [
    ['Project plan reviewed', 'A delivery checkpoint was updated', '2h ago'],
    ['Task status changed', 'Work moved into review', '4h ago'],
    ['Team capacity refreshed', 'Workload signals are current', 'Today'],
  ];

  return (
    <div className="space-y-8">
      <section className="surface overflow-hidden p-6">
        <div className="relative">
          <div className="absolute right-0 top-0 hidden h-28 w-72 rounded-full bg-indigo-100 blur-3xl dark:bg-indigo-500/10 lg:block" />
          <p className="text-sm font-black uppercase tracking-wide text-primary">Command center</p>
          <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">Good to see you, {user?.name?.split(' ')[0] || 'there'}.</h1>
              <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">Monitor portfolio health, spot delivery risk, and keep your team aligned without digging through tabs.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
                <p className="font-black text-slate-950 dark:text-white">{Math.max(totalTasks - completedTasks, 0)}</p>
                <p className="text-slate-500">Open tasks</p>
              </div>
              <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
                <p className="font-black text-slate-950 dark:text-white">{completionRate}%</p>
                <p className="text-slate-500">Completion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <StatCard key={card.label} {...card} />)}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Task Progress"
          subtitle="Overall task completion across all projects."
          action={<span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/15 sm:inline-flex">+12% from last week</span>}
        >
          <TaskProgressChart tasksByStatus={data.tasksByStatus} totalTasks={totalTasks} completedTasks={completedTasks} />
        </ChartCard>

        <ChartCard title="Task Priority Breakdown" subtitle="Distribution of tasks by urgency.">
          <TaskPriorityChart tasksByPriority={data.tasksByPriority} totalTasks={totalTasks} />
        </ChartCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Recent Activity" subtitle="Latest movement across the workspace">
          <div className="space-y-3">
            {activity.map(([title, body, time]) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-50 text-primary dark:bg-indigo-500/15">
                  <ListChecks className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-950 dark:text-white">{title}</p>
                  <p className="text-sm text-slate-500">{body}</p>
                </div>
                <span className="text-xs font-semibold text-slate-400">{time}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Upcoming Deadlines" subtitle="Items that deserve attention soon">
          <div className="space-y-3">
            {['Review active tasks', 'Confirm project owners', 'Resolve overdue work'].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-50 text-warning dark:bg-amber-500/15">
                  <TimerReset className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-950 dark:text-white">{item}</p>
                  <p className="text-sm text-slate-500">Due in {index + 1} business day{index ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </section>
    </div>
  );
};

export default Dashboard;
