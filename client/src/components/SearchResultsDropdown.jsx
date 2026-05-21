import { Clock3, Loader2, Search } from 'lucide-react';
import SearchResultItem from './SearchResultItem';

const SearchResultsDropdown = ({
  activeIndex,
  groupedResults,
  loading,
  onRecentSelect,
  onSelect,
  query,
  recentSearches,
  showRecent,
}) => {
  const visibleGroups = groupedResults
    .map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item, categoryBadge: group.badge })),
    }))
    .filter((group) => group.items.length > 0);

  let itemOffset = 0;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-3 max-h-[min(34rem,calc(100vh-7rem))] overflow-y-auto rounded-2xl border bg-white p-2 shadow-xl shadow-slate-900/10 dark:bg-slate-900 dark:shadow-black/30">
      {showRecent ? (
        <div className="p-2">
          <p className="px-2 pb-2 text-xs font-black uppercase tracking-wide text-slate-400">Recent searches</p>
          {recentSearches.length ? (
            <div className="space-y-1">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onRecentSelect(term)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Clock3 className="h-4 w-4 text-slate-400" />
                  <span className="truncate">{term}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid place-items-center px-4 py-8 text-center">
              <Search className="h-8 w-8 text-slate-300" />
              <p className="mt-2 text-sm font-bold text-slate-500">Start typing to search</p>
            </div>
          )}
        </div>
      ) : loading ? (
        <div className="space-y-2 p-2">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex animate-pulse items-center gap-3 rounded-lg px-3 py-2.5">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-2.5 w-1/2 rounded-full bg-slate-100 dark:bg-slate-800" />
              </div>
              <Loader2 className="h-4 w-4 animate-spin text-slate-300" />
            </div>
          ))}
        </div>
      ) : visibleGroups.length ? (
        <div className="space-y-3">
          {visibleGroups.map((group) => {
            const startOffset = itemOffset;
            itemOffset += group.items.length;

            return (
              <section key={group.key}>
                <p className="px-3 pb-1 pt-2 text-xs font-black uppercase tracking-wide text-slate-400">{group.label}</p>
                <div className="space-y-1">
                  {group.items.map((item, index) => (
                    <SearchResultItem
                      key={`${group.key}-${item.id}`}
                      active={activeIndex === startOffset + index}
                      icon={group.icon}
                      item={item}
                      onSelect={onSelect}
                      query={query}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid place-items-center px-4 py-10 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 text-slate-300 dark:bg-slate-800">
            <Search className="h-6 w-6" />
          </div>
          <p className="mt-3 text-sm font-black text-slate-700 dark:text-slate-200">No results found</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsDropdown;
