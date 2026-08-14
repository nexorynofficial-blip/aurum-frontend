'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { OrderStatusBadge } from '@/components/common/Badge';
import { Price } from '@/components/common/Price';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { formatDate, cn } from '@/lib/utils';
import { OrderStatus } from '@/types';
import { apiGetOrder, type OrderDetail } from '@/lib/api/orders';

const TIMELINE: { key: OrderStatus; label: string }[] = [
  { key: 'pending', label: 'Order placed' },
  { key: 'dispatched', label: 'Dispatched' },
  { key: 'delivered', label: 'Delivered' },
];

function stageIndex(status: OrderStatus): number {
  return (['pending', 'dispatched', 'delivered'] as OrderStatus[]).indexOf(status);
}

interface AddressShape {
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDetail | null | 'missing'>(null);

  useEffect(() => {
    apiGetOrder(params.id)
      .then(setOrder)
      .catch(() => setOrder('missing'));
  }, [params.id]);

  if (order === null) return <div className="min-h-[40vh]" aria-busy />;

  if (order === 'missing') {
    return (
      <EmptyState
        title="Order not found"
        message="We couldn't find this order on your account. Please sign in and try again."
        action={{ label: 'All orders', href: '/account/orders' }}
      />
    );
  }

  const status = order.status as OrderStatus;
  const currentStage = stageIndex(status);
  const address = order.shippingAddress as AddressShape;

  return (
    <div className="flex flex-col gap-12">
      <header>
        <Link
          href="/account/orders"
          className="font-mono text-micro uppercase tracking-luxe text-stone transition-colors hover:text-brass"
        >
          ← All orders
        </Link>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-h2 font-light text-ivory">{order.orderNumber}</h1>
          <OrderStatusBadge status={status} />
        </div>
        <p className="mt-3 font-body text-caption text-stone">
          Placed {formatDate(order.createdAt)}
          {order.estimatedDelivery && ` · Estimated delivery ${formatDate(order.estimatedDelivery)}`}
        </p>
      </header>

      {status !== 'cancelled' && status !== 'returned' && (
        <div className="rounded-card border border-graphite p-8">
          <ol className="flex items-center justify-between">
            {TIMELINE.map((stage, i) => {
              const done = i <= currentStage;
              const isLast = i === TIMELINE.length - 1;
              return (
                <li key={stage.key} className={cn('flex flex-1 items-center', isLast && 'flex-none')}>
                  <div className="flex flex-col items-center gap-3">
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                        done ? 'border-brass bg-brass text-obsidian' : 'border-graphite text-stone'
                      )}
                    >
                      {done ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        'text-center font-mono text-micro uppercase tracking-luxe',
                        done ? 'text-ivory' : 'text-stone'
                      )}
                    >
                      {stage.label}
                    </span>
                  </div>
                  {!isLast && (
                    <span className={cn('mx-2 h-px flex-1', i < currentStage ? 'bg-brass' : 'bg-graphite')} />
                  )}
                </li>
              );
            })}
          </ol>
          {order.trackingNumber && (
            <p className="mt-8 text-center font-body text-caption text-stone">
              Tracking number <span className="font-mono text-ivory">{order.trackingNumber}</span>
            </p>
          )}
        </div>
      )}

      <section>
        <h2 className="mb-6 font-display text-h4 font-light text-ivory">Items</h2>
        <ul className="divide-y divide-graphite border-y border-graphite">
          {order.lineItems.map((item, i) => (
            <li key={i} className="flex gap-6 py-6">
              <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-image bg-slate">
                {item.image && (
                  <Image src={item.image} alt={item.productName} fill sizes="80px" className="object-cover" />
                )}
              </div>
              <div className="flex flex-1 flex-col">
                <span className="font-display text-body font-light italic text-ivory">
                  {item.productName}
                </span>
                {item.variant && (
                  <span className="mt-1 font-body text-caption text-stone">
                    {Object.entries(item.variant)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(' · ')}
                  </span>
                )}
                <span className="mt-1 font-body text-caption text-stone">Quantity {item.quantity}</span>
              </div>
              <Price value={item.priceAtPurchase} className="text-small text-ivory" />
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-card border border-graphite p-6">
          <h3 className="mb-5 font-mono text-micro uppercase tracking-luxe text-brass">Delivery address</h3>
          <div className="font-body text-small leading-relaxed text-stone">
            <p className="text-ivory">
              {address.firstName} {address.lastName}
            </p>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p>{address.country}</p>
          </div>
          {order.notes && (
            <p className="mt-5 border-t border-graphite pt-5 font-body text-caption italic text-stone">
              “{order.notes}”
            </p>
          )}
        </div>

        <div className="rounded-card border border-graphite p-6">
          <h3 className="mb-5 font-mono text-micro uppercase tracking-luxe text-brass">Summary</h3>
          <dl className="flex flex-col gap-3 font-body text-small">
            <div className="flex justify-between">
              <dt className="text-stone">Subtotal</dt>
              <dd><Price value={order.subtotal} className="text-ivory" /></dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone">Shipping</dt>
              <dd>
                {order.shipping === 0 ? (
                  <span className="font-mono text-caption uppercase text-forest">Complimentary</span>
                ) : (
                  <Price value={order.shipping} className="text-ivory" />
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone">Tax</dt>
              <dd><Price value={order.tax} className="text-ivory" /></dd>
            </div>
            <div className="flex justify-between border-t border-graphite pt-3">
              <dt className="font-body text-body text-ivory">Total</dt>
              <dd><Price value={order.total} className="text-body-lg text-ivory" /></dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 border-t border-graphite pt-8">
        <Button href="/contact" variant="outline" size="md">
          Need help?
        </Button>
        <Button href="/shipping-returns" variant="ghost" size="md">
          Return policy
        </Button>
      </div>
    </div>
  );
}
