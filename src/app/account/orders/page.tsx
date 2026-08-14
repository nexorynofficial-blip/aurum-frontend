'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { OrderStatusBadge } from '@/components/common/Badge';
import { Price } from '@/components/common/Price';
import { EmptyState } from '@/components/common/EmptyState';
import { formatDate } from '@/lib/utils';
import { apiListOrders, type OrderRow } from '@/lib/api/orders';
import type { OrderStatus } from '@/types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRow[] | null>(null);

  useEffect(() => {
    apiListOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  if (orders === null) {
    return <div className="min-h-[40vh]" aria-busy />;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        message="When you place an order, it will appear here with tracking and receipts."
        action={{ label: 'Begin shopping', href: '/collections/all' }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <header>
        <p className="kicker mb-4">Order History</p>
        <h1 className="font-display text-h1 font-light text-ivory">Your orders</h1>
      </header>

      <ul className="flex flex-col gap-6">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`/account/orders/${order.id}`}
              className="group block rounded-card border border-graphite p-6 transition-colors hover:border-stone md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-body text-ivory">{order.orderNumber}</span>
                    <OrderStatusBadge status={order.status as OrderStatus} />
                  </div>
                  <p className="mt-2 font-body text-caption text-stone">
                    Placed {formatDate(order.createdAt)} · {order.itemCount}{' '}
                    {order.itemCount === 1 ? 'piece' : 'pieces'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Price value={order.total} className="text-body text-ivory" />
                  <ChevronRight className="h-5 w-5 text-stone transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
