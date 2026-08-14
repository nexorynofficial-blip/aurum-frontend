'use client';

import { useState } from 'react';
import { Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { Price } from '@/components/common/Price';
import { AvailabilityBadge } from '@/components/common/Badge';
import { QuantityStepper } from '@/components/common/QuantityStepper';
import { AddToBagButton } from './AddToBagButton';
import { WishlistButton } from './WishlistButton';
import { cn } from '@/lib/utils';

export function ProductPurchase({ product }: { product: Product }) {
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach((group) => {
      const firstAvailable = group.options.find((o) => o.available !== false);
      if (firstAvailable) initial[group.name] = firstAvailable.value;
    });
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  const select = (group: string, value: string) =>
    setSelections((s) => ({ ...s, [group]: value }));

  const variantLabels = product.variants?.reduce<Record<string, string>>(
    (acc, group) => {
      const opt = group.options.find((o) => o.value === selections[group.name]);
      if (opt) acc[group.name] = opt.label;
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-micro uppercase tracking-luxe text-brass">
          {product.sku}
        </p>
        <h1 className="mt-3 font-display text-h2 font-light leading-tight text-ivory">
          {product.name}
        </h1>
        <div className="mt-5">
          <Price value={product.price} className="text-h4 text-ivory" />
        </div>
        {/* Stock sits directly below the price (~20px gap) — §2 hierarchy */}
        <div className="mt-6">
          <AvailabilityBadge availability={product.availability} stock={product.stock} />
        </div>
        <p className="mt-6 max-w-prose font-body text-body text-stone">
          {product.description}
        </p>
      </div>

      {/* Variants (§24) */}
      {product.variants?.map((group) => (
        <fieldset key={group.name}>
          <legend className="mb-4 flex items-baseline gap-3">
            <span className="font-mono text-micro uppercase tracking-luxe text-stone">
              {group.name}
            </span>
            {variantLabels?.[group.name] && (
              <span className="font-body text-caption text-ivory">
                {variantLabels[group.name]}
              </span>
            )}
          </legend>

          <div className="flex flex-wrap gap-3">
            {group.options.map((option) => {
              const isActive = selections[group.name] === option.value;
              const disabled = option.available === false;

              if (group.type === 'swatch') {
                return (
                  <button
                    key={option.value}
                    onClick={() => !disabled && select(group.name, option.value)}
                    disabled={disabled}
                    aria-label={option.label}
                    aria-pressed={isActive}
                    title={option.label}
                    className={cn(
                      'relative h-10 w-10 rounded-full border-2 transition-all duration-220 disabled:opacity-30',
                      isActive ? 'border-brass' : 'border-graphite hover:border-stone'
                    )}
                  >
                    <span
                      className="absolute inset-1 rounded-full"
                      style={{ backgroundColor: option.swatch }}
                    />
                  </button>
                );
              }

              return (
                <button
                  key={option.value}
                  onClick={() => !disabled && select(group.name, option.value)}
                  disabled={disabled}
                  aria-pressed={isActive}
                  className={cn(
                    'min-w-12 rounded-full border px-5 py-2.5 font-body text-caption transition-all duration-220 disabled:cursor-not-allowed disabled:opacity-30 disabled:line-through',
                    isActive
                      ? 'border-brass bg-brass/10 text-ivory'
                      : 'border-graphite text-stone hover:border-stone hover:text-ivory'
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {/* Quantity + purchase */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-micro uppercase tracking-luxe text-stone">
            Quantity
          </span>
          <QuantityStepper value={quantity} onChange={setQuantity} max={product.stock || 10} />
        </div>

        <div className="flex flex-col gap-3">
          <AddToBagButton
            product={product}
            quantity={quantity}
            variant={variantLabels}
          />
          <WishlistButton
            productId={product.id}
            productName={product.name}
            variant="inline"
            className="justify-center py-2"
          />
        </div>
      </div>

      {/* Assurances */}
      <ul className="flex flex-col gap-4 border-t border-graphite pt-8">
        {[
          { icon: Truck, text: 'Complimentary insured delivery worldwide' },
          { icon: ShieldCheck, text: 'Certificate of authenticity & lifetime servicing' },
          { icon: RotateCcw, text: '30-day returns on unworn pieces' },
        ].map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-4 font-body text-caption text-stone">
            <Icon className="h-4 w-4 shrink-0 text-brass" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
