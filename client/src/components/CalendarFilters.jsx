import FilterDropdown from './FilterDropdown';
import SearchInput from './SearchInput';

const statusOptions = [
  { value: 'TODO', label: 'Todo' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'REVIEW', label: 'Review' },
  { value: 'COMPLETED', label: 'Completed' },
];

const priorityOptions = [
  { value: 'HIGH', label: 'High' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LOW', label: 'Low' },
];

const CalendarFilters = ({ filters, setFilters, projects = [], users = [] }) => (
  <section className="surface grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-5" aria-label="Calendar filters">
    <SearchInput
      className="md:col-span-2 xl:col-span-1"
      value={filters.search}
      onChange={(event) => setFilters({ ...filters, search: event.target.value })}
      placeholder="Search tasks"
    />
    <FilterDropdown
      label="All projects"
      value={filters.projectId}
      onChange={(event) => setFilters({ ...filters, projectId: event.target.value })}
      options={projects.map((project) => ({ value: project.id, label: project.name }))}
    />
    <FilterDropdown
      label="All priority"
      value={filters.priority}
      onChange={(event) => setFilters({ ...filters, priority: event.target.value })}
      options={priorityOptions}
    />
    <FilterDropdown
      label="All status"
      value={filters.status}
      onChange={(event) => setFilters({ ...filters, status: event.target.value })}
      options={statusOptions}
    />
    <FilterDropdown
      label="All assignees"
      value={filters.assignedToId}
      onChange={(event) => setFilters({ ...filters, assignedToId: event.target.value })}
      options={users.map((user) => ({ value: user.id, label: user.name }))}
    />
  </section>
);

export default CalendarFilters;
