const DataTable = ({ columns, rows, renderRow }) => (
  <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-slate-900">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
          <tr>
            {columns.map((column) => <th key={column} className="px-4 py-3 font-bold">{column}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map(renderRow)}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataTable;
