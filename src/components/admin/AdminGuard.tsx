'use client';

import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Input } from '@/components/common/Field';
import { Button } from '@/components/common/Button';

/**
 * Gates the entire admin console. Renders the children only for a signed-in
 * ADMIN; otherwise shows a dedicated console login. The session lives in the
 * backend httpOnly cookie (shared with the storefront).
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const hydrate = useAuthStore((s) => s.hydrate);
  const login = useAuthStore((s) => s.login);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-obsidian">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-graphite border-t-brass" />
      </div>
    );
  }

  if (user && user.role === 'ADMIN') {
    return <>{children}</>;
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError(undefined);
    setLoading(true);
    try {
      const signedIn = await login(String(form.get('email')), String(form.get('password')));
      if (signedIn.role !== 'ADMIN') {
        setError('This account is not an administrator.');
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-obsidian px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-graphite text-brass">
            <Lock className="h-5 w-5" />
          </span>
          <p className="font-display text-h4 font-light tracking-[0.28em] text-ivory">AURUM</p>
          <p className="mt-2 font-mono text-micro uppercase tracking-luxe text-stone">Admin Console</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4 rounded-card border border-graphite bg-charcoal p-6">
          <Input label="Email" name="email" type="email" autoComplete="email" required defaultValue="admin@aurum.luxury" />
          <Input label="Password" name="password" type="password" autoComplete="current-password" required error={error} />
          <Button type="submit" size="lg" fullWidth loading={loading}>
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center font-body text-caption text-stone">
          Restricted access · authorised staff only
        </p>
      </div>
    </div>
  );
}
