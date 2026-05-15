import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import CalendarFilters from '../components/CalendarFilters';
import CalendarSidebar from '../components/CalendarSidebar';
import CreateTaskModal from '../components/CreateTaskModal';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';
import TaskEventModal from '../components/TaskEventModal';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import { api, messageFromError } from '../services/api';

const priorityColors = {
  HIGH: '#EF4444',
  MEDIUM: '#F59E0B',
  LOW: '#10B981',
};

const emptyTask = { title: '', description: '', priority: 'MEDIUM', status: 'TODO', dueDate: '', assignedToId: '', projectId: '' };

const dateOnly = (date) => {
  const value = new Date(date);
  value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
  return value.toISOString().slice(0, 10);
};

const CalendarPage = () => {
  const calendarRef = useRef(null);
  const { isAdmin } = useAuth();
  const [title, setTitle] = useState('');
  const [view, setView] = useState('dayGridMonth');
  const [selectedTask, setSelectedTask] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState(emptyTask);
  const [filters, setFilters] = useState({ search: '', projectId: '', priority: '', status: '', assignedToId: '' });

  const { data: taskPage, loading, reload } = useApi('/tasks', { initialData: { data: [] }, params: { limit: 50 } });
  const { data: projects } = useApi('/projects', { initialData: [] });
  const { data: users } = useApi('/users', { initialData: [] });

  const tasks = taskPage?.data || [];
  const filteredTasks = useMemo(() => tasks
    .filter((task) => task.title.toLowerCase().includes(filters.search.toLowerCase()))
    .filter((task) => !filters.projectId || task.project.id === filters.projectId)
    .filter((task) => !filters.priority || task.priority === filters.priority)
    .filter((task) => !filters.status || task.status === filters.status)
    .filter((task) => !filters.assignedToId || task.assignedTo.id === filters.assignedToId), [tasks, filters]);

  const events = filteredTasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    allDay: true,
    backgroundColor: priorityColors[task.priority] || '#4F46E5',
    borderColor: priorityColors[task.priority] || '#4F46E5',
    extendedProps: { task },
  }));

  const apiRef = () => calendarRef.current?.getApi();

  const updateTitle = () => {
    const apiInstance = apiRef();
    if (apiInstance) {
      setTitle(apiInstance.view.title);
      setView(apiInstance.view.type);
    }
  };

  const changeView = (nextView) => {
    apiRef()?.changeView(nextView);
    updateTitle();
  };

  const navigate = (action) => {
    apiRef()?.[action]();
    updateTitle();
  };

  const openCreate = (date) => {
    setForm({ ...emptyTask, dueDate: dateOnly(date) });
    setCreateOpen(true);
  };

  const createTask = async (event) => {
    event.preventDefault();
    try {
      await api.post('/tasks', form);
      toast.success('Task created');
      setCreateOpen(false);
      setForm(emptyTask);
      reload();
    } catch (error) {
      toast.error(messageFromError(error));
    }
  };

  const updateDueDate = async (info) => {
    const task = info.event.extendedProps.task;
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: info.event.start,
        assignedToId: task.assignedTo.id,
        projectId: task.project.id,
      });
      toast.success('Due date updated');
      reload();
    } catch (error) {
      info.revert();
      toast.error(messageFromError(error));
    }
  };

  if (loading) return <SkeletonLoader rows={5} />;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-primary">Calendar</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Team Calendar</h1>
          <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">Visualize tasks, deadlines, priority pressure, and delivery timing in one polished calendar workspace.</p>
        </div>
        {isAdmin && <button onClick={() => openCreate(new Date())} className="btn-primary"><Plus className="h-5 w-5" /> New task</button>}
      </section>

      <CalendarFilters filters={filters} setFilters={setFilters} projects={projects} users={users} />

      <section className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <CalendarSidebar tasks={filteredTasks} />

        <div className="surface overflow-hidden p-4">
          <div className="mb-4 flex flex-col gap-3 border-b pb-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('prev')} className="btn-secondary h-10 px-3 py-2" aria-label="Previous period"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => navigate('next')} className="btn-secondary h-10 px-3 py-2" aria-label="Next period"><ChevronRight className="h-4 w-4" /></button>
              <button onClick={() => navigate('today')} className="btn-secondary h-10 px-4 py-2">Today</button>
            </div>
            <h2 className="flex items-center gap-2 text-xl font-black text-slate-950 dark:text-white">
              <CalendarDays className="h-5 w-5 text-primary" />
              {title || 'Calendar'}
            </h2>
            <div className="flex rounded-2xl border bg-slate-50 p-1 dark:bg-slate-950">
              {[
                ['dayGridMonth', 'Month'],
                ['timeGridWeek', 'Week'],
                ['timeGridDay', 'Day'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => changeView(value)}
                  className={`rounded-xl px-3 py-2 text-sm font-black ${view === value ? 'bg-white text-primary shadow-sm dark:bg-slate-900' : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {tasks.length === 0 ? (
            <EmptyState title="No tasks scheduled yet." body="Create tasks with due dates to populate the calendar." />
          ) : (
            <div className="taskflow-calendar" aria-label="Task deadline calendar">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={false}
                events={events}
                height="auto"
                editable={isAdmin}
                selectable
                eventStartEditable={isAdmin}
                eventDurationEditable={false}
                dayMaxEvents={3}
                datesSet={updateTitle}
                eventClick={(info) => setSelectedTask(info.event.extendedProps.task)}
                dateClick={(info) => openCreate(info.date)}
                eventDrop={updateDueDate}
              />
            </div>
          )}
        </div>
      </section>

      <TaskEventModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      <CreateTaskModal open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={createTask} form={form} setForm={setForm} projects={projects} users={users} isAdmin={isAdmin} />
    </div>
  );
};

export default CalendarPage;
