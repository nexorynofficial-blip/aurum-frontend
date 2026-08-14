import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';

/** Prices always render in IBM Plex Mono with tabular figures (§6). */
export function Price({
  value,
  cents = false,
  className,
}: {
  value: number;
  cents?: boolean;
  className?: string;
}) {
  return (
    <span className={cn('font-mono tabular-nums', className)}>
      {formatPrice(value, { cents })}
    </span>
  );
}
