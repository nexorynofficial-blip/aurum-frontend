import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollectionBannerProps {
  href: string;
  image: string;
  kicker: string;
  title: string;
  /** Which side the text sits on (desktop). */
  align?: 'left' | 'right';
  /** Mirror the image so its subject falls opposite the text. */
  flip?: boolean;
  priority?: boolean;
}

/**
 * Full-width editorial banner used for the homepage collections trio —
 * stacked horizontal cards with the piece filling the frame and the title
 * set over the darker side. Layout only borrows the reference architecture;
 * all type, colour, imagery, and branding are AURUM's own.
 */
export function CollectionBanner({
  href,
  image,
  kicker,
  title,
  align = 'left',
  flip = false,
  priority,
}: CollectionBannerProps) {
  const left = align === 'left';

  return (
    <Link
      href={href}
      aria-label={`${title} — ${kicker}`}
      className="group relative block h-[220px] overflow-hidden rounded-image bg-charcoal sm:h-[240px] lg:h-[280px]"
    >
      {/* Media (only the image zooms on hover) */}
      <div className="absolute inset-0 transition-transform duration-900 ease-luxe group-hover:scale-105">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className={cn(
            'object-cover object-[78%_center] md:object-center',
            flip && 'scale-x-[-1]'
          )}
        />
      </div>

      {/* Gradient — darkens the text side, plus a bottom veil for mobile */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-0',
          left
            ? 'bg-gradient-to-r from-obsidian via-obsidian/65 to-transparent'
            : 'bg-gradient-to-l from-obsidian via-obsidian/65 to-transparent'
        )}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent md:hidden"
      />

      {/* Content */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-end gap-4 p-8 md:justify-center md:p-10 lg:p-12',
          left
            ? 'items-start text-left'
            : 'items-start text-left md:items-end md:text-right'
        )}
      >
        <span className="kicker">{kicker}</span>
        <h3 className="max-w-[14ch] font-display text-[2.75rem] font-light leading-[0.95] text-ivory md:text-[3.25rem] lg:text-[4.75rem]">
          {title}
        </h3>
      </div>

      {/* Arrow */}
      <span
        className={cn(
          'absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-all duration-350 ease-luxe group-hover:border-brass group-hover:bg-brass group-hover:text-obsidian md:top-auto md:bottom-10 lg:bottom-12',
          left
            ? 'md:left-10 md:right-auto lg:left-12'
            : 'md:right-10 lg:right-12'
        )}
      >
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </Link>
  );
}
