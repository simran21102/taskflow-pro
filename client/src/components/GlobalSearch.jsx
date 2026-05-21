import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobalSearch } from '../hooks/useGlobalSearch';
import SearchResultsDropdown from './SearchResultsDropdown';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { flatResults, groupedResults, hasResults, loading, recentSearches, saveRecentSearch } = useGlobalSearch(query);
  const showRecent = open && !query.trim();

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  useEffect(() => {
    setActiveIndex(hasResults ? 0 : -1);
  }, [query, hasResults]);

  const selectResult = (item) => {
    saveRecentSearch(query || item.title);
    setQuery('');
    setOpen(false);
    setActiveIndex(-1);
    navigate(item.path);
  };

  const selectRecent = (term) => {
    setQuery(term);
    setOpen(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
      event.currentTarget.blur();
      return;
    }

    if (!open) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!flatResults.length) return;
      setActiveIndex((index) => (index + 1) % flatResults.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!flatResults.length) return;
      setActiveIndex((index) => (index <= 0 ? flatResults.length - 1 : index - 1));
    }

    if (event.key === 'Enter' && activeIndex >= 0 && flatResults[activeIndex]) {
      event.preventDefault();
      selectResult(flatResults[activeIndex]);
    }
  };

  return (
    <div ref={containerRef} className="relative hidden min-w-0 flex-1 lg:block 2xl:max-w-xl">
      <label className="relative block">
        <span className="sr-only">Global search</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          aria-label="Global search"
          aria-expanded={open}
          className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium placeholder:text-slate-400 transition hover:bg-white focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-900 dark:focus:border-indigo-500/60 dark:focus:ring-indigo-500/10"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search tasks, projects, reports, team members..."
          value={query}
        />
      </label>

      {open && (
        <SearchResultsDropdown
          activeIndex={activeIndex}
          groupedResults={groupedResults}
          loading={loading}
          onRecentSelect={selectRecent}
          onSelect={selectResult}
          query={query}
          recentSearches={recentSearches}
          showRecent={showRecent}
        />
      )}
    </div>
  );
};

export default GlobalSearch;
