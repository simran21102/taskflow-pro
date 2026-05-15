import toast from 'react-hot-toast';
import { useState } from 'react';
import { SectionCard, ToggleSwitch } from './SettingsPrimitives';

const options = [
  ['taskAssignments', 'Task assignments', 'Notify me when work is assigned to me.'],
  ['projectUpdates', 'Project updates', 'Updates when project status or scope changes.'],
  ['deadlineReminders', 'Deadline reminders', 'Remind me before due dates arrive.'],
  ['teamMentions', 'Team mentions', 'Notify me when teammates mention me.'],
  ['weeklySummary', 'Weekly summary emails', 'Send a summary of team progress every Monday.'],
  ['inApp', 'In-app notifications', 'Show notifications inside TaskFlow Pro.'],
  ['email', 'Email notifications', 'Send important notifications by email.'],
];

const NotificationSettings = () => {
  const [settings, setSettings] = useState(Object.fromEntries(options.map(([key]) => [key, true])));

  const update = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
    toast.success('Notification preference updated');
  };

  return (
    <SectionCard title="Notification Settings" description="Choose which updates should reach you and where they should appear.">
      <div className="grid gap-3">
        {options.map(([key, label, description]) => (
          <ToggleSwitch key={key} checked={settings[key]} onChange={(value) => update(key, value)} label={label} description={description} />
        ))}
      </div>
    </SectionCard>
  );
};

export default NotificationSettings;
