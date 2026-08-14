import { cn } from '@/lib/utils';
import { Availability, OrderStatus } from '@/types';

const availabilityStyles: Record<Availability, string> = {
  'in-stock': 'text-stone',
  limited: 'text-brass',
  'out-of-stock': 'text-stone/60',
};

const availabilityLabel: Record<Availability, string> = {
  'in-stock': 'In stock',
  limited: 'Limited availability',
  'out-of-stock': 'Reserved',
};

export function AvailabilityBadge({
  availability,
  stock,
  className,
}: {
  availability: Availability;
  /** When provided (and in stock), shows the inventory count, e.g. "4 in stock". */
  stock?: number;
  className?: string;
}) {
  const label =
    stock !== undefined && availability !== 'out-of-stock'
      ? `${stock} in stock`
      : availabilityLabel[availability];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-micro uppercase tracking-luxe',
        availabilityStyles[availability],
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          availability === 'in-stock' && 'bg-forest',
          availability === 'limited' && 'bg-brass',
          availability === 'out-of-stock' && 'bg-stone/50'
        )}
      />
      {label}
    </span>
  );
}

const orderStatusStyles: Record<OrderStatus, string> = {
  pending: 'border-brass/40 text-brass',
  dispatched: 'border-stone/40 text-ivory',
  delivered: 'border-forest/50 text-forest',
  returned: 'border-stone/30 text-stone',
  cancelled: 'border-crimson/40 text-crimson',
};

export function OrderStatusBadge({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-micro uppercase tracking-luxe',
        orderStatusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-graphite bg-obsidian/60 px-3 py-1 font-mono text-micro uppercase tracking-luxe text-stone backdrop-blur',
        className
      )}
    >
      {children}
    </span>
  );
}
