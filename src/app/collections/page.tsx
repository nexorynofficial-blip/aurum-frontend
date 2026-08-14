import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CollectionCard } from '@/components/shop/CollectionCard';
import { Reveal } from '@/components/common/Reveal';
import { fetchCollections } from '@/lib/api/catalog';

export const metadata: Metadata = {
  title: 'Collections',
  description:
    'Six disciplines of the AURUM atelier — rings, necklaces, earrings, bracelets, timepieces and objects.',
};

/** Per-collection thumbnails, scoped to this listing page only. */
const THUMBNAILS: Record<string, string> = {
  rings: '/images/rings-thumbnail.png',
  necklaces: '/images/necklace-thumbnail.png',
  earrings: '/images/earrings-thumbnail.png',
  bracelets: '/images/bracelet-thumbnail.png',
  timepieces: '/images/timepiece-thumbnail.png',
  objects: '/images/object-thumbnail.png',
};

export default async function CollectionsPage() {
  const collections = await fetchCollections();
  return (
    <div className="shell py-16 md:py-20">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Collections' }]} />

      <header className="mt-10 max-w-3xl">
        <p className="kicker mb-6">The Collections</p>
        <h1 className="font-display text-h1 font-light leading-tight text-ivory md:text-hero">
          Six disciplines,
          <span className="block italic text-brass">one standard.</span>
        </h1>
        <p className="mt-8 max-w-prose font-body text-body text-stone">
          Each collection is a distinct discipline of the house, yet all are held
          to the same uncompromising measure of material and making.
        </p>
      </header>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-8">
        {collections.map((collection, i) => (
          <Reveal key={collection.slug} delay={(i % 2) * 100}>
            <CollectionCard
              collection={{
                ...collection,
                image: THUMBNAILS[collection.slug] ?? collection.image,
                count: collection.count ?? 0,
              }}
              ratio="landscape"
              priority={i < 2}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
