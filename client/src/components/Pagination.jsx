const Pagination = ({ page, pages, onPrevious, onNext }) => (
  <nav className="flex items-center justify-end gap-2" aria-label="Pagination">
    <button disabled={page <= 1} onClick={onPrevious} className="btn-secondary h-10 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
    <span className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">Page {page} of {pages}</span>
    <button disabled={page >= pages} onClick={onNext} className="btn-secondary h-10 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
  </nav>
);

export default Pagination;
