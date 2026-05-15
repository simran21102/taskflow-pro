export const labelize = (value = '') => value.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

export const formatDate = (value) => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));

export const isOverdue = (task) => task.status !== 'COMPLETED' && new Date(task.dueDate) < new Date();

export const badgeClass = (value) => {
  const map = {
    ACTIVE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    COMPLETED: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
    ON_HOLD: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    TODO: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
    REVIEW: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300',
    LOW: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    MEDIUM: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    HIGH: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  };
  return map[value] || map.TODO;
};
