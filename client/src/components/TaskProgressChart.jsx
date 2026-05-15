import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import EmptyState from './EmptyState';

const statusMeta = {
  TODO: { label: 'Todo', color: '#9CA3AF', className: 'bg-slate-400' },
  IN_PROGRESS: { label: 'In Progress', color: '#3B82F6', className: 'bg-blue-500' },
  REVIEW: { label: 'Review', color: '#8B5CF6', className: 'bg-violet-500' },
  COMPLETED: { label: 'Completed', color: '#10B981', className: 'bg-emerald-500' },
};

const orderedStatuses = ['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'];

const TaskProgressChart = ({ tasksByStatus = [], totalTasks = 0, completedTasks = 0 }) => {
  const counts = orderedStatuses.reduce((acc, status) => ({ ...acc, [status]: 0 }), {});
  tasksByStatus.forEach((item) => {
    counts[item.name] = item.value;
  });

  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const chartData = orderedStatuses.map((status) => ({
    name: statusMeta[status].label,
    value: counts[status],
    color: statusMeta[status].color,
  })).filter((item) => item.value > 0);

  if (!totalTasks) {
    return <EmptyState title="No task progress yet" body="Create tasks to see completion analytics here." />;
  }

  return (
    <div className="grid gap-6 2xl:grid-cols-[260px_1fr] 2xl:items-center" aria-label="Task progress chart">
      <div className="relative mx-auto h-64 w-full max-w-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={72}
              outerRadius={102}
              paddingAngle={4}
              animationDuration={700}
            >
              {chartData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} tasks`, name]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-4xl font-black tracking-tight text-slate-950 dark:text-white">{completionRate}%</p>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Complete</p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-5 rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
          <p className="text-sm font-semibold text-slate-500">Total Tasks</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-3xl font-black text-slate-950 dark:text-white">{totalTasks}</p>
            <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-600 dark:bg-emerald-500/15">+12% from last week</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
          {orderedStatuses.map((status) => {
            const percent = totalTasks ? Math.round((counts[status] / totalTasks) * 100) : 0;
            return (
              <div key={status} className="rounded-2xl border bg-white p-4 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className={`h-3 w-3 shrink-0 rounded-full ${statusMeta[status].className}`} />
                    <span className="truncate text-sm font-bold text-slate-700 dark:text-slate-200">{statusMeta[status].label}</span>
                  </div>
                  <span className="shrink-0 text-xs font-black text-slate-400">{percent}%</span>
                </div>
                <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{counts[status]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskProgressChart;
