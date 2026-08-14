'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

/* ============================================================
   Text input (§28). Label sits ABOVE the field with a consistent
   ~10px gap, matching Select and Textarea across every form.
   ============================================================ */
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className, id, required, placeholder, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={inputId}
        className="font-mono text-micro uppercase tracking-luxe text-stone"
      >
        {label}
        {required && <span className="ml-0.5 text-brass">*</span>}
      </label>
      <input
        ref={ref}
        id={inputId}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'h-12 w-full rounded-input border bg-charcoal px-4 font-body text-small text-ivory placeholder-stone/50 transition-colors duration-220 ease-luxe focus:outline-none',
          error
            ? 'border-crimson focus:border-crimson'
            : 'border-graphite focus:border-brass'
        )}
        {...props}
      />
      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="font-body text-caption text-crimson"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="font-body text-caption text-stone">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

/* ============================================================
   Select
   ============================================================ */
interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, className, id, ...props },
  ref
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={selectId}
        className="font-mono text-micro uppercase tracking-luxe text-stone"
      >
        {label}
      </label>
      <select
        ref={ref}
        id={selectId}
        className="h-12 w-full appearance-none rounded-input border border-graphite bg-charcoal px-4 font-body text-small text-ivory transition-colors duration-220 ease-luxe focus:border-brass focus:outline-none"
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-charcoal">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
});

/* ============================================================
   Textarea
   ============================================================ */
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, className, id, ...props }, ref) {
    const autoId = useId();
    const areaId = id ?? autoId;
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <label
          htmlFor={areaId}
          className="font-mono text-micro uppercase tracking-luxe text-stone"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={areaId}
          rows={4}
          className="w-full resize-none rounded-input border border-graphite bg-charcoal px-4 py-3 font-body text-small text-ivory transition-colors duration-220 ease-luxe focus:border-brass focus:outline-none"
          {...props}
        />
      </div>
    );
  }
);
