import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/** Editorial section header — kicker, serif title, optional intro (§ Editorial Layout). */
export function SectionHeading({
  kicker,
  title,
  intro,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {kicker && <span className="kicker">{kicker}</span>}
      <h2 className="font-display text-h3 font-light leading-tight text-ivory md:text-h2">
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'max-w-prose text-body text-stone',
            align === 'center' && 'mx-auto'
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
