import { Grid2X2, List, Plus, SlidersHorizontal, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AvatarGroup from '../components/AvatarGroup';
import Badge from '../components/Badge';
import ConfirmDialog from '../components/ConfirmDialog';
import DataTable from '../components/DataTable';
import EmptyState from '../components/EmptyState';
import FilterDropdown from '../components/FilterDropdown';
import Modal from '../components/Modal';
import SearchInput from '../components/SearchInput';
import SkeletonLoader from '../components/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import { api, messageFromError } from '../services/api';
import { formatDate } from '../utils/format';

const emptyProject = { name: '', description: '', status: 'ACTIVE', dueDate: '', memberIds: [] };

const progressFor = (project) => {
  if (!project.tasks?.length) return project.status === 'COMPLETED' ? 100 : 0;
  const done = project.tasks.filter((task) => task.status === 'COMPLETED').length;
  return Math.round((done / project.tasks.length) * 100);
};

const Projects = () => {
  const { isAdmin } = useAuth();
  const { data: projects, loading, reload } = useApi('/projects', { initialData: [] });
  const { data: users } = useApi('/users', { initialData: [] });
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [view, setView] = useState('cards');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [removeId, setRemoveId] = useState(null);

  const filtered = useMemo(() => projects
    .filter((project) => project.name.toLowerCase().includes(query.toLowerCase()))
    .filter((project) => !status || project.status === status), [projects, query, status]);

  const save = async (event) => {
    event.preventDefault();
    try {
      await api.post('/projects', form);
      toast.success('Project created');
      setModal(false);
      setForm(emptyProject);
      reload();
    } catch (error) {
      toast.error(messageFromError(error));
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/projects/${removeId}`);
      toast.success('Project deleted');
      setRemoveId(null);
      reload();
    } catch (error) {
      toast.error(messageFromError(error));
    }
  };

  if (loading) return <SkeletonLoader rows={4} />;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-primary">Portfolio</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Projects</h1>
          <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">Plan work, assign members, and keep every initiative moving with visible ownership.</p>
        </div>
        {isAdmin && <button onClick={() => setModal(true)} className="btn-primary"><Plus className="h-5 w-5" /> New Project</button>}
      </section>

      <section className="surface flex flex-col gap-3 p-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid flex-1 gap-3 md:grid-cols-[1fr_220px]">
          <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search project name" />
          <FilterDropdown label="All status" value={status} onChange={(event) => setStatus(event.target.value)} options={[
            { value: 'ACTIVE', label: 'Active' },
            { value: 'COMPLETED', label: 'Completed' },
            { value: 'ON_HOLD', label: 'On Hold' },
          ]} />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary h-12"><SlidersHorizontal className="h-4 w-4" /> Sort</button>
          <div className="flex rounded-2xl border bg-slate-50 p-1 dark:bg-slate-950">
            <button onClick={() => setView('cards')} className={`rounded-xl p-2 ${view === 'cards' ? 'bg-white text-primary shadow-sm dark:bg-slate-900' : 'text-slate-500'}`} aria-label="Card view"><Grid2X2 className="h-5 w-5" /></button>
            <button onClick={() => setView('table')} className={`rounded-xl p-2 ${view === 'table' ? 'bg-white text-primary shadow-sm dark:bg-slate-900' : 'text-slate-500'}`} aria-label="Table view"><List className="h-5 w-5" /></button>
          </div>
        </div>
      </section>

      {filtered.length === 0 ? <EmptyState title="No projects found" body="Adjust filters or create a project to begin." /> : view === 'cards' ? (
        <section className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((project) => {
            const progress = progressFor(project);
            return (
              <article key={project.id} className="surface surface-hover p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link to={`/projects/${project.id}`} className="text-xl font-black text-slate-950 hover:text-primary dark:text-white">{project.name}</Link>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{project.description}</p>
                  </div>
                  <Badge value={project.status} />
                </div>
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-500">Progress</span>
                    <span className="font-black text-slate-950 dark:text-white">{progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Due date</p>
                    <p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">{formatDate(project.dueDate)}</p>
                  </div>
                  <AvatarGroup users={project.members} />
                </div>
                {isAdmin && <button onClick={() => setRemoveId(project.id)} className="mt-5 inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-bold text-danger hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /> Delete</button>}
              </article>
            );
          })}
        </section>
      ) : (
        <DataTable
          columns={['Project', 'Status', 'Progress', 'Due', 'Team', 'Actions']}
          rows={filtered}
          renderRow={(project) => {
            const progress = progressFor(project);
            return (
              <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                <td className="px-4 py-4"><Link to={`/projects/${project.id}`} className="font-black text-slate-950 hover:text-primary dark:text-white">{project.name}</Link><p className="mt-1 max-w-md truncate text-sm text-slate-500">{project.description}</p></td>
                <td className="px-4 py-4"><Badge value={project.status} /></td>
                <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="h-2 w-28 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} /></div><span className="font-bold">{progress}%</span></div></td>
                <td className="px-4 py-4 font-semibold text-slate-600 dark:text-slate-300">{formatDate(project.dueDate)}</td>
                <td className="px-4 py-4"><AvatarGroup users={project.members} /></td>
                <td className="px-4 py-4">{isAdmin && <button onClick={() => setRemoveId(project.id)} className="rounded-xl p-2 text-danger hover:bg-red-50 dark:hover:bg-red-500/10" aria-label="Delete project"><Trash2 className="h-5 w-5" /></button>}</td>
              </tr>
            );
          }}
        />
      )}

      <Modal open={modal} title="Create project" onClose={() => setModal(false)}>
        <form onSubmit={save} className="grid gap-4">
          <input required placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field" />
          <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="field min-h-28" />
          <div className="grid gap-4 sm:grid-cols-2">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="field"><option value="ACTIVE">Active</option><option value="COMPLETED">Completed</option><option value="ON_HOLD">On Hold</option></select>
            <input required type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="field" />
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Assign members</span>
            <select multiple value={form.memberIds} onChange={(e) => setForm({ ...form, memberIds: Array.from(e.target.selectedOptions).map((option) => option.value) })} className="field min-h-32">
              {users.filter((user) => user.role === 'MEMBER').map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
          </label>
          <button className="btn-primary">Create project</button>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(removeId)} title="Delete project?" body="This will remove the project and its tasks." onCancel={() => setRemoveId(null)} onConfirm={remove} />
    </div>
  );
};

export default Projects;
