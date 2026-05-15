import { Area, AreaChart, ResponsiveContainer } from 'recharts';

const sparkData = [12, 16, 13, 22, 20, 26, 31].map((value, index) => ({ index, value }));

const StatCard = ({ label, value, change = '+12%', icon: Icon, tone = 'indigo' }) => {
  const tones = {
    indigo: ['from-indigo-500 to-violet-500', '#4F46E5', 'text-emerald-600'],
    cyan: ['from-cyan-500 to-blue-500', '#0EA5E9', 'text-emerald-600'],
    emerald: ['from-emerald-500 to-teal-500', '#10B981', 'text-emerald-600'],
    rose: ['from-rose-500 to-orange-500', '#EF4444', 'text-rose-600'],
  };
  const [gradient, color, changeColor] = tones[tone] || tones.indigo;

  return (
    <article className="surface surface-hover p-5">
      <div className="flex items-start justify-between gap-4">
        <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-indigo-200/40 dark:shadow-none`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className={`rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold ${changeColor} dark:bg-slate-800`}>{change}</span>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{value}</p>
      </div>
      <div className="mt-4 h-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData}>
            <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.12} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
};

export default StatCard;
