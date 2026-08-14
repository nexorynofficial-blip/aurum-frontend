'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Price } from '@/components/common/Price';
import { WishlistButton } from './WishlistButton';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, priority, className }: ProductCardProps) {
  const secondImage = product.images[1] ?? product.images[0];

  return (
    <article className={cn('group relative', className)}>
      <Link
        href={`/product/${product.slug}`}
        className="block"
        aria-label={`${product.name} — ${product.material}`}
      >
        {/* Media — 4:5 (§21) */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-image bg-charcoal">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-all duration-700 ease-luxe group-hover:scale-[1.04] group-hover:opacity-0"
          />
          <Image
            src={secondImage}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover opacity-0 transition-all duration-700 ease-luxe group-hover:scale-[1.04] group-hover:opacity-100"
          />

          {/* New marker */}
          {product.isNew && (
            <span className="absolute left-4 top-4 font-mono text-micro uppercase tracking-luxe text-brass">
              New
            </span>
          )}

          {/* Wishlist — appears on hover / focus, always visible on touch */}
          <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-350 ease-luxe group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100">
            <WishlistButton productId={product.id} productName={product.name} />
          </div>

          {product.availability === 'limited' && (
            <span className="absolute bottom-4 left-4 font-mono text-micro uppercase tracking-luxe text-brass/90">
              Limited
            </span>
          )}
        </div>
      </Link>

      {/* Info — title slides up on hover, price fixed (§21) */}
      <div className="relative mt-4 overflow-hidden">
        <div className="transition-transform duration-350 ease-luxe md:group-hover:-translate-y-0.5">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display text-body-lg font-light italic leading-tight text-ivory transition-colors duration-220 group-hover:text-brass">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 font-body text-caption text-stone">
            {product.material}
          </p>
        </div>
        <Price value={product.price} className="mt-2 block text-small text-ivory" />
      </div>
    </article>
  );
}
