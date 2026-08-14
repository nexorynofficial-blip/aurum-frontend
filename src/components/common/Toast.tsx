'use client';

import { create } from 'zustand';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastKind = 'default' | 'success' | 'error';

interface ToastItem {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastState {
  toasts: ToastItem[];
  push: (message: string, kind?: ToastKind) => void;
  dismiss: (id: number) => void;
}

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (message, kind = 'default') => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts, { id, message, kind }] }));
    // Auto-dismiss after 4s (§41)
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

/** Fire a toast from anywhere: `toast('Added to bag', 'success')`. */
export function toast(message: string, kind?: ToastKind) {
  useToastStore.getState().push(message, kind);
}

export function Toaster() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-toast flex flex-col items-end gap-3"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-card border border-graphite bg-charcoal/95 px-5 py-4 shadow-raised backdrop-blur"
          >
            {t.kind === 'success' && (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest/20 text-forest">
                <Check className="h-3.5 w-3.5" />
              </span>
            )}
            {t.kind === 'error' && (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/20 text-crimson">
                <X className="h-3.5 w-3.5" />
              </span>
            )}
            <p className={cn('font-body text-caption text-ivory')}>{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="ml-2 text-stone transition-colors hover:text-ivory"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
