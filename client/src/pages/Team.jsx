import { CheckCircle2, Gauge, Mail, Shield } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Badge from '../components/Badge';
import SkeletonLoader from '../components/SkeletonLoader';
import { useApi } from '../hooks/useApi';

const Team = () => {
  const [searchParams] = useSearchParams();
  const { data: users, loading } = useApi('/users', { initialData: [] });
  const search = searchParams.get('search') || '';
  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const query = search.toLowerCase();
    return users.filter((user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  }, [users, search]);

  if (loading) return <SkeletonLoader rows={4} />;

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-wide text-primary">People</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Team Members</h1>
        <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">A polished directory of everyone available for project and task assignment.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredUsers.map((user, index) => (
          <article key={user.id} className="surface surface-hover overflow-hidden p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="h-14 w-14 rounded-2xl object-cover" />
                <div>
                  <h2 className="font-black text-slate-950 dark:text-white">{user.name}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><Mail className="h-3.5 w-3.5" /> {user.email}</p>
                </div>
              </div>
              <Badge value={user.role} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border bg-slate-50 p-3 dark:bg-slate-950">
                <Gauge className="mb-2 h-4 w-4 text-primary" />
                <p className="text-xs font-semibold text-slate-500">Workload</p>
                <p className="font-black">{65 + (index * 8) % 25}%</p>
              </div>
              <div className="rounded-2xl border bg-slate-50 p-3 dark:bg-slate-950">
                <CheckCircle2 className="mb-2 h-4 w-4 text-success" />
                <p className="text-xs font-semibold text-slate-500">Assigned</p>
                <p className="font-black">{index + 2} tasks</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <Shield className="h-4 w-4 text-slate-400" />
              {user.role === 'ADMIN' ? 'Workspace administrator' : 'Project contributor'}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Team;
