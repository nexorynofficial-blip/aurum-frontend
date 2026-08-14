import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/*
 * The AURUM scale uses custom font-size names (text-small, text-body…) and
 * custom colour names (text-obsidian, text-ivory…). Stock tailwind-merge does
 * not know these, so it lumps a size class and a colour class into one group
 * and drops one of them — e.g. `text-obsidian` on a `text-small` button, which
 * left primary buttons with invisible ivory-on-ivory text. Teaching it the two
 * scales keeps size and colour independent so both survive a merge.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'micro', 'caption', 'small', 'body', 'body-lg',
            'h1', 'h2', 'h3', 'h4', 'hero',
          ],
        },
      ],
      'text-color': [
        {
          text: [
            'obsidian', 'charcoal', 'slate', 'ivory', 'stone',
            'graphite', 'crimson', 'forest',
            'brass', 'brass-soft', 'brass-deep',
          ],
        },
      ],
    },
  },
});

/** Conditional + conflict-free className composition. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as USD currency (§ prices use IBM Plex Mono). */
export function formatPrice(
  value: number,
  opts: { cents?: boolean } = {}
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: opts.cents ? 2 : 0,
    maximumFractionDigits: opts.cents ? 2 : 0,
  }).format(value);
}

/** Human-readable date, e.g. "16 July 2026". */
export function formatDate(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/** Short date, e.g. "16 Jul 2026". */
export function formatDateShort(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

/** Slugify a string for URLs. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
