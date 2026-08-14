'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

const columns = [
  {
    title: 'Maison',
    links: [
      { label: 'The Atelier', href: '/about' },
      { label: 'Journal', href: '/journal' },
      { label: 'Collections', href: '/collections' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Client Care',
    links: [
      { label: 'Shipping & Returns', href: '/shipping-returns' },
      { label: 'Frequently Asked', href: '/faq' },
      { label: 'Order Tracking', href: '/account/orders' },
      { label: 'Care & Servicing', href: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
];

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Pinterest', href: '#' },
  { label: 'Journal', href: '/journal' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-graphite bg-charcoal">
      <div className="shell py-20">
        {/* Newsletter (§37) */}
        <div className="grid gap-12 pb-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="kicker mb-4">The Correspondence</p>
            <h2 className="max-w-md font-display text-h3 font-light leading-tight text-ivory">
              Private views, new arrivals, and the occasional letter from the atelier.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <form onSubmit={subscribe} className="w-full">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-4 border-b border-graphite pb-3 transition-colors focus-within:border-brass">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent font-body text-body text-ivory placeholder-stone/60 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="shrink-0 text-ivory transition-colors hover:text-brass"
                >
                  {subscribed ? (
                    <Check className="h-5 w-5 text-forest" />
                  ) : (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p
                className={cn(
                  'mt-3 font-body text-caption transition-colors',
                  subscribed ? 'text-forest' : 'text-stone'
                )}
              >
                {subscribed
                  ? 'Thank you — a note of welcome is on its way.'
                  : 'By subscribing you agree to our Privacy Policy.'}
              </p>
            </form>
          </div>
        </div>

        <div className="hairline" />

        {/* Link columns */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="font-display text-h3 font-light tracking-[0.28em] text-ivory"
            >
              {SITE.name}
            </Link>
            <p className="max-w-xs font-body text-caption leading-relaxed text-stone">
              {SITE.description}
            </p>
            <p className="font-mono text-micro uppercase tracking-luxe text-stone">
              Est. {SITE.founded}
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-8 font-mono text-micro uppercase tracking-luxe text-brass">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-caption text-stone transition-colors duration-220 hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="hairline" />

        {/* Bottom row */}
        <div className="flex flex-col-reverse items-start justify-between gap-6 pt-10 md:flex-row md:items-center">
          <p className="font-body text-caption text-stone">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="link-underline font-body text-caption text-stone transition-colors hover:text-ivory"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
