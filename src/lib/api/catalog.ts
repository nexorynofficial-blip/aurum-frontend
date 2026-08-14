import { Product, Collection } from '@/types';
import { safeFetch } from './client';
import {
  products as seedProducts,
  getProductBySlug as seedBySlug,
  getProductsByCategory as seedByCategory,
  getRelatedProducts as seedRelated,
} from '@/lib/data/products';
import {
  collections as seedCollections,
  getCollection as seedGetCollection,
} from '@/lib/data/collections';

/* Backend product shape (see backend serializeProduct). */
interface ApiProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  story?: string;
  price: number;
  images: string[];
  material?: string | null;
  color?: string;
  stoneType?: string;
  weightGrams?: number;
  stock: number;
  availability: Product['availability'];
  isNew?: boolean;
  variants?: Product['variants'];
  details?: Product['details'];
  collections: string[];
}

function mapProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    slug: p.slug,
    description: p.description,
    story: p.story,
    price: p.price,
    images: p.images ?? [],
    category: p.collections?.[0] ?? 'all',
    material: p.material ?? '',
    color: p.color,
    stoneType: p.stoneType,
    weightGrams: p.weightGrams,
    stock: p.stock,
    availability: p.availability,
    isNew: p.isNew,
    collections: p.collections ?? [],
    variants: p.variants,
    details: p.details,
  };
}

const REVALIDATE = 60;

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await safeFetch<{ data: ApiProduct[] } | null>('/products?limit=60', null, {
    revalidate: REVALIDATE,
  });
  if (!data?.data?.length) return seedProducts;
  return data.data.map(mapProduct);
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const q = category && category !== 'all' ? `&category=${encodeURIComponent(category)}` : '';
  const data = await safeFetch<{ data: ApiProduct[] } | null>(`/products?limit=60${q}`, null, {
    revalidate: REVALIDATE,
  });
  if (!data?.data) return seedByCategory(category);
  return data.data.map(mapProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const p = await safeFetch<ApiProduct | null>(`/products/${slug}`, null, { revalidate: REVALIDATE });
  if (!p?.id) return seedBySlug(slug) ?? null;
  return mapProduct(p);
}

export async function fetchRelated(slug: string): Promise<Product[]> {
  const data = await safeFetch<{ data: ApiProduct[] } | null>(`/products/${slug}/related`, null, {
    revalidate: REVALIDATE,
  });
  if (!data?.data) {
    const p = seedBySlug(slug);
    return p ? seedRelated(p) : [];
  }
  return data.data.map(mapProduct);
}

export async function searchCatalog(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return [];
  const data = await safeFetch<{ data: ApiProduct[] } | null>(
    `/products?limit=12&search=${encodeURIComponent(q)}`,
    null
  );
  if (!data?.data) {
    const { searchProducts } = await import('@/lib/data/products');
    return searchProducts(q);
  }
  return data.data.map(mapProduct);
}

export async function fetchFeatured(count = 8): Promise<Product[]> {
  const all = await fetchAllProducts();
  const fresh = all.filter((p) => p.isNew);
  return (fresh.length ? fresh : all).slice(0, count);
}

export async function fetchEditorsPicks(count = 3): Promise<Product[]> {
  const slugs = ['solstice-solitaire', 'cascade-necklace', 'atelier-automatic'];
  const all = await fetchAllProducts();
  const picks = slugs
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
  return (picks.length ? picks : all).slice(0, count);
}

interface ApiCollection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string | null;
  count?: number;
}

function mapCollection(c: ApiCollection): Collection {
  return {
    slug: c.slug,
    name: c.name,
    tagline: c.tagline,
    description: c.description,
    image: c.image ?? '',
    count: c.count,
  };
}

export async function fetchCollections(): Promise<Collection[]> {
  const data = await safeFetch<{ data: ApiCollection[] } | null>('/collections', null, {
    revalidate: REVALIDATE,
  });
  if (!data?.data?.length) return seedCollections;
  return data.data.map(mapCollection);
}

export async function fetchCollection(
  slug: string
): Promise<{ collection: Collection; products: Product[] } | null> {
  const data = await safeFetch<(ApiCollection & { products: ApiProduct[] }) | null>(
    `/collections/${slug}`,
    null,
    { revalidate: REVALIDATE }
  );
  if (!data?.slug) {
    const c = seedGetCollection(slug);
    if (!c) return null;
    return { collection: c, products: seedByCategory(slug) };
  }
  return { collection: mapCollection(data), products: (data.products ?? []).map(mapProduct) };
}
