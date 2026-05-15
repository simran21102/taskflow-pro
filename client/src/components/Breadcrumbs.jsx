import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const parts = useLocation().pathname.split('/').filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
      <Link to="/dashboard" className="hover:text-primary"><Home className="h-4 w-4" /></Link>
      {parts.map((part, index) => (
        <span className="flex items-center gap-2" key={`${part}-${index}`}>
          <ChevronRight className="h-4 w-4" />
          <span className="capitalize">{part.replace('-', ' ')}</span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
