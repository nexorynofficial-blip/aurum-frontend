'use client';

import { useEffect, useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useMounted } from '@/hooks/useMounted';
import { fetchAllProducts } from '@/lib/api/catalog';
import type { Product } from '@/types';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProductCard } from '@/components/shop/ProductCard';
import { EmptyState } from '@/components/common/EmptyState';
import { toast } from '@/components/common/Toast';

export default function WishlistPage() {
  const mounted = useMounted();
  const ids = useWishlistStore((s) => s.ids);
  const [catalog, setCatalog] = useState<Product[]>([]);

  useEffect(() => {
    fetchAllProducts().then(setCatalog).catch(() => setCatalog([]));
  }, []);

  const saved = catalog.filter((p) => ids.includes(p.id));

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'My AURUM wishlist', url });
      } else {
        await navigator.clipboard.writeText(url);
        toast('Wishlist link copied to clipboard', 'success');
      }
    } catch {
      /* dismissed */
    }
  };

  if (!mounted) return <div className="shell min-h-[60vh] py-20" aria-busy />;

  return (
    <div className="shell py-16 md:py-20">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="kicker mb-4">Saved for Later</p>
          <h1 className="font-display text-h1 font-light text-ivory md:text-hero">
            The Wishlist
          </h1>
        </div>
        {saved.length > 0 && (
          <button
            onClick={share}
            className="inline-flex items-center gap-2 font-body text-caption uppercase tracking-wide text-stone transition-colors hover:text-brass"
          >
            <Share2 className="h-4 w-4" /> Share wishlist
          </button>
        )}
      </div>

      {saved.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-6 w-6" />}
          title="Nothing saved yet"
          message="Tap the heart on any piece to keep it here while you decide."
          action={{ label: 'Discover pieces', href: '/collections/all' }}
        />
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
