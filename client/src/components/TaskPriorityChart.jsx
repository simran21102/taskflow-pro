import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import EmptyState from './EmptyState';

const priorityMeta = {
  HIGH: { label: 'High', color: '#EF4444', className: 'bg-red-500' },
  MEDIUM: { label: 'Medium', color: '#F59E0B', className: 'bg-amber-500' },
  LOW: { label: 'Low', color: '#10B981', className: 'bg-emerald-500' },
};

const orderedPriorities = ['HIGH', 'MEDIUM', 'LOW'];

const TaskPriorityChart = ({ tasksByPriority = [], totalTasks = 0 }) => {
  const counts = orderedPriorities.reduce((acc, priority) => ({ ...acc, [priority]: 0 }), {});
  tasksByPriority.forEach((item) => {
    counts[item.name] = item.value;
  });

  const chartData = orderedPriorities.map((priority) => ({
    name: priorityMeta[priority].label,
    value: counts[priority],
    color: priorityMeta[priority].color,
    percent: totalTasks ? Math.round((counts[priority] / totalTasks) * 100) : 0,
  })).filter((item) => item.value > 0);

  if (!totalTasks) {
    return <EmptyState title="No priority data yet" body="Task priorities will appear once tasks are created." />;
  }

  return (
    <div className="grid gap-6 2xl:grid-cols-[240px_1fr] 2xl:items-center" aria-label="Task priority breakdown chart">
      <div className="mx-auto h-64 w-full max-w-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={104}
              paddingAngle={4}
              animationDuration={700}
            >
              {chartData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} tasks`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {orderedPriorities.map((priority) => {
          const percent = totalTasks ? Math.round((counts[priority] / totalTasks) * 100) : 0;
          return (
            <div key={priority}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`h-3 w-3 shrink-0 rounded-full ${priorityMeta[priority].className}`} />
                  <span className="truncate text-sm font-black text-slate-800 dark:text-slate-100">{priorityMeta[priority].label} priority</span>
                </div>
                <span className="shrink-0 text-sm font-bold text-slate-500">{counts[priority]} ({percent}%)</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: priorityMeta[priority].color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskPriorityChart;
