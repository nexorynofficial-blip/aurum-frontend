import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { JournalCard } from '@/components/journal/JournalCard';
import { Reveal } from '@/components/common/Reveal';
import { journalPosts } from '@/lib/data/journal';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Essays on craft, permanence and the objects worth keeping — from the AURUM atelier.',
};

export default function JournalPage() {
  const [featured, ...rest] = journalPosts;

  return (
    <div className="shell py-16 md:py-20">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Journal' }]} />

      <header className="mt-10 max-w-3xl">
        <p className="kicker mb-6">The Journal</p>
        <h1 className="font-display text-h1 font-light leading-tight text-ivory md:text-hero">
          On craft &amp;
          <span className="italic text-brass"> permanence.</span>
        </h1>
        <p className="mt-8 max-w-prose font-body text-body text-stone">
          Slow reading on the things we make and why we make them the way we do.
        </p>
      </header>

      {/* Featured */}
      <Reveal className="mt-16">
        <JournalCard post={featured} featured />
      </Reveal>

      {/* Rest */}
      <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 80}>
            <JournalCard post={post} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
