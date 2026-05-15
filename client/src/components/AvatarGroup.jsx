const initialsUrl = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=4F46E5&color=fff`;

const AvatarGroup = ({ users = [], max = 4, size = 'h-8 w-8' }) => {
  const visible = users.slice(0, max);
  const remaining = users.length - visible.length;

  return (
    <div className="flex -space-x-2">
      {visible.map((user) => (
        <img
          key={user.id || user.email || user.name}
          src={user.avatar || initialsUrl(user.name)}
          alt={user.name}
          title={user.name}
          className={`${size} rounded-full border-2 border-white object-cover dark:border-slate-900`}
        />
      ))}
      {remaining > 0 && (
        <span className={`${size} grid place-items-center rounded-full border-2 border-white bg-slate-100 text-xs font-bold text-slate-600 dark:border-slate-900 dark:bg-slate-800 dark:text-slate-300`}>
          +{remaining}
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
