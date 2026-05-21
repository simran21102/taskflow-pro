import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Plus,
  Settings,
  Sun,
  User,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Breadcrumbs from '../components/Breadcrumbs';
import GlobalSearch from '../components/GlobalSearch';
import NotificationDropdown from '../components/NotificationDropdown';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/team', label: 'Team', icon: Users },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ collapsed, onToggle, onNavigate }) => (
  <aside className={`flex h-full flex-col border-r bg-white/95 px-3 py-4 backdrop-blur dark:bg-slate-950/95 ${collapsed ? 'w-20' : 'w-[280px]'}`}>
    <div className="mb-6 flex items-center justify-between gap-3 px-2">
      <Link to="/dashboard" className="flex min-w-0 items-center gap-3" onClick={onNavigate} aria-label="TaskFlow Pro dashboard">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-lg font-black text-white shadow-lg shadow-indigo-200/50 dark:shadow-none">T</div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-base font-black text-slate-950 dark:text-white">TaskFlow Pro</p>
            <p className="truncate text-xs font-medium text-slate-500">Enterprise workspace</p>
          </div>
        )}
      </Link>
      <button onClick={onToggle} className="hidden rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 lg:inline-flex" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </div>

    <nav className="space-y-1" aria-label="Primary navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition ${
              isActive
                ? 'bg-indigo-50 text-primary shadow-sm dark:bg-indigo-500/15 dark:text-indigo-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'
            }`
          }
          title={collapsed ? item.label : undefined}
        >
          <item.icon className="h-5 w-5 shrink-0" />
          {!collapsed && <span>{item.label}</span>}
        </NavLink>
      ))}
    </nav>

    {!collapsed && (
      <div className="mt-auto rounded-2xl border bg-gradient-to-br from-indigo-50 to-violet-50 p-4 dark:from-indigo-500/10 dark:to-violet-500/10">
        <p className="text-sm font-black text-slate-950 dark:text-white">Workspace health</p>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Projects, people, and delivery signals in one calm command center.</p>
      </div>
    )}
  </aside>
);

const AppLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('taskflow_theme') === 'dark');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('taskflow_theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className={`fixed inset-y-0 left-0 z-40 hidden transition-all duration-300 lg:block ${collapsed ? 'w-20' : 'w-[280px]'}`}>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} aria-label="Close navigation" />
          <div className="relative h-full w-[280px] shadow-soft">
            <button onClick={() => setDrawerOpen(false)} className="absolute right-3 top-3 z-10 rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
            <Sidebar collapsed={false} onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className={`transition-all duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-[280px]'}`}>
        <header className="sticky top-0 z-30 border-b bg-white/85 backdrop-blur-xl dark:bg-slate-950/85">
          <div className="flex h-20 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button onClick={() => setDrawerOpen(true)} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 lg:hidden" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden min-w-0 shrink-0 xl:block">
                <Breadcrumbs />
              </div>
              <GlobalSearch />
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button onClick={() => navigate('/tasks')} className="hidden btn-primary h-11 px-4 py-2 xl:inline-flex">
                <Plus className="h-4 w-4" />
                Quick create
              </button>
              <NotificationDropdown />
              <button onClick={() => setDark((value) => !value)} className="rounded-2xl border bg-white p-3 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Toggle dark mode">
                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <div className="relative">
                <button onClick={() => setProfileOpen((value) => !value)} className="flex items-center gap-3 rounded-2xl border bg-white p-1.5 pr-3 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800" aria-haspopup="menu" aria-expanded={profileOpen}>
                  <img src={user?.avatar} alt={user?.name} className="h-9 w-9 rounded-xl object-cover" />
                  <div className="hidden text-left md:block">
                    <p className="max-w-28 truncate text-sm font-black">{user?.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{user?.role}</p>
                  </div>
                </button>
                {profileOpen && (
                  <div role="menu" className="absolute right-0 mt-3 w-56 rounded-2xl border bg-white p-2 shadow-soft dark:bg-slate-900">
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"><User className="h-4 w-4" /> Profile</Link>
                    <button onClick={() => logout()} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-danger hover:bg-red-50 dark:hover:bg-red-500/10"><LogOut className="h-4 w-4" /> Log out</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="border-t px-4 py-3 sm:hidden">
            <Breadcrumbs />
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
