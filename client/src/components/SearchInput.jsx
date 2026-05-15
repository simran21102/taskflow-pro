import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder = 'Search', className = '' }) => (
  <label className={`relative block ${className}`}>
    <span className="sr-only">{placeholder}</span>
    <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="field h-12 pl-10"
    />
  </label>
);

export default SearchInput;
