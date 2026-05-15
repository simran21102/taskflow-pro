const SkeletonLoader = ({ rows = 4 }) => (
  <div className="space-y-4">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="surface animate-pulse p-5">
        <div className="h-4 w-1/3 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-3 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800" />
        <div className="mt-3 h-3 w-1/2 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>
    ))}
  </div>
);

export default SkeletonLoader;
