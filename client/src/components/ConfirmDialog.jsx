import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ open, title, body, onCancel, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-soft dark:bg-slate-900">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-red-100 p-3 text-danger dark:bg-red-500/15">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{body}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="btn-secondary px-4 py-2">Cancel</button>
          <button onClick={onConfirm} className="inline-flex rounded-2xl bg-danger px-4 py-2 text-sm font-bold text-white hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
