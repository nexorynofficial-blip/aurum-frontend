'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-graphite',
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          dim,
          'flex items-center justify-center rounded-full text-stone transition-colors duration-220 ease-luxe hover:text-brass disabled:opacity-30'
        )}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        aria-live="polite"
        className="min-w-8 text-center font-mono text-small tabular-nums text-ivory"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          dim,
          'flex items-center justify-center rounded-full text-stone transition-colors duration-220 ease-luxe hover:text-brass disabled:opacity-30'
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
