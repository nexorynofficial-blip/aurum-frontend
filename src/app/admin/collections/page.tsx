'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { adminListCollections, type AdminCollectionRow } from '@/lib/api/admin';
import { AdminPageHeader, Panel, StatusPill } from '@/components/admin/AdminUI';

export default function AdminCollectionsPage() {
  const [rows, setRows] = useState<AdminCollectionRow[]>([]);

  useEffect(() => {
    adminListCollections().then(setRows).catch(() => setRows([]));
  }, []);

  return (
    <>
      <AdminPageHeader title="Collections" subtitle={`${rows.length} disciplines of the house`} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((c) => (
          <Panel key={c.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px] bg-slate">
              {c.image && <Image src={c.image} alt="" fill sizes="64px" className="object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-body font-light text-ivory">{c.name}</p>
              <p className="font-mono text-micro text-stone">
                {c.productCount} {c.productCount === 1 ? 'piece' : 'pieces'} · /{c.slug}
              </p>
            </div>
            <StatusPill status={c.isPublished ? 'active' : 'draft'} />
          </Panel>
        ))}
      </div>
    </>
  );
}
