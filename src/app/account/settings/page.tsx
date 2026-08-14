'use client';

import { useState } from 'react';
import { demoCustomer } from '@/lib/data/account';
import { Input } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { toast } from '@/components/common/Toast';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({
    newArrivals: true,
    journal: true,
    events: false,
  });

  const save = (e: React.FormEvent, label: string) => {
    e.preventDefault();
    toast(`${label} saved`, 'success');
  };

  return (
    <div className="flex flex-col gap-12">
      <header>
        <p className="kicker mb-4">Account Settings</p>
        <h1 className="font-display text-h1 font-light text-ivory">Settings</h1>
      </header>

      {/* Profile */}
      <form
        onSubmit={(e) => save(e, 'Profile')}
        className="rounded-card border border-graphite p-6 md:p-8"
      >
        <h2 className="mb-6 font-display text-h4 font-light text-ivory">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First name" name="firstName" defaultValue={demoCustomer.firstName} />
          <Input label="Last name" name="lastName" defaultValue={demoCustomer.lastName} />
          <Input label="Email address" name="email" type="email" defaultValue={demoCustomer.email} className="sm:col-span-2" />
        </div>
        <Button type="submit" size="md" className="mt-6">
          Save profile
        </Button>
      </form>

      {/* Password */}
      <form
        onSubmit={(e) => save(e, 'Password')}
        className="rounded-card border border-graphite p-6 md:p-8"
      >
        <h2 className="mb-6 font-display text-h4 font-light text-ivory">Password</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Current password" name="current" type="password" autoComplete="current-password" className="sm:col-span-2" />
          <Input label="New password" name="new" type="password" autoComplete="new-password" />
          <Input label="Confirm new password" name="confirm" type="password" autoComplete="new-password" />
        </div>
        <Button type="submit" size="md" className="mt-6">
          Update password
        </Button>
      </form>

      {/* Communication */}
      <form
        onSubmit={(e) => save(e, 'Preferences')}
        className="rounded-card border border-graphite p-6 md:p-8"
      >
        <h2 className="mb-2 font-display text-h4 font-light text-ivory">
          Communication
        </h2>
        <p className="mb-6 font-body text-caption text-stone">
          Choose what you would like to hear about. Never more than is worth your time.
        </p>
        <div className="flex flex-col divide-y divide-graphite">
          {[
            { key: 'newArrivals', label: 'New arrivals & private views' },
            { key: 'journal', label: 'The Journal' },
            { key: 'events', label: 'Atelier events & invitations' },
          ].map(({ key, label }) => {
            const on = prefs[key as keyof typeof prefs];
            return (
              <div key={key} className="flex items-center justify-between py-4">
                <span className="font-body text-small text-ivory">{label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={label}
                  onClick={() =>
                    setPrefs((p) => ({ ...p, [key]: !p[key as keyof typeof prefs] }))
                  }
                  className={cn(
                    'relative h-6 w-11 rounded-full border transition-colors duration-220',
                    on ? 'border-brass bg-brass/20' : 'border-graphite bg-obsidian'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 h-4 w-4 rounded-full transition-all duration-220',
                      on ? 'left-[22px] bg-brass' : 'left-0.5 bg-stone'
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <Button type="submit" size="md" className="mt-6">
          Save preferences
        </Button>
      </form>
    </div>
  );
}
