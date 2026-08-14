import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = ['Shipping', 'Payment', 'Confirmation'];

/** Minimal three-step progress indicator (§27). */
export function CheckoutStepper({ current }: { current: 0 | 1 | 2 }) {
  return (
    <ol className="flex items-center justify-center gap-4 md:gap-6">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border font-mono text-caption transition-colors duration-350',
                  done && 'border-brass bg-brass text-obsidian',
                  active && 'border-brass text-brass',
                  !done && !active && 'border-graphite text-stone'
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  'hidden font-mono text-micro uppercase tracking-luxe sm:inline',
                  active ? 'text-ivory' : 'text-stone'
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  'h-px w-8 md:w-16',
                  done ? 'bg-brass' : 'bg-graphite'
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
