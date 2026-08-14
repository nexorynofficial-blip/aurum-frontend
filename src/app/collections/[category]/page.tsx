import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CollectionBrowser } from '@/components/shop/CollectionBrowser';
import { collections, getCollection } from '@/lib/data/collections';
import { fetchCollection, fetchProductsByCategory } from '@/lib/api/catalog';

interface PageProps {
  params: { category: string };
}

const ALL = {
  slug: 'all',
  name: 'The Full Collection',
  tagline: 'Everything, in one place',
  description:
    'The complete AURUM catalogue — every discipline of the house, released in limited number.',
  image: '/images/the-full-collection.png',
};

export function generateStaticParams() {
  return [{ category: 'all' }, ...collections.map((c) => ({ category: c.slug }))];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const collection =
    params.category === 'all' ? ALL : getCollection(params.category);
  if (!collection) return { title: 'Not found' };
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  let collection;
  let products;
  if (params.category === 'all') {
    collection = ALL;
    products = await fetchProductsByCategory('all');
  } else {
    const result = await fetchCollection(params.category);
    if (!result) notFound();
    collection = result.collection;
    products = result.products;
  }

  // Every collection page (Shop + each category) shares the same layout:
  // left-hugging full-width content and a 5-across desktop grid.
  const contentClass = 'w-full px-6 py-12 md:px-10 md:py-16 xl:px-16';

  return (
    <div>
      {/* Editorial banner (§19) */}
      <section className="relative flex h-[46vh] min-h-[360px] items-end overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/20"
        />
        <div className="relative z-raised w-full px-6 pb-12 md:px-10 xl:px-16">
          <p className="kicker mb-4">{collection.tagline}</p>
          <h1 className="font-display text-h1 font-light text-ivory md:text-hero">
            {collection.name}
          </h1>
        </div>
      </section>

      <div className={contentClass}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Collections', href: '/collections' },
            { label: collection.name },
          ]}
          className="mb-10"
        />

        <p className="mb-16 max-w-prose font-body text-body text-stone">
          {collection.description}
        </p>

        <CollectionBrowser products={products} fiveColumns />
      </div>
    </div>
  );
}
