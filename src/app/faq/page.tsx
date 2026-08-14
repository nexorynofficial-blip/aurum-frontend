'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const EASE = [0.16, 1, 0.3, 1] as const;

const groups = [
  {
    category: 'Ordering',
    items: [
      {
        q: 'Do I need an account to order?',
        a: 'No. You may check out as a guest with only an email and shipping address. You can create an account later from the link in your order confirmation to track and manage your purchase.',
      },
      {
        q: 'Can I include a gift message?',
        a: 'Yes. A handwritten note may be added at checkout at no charge, and gift orders are presented without pricing.',
      },
    ],
  },
  {
    category: 'Sizing & Materials',
    items: [
      {
        q: 'How do I find my ring size?',
        a: 'Each product page lists sizes in European measure. If you are unsure, contact client care — we can post a complimentary sizing set or advise from an existing ring.',
      },
      {
        q: 'Are your pieces solid gold?',
        a: 'Always. We cast in solid precious metal and never plate. The material described is the material throughout the piece.',
      },
    ],
  },
  {
    category: 'Care',
    items: [
      {
        q: 'How should I care for my piece?',
        a: 'Store pieces separately in the case provided, avoid contact with fragrance and chlorine, and bring your piece to any AURUM atelier for complimentary cleaning and servicing.',
      },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>('Ordering-0');

  return (
    <div className="shell py-16 md:py-20">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />

      <header className="mt-10 max-w-3xl">
        <p className="kicker mb-6">Frequently Asked</p>
        <h1 className="font-display text-h1 font-light text-ivory md:text-hero">
          Questions, answered.
        </h1>
      </header>

      <div className="mt-16 flex flex-col gap-16">
        {groups.map((group) => (
          <section key={group.category}>
            <h2 className="mb-6 font-mono text-micro uppercase tracking-luxe text-brass">
              {group.category}
            </h2>
            <div className="border-t border-graphite">
              {group.items.map((item, i) => {
                const key = `${group.category}-${i}`;
                const isOpen = open === key;
                return (
                  <div key={key} className="border-b border-graphite">
                    <h3>
                      <button
                        onClick={() => setOpen(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span className="font-display text-body-lg font-light text-ivory">
                          {item.q}
                        </span>
                        <span className="shrink-0 text-brass">
                          {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
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
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 rounded-card border border-graphite bg-charcoal p-10 text-center">
        <h2 className="font-display text-h3 font-light text-ivory">
          Still have a question?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-body text-stone">
          Our client advisors are glad to help with anything not covered here.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block link-underline font-body text-caption uppercase tracking-wide text-brass"
        >
          Contact client care
        </Link>
      </div>
    </div>
  );
}
