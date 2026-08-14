'use client';

import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useMounted } from '@/hooks/useMounted';
import { toast } from '@/components/common/Toast';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  /** 'icon' = circular ghost button (on cards); 'inline' = labelled row. */
  variant?: 'icon' | 'inline';
  className?: string;
}

/**
 * Heart toggles fill outline → brass over 200ms, no navigation (§25).
 */
export function WishlistButton({
  productId,
  productName,
  variant = 'icon',
  className,
}: WishlistButtonProps) {
  const mounted = useMounted();
  const has = useWishlistStore((s) => s.ids.includes(productId));
  const toggle = useWishlistStore((s) => s.toggle);
  const active = mounted && has;

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
    toast(
      active
        ? `Removed${productName ? ` ${productName}` : ''} from wishlist`
        : `Saved${productName ? ` ${productName}` : ''} to wishlist`
    );
  };

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={handle}
        aria-pressed={active}
        aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
        className={cn(
          'inline-flex items-center gap-2 font-mono text-micro uppercase tracking-luxe text-stone transition-colors duration-220 ease-luxe hover:text-brass',
          className
        )}
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-all duration-200 ease-luxe',
            active ? 'fill-brass text-brass' : 'fill-transparent'
          )}
        />
        {active ? 'Saved' : 'Add to wishlist'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-pressed={active}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full border border-graphite/70 bg-obsidian/50 text-ivory backdrop-blur transition-all duration-220 ease-luxe hover:border-brass hover:text-brass',
        className
      )}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-all duration-200 ease-luxe',
          active ? 'scale-110 fill-brass text-brass' : 'fill-transparent'
        )}
      />
    </button>
  );
}
