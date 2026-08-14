'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError(undefined);
    setLoading(true);
    try {
      await login(String(form.get('email')), String(form.get('password')));
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="kicker mb-4">Welcome back</p>
      <h1 className="font-display text-h2 font-light text-ivory">Sign in</h1>
      <p className="mt-4 font-body text-body text-stone">
        Access your orders, wishlist, and saved details.
      </p>

      <form onSubmit={submit} className="mt-10 flex flex-col gap-5">
        <Input label="Email address" name="email" type="email" autoComplete="email" required />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          error={error}
        />
        <div className="flex justify-end">
          <Link
            href="/reset-password"
            className="font-body text-caption text-stone transition-colors hover:text-brass"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" size="lg" fullWidth loading={loading}>
          Sign in
        </Button>
      </form>

      <p className="mt-8 text-center font-body text-caption text-stone">
        New to {`AURUM`}?{' '}
        <Link href="/register" className="link-underline text-ivory hover:text-brass">
          Create an account
        </Link>
      </p>
    </div>
  );
}
