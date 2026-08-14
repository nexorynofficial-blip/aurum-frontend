import type { MetadataRoute } from 'next';
import { products } from '@/lib/data/products';
import { collections } from '@/lib/data/collections';
import { journalPosts } from '@/lib/data/journal';

const BASE = 'https://aurum.luxury';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/collections',
    '/collections/all',
    '/about',
    '/journal',
    '/contact',
    '/shipping-returns',
    '/faq',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${BASE}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const journalRoutes = journalPosts.map((j) => ({
    url: `${BASE}/journal/${j.slug}`,
    lastModified: new Date(j.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes, ...journalRoutes];
}
