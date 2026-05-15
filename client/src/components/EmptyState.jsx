import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'Nothing here yet', body = 'Create your first item to get started.' }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white p-12 text-center shadow-sm dark:bg-slate-900">
    <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-primary dark:bg-indigo-500/15">
      <Inbox className="h-7 w-7" />
    </div>
    <h3 className="font-black text-slate-950 dark:text-white">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{body}</p>
  </div>
);

export default EmptyState;
