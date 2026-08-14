'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import {
  adminListProducts,
  adminUpdateProduct,
  adminDeleteProduct,
  type AdminProductRow,
} from '@/lib/api/admin';
import { AdminPageHeader, Panel, StatusPill } from '@/components/admin/AdminUI';
import { Button } from '@/components/common/Button';
import { formatPrice, cn } from '@/lib/utils';
import { toast } from '@/components/common/Toast';

export default function AdminProductsPage() {
  const [rows, setRows] = useState<AdminProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const load = () =>
    adminListProducts()
      .then((p) => setRows(p))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const togglePublish = async (p: AdminProductRow) => {
    setRows((r) => r.map((x) => (x.id === p.id ? { ...x, isPublished: !x.isPublished } : x)));
    try {
      await adminUpdateProduct(p.id, { isPublished: !p.isPublished });
    } catch {
      toast('Could not update product', 'error');
      load();
    }
  };

  const remove = async (p: AdminProductRow) => {
    if (!confirm(`Delete “${p.name}”? This cannot be undone.`)) return;
    setRows((r) => r.filter((x) => x.id !== p.id));
    try {
      await adminDeleteProduct(p.id);
      toast(`${p.name} deleted`, 'success');
    } catch {
      toast('Could not delete product', 'error');
      load();
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Products"
        subtitle={`${rows.length} pieces in the catalogue`}
        actions={
          <Button href="/admin/products/new" size="sm">
            <Plus className="h-4 w-4" /> New product
          </Button>
        }
      />

      <Panel className="p-0">
        <div className="flex flex-wrap items-center gap-4 border-b border-graphite p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, SKU, or category…"
              aria-label="Search products"
              className="h-10 w-full rounded-full border border-graphite bg-obsidian pl-9 pr-4 font-body text-caption text-ivory placeholder-stone/60 focus:border-brass focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-graphite">
                {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', ''].map((h, i) => (
                  <th key={i} className="p-4 font-mono text-micro uppercase tracking-luxe text-stone">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite">
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-slate/40">
                  <td className="p-4">
                    <Link href={`/admin/products/${p.id}`} className="flex items-center gap-3 group">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[8px] bg-slate">
                        {p.image && <Image src={p.image} alt="" fill sizes="44px" className="object-cover" />}
                      </div>
                      <span className="font-body text-caption text-ivory group-hover:text-brass">
                        {p.name}
                      </span>
                    </Link>
                  </td>
                  <td className="p-4 font-mono text-micro text-stone">{p.sku}</td>
                  <td className="p-4 font-body text-caption capitalize text-stone">{p.category}</td>
                  <td className="p-4 font-mono text-caption tabular-nums text-ivory">{formatPrice(p.price)}</td>
                  <td className="p-4">
                    <span className={cn('font-mono text-caption tabular-nums', p.stock <= 2 ? 'text-crimson' : 'text-ivory')}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => togglePublish(p)} title="Toggle published">
                      <StatusPill status={p.isPublished ? 'active' : 'draft'} />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/products/${p.id}`}
                        aria-label={`Edit ${p.name}`}
                        className="text-stone transition-colors hover:text-brass"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => remove(p)}
                        aria-label={`Delete ${p.name}`}
                        className="text-stone transition-colors hover:text-crimson"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && (
          <p className="p-10 text-center font-body text-caption text-stone">No products match.</p>
        )}
      </Panel>
    </>
  );
}
