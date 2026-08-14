'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get('password'));
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      await register({
        email: String(form.get('email')),
        password,
        firstName: String(form.get('firstName') || 'Guest'),
        lastName: String(form.get('lastName') || ''),
      });
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account');
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="kicker mb-4">Join the house</p>
      <h1 className="font-display text-h2 font-light text-ivory">Create account</h1>
      <p className="mt-4 font-body text-body text-stone">
        For a considered, private shopping experience — and your saved wishlist,
        carried across.
      </p>

      <form onSubmit={submit} className="mt-10 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" name="firstName" autoComplete="given-name" required />
          <Input label="Last name" name="lastName" autoComplete="family-name" required />
        </div>
        <Input label="Email address" name="email" type="email" autoComplete="email" required />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          error={error}
          hint={!error ? 'At least 8 characters.' : undefined}
        />
        <Button type="submit" size="lg" fullWidth loading={loading} className="mt-2">
          Create account
        </Button>
      </form>

      <p className="mt-6 font-body text-caption leading-relaxed text-stone/80">
        By creating an account you agree to our{' '}
        <Link href="/terms" className="text-ivory hover:text-brass">Terms</Link> and{' '}
        <Link href="/privacy" className="text-ivory hover:text-brass">Privacy Policy</Link>.
      </p>

      <p className="mt-8 text-center font-body text-caption text-stone">
        Already have an account?{' '}
        <Link href="/login" className="link-underline text-ivory hover:text-brass">
          Sign in
        </Link>
      </p>
    </div>
  );
}
