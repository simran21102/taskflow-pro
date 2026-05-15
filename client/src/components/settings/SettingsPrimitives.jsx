export const SectionCard = ({ title, description, children, action, tone = 'default' }) => (
  <section className={`rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900 ${tone === 'danger' ? 'border-red-200 dark:border-red-500/30' : ''}`}>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className={`text-lg font-black ${tone === 'danger' ? 'text-danger' : 'text-slate-950 dark:text-white'}`}>{title}</h2>
        {description && <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
    {children}
  </section>
);

export const InputField = ({ label, error, as = 'input', className = '', ...props }) => {
  const Component = as;
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{label}</span>
      <Component className={`field mt-2 ${className}`} {...props} />
      {error && <span className="mt-1 block text-sm font-semibold text-danger">{error}</span>}
    </label>
  );
};

export const ToggleSwitch = ({ checked, onChange, label, description }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex w-full items-center justify-between gap-4 rounded-2xl border bg-slate-50 p-4 text-left hover:bg-white dark:bg-slate-950 dark:hover:bg-slate-900"
    aria-pressed={checked}
  >
    <span>
      <span className="block font-bold text-slate-950 dark:text-white">{label}</span>
      {description && <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{description}</span>}
    </span>
    <span className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}>
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${checked ? 'left-6' : 'left-1'}`} />
    </span>
  </button>
);
