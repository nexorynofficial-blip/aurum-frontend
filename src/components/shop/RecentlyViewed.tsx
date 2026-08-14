'use client';

import { useEffect, useState } from 'react';
import { products as allProducts } from '@/lib/data/products';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { SectionHeading } from '@/components/common/SectionHeading';

const KEY = 'aurum-recently-viewed';
const MAX = 8;

/** Records the current product and shows the rest of the recently-viewed set. */
export function RecentlyViewed({ currentId }: { currentId: string }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let ids: string[] = [];
    try {
      ids = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    } catch {
      ids = [];
    }

    const others = ids
      .filter((id) => id !== currentId)
      .map((id) => allProducts.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p))
      .slice(0, 4);
    setItems(others);

    const next = [currentId, ...ids.filter((id) => id !== currentId)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  }, [currentId]);

  if (items.length === 0) return null;

  return (
    <section className="shell py-24 md:py-32">
      <SectionHeading kicker="Recently Viewed" title="Return to" className="mb-12" />
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
