'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Check } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Input, Textarea, Select } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { SITE } from '@/lib/constants';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  const details = [
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: 'Telephone', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Ateliers', value: SITE.address },
  ];

  return (
    <div className="shell py-16 md:py-20">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <div className="mt-10 grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        {/* Info */}
        <div>
          <p className="kicker mb-6">Client Care</p>
          <h1 className="font-display text-h1 font-light leading-tight text-ivory">
            We are at your
            <span className="block italic text-brass">service.</span>
          </h1>
          <p className="mt-8 max-w-prose font-body text-body text-stone">
            Whether a question of sizing, a bespoke commission, or the care of an
            existing piece — our client advisors respond within one business day.
          </p>

          <ul className="mt-12 flex flex-col gap-8">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-graphite text-brass">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-micro uppercase tracking-luxe text-stone">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="mt-1 block font-body text-body text-ivory transition-colors hover:text-brass">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-body text-body text-ivory">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-12 font-body text-caption text-stone">
            Looking for a quick answer? See our{' '}
            <Link href="/faq" className="link-underline text-ivory hover:text-brass">
              frequently asked questions
            </Link>
            .
          </p>
        </div>

        {/* Form */}
        <div className="rounded-card border border-graphite bg-charcoal p-8 md:p-10">
          {sent ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brass text-brass">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-h3 font-light text-ivory">
                  Thank you.
                </h2>
                <p className="mt-3 max-w-sm font-body text-body text-stone">
                  Your message has reached the atelier. A client advisor will be in
                  touch within one business day.
                </p>
              </div>
              <Button variant="outline" size="md" onClick={() => setSent(false)}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              <h2 className="font-display text-h4 font-light text-ivory">
                Send a message
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="First name" name="firstName" required />
                <Input label="Last name" name="lastName" required />
              </div>
              <Input label="Email address" name="email" type="email" required />
              <Select
                label="Subject"
                name="subject"
                options={[
                  { label: 'A product enquiry', value: 'product' },
                  { label: 'An existing order', value: 'order' },
                  { label: 'A bespoke commission', value: 'bespoke' },
                  { label: 'Care & servicing', value: 'care' },
                  { label: 'Something else', value: 'other' },
                ]}
              />
              <Textarea label="Message" name="message" rows={5} required />
              <Button type="submit" size="lg" loading={loading} className="mt-2 self-start">
                Send message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
