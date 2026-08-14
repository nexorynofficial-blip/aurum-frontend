import Image from 'next/image';
import { PLACEHOLDER, SITE } from '@/lib/constants';

/** Auth pages sit on a quiet editorial split — image left, form right. */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100dvh-var(--nav-height))] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src={PLACEHOLDER}
          alt=""
          aria-hidden
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-obsidian/50" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="max-w-md font-display text-h3 font-light italic leading-snug text-ivory">
            “The website itself is part of the product’s prestige.”
          </p>
          <p className="mt-6 font-mono text-micro uppercase tracking-luxe text-brass">
            {SITE.name} · Est. {SITE.founded}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 md:px-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
