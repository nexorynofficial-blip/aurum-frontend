import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminPageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-h3 font-light text-ivory">{title}</h1>
        {subtitle && (
          <p className="mt-2 font-body text-caption text-stone">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-card border border-graphite bg-charcoal p-6',
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  delta?: number;
  prefix?: string;
  suffix?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Panel>
      <p className="font-mono text-micro uppercase tracking-luxe text-stone">
        {label}
      </p>
      <p className="mt-4 font-display text-h3 font-light text-ivory">
        {prefix}
        {value}
        {suffix}
      </p>
      {delta !== undefined && (
        <p
          className={cn(
            'mt-3 inline-flex items-center gap-1 font-mono text-micro',
            positive ? 'text-forest' : 'text-crimson'
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {Math.abs(delta)}%
          <span className="text-stone"> vs last month</span>
        </p>
      )}
    </Panel>
  );
}

const statusStyles: Record<string, string> = {
  pending: 'border-brass/40 text-brass',
  dispatched: 'border-stone/40 text-ivory',
  delivered: 'border-forest/50 text-forest',
  returned: 'border-stone/30 text-stone',
  cancelled: 'border-crimson/40 text-crimson',
  active: 'border-forest/50 text-forest',
  draft: 'border-stone/30 text-stone',
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-micro uppercase tracking-luxe',
        statusStyles[status] ?? 'border-graphite text-stone'
      )}
    >
      {status}
    </span>
  );
}
