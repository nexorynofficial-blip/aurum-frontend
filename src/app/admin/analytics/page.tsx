'use client';

import { useEffect, useState } from 'react';
import { AdminPageHeader, Panel, StatCard } from '@/components/admin/AdminUI';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { adminDashboard, type AdminDashboard } from '@/lib/api/admin';
import { formatPrice } from '@/lib/utils';

// Traffic analytics require an external pipeline (e.g. GA); shown as a sample.
const trafficSources = [
  { source: 'Direct', share: 38 },
  { source: 'Organic search', share: 27 },
  { source: 'Journal & referral', share: 19 },
  { source: 'Social', share: 11 },
  { source: 'Email', share: 5 },
];

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AdminDashboard | null>(null);

  useEffect(() => {
    adminDashboard().then(setData).catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <>
        <AdminPageHeader title="Analytics" subtitle="Performance across the last 12 months." />
        <div className="min-h-[40vh]" aria-busy />
      </>
    );
  }

  const { stats } = data;

  return (
    <>
      <AdminPageHeader title="Analytics" subtitle="Performance across the last 12 months." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={formatPrice(stats.revenue)} />
        <StatCard label="Orders" value={String(stats.orders)} />
        <StatCard label="Avg. order value" value={formatPrice(stats.aov)} />
        <StatCard label="Customers" value={String(stats.customers)} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <h2 className="mb-6 font-display text-h4 font-light text-ivory">Revenue trend</h2>
          <RevenueChart data={data.revenueSeries} />
        </Panel>

        <Panel>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-h4 font-light text-ivory">Traffic sources</h2>
            <span className="font-mono text-micro uppercase tracking-luxe text-stone/60">sample</span>
          </div>
          <ul className="flex flex-col gap-5">
            {trafficSources.map((s) => (
              <li key={s.source}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-body text-caption text-stone">{s.source}</span>
                  <span className="font-mono text-caption tabular-nums text-ivory">{s.share}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate">
                  <div className="h-full rounded-full bg-brass" style={{ width: `${s.share}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4">
        <Panel>
          <h2 className="mb-6 font-display text-h4 font-light text-ivory">Best sellers</h2>
          {data.topProducts.length === 0 ? (
            <p className="font-body text-caption text-stone">No sales yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-graphite">
                    {['Piece', 'Units', 'Revenue'].map((h) => (
                      <th key={h} className="pb-3 font-mono text-micro uppercase tracking-luxe text-stone">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite">
                  {data.topProducts.map((p) => (
                    <tr key={p.name}>
                      <td className="py-3 font-body text-caption text-ivory">{p.name}</td>
                      <td className="py-3 font-mono text-caption tabular-nums text-stone">{p.sold}</td>
                      <td className="py-3 font-mono text-caption tabular-nums text-ivory">{formatPrice(p.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}
