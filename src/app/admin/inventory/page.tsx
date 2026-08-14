'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { adminListProducts, type AdminProductRow } from '@/lib/api/admin';
import { AdminPageHeader, Panel } from '@/components/admin/AdminUI';
import { cn } from '@/lib/utils';

function level(stock: number) {
  if (stock === 0) return { label: 'Out of stock', tone: 'text-crimson', bar: 'bg-crimson' };
  if (stock <= 2) return { label: 'Low', tone: 'text-brass', bar: 'bg-brass' };
  return { label: 'Healthy', tone: 'text-forest', bar: 'bg-forest' };
}

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<AdminProductRow[]>([]);

  useEffect(() => {
    adminListProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const sorted = useMemo(() => [...products].sort((a, b) => a.stock - b.stock), [products]);
  const maxStock = Math.max(1, ...products.map((p) => p.stock));
  const needAttention = products.filter((p) => p.stock <= 2).length;

  return (
    <>
      <AdminPageHeader title="Inventory" subtitle={`${needAttention} pieces need attention`} />
      <Panel className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-graphite">
                {['Piece', 'SKU', 'On hand', 'Level'].map((h) => (
                  <th key={h} className="p-4 font-mono text-micro uppercase tracking-luxe text-stone">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite">
              {sorted.map((p) => {
                const l = level(p.stock);
                return (
                  <tr key={p.id} className="transition-colors hover:bg-slate/40">
                    <td className="p-4">
                      <Link href={`/admin/products/${p.id}`} className="font-body text-caption text-ivory hover:text-brass">
                        {p.name}
                      </Link>
                    </td>
                    <td className="p-4 font-mono text-micro text-stone">{p.sku}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="w-6 font-mono text-caption tabular-nums text-ivory">{p.stock}</span>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate">
                          <div className={cn('h-full rounded-full', l.bar)} style={{ width: `${(p.stock / maxStock) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className={cn('p-4 font-mono text-micro uppercase tracking-luxe', l.tone)}>{l.label}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
