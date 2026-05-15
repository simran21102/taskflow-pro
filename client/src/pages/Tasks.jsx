import { MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Badge from '../components/Badge';
import ConfirmDialog from '../components/ConfirmDialog';
import DataTable from '../components/DataTable';
import EmptyState from '../components/EmptyState';
import FilterDropdown from '../components/FilterDropdown';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';
import SkeletonLoader from '../components/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { api, messageFromError } from '../services/api';
import { formatDate, isOverdue } from '../utils/format';

const emptyTask = { title: '', description: '', priority: 'MEDIUM', status: 'TODO', dueDate: '', assignedToId: '', projectId: '' };

const statusOptions = [
  { value: 'TODO', label: 'Todo' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'REVIEW', label: 'Review' },
  { value: 'COMPLETED', label: 'Completed' },
];

const priorityOptions = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

const Tasks = () => {
  const { isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', projectId: '', assignedToId: '', page: 1 });
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyTask);
  const [removeId, setRemoveId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [{ data: taskPage }, { data: userData }, { data: projectData }] = await Promise.all([
        api.get('/tasks', { params: filters }),
        api.get('/users'),
        api.get('/projects'),
      ]);
      setTasks(taskPage.data);
      setPagination(taskPage.pagination);
      setUsers(userData);
      setProjects(projectData);
    } catch (error) {
      toast.error(messageFromError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [JSON.stringify(filters)]);

  const updateStatus = async (task, status) => {
    try {
      await api.put(`/tasks/${task.id}`, isAdmin ? { ...task, status, assignedToId: task.assignedTo.id, projectId: task.project.id } : { status });
      toast.success('Task updated');
      load();
    } catch (error) {
      toast.error(messageFromError(error));
    }
  };

  const save = async (event) => {
    event.preventDefault();
    try {
      await api.post('/tasks', form);
      toast.success('Task assigned');
      setModal(false);
      setForm(emptyTask);
      load();
    } catch (error) {
      toast.error(messageFromError(error));
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/tasks/${removeId}`);
      toast.success('Task deleted');
      setRemoveId(null);
      load();
    } catch (error) {
      toast.error(messageFromError(error));
    }
  };

  const projectOptions = projects.map((project) => ({ value: project.id, label: project.name }));
  const userOptions = users.map((user) => ({ value: user.id, label: user.name }));

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-primary">Execution</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Tasks</h1>
          <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">Search, filter, assign, and move work through delivery with a fast operational table.</p>
        </div>
        {isAdmin && <button onClick={() => setModal(true)} className="btn-primary"><Plus className="h-5 w-5" /> New Task</button>}
      </section>

      <section className="surface grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-6">
        <SearchInput className="md:col-span-2 xl:col-span-2" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })} placeholder="Search tasks or projects" />
        <FilterDropdown label="All status" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })} options={statusOptions} />
        <FilterDropdown label="All priority" value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value, page: 1 })} options={priorityOptions} />
        <FilterDropdown label="All projects" value={filters.projectId} onChange={(e) => setFilters({ ...filters, projectId: e.target.value, page: 1 })} options={projectOptions} />
        {isAdmin && <FilterDropdown label="All assignees" value={filters.assignedToId} onChange={(e) => setFilters({ ...filters, assignedToId: e.target.value, page: 1 })} options={userOptions} />}
      </section>

      {loading ? <SkeletonLoader rows={3} /> : tasks.length === 0 ? <EmptyState title="No tasks found" body="Try clearing filters or create a new task." /> : (
        <DataTable
          columns={['Task', 'Project', 'Assignee', 'Priority', 'Status', 'Due', 'Actions']}
          rows={tasks}
          renderRow={(task) => (
            <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
              <td className="px-4 py-4">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-primary" aria-label={`Select ${task.title}`} />
                  <div>
                    <p className="font-black text-slate-950 dark:text-white">{task.title}</p>
                    <p className="mt-1 max-w-md truncate text-sm text-slate-500">{task.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-semibold text-slate-600 dark:text-slate-300">{task.project.name}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <img src={task.assignedTo.avatar} alt={task.assignedTo.name} className="h-8 w-8 rounded-full object-cover" />
                  <span className="font-semibold">{task.assignedTo.name}</span>
                </div>
              </td>
              <td className="px-4 py-4"><Badge value={task.priority} /></td>
              <td className="px-4 py-4">
                <select value={task.status} onChange={(e) => updateStatus(task, e.target.value)} className="rounded-xl border bg-white px-3 py-2 text-sm font-bold dark:bg-slate-950">
                  {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </td>
              <td className={`px-4 py-4 font-semibold ${isOverdue(task) ? 'text-danger' : 'text-slate-600 dark:text-slate-300'}`}>{formatDate(task.dueDate)}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-1">
                  <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="More task actions"><MoreHorizontal className="h-5 w-5" /></button>
                  {isAdmin && <button onClick={() => setRemoveId(task.id)} className="rounded-xl p-2 text-danger hover:bg-red-50 dark:hover:bg-red-500/10" aria-label="Delete task"><Trash2 className="h-5 w-5" /></button>}
                </div>
              </td>
            </tr>
          )}
        />
      )}

      <Pagination
        page={pagination.page}
        pages={pagination.pages}
        onPrevious={() => setFilters({ ...filters, page: pagination.page - 1 })}
        onNext={() => setFilters({ ...filters, page: pagination.page + 1 })}
      />

      <Modal open={modal} title="Create task" onClose={() => setModal(false)}>
        <form onSubmit={save} className="grid gap-4">
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="field" />
          <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="field min-h-28" />
          <div className="grid gap-4 sm:grid-cols-2">
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="field">{priorityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="field">{statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
            <select required value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} className="field"><option value="">Project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select>
            <select required value={form.assignedToId} onChange={(e) => setForm({ ...form, assignedToId: e.target.value })} className="field"><option value="">Assignee</option>{users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select>
            <input required type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="field" />
          </div>
          <button className="btn-primary">Create task</button>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(removeId)} title="Delete task?" body="This task will be permanently removed." onCancel={() => setRemoveId(null)} onConfirm={remove} />
    </div>
  );
};

export default Tasks;
