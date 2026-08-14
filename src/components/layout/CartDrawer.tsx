'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/common/Button';
import { Price } from '@/components/common/Price';
import { QuantityStepper } from '@/components/common/QuantityStepper';
import { formatPrice } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const { cartOpen, closeCart } = useUIStore();
  const { items, updateQuantity, removeItem } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Lock scroll + Escape to close (§ escape routes)
  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [cartOpen, closeCart]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
          {/* Scrim — 16px blur (§26) */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeCart}
            aria-label="Close bag"
            className="absolute inset-0 bg-obsidian/60 backdrop-blur-[16px]"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-charcoal shadow-drawer"
          >
            <div className="flex items-center justify-between border-b border-graphite px-6 py-6">
              <h2 className="font-display text-h4 font-light text-ivory">
                Your Bag
                <span className="ml-2 font-mono text-caption text-stone">
                  ({items.reduce((n, i) => n + i.quantity, 0)})
                </span>
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close bag"
                className="text-stone transition-colors hover:text-ivory"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-graphite text-brass">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-h4 font-light text-ivory">
                    Your bag is empty
                  </p>
                  <p className="mt-2 font-body text-caption text-stone">
                    Pieces you add will be held here.
                  </p>
                </div>
                <Button variant="outline" size="md" onClick={closeCart} href="/collections/all">
                  Explore the collection
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-graphite overflow-y-auto px-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 py-6">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-[12px] bg-slate"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="font-display text-body font-light italic text-ivory hover:text-brass"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-stone transition-colors hover:text-crimson"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="mt-1 font-body text-caption text-stone">
                            {Object.values(item.variant).join(' · ')}
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <QuantityStepper
                            size="sm"
                            value={item.quantity}
                            onChange={(q) => updateQuantity(item.id, q)}
                          />
                          <Price value={item.price * item.quantity} className="text-small text-ivory" />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-graphite px-6 py-6">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-small text-stone">Subtotal</span>
                    <Price value={subtotal} className="text-body-lg text-ivory" />
                  </div>
                  <p className="mt-1 font-body text-caption text-stone">
                    Shipping & duties calculated at checkout.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button href="/checkout" size="lg" fullWidth onClick={closeCart}>
                      Proceed to checkout · {formatPrice(subtotal)}
                    </Button>
                    <Button href="/cart" variant="ghost" size="md" fullWidth onClick={closeCart}>
                      View full bag
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
