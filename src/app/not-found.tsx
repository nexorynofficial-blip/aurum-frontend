import { Button } from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="kicker mb-6">Error 404</p>
      <h1 className="font-display text-hero font-light italic text-ivory">
        Nothing here.
      </h1>
      <p className="mt-6 max-w-md font-body text-body text-stone">
        The page you were looking for has been moved, retired, or never existed.
        Allow us to guide you back.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/" size="lg">
          Return home
        </Button>
        <Button href="/collections/all" variant="outline" size="lg">
          Browse the collection
        </Button>
      </div>
    </div>
  );
}
