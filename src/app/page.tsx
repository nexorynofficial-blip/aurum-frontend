import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { BrandStory } from '@/components/home/BrandStory';
import { Craftsmanship } from '@/components/home/Craftsmanship';
import { Testimonials } from '@/components/home/Testimonials';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { CollectionBanner } from '@/components/home/CollectionBanner';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { JournalCard } from '@/components/journal/JournalCard';
import {
  fetchCollections,
  fetchEditorsPicks,
  fetchFeatured,
} from '@/lib/api/catalog';
import { journalPosts } from '@/lib/data/journal';

/** Editorial banners for the homepage collections trio. */
const FEATURED_IMAGES: Record<string, string> = {
  rings: '/images/rings-banner.png',
  necklaces: '/images/necklace-banner.png',
  bracelets: '/images/bracelet-banner.png',
};

/** The trio shown in the second section — necklaces sits in the middle (flipped). */
const FEATURED_SLUGS = ['rings', 'necklaces', 'bracelets'];

export default async function HomePage() {
  const [allCollections, editorsPicks, featured] = await Promise.all([
    fetchCollections(),
    fetchEditorsPicks(3),
    fetchFeatured(8),
  ]);
  const featuredCollections = FEATURED_SLUGS.map((slug) =>
    allCollections.find((c) => c.slug === slug)
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const recentJournal = journalPosts.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Featured collections (§18) */}
      <section className="shell py-24 md:py-40">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="The Collections"
            title={
              <>
                Six disciplines,
                <br className="hidden md:block" /> one standard.
              </>
            }
          />
          <Reveal>
            <Link
              href="/collections"
              className="link-underline font-body text-caption uppercase tracking-wide text-stone transition-colors hover:text-brass"
            >
              View all collections
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">
          {featuredCollections.map((collection, i) => {
            const align: 'left' | 'right' = i === 1 ? 'right' : 'left';
            return (
              <Reveal key={collection.slug} delay={i * 80}>
                <CollectionBanner
                  href={`/collections/${collection.slug}`}
                  image={FEATURED_IMAGES[collection.slug] ?? collection.image}
                  kicker={collection.tagline}
                  title={collection.name}
                  align={align}
                  flip={i === 1}
                  priority={i === 0}
                />
              </Reveal>
            );
          })}
        </div>
      </section>

      <BrandStory />

      {/* Editor's picks (§18) */}
      <section className="shell py-24 md:py-40">
        <SectionHeading
          kicker="Editor's Picks"
          title="Chosen this season"
          intro="A short list from our creative director — the pieces we would keep for ourselves."
          className="mb-16"
        />
        <ProductGrid products={editorsPicks} columns={3} />
      </section>

      <Craftsmanship />

      {/* Featured products (§18) */}
      <section className="shell py-24 md:py-40">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="New Arrivals" title="Lately from the bench" />
          <Reveal>
            <Link
              href="/collections/all"
              className="group inline-flex items-center gap-2 font-body text-caption uppercase tracking-wide text-stone transition-colors hover:text-brass"
            >
              Shop all
              <ArrowRight className="h-4 w-4 transition-transform duration-220 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <ProductGrid products={featured} columns={4} />
      </section>

      <Testimonials />

      {/* Journal (§18) */}
      <section className="shell py-24 md:py-40">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="The Journal"
            title="On craft & permanence"
          />
          <Reveal>
            <Link
              href="/journal"
              className="link-underline font-body text-caption uppercase tracking-wide text-stone transition-colors hover:text-brass"
            >
              Read the journal
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {recentJournal.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <JournalCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
