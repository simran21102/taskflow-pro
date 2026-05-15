import { badgeClass, labelize } from '../utils/format';

const Badge = ({ value }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black ring-1 ring-inset ring-black/5 dark:ring-white/10 ${badgeClass(value)}`}>{labelize(value)}</span>
);

export default Badge;
