'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { ProductDetailSection } from '@/types';

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductAccordion({
  sections,
}: {
  sections: ProductDetailSection[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-graphite">
      {sections.map((section, i) => {
        const isOpen = open === i;
        return (
          <div key={section.title} className="border-b border-graphite">
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="font-display text-h4 font-light text-ivory">
                  {section.title}
                </span>
                <span className="shrink-0 text-brass">
                  {isOpen ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-6 font-body text-body leading-relaxed text-stone">
                    {section.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
