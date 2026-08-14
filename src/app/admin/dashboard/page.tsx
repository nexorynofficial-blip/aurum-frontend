'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import {
  AdminPageHeader,
  Panel,
  StatCard,
  StatusPill,
} from '@/components/admin/AdminUI';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { adminDashboard, type AdminDashboard } from '@/lib/api/admin';
import { formatPrice, formatDateShort } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboard | null>(null);

  useEffect(() => {
    adminDashboard().then(setData).catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <>
        <AdminPageHeader title="Dashboard" subtitle="A snapshot of the house." />
        <div className="min-h-[40vh]" aria-busy />
      </>
    );
  }

  const { stats } = data;

  return (
    <>
      <AdminPageHeader title="Dashboard" subtitle="A snapshot of the house." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={formatPrice(stats.revenue)} />
        <StatCard label="Orders" value={String(stats.orders)} />
        <StatCard label="Avg. order value" value={formatPrice(stats.aov)} />
        <StatCard label="Customers" value={String(stats.customers)} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-h4 font-light text-ivory">Revenue</h2>
            <span className="font-mono text-micro uppercase tracking-luxe text-stone">
              Last 12 months · thousands
            </span>
          </div>
          <RevenueChart data={data.revenueSeries} />
        </Panel>

        <Panel>
          <h2 className="mb-6 font-display text-h4 font-light text-ivory">Top pieces</h2>
          {data.topProducts.length === 0 ? (
            <p className="font-body text-caption text-stone">No sales yet.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {data.topProducts.map((p, i) => (
                <li key={p.name} className="flex items-center gap-4">
                  <span className="font-mono text-caption text-brass">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-body text-caption text-ivory">{p.name}</p>
                    <p className="font-mono text-micro text-stone">{p.sold} sold</p>
                  </div>
                  <span className="font-mono text-caption tabular-nums text-ivory">
                    {formatPrice(p.revenue)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-h4 font-light text-ivory">Recent orders</h2>
            <Link
              href="/admin/orders"
              className="font-mono text-micro uppercase tracking-luxe text-stone transition-colors hover:text-brass"
            >
              View all
            </Link>
          </div>
          {data.recentOrders.length === 0 ? (
            <p className="font-body text-caption text-stone">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left">
                <thead>
                  <tr className="border-b border-graphite">
                    {['Order', 'Customer', 'Status', 'Total'].map((h) => (
                      <th key={h} className="pb-3 font-mono text-micro uppercase tracking-luxe text-stone">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite">
                  {data.recentOrders.map((o) => (
                    <tr key={o.orderNumber} className="transition-colors hover:bg-slate/40">
                      <td className="py-3 font-mono text-caption text-ivory">{o.orderNumber}</td>
                      <td className="py-3 font-body text-caption text-stone">{o.customer}</td>
                      <td className="py-3"><StatusPill status={o.status} /></td>
                      <td className="py-3 font-mono text-caption tabular-nums text-ivory">
                        {formatPrice(o.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel>
          <h2 className="mb-6 flex items-center gap-2 font-display text-h4 font-light text-ivory">
            <AlertTriangle className="h-4 w-4 text-brass" /> Inventory alerts
          </h2>
          {data.inventoryAlerts.length === 0 ? (
            <p className="font-body text-caption text-stone">All pieces well stocked.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-graphite">
              {data.inventoryAlerts.map((a) => (
                <li key={a.sku} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-body text-caption text-ivory">{a.name}</p>
                    <p className="font-mono text-micro text-stone">{a.sku}</p>
                  </div>
                  <span className="font-mono text-caption text-crimson">{a.stock} left</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
