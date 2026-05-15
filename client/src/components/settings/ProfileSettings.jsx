import { Camera, Save } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { InputField, SectionCard } from './SettingsPrimitives';

const ProfileSettings = ({ user }) => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: 'Product Operations Lead',
    bio: 'Focused on keeping teams aligned, execution visible, and delivery predictable.',
  });

  const save = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes('@')) {
      toast.error('Please enter a valid name and email');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile settings saved');
    }, 500);
  };

  return (
    <SectionCard title="Profile Settings" description="Manage your public workspace identity and contact details.">
      <form onSubmit={save} className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <img src={user?.avatar} alt={user?.name} className="h-20 w-20 rounded-2xl object-cover shadow-sm" />
          <div>
            <button type="button" className="btn-secondary"><Camera className="h-4 w-4" /> Change avatar</button>
            <p className="mt-2 text-sm text-slate-500">PNG or JPG up to 2MB.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <InputField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <InputField label="Job title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <InputField label="Workspace role" value={user?.role || 'MEMBER'} readOnly />
        </div>
        <InputField label="Bio" as="textarea" rows="4" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        <button disabled={saving} className="btn-primary"><Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save changes'}</button>
      </form>
    </SectionCard>
  );
};

export default ProfileSettings;
