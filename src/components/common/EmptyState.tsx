import { cn } from '@/lib/utils';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  action?: { label: string; href: string };
  className?: string;
}

/** Elegant empty state — helpful message + a way back to shopping (§38). */
export function EmptyState({
  icon,
  title,
  message,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 px-6 py-24 text-center',
        className
      )}
    >
      {icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-graphite text-brass">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-h4 font-light text-ivory">{title}</h3>
        <p className="max-w-md font-body text-body text-stone">{message}</p>
      </div>
      {action && (
        <Button href={action.href} variant="outline" size="md">
          {action.label}
        </Button>
      )}
    </div>
  );
}
