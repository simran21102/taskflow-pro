const highlightText = (text, query) => {
  const value = String(text || '');
  const trimmed = query.trim();
  if (!trimmed) return value;

  const parts = value.split(new RegExp(`(${trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'));
  return parts.map((part, index) =>
    part.toLowerCase() === trimmed.toLowerCase()
      ? <mark key={`${part}-${index}`} className="rounded bg-indigo-100 px-0.5 font-black text-primary dark:bg-indigo-500/20 dark:text-indigo-200">{part}</mark>
      : part
  );
};

const SearchResultItem = ({ active = false, icon: Icon, item, onSelect, query }) => (
  <button
    type="button"
    onClick={() => onSelect(item)}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
      active ? 'bg-indigo-50 text-slate-950 dark:bg-indigo-500/15 dark:text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800/70'
    }`}
  >
    <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
      {item.avatar ? <img src={item.avatar} alt="" className="h-full w-full object-cover" /> : <Icon className="h-5 w-5" />}
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-black text-slate-950 dark:text-white">{highlightText(item.title, query)}</p>
      <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400">{highlightText(item.description, query)}</p>
    </div>
    <span className="shrink-0 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[11px] font-black text-primary dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200">
      {item.categoryBadge}
    </span>
  </button>
);

export default SearchResultItem;
