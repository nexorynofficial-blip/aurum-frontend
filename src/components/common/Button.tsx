import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-body font-medium tracking-wide transition-all duration-220 ease-luxe focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap';

const variants: Record<Variant, string> = {
  // Primary — ivory field, obsidian text; lifts 2px on hover (§29)
  primary:
    'bg-ivory text-obsidian hover:-translate-y-0.5 hover:bg-white active:translate-y-0',
  // Secondary — brass, sparing use
  secondary:
    'bg-brass text-obsidian hover:-translate-y-0.5 hover:bg-brass-soft active:translate-y-0',
  // Ghost — text only with brass hover
  ghost: 'bg-transparent text-ivory hover:text-brass',
  // Outline — hairline that warms to brass
  outline:
    'border border-graphite bg-transparent text-ivory hover:border-brass hover:text-brass',
  danger:
    'border border-crimson/60 bg-transparent text-crimson hover:bg-crimson hover:text-ivory',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-6 text-caption',
  md: 'h-12 px-8 text-small',
  lg: 'h-14 px-8 text-small', // 56px — spec primary height
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = 'primary',
    size = 'lg',
    loading = false,
    fullWidth = false,
    className,
    children,
    ...props
  },
  ref
) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      <span className={cn(loading && 'opacity-90')}>{children}</span>
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  const { disabled, ...rest } = props as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
});
