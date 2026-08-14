'use client';

import { useEffect } from 'react';
import { Button } from '@/components/common/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this would report to Sentry (TRD §13).
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="kicker mb-6">Something interrupted us</p>
      <h1 className="font-display text-h1 font-light italic text-ivory">
        A momentary fault.
      </h1>
      <p className="mt-6 max-w-md font-body text-body text-stone">
        We were unable to complete that request. Please try again — if it
        persists, our client care team is here to help.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button onClick={reset} size="lg">
          Try again
        </Button>
        <Button href="/contact" variant="outline" size="lg">
          Contact client care
        </Button>
      </div>
    </div>
  );
}
