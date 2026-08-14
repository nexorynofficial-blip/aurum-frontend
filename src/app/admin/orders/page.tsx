'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { adminListOrders, type AdminOrderRow } from '@/lib/api/admin';
import { AdminPageHeader, Panel, StatusPill } from '@/components/admin/AdminUI';
import { formatPrice, formatDateShort, cn } from '@/lib/utils';

const FILTERS = ['all', 'pending', 'dispatched', 'delivered', 'returned', 'cancelled'] as const;
type Filter = (typeof FILTERS)[number];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrderRow[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminListOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    return FILTERS.reduce<Record<string, number>>((acc, f) => {
      acc[f] = f === 'all' ? orders.length : orders.filter((o) => o.status === f).length;
      return acc;
    }, {});
  }, [orders]);

  const rows = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <>
      <AdminPageHeader
        title="Orders"
        subtitle={`${orders.length} orders · ${counts.pending} awaiting fulfilment`}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-micro uppercase tracking-luxe transition-colors duration-220',
              filter === f
                ? 'border-brass bg-brass/10 text-ivory'
                : 'border-graphite text-stone hover:border-stone hover:text-ivory'
            )}
          >
            {f}
            <span className="text-stone/70">{counts[f]}</span>
          </button>
        ))}
      </div>

      <Panel className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-graphite">
                {['Order', 'Customer', 'Date', 'Items', 'Total', 'Paid', 'Status', ''].map((h, i) => (
                  <th key={i} className="p-4 font-mono text-micro uppercase tracking-luxe text-stone">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite">
              {rows.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-slate/40">
                  <td className="p-4 font-mono text-caption text-ivory">{o.orderNumber}</td>
                  <td className="p-4 font-body text-caption text-stone">{o.customer}</td>
                  <td className="p-4 font-mono text-caption text-stone">{formatDateShort(o.createdAt)}</td>
                  <td className="p-4 font-mono text-caption tabular-nums text-stone">{o.itemCount}</td>
                  <td className="p-4 font-mono text-caption tabular-nums text-ivory">{formatPrice(o.total)}</td>
                  <td className="p-4">
                    <span className={cn('font-mono text-micro uppercase', o.paid ? 'text-forest' : 'text-stone')}>
                      {o.paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="p-4"><StatusPill status={o.status} /></td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/orders/${o.id}`} className="font-body text-caption text-stone transition-colors hover:text-brass">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && rows.length === 0 && (
          <p className="p-10 text-center font-body text-caption text-stone">No {filter} orders.</p>
        )}
      </Panel>
    </>
  );
}
