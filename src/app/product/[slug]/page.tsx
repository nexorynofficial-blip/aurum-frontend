import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ImageGallery } from '@/components/shop/ImageGallery';
import { ProductPurchase } from '@/components/shop/ProductPurchase';
import { ProductAccordion } from '@/components/shop/ProductAccordion';
import { RecentlyViewed } from '@/components/shop/RecentlyViewed';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { products } from '@/lib/data/products';
import { fetchProductBySlug, fetchRelated } from '@/lib/api/catalog';
import { getCollection } from '@/lib/data/collections';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return { title: 'Not found' };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();

  const collection = getCollection(product.category);
  const related = await fetchRelated(params.slug);

  // Structured data (PRD §6.2.7 SEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: product.description,
    material: product.material,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability:
        product.availability === 'out-of-stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="shell py-10 md:py-14">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Collections', href: '/collections' },
            ...(collection
              ? [{ label: collection.name, href: `/collections/${collection.slug}` }]
              : []),
            { label: product.name },
          ]}
          className="mb-10"
        />

        {/* Gallery + sticky purchase (§22) */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ImageGallery images={product.images} name={product.name} />

          <div className="lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
            <ProductPurchase product={product} />
          </div>
        </div>

        {/* Story + details */}
        <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="kicker mb-6">The Piece</p>
            <h2 className="font-display text-h2 font-light leading-tight text-ivory">
              {product.story ? 'A note on this piece' : product.name}
            </h2>
            {product.story && (
              <p className="mt-8 max-w-prose font-body text-body-lg leading-relaxed text-stone">
                {product.story}
              </p>
            )}
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-graphite pt-8">
              {[
                ['Material', product.material],
                ['Stone', product.stoneType ?? 'None'],
                ['Weight', product.weightGrams ? `${product.weightGrams} g` : '—'],
                ['Reference', product.sku],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-micro uppercase tracking-luxe text-stone">
                    {label}
                  </dt>
                  <dd className="mt-2 font-body text-body text-ivory">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            {product.details && <ProductAccordion sections={product.details} />}
          </Reveal>
        </div>
      </div>

      {/* Related (§22) */}
      <section className="shell border-t border-graphite py-24 md:py-32">
        <SectionHeading
          kicker="You May Also Consider"
          title="From the same hand"
          className="mb-16"
        />
        <ProductGrid products={related} columns={4} priorityCount={0} />
      </section>

      <RecentlyViewed currentId={product.id} />
    </>
  );
}
