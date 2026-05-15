import { CalendarDays, Github, HardDrive, Slack } from 'lucide-react';
import { useState } from 'react';
import Badge from '../Badge';
import { SectionCard } from './SettingsPrimitives';

const integrations = [
  ['github', 'GitHub', 'Sync issues, pull requests, and code delivery signals.', Github],
  ['slack', 'Slack', 'Send task updates and mentions into team channels.', Slack],
  ['calendar', 'Google Calendar', 'Publish project deadlines to shared calendars.', CalendarDays],
  ['drive', 'Google Drive', 'Attach project documents and source files.', HardDrive],
];

const IntegrationsSettings = () => {
  const [connected, setConnected] = useState({ slack: true });

  return (
    <SectionCard title="Integrations" description="Connect TaskFlow Pro to the tools your team already uses.">
      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map(([id, name, description, Icon]) => {
          const isConnected = Boolean(connected[id]);
          return (
            <div key={id} className="rounded-2xl border bg-slate-50 p-5 dark:bg-slate-950">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm dark:bg-slate-900">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge value={isConnected ? 'CONNECTED' : 'AVAILABLE'} />
              </div>
              <h3 className="mt-4 font-black text-slate-950 dark:text-white">{name}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
              <button onClick={() => setConnected((current) => ({ ...current, [id]: !isConnected }))} className={isConnected ? 'btn-secondary mt-4' : 'btn-primary mt-4'}>
                {isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};

export default IntegrationsSettings;
