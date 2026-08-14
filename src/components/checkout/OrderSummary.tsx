import { CartItem } from '@/types';
import { Price } from '@/components/common/Price';
import { cn } from '@/lib/utils';

interface OrderSummaryProps {
  items: CartItem[];
  shipping?: number;
  taxRate?: number;
  discount?: number;
  className?: string;
  showItems?: boolean;
}

/** Estimated-tax rate used for storefront display only (real tax at checkout). */
export const TAX_RATE = 0.0887;

export function OrderSummary({
  items,
  shipping = 0,
  taxRate = TAX_RATE,
  discount = 0,
  className,
  showItems = false,
}: OrderSummaryProps) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * taxRate;
  const total = taxable + shipping + tax;

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {showItems && (
        <ul className="flex flex-col gap-4 border-b border-graphite pb-6">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 text-caption">
              <span className="text-stone">
                {item.name}
                <span className="text-stone/60"> × {item.quantity}</span>
              </span>
              <Price value={item.price * item.quantity} className="text-ivory" />
            </li>
          ))}
        </ul>
      )}

      <dl className="flex flex-col gap-3 font-body text-small">
        <Row label="Subtotal">
          <Price value={subtotal} cents className="text-ivory" />
        </Row>
        {discount > 0 && (
          <Row label="Discount">
            <span className="font-mono tabular-nums text-forest">
              −<Price value={discount} cents />
            </span>
          </Row>
        )}
        <Row label="Shipping">
          {shipping === 0 ? (
            <span className="font-mono text-caption uppercase tracking-wide text-forest">
              Complimentary
            </span>
          ) : (
            <Price value={shipping} cents className="text-ivory" />
          )}
        </Row>
        <Row label="Estimated tax">
          <Price value={tax} cents className="text-ivory" />
        </Row>
      </dl>

      <div className="flex items-baseline justify-between border-t border-graphite pt-6">
        <span className="font-display text-body-lg font-light text-ivory">Total</span>
        <Price value={total} cents className="text-h4 text-ivory" />
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-stone">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
