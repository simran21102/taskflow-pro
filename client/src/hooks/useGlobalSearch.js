import { useEffect, useMemo, useState } from 'react';
import { BarChart3, CheckSquare, FolderKanban, Users } from 'lucide-react';
import { api } from '../services/api';

const RECENT_SEARCHES_KEY = 'taskflow_recent_searches';

const reports = [
  {
    id: 'overview',
    title: 'Executive overview',
    description: 'Portfolio health, delivery progress, and workload signals.',
    path: '/reports',
  },
  {
    id: 'progress',
    title: 'Task progress report',
    description: 'Completion rate and task status breakdown.',
    path: '/reports',
  },
  {
    id: 'priority',
    title: 'Priority breakdown',
    description: 'Urgency distribution and high priority work.',
    path: '/reports',
  },
  {
    id: 'team-capacity',
    title: 'Team capacity',
    description: 'Contributor workload and assignment visibility.',
    path: '/reports',
  },
];

const categoryMeta = {
  tasks: { label: 'Tasks', badge: 'Task', icon: CheckSquare },
  projects: { label: 'Projects', badge: 'Project', icon: FolderKanban },
  teamMembers: { label: 'Team Members', badge: 'Team', icon: Users },
  reports: { label: 'Reports', badge: 'Report', icon: BarChart3 },
};

const getRecentSearches = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
  } catch {
    return [];
  }
};

const matches = (value, query) => String(value || '').toLowerCase().includes(query.toLowerCase());

const limitGroup = (items, max = 5) => items.slice(0, max);

const normalizeResults = ({ tasks, projects, users }, query) => ({
  tasks: limitGroup(tasks
    .filter((task) => matches(task.title, query) || matches(task.description, query) || matches(task.project?.name, query)))
    .map((task) => ({
      id: task.id,
      title: task.title,
      description: task.project?.name ? `${task.project.name} · ${task.status}` : task.description,
      path: `/tasks?search=${encodeURIComponent(task.title)}`,
      category: 'tasks',
      searchText: `${task.title} ${task.description || ''} ${task.project?.name || ''}`,
    })),
  projects: limitGroup(projects
    .filter((project) => matches(project.name, query) || matches(project.description, query) || matches(project.status, query)))
    .map((project) => ({
      id: project.id,
      title: project.name,
      description: project.description || `${project.status} project`,
      path: `/projects/${project.id}`,
      category: 'projects',
      searchText: `${project.name} ${project.description || ''} ${project.status || ''}`,
    })),
  teamMembers: limitGroup(users
    .filter((user) => matches(user.name, query) || matches(user.email, query) || matches(user.role, query)))
    .map((user) => ({
      id: user.id,
      title: user.name,
      description: `${user.email} · ${user.role}`,
      path: `/team?search=${encodeURIComponent(user.name)}`,
      category: 'teamMembers',
      searchText: `${user.name} ${user.email} ${user.role}`,
      avatar: user.avatar,
    })),
  reports: reports
    .filter((report) => matches(report.title, query) || matches(report.description, query))
    .map((report) => ({
      ...report,
      category: 'reports',
      searchText: `${report.title} ${report.description}`,
    })),
});

export const useGlobalSearch = (query) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ tasks: [], projects: [], teamMembers: [], reports: [] });
  const [recentSearches, setRecentSearches] = useState(getRecentSearches);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults({ tasks: [], projects: [], teamMembers: [], reports: [] });
      setLoading(false);
      return;
    }

    let active = true;
    const search = async () => {
      setLoading(true);
      try {
        const [{ data: taskPage }, { data: projectData }, { data: userData }] = await Promise.all([
          api.get('/tasks', { params: { search: debouncedQuery, limit: 8 } }),
          api.get('/projects'),
          api.get('/users'),
        ]);

        if (active) {
          setResults(normalizeResults({ tasks: taskPage.data || [], projects: projectData || [], users: userData || [] }, debouncedQuery));
        }
      } catch {
        if (active) setResults({ tasks: [], projects: [], teamMembers: [], reports: [] });
      } finally {
        if (active) setLoading(false);
      }
    };

    search();
    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  const groupedResults = useMemo(() => {
    return Object.entries(results).map(([key, items]) => ({ key, ...categoryMeta[key], items }));
  }, [results]);

  const flatResults = useMemo(() => groupedResults.flatMap((group) => group.items), [groupedResults]);

  const saveRecentSearch = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    const next = [trimmed, ...recentSearches.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
    setRecentSearches(next);
  };

  return {
    debouncedQuery,
    flatResults,
    groupedResults,
    hasResults: flatResults.length > 0,
    loading,
    recentSearches,
    saveRecentSearch,
  };
};
