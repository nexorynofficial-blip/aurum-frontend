'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import {
  adminGetOrder,
  adminUpdateOrder,
  type AdminOrderDetail,
} from '@/lib/api/admin';
import { AdminPageHeader, Panel, StatusPill } from '@/components/admin/AdminUI';
import { Input } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { formatPrice, formatDateShort } from '@/lib/utils';
import { toast } from '@/components/common/Toast';

const STATUSES = ['PENDING', 'DISPATCHED', 'DELIVERED', 'RETURNED', 'CANCELLED'];

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<AdminOrderDetail | null | 'missing'>(null);
  const [status, setStatus] = useState('PENDING');
  const [tracking, setTracking] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminGetOrder(params.id)
      .then((o) => {
        setOrder(o);
        setStatus(o.status.toUpperCase());
        setTracking(o.trackingNumber);
      })
      .catch(() => setOrder('missing'));
  }, [params.id]);

  const save = async () => {
    if (order === null || order === 'missing') return;
    setSaving(true);
    try {
      await adminUpdateOrder(order.id, { status, trackingNumber: tracking || undefined });
      toast('Order updated', 'success');
      const fresh = await adminGetOrder(order.id);
      setOrder(fresh);
    } catch {
      toast('Could not update order', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (order === null) return <div className="min-h-[40vh]" aria-busy />;
  if (order === 'missing') return <p className="font-body text-body text-stone">Order not found.</p>;

  const addr = order.shippingAddress as Record<string, string>;

  return (
    <>
      <Link
        href="/admin/orders"
        className="mb-4 inline-flex items-center gap-2 font-mono text-micro uppercase tracking-luxe text-stone transition-colors hover:text-brass"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Orders
      </Link>
      <AdminPageHeader
        title={order.orderNumber}
        subtitle={`${formatDateShort(order.createdAt)} · ${order.customer}${order.email ? ` · ${order.email}` : ''}`}
        actions={<StatusPill status={order.status} />}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Panel className="p-0">
            <h2 className="border-b border-graphite p-5 font-display text-h4 font-light text-ivory">Items</h2>
            <ul className="divide-y divide-graphite">
              {order.lineItems.map((li, i) => (
                <li key={i} className="flex items-center gap-4 p-5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px] bg-slate">
                    {li.image && <Image src={li.image} alt="" fill sizes="56px" className="object-cover" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-caption text-ivory">{li.productName}</p>
                    <p className="font-mono text-micro text-stone">Qty {li.quantity}</p>
                  </div>
                  <span className="font-mono text-caption tabular-nums text-ivory">
                    {formatPrice(li.priceAtPurchase * li.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-graphite p-5">
              <dl className="ml-auto flex max-w-xs flex-col gap-2 font-body text-caption">
                <Row label="Subtotal" value={formatPrice(order.subtotal)} />
                <Row label="Shipping" value={order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)} />
                <Row label="Tax" value={formatPrice(order.tax)} />
                <div className="mt-1 border-t border-graphite pt-2">
                  <Row label="Total" value={formatPrice(order.total)} bold />
                </div>
              </dl>
            </div>
          </Panel>

          <Panel>
            <h2 className="mb-4 font-display text-h4 font-light text-ivory">Delivery</h2>
            <div className="font-body text-caption leading-relaxed text-stone">
              <p className="text-ivory">{addr.firstName} {addr.lastName}</p>
              <p>{addr.street}</p>
              <p>{addr.city}, {addr.state} {addr.zipCode}</p>
              <p>{addr.country}</p>
              <p className="mt-2 font-mono text-micro uppercase tracking-luxe">Method · {order.shippingMethod}</p>
            </div>
            {order.notes && (
              <p className="mt-4 border-t border-graphite pt-4 font-body text-caption italic text-stone">“{order.notes}”</p>
            )}
          </Panel>
        </div>

        <Panel className="h-fit">
          <h2 className="mb-5 font-display text-h4 font-light text-ivory">Fulfilment</h2>
          <label className="mb-2 block font-mono text-micro uppercase tracking-luxe text-stone">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mb-4 h-12 w-full appearance-none rounded-input border border-graphite bg-obsidian px-4 font-body text-small text-ivory focus:border-brass focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-charcoal">{s}</option>
            ))}
          </select>
          <Input label="Tracking number" value={tracking} onChange={(e) => setTracking(e.target.value)} />
          <p className="mt-2 font-body text-caption text-stone">
            Setting status to DISPATCHED with a tracking number emails the customer.
          </p>
          <Button size="md" fullWidth loading={saving} onClick={save} className="mt-5">
            Update order
          </Button>
        </Panel>
      </div>
    </>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-stone">{label}</dt>
      <dd className={bold ? 'font-mono text-body-lg text-ivory' : 'font-mono tabular-nums text-ivory'}>{value}</dd>
    </div>
  );
}
