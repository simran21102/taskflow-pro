import { CalendarDays, CheckCircle2, GripVertical, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import AvatarGroup from '../components/AvatarGroup';
import Badge from '../components/Badge';
import ChartCard from '../components/ChartCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { useApi } from '../hooks/useApi';
import { api, messageFromError } from '../services/api';
import { formatDate, labelize } from '../utils/format';

const columns = [
  { id: 'TODO', title: 'Todo' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'REVIEW', title: 'Review' },
  { id: 'COMPLETED', title: 'Completed' },
];

const progressFor = (tasks = []) => {
  if (!tasks.length) return 0;
  return Math.round((tasks.filter((task) => task.status === 'COMPLETED').length / tasks.length) * 100);
};

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project, loading, reload } = useApi(`/projects/${id}`);
  const [draggingId, setDraggingId] = useState(null);

  const grouped = useMemo(() => {
    const result = Object.fromEntries(columns.map((column) => [column.id, []]));
    project?.tasks?.forEach((task) => result[task.status]?.push(task));
    return result;
  }, [project]);

  if (loading) return <SkeletonLoader rows={5} />;

  const progress = progressFor(project.tasks);

  const moveTask = async (taskId, status) => {
    const task = project.tasks.find((item) => item.id === taskId);
    if (!task || task.status === status) return;
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status,
        dueDate: task.dueDate,
        assignedToId: task.assignedToId,
        projectId: project.id,
      });
      toast.success('Task moved');
      reload();
    } catch (error) {
      toast.error(messageFromError(error));
    }
  };

  return (
    <div className="space-y-6">
      <section className="surface overflow-hidden p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge value={project.status} />
              <span className="text-sm font-semibold text-slate-500">Created by {project.createdBy.name}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">{project.name}</h1>
            <p className="mt-2 max-w-3xl text-slate-500 dark:text-slate-400">{project.description}</p>
          </div>
          <AvatarGroup users={project.members} size="h-10 w-10" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <CalendarDays className="mb-3 h-5 w-5 text-primary" />
            <p className="text-sm font-semibold text-slate-500">Due Date</p>
            <p className="mt-1 font-black">{formatDate(project.dueDate)}</p>
          </div>
          <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <CheckCircle2 className="mb-3 h-5 w-5 text-success" />
            <p className="text-sm font-semibold text-slate-500">Progress</p>
            <p className="mt-1 font-black">{progress}% complete</p>
          </div>
          <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <Users className="mb-3 h-5 w-5 text-secondary" />
            <p className="text-sm font-semibold text-slate-500">Team</p>
            <p className="mt-1 font-black">{project.members.length} members</p>
          </div>
        </div>
        <div className="mt-6 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <ChartCard title="Kanban Board" subtitle="Drag cards between columns to update task status">
        <div className="grid gap-4 overflow-x-auto pb-2 xl:grid-cols-4">
          {columns.map((column) => (
            <section
              key={column.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                moveTask(draggingId, column.id);
                setDraggingId(null);
              }}
              className="min-h-96 min-w-64 rounded-2xl border bg-slate-50 p-3 dark:bg-slate-950"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="font-black text-slate-950 dark:text-white">{column.title}</h3>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-slate-500 dark:bg-slate-900">{grouped[column.id]?.length || 0}</span>
              </div>
              <div className="space-y-3">
                {grouped[column.id]?.map((task) => (
                  <article
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggingId(task.id)}
                    onDragEnd={() => setDraggingId(null)}
                    className="cursor-grab rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft active:cursor-grabbing dark:bg-slate-900"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <p className="font-black text-slate-950 dark:text-white">{task.title}</p>
                      <GripVertical className="h-4 w-4 shrink-0 text-slate-400" />
                    </div>
                    <p className="line-clamp-2 text-sm text-slate-500">{task.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <Badge value={task.priority} />
                      <span className="text-xs font-bold text-slate-400">{labelize(task.status)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </ChartCard>
    </div>
  );
};

export default ProjectDetails;
