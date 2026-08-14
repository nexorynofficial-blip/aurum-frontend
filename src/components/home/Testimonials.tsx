'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '@/lib/data/journal';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Testimonials — a single quote at a time, changed with quiet transitions. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="shell py-24 text-center md:py-40">
      <p className="kicker mb-12">In Their Words</p>

      <div className="mx-auto flex min-h-[220px] max-w-3xl flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="font-display text-h3 font-light italic leading-snug text-ivory md:text-h2">
              “{active.quote}”
            </p>
            <footer className="mt-8 font-mono text-micro uppercase tracking-luxe text-brass">
              {active.author} · {active.location}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-graphite text-stone transition-colors duration-220 hover:border-brass hover:text-brass"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Testimonials">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-350 ${
                i === index ? 'w-8 bg-brass' : 'w-1.5 bg-graphite'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-graphite text-stone transition-colors duration-220 hover:border-brass hover:text-brass"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
