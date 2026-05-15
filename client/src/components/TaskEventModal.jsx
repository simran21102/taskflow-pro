import { CalendarDays, UserRound } from 'lucide-react';
import Badge from './Badge';
import Modal from './Modal';
import { formatDate } from '../utils/format';

const TaskEventModal = ({ task, onClose }) => (
  <Modal open={Boolean(task)} title="Task details" onClose={onClose}>
    {task && (
      <div className="space-y-5">
        <div>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">{task.title}</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{task.description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-500">Project</p>
            <p className="mt-1 font-black">{task.project?.name}</p>
          </div>
          <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-500">Due date</p>
            <p className="mt-1 flex items-center gap-2 font-black"><CalendarDays className="h-4 w-4 text-primary" /> {formatDate(task.dueDate)}</p>
          </div>
          <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-500">Priority</p>
            <div className="mt-2"><Badge value={task.priority} /></div>
          </div>
          <div className="rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-500">Status</p>
            <div className="mt-2"><Badge value={task.status} /></div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950">
          <UserRound className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-slate-500">Assigned user</p>
            <p className="font-black">{task.assignedTo?.name}</p>
          </div>
        </div>
      </div>
    )}
  </Modal>
);

export default TaskEventModal;
