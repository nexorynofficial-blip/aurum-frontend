'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { Input } from '@/components/common/Field';
import { Button } from '@/components/common/Button';

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-brass text-brass">
          <MailCheck className="h-6 w-6" />
        </div>
        <h1 className="font-display text-h2 font-light text-ivory">Check your email</h1>
        <p className="mt-4 font-body text-body text-stone">
          If an account exists for that address, a reset link is on its way. The
          link expires in one hour.
        </p>
        <Button href="/login" variant="outline" size="md" className="mt-8">
          Return to sign in
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p className="kicker mb-4">Account recovery</p>
      <h1 className="font-display text-h2 font-light text-ivory">Reset password</h1>
      <p className="mt-4 font-body text-body text-stone">
        Enter your email and we will send you a secure link to set a new password.
      </p>

      <form onSubmit={submit} className="mt-10 flex flex-col gap-5">
        <Input label="Email address" name="email" type="email" autoComplete="email" required />
        <Button type="submit" size="lg" fullWidth loading={loading}>
          Send reset link
        </Button>
      </form>

      <p className="mt-8 text-center font-body text-caption text-stone">
        Remembered it?{' '}
        <Link href="/login" className="link-underline text-ivory hover:text-brass">
          Sign in
        </Link>
      </p>
    </div>
  );
}
