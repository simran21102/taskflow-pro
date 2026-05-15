import { AlertTriangle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../ConfirmDialog';
import { SectionCard } from './SettingsPrimitives';

const DangerZone = () => {
  const [action, setAction] = useState(null);

  const confirm = () => {
    toast.success(action === 'account' ? 'Account deletion confirmed' : 'Workspace data removal confirmed');
    setAction(null);
  };

  return (
    <>
      <SectionCard title="Danger Zone" description="Destructive actions require confirmation and cannot be undone." tone="danger">
        <div className="space-y-3">
          <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-danger" />
              <div>
                <p className="font-black text-danger">Delete account</p>
                <p className="text-sm text-red-700 dark:text-red-300">Permanently remove your account and access.</p>
              </div>
            </div>
            <button onClick={() => setAction('account')} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-danger px-4 py-3 text-sm font-bold text-white hover:bg-red-600"><Trash2 className="h-4 w-4" /> Delete account</button>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-danger" />
              <div>
                <p className="font-black text-danger">Remove all data</p>
                <p className="text-sm text-red-700 dark:text-red-300">Delete all local projects, tasks, and workspace records.</p>
              </div>
            </div>
            <button onClick={() => setAction('data')} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-danger hover:bg-red-50 dark:bg-slate-900 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /> Remove data</button>
          </div>
        </div>
      </SectionCard>
      <ConfirmDialog
        open={Boolean(action)}
        title={action === 'account' ? 'Delete account?' : 'Remove all data?'}
        body="This is a destructive action. Confirm only if you are certain."
        onCancel={() => setAction(null)}
        onConfirm={confirm}
      />
    </>
  );
};

export default DangerZone;
