import { Bell, CalendarClock, CheckCircle2, FolderKanban, ListTodo } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const initialNotifications = [
  {
    id: 1,
    title: 'Task assigned',
    message: 'You were assigned Design Landing Page',
    time: '2h ago',
    read: false,
    type: 'task',
  },
  {
    id: 2,
    title: 'Project updated',
    message: 'Website Redesign was updated',
    time: '4h ago',
    read: false,
    type: 'project',
  },
  {
    id: 3,
    title: 'Deadline approaching',
    message: 'API Integration is due tomorrow',
    time: 'Today',
    read: false,
    type: 'deadline',
  },
  {
    id: 4,
    title: 'Task completed',
    message: 'Rahul completed Database Setup',
    time: 'Yesterday',
    read: true,
    type: 'complete',
  },
];

const typeStyles = {
  task: { icon: ListTodo, className: 'bg-indigo-50 text-primary dark:bg-indigo-500/15' },
  project: { icon: FolderKanban, className: 'bg-violet-50 text-secondary dark:bg-violet-500/15' },
  deadline: { icon: CalendarClock, className: 'bg-amber-50 text-warning dark:bg-amber-500/15' },
  complete: { icon: CheckCircle2, className: 'bg-emerald-50 text-success dark:bg-emerald-500/15' },
};

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const wrapperRef = useRef(null);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const markAsRead = (id) => {
    setNotifications((items) => items.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllAsRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, read: true })));
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="group relative rounded-2xl border bg-white p-3 text-slate-600 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        aria-label="Notifications"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Bell className="h-5 w-5 transition duration-200 group-hover:-rotate-12 group-hover:text-primary" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-danger px-1.5 text-[10px] font-black text-white ring-2 ring-white dark:ring-slate-900">
            {unreadCount}
          </span>
        )}
      </button>

      <div
        className={`absolute right-0 top-full z-50 mt-3 w-[calc(100vw-2rem)] max-w-[380px] origin-top-right rounded-2xl border border-gray-200 bg-white shadow-xl transition duration-150 dark:border-slate-800 dark:bg-slate-900 ${
          isOpen ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
        role="menu"
        aria-label="Notifications menu"
      >
        <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
          <div>
            <h2 className="text-base font-black text-slate-950 dark:text-white">Notifications</h2>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">{unreadCount} unread updates</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-black text-danger dark:bg-red-500/15">{unreadCount}</span>}
            <button onClick={markAllAsRead} className="rounded-xl px-2 py-1.5 text-xs font-black text-primary hover:bg-indigo-50 dark:hover:bg-indigo-500/15">
              Mark all as read
            </button>
          </div>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-2">
          {notifications.length === 0 ? (
            <div className="grid place-items-center px-6 py-12 text-center">
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <Bell className="h-6 w-6" />
              </div>
              <p className="font-black text-slate-950 dark:text-white">No new notifications</p>
              <p className="mt-1 text-sm text-slate-500">You are all caught up.</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const meta = typeStyles[notification.type] || typeStyles.task;
              const Icon = meta.icon;
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => markAsRead(notification.id)}
                  className="flex w-full items-start gap-3 rounded-2xl p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-950"
                  role="menuitem"
                >
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${meta.className}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-black text-slate-950 dark:text-white">{notification.title}</p>
                      {!notification.read && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
                    </div>
                    <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">{notification.message}</p>
                    <p className="mt-2 text-xs font-bold text-slate-400">{notification.time}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="border-t p-3">
          <button className="w-full rounded-2xl px-4 py-3 text-sm font-black text-primary hover:bg-indigo-50 dark:hover:bg-indigo-500/15">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
