import type { Metadata } from 'next';
import Image from 'next/image';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'The Atelier',
  description:
    'A century of solid gold, single-maker craft, and the discipline of less. The story of the AURUM atelier.',
};

const timeline = [
  { year: '1926', title: 'A single bench', body: 'The house is founded in a one-room workshop with a single goldsmith’s bench.' },
  { year: '1958', title: 'The signet', body: 'Our defining object — the plain gold signet — enters the permanent collection.' },
  { year: '1991', title: 'Second atelier', body: 'A second workshop opens; the single-maker principle is written into house law.' },
  { year: '2024', title: 'Traceable gold', body: 'Every gram of metal becomes fully traceable to its origin, mine to hand.' },
];

const values = [
  { title: 'Permanence', body: 'We make objects to be kept, repaired, and inherited — never replaced.' },
  { title: 'Restraint', body: 'What we leave out is the design. Ornament without purpose is noise.' },
  { title: 'Honesty', body: 'Solid metal, real stones, plainly described. No plating, no illusion.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden">
        <Image src="/images/about-banner.png" alt="Inside the AURUM atelier" fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="shell relative z-raised pb-16">
          <p className="kicker mb-6">The Atelier · Est. {SITE.founded}</p>
          <h1 className="max-w-4xl font-display text-h1 font-light leading-tight text-ivory md:text-hero">
            One bench, one maker,
            <span className="block italic text-brass">one hundred years.</span>
          </h1>
        </div>
      </section>

      {/* Founder message */}
      <section className="shell py-24 md:py-40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <Reveal>
            <div className="media-zoom relative aspect-[4/5] overflow-hidden rounded-image bg-charcoal">
              <Image src="/images/about-box.png" alt="Hélène Marchetti, creative director" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center">
            <p className="kicker mb-6">A word from the director</p>
            <blockquote className="font-display text-h3 font-light italic leading-snug text-ivory md:text-h2">
              “We have never been interested in making more. Only in making one
              thing so well that it never needs remaking.”
            </blockquote>
            <p className="mt-8 max-w-prose font-body text-body text-stone">
              When my grandfather opened the first workshop, he set a single rule:
              one master carries each piece from beginning to end. A century later,
              through every change in taste and technology, that rule has never
              moved. It is the whole of our philosophy, and the reason a piece of
              AURUM feels the way it does in the hand.
            </p>
            <p className="mt-6 font-mono text-micro uppercase tracking-luxe text-brass">
              Hélène Marchetti · Creative Director
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-graphite bg-charcoal py-24 md:py-32">
        <div className="shell">
          <SectionHeading kicker="What We Hold" title="Three principles" align="center" className="mb-16" />
          <div className="grid gap-px overflow-hidden rounded-card border border-graphite bg-graphite md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="flex flex-col gap-4 bg-obsidian p-10 text-center">
                <span className="font-display text-h2 font-light text-brass">0{i + 1}</span>
                <h3 className="font-display text-h4 font-light text-ivory">{v.title}</h3>
                <p className="font-body text-caption leading-relaxed text-stone">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="shell py-24 md:py-40">
        <SectionHeading kicker="A Century in Brief" title="The house, over time" className="mb-16" />
        <ol className="flex flex-col">
          {timeline.map((entry, i) => (
            <Reveal key={entry.year} delay={i * 60} as="li">
              <div className="grid gap-6 border-t border-graphite py-10 md:grid-cols-[160px_1fr] md:gap-16">
                <span className="font-mono text-h3 tabular-nums text-brass">{entry.year}</span>
                <div>
                  <h3 className="font-display text-h4 font-light text-ivory">{entry.title}</h3>
                  <p className="mt-3 max-w-prose font-body text-body text-stone">{entry.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="shell pb-24 md:pb-40">
        <Reveal className="flex flex-col items-center gap-8 rounded-card border border-graphite bg-charcoal px-6 py-20 text-center">
          <h2 className="max-w-2xl font-display text-h2 font-light leading-tight text-ivory">
            Discover a piece made to outlast us both.
          </h2>
          <Button href="/collections/all" size="lg" className="h-16 px-12 text-obsidian">
            Explore the collection
          </Button>
        </Reveal>
      </section>
    </>
  );
}
