import Modal from './Modal';

const CreateTaskModal = ({ open, onClose, onSubmit, form, setForm, projects = [], users = [], isAdmin }) => (
  <Modal open={open} title="Create task from calendar" onClose={onClose}>
    {!isAdmin ? (
      <div className="rounded-2xl border bg-slate-50 p-5 text-sm text-slate-500 dark:bg-slate-950">
        Only admins can create tasks. Select an existing task to view details.
      </div>
    ) : (
      <form onSubmit={onSubmit} className="grid gap-4">
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="field" />
        <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="field min-h-28" />
        <div className="grid gap-4 sm:grid-cols-2">
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="field">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="field">
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <select required value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} className="field">
            <option value="">Project</option>
            {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
          </select>
          <select required value={form.assignedToId} onChange={(e) => setForm({ ...form, assignedToId: e.target.value })} className="field">
            <option value="">Assignee</option>
            {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
          <input required type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="field" />
        </div>
        <button className="btn-primary">Create task</button>
      </form>
    )}
  </Modal>
);

export default CreateTaskModal;
