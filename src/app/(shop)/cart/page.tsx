'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useMounted } from '@/hooks/useMounted';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/common/Button';
import { Price } from '@/components/common/Price';
import { QuantityStepper } from '@/components/common/QuantityStepper';
import { EmptyState } from '@/components/common/EmptyState';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { toast } from '@/components/common/Toast';

export default function CartPage() {
  const mounted = useMounted();
  const { items, updateQuantity, removeItem } = useCartStore();
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === 'ATELIER') {
      setDiscount(250);
      toast('Promotion applied — $250 credit', 'success');
    } else {
      toast('That code is not recognised', 'error');
    }
  };

  if (!mounted) {
    return <div className="shell min-h-[60vh] py-20" aria-busy />;
  }

  return (
    <div className="shell py-16 md:py-20">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Bag' }]} />

      <h1 className="mt-10 font-display text-h1 font-light text-ivory md:text-hero">
        Your Bag
      </h1>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-6 w-6" />}
          title="Your bag is empty"
          message="The pieces you add will be held here until you are ready."
          action={{ label: 'Explore the collection', href: '/collections/all' }}
        />
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          {/* Line items */}
          <ul className="divide-y divide-graphite border-y border-graphite">
            {items.map((item) => (
              <li key={item.id} className="flex gap-6 py-8">
                <Link
                  href={`/product/${item.slug}`}
                  className="media-zoom relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-image bg-charcoal md:w-32"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-display text-body-lg font-light italic text-ivory hover:text-brass"
                      >
                        {item.name}
                      </Link>
                      {item.material && (
                        <p className="mt-1 font-body text-caption text-stone">
                          {item.material}
                        </p>
                      )}
                      {item.variant && (
                        <p className="mt-1 font-body text-caption text-stone">
                          {Object.entries(item.variant)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(' · ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="h-fit text-stone transition-colors hover:text-crimson"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.id, q)}
                    />
                    <Price
                      value={item.price * item.quantity}
                      className="text-body-lg text-ivory"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <div className="lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
            <div className="rounded-card border border-graphite bg-charcoal p-8">
              <h2 className="mb-8 font-display text-h4 font-light text-ivory">
                Order Summary
              </h2>

              <OrderSummary items={items} discount={discount} />

              {/* Promo */}
              <form onSubmit={applyPromo} className="mt-8">
                <label
                  htmlFor="promo"
                  className="mb-3 flex items-center gap-2 font-mono text-micro uppercase tracking-luxe text-stone"
                >
                  <Tag className="h-3.5 w-3.5" /> Promotion code
                </label>
                <div className="flex gap-3">
                  <input
                    id="promo"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Enter code"
                    className="h-12 flex-1 rounded-input border border-graphite bg-obsidian px-4 font-body text-small text-ivory placeholder-stone/50 focus:border-brass focus:outline-none"
                  />
                  <Button type="submit" variant="outline" size="md">
                    Apply
                  </Button>
                </div>
              </form>

              <Button href="/checkout" size="lg" fullWidth className="mt-8">
                Proceed to checkout
              </Button>
              <Link
                href="/collections/all"
                className="mt-4 block text-center font-body text-caption text-stone transition-colors hover:text-brass"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
