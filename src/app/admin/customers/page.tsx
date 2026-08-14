'use client';

import { useEffect, useState } from 'react';
import { adminListCustomers, type AdminCustomerRow } from '@/lib/api/admin';
import { AdminPageHeader, Panel } from '@/components/admin/AdminUI';
import { formatPrice, formatDateShort } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminListCustomers()
      .then(setCustomers)
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminPageHeader title="Customers" subtitle={`${customers.length} clients of the house`} />
      <Panel className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-graphite">
                {['Client', 'Email', 'Orders', 'Lifetime value', 'Last order'].map((h) => (
                  <th key={h} className="p-4 font-mono text-micro uppercase tracking-luxe text-stone">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite">
              {customers.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-slate/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate font-mono text-micro text-brass">
                        {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                      <span className="font-body text-caption text-ivory">{c.name || '—'}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-micro text-stone">{c.email}</td>
                  <td className="p-4 font-mono text-caption tabular-nums text-stone">{c.orders}</td>
                  <td className="p-4 font-mono text-caption tabular-nums text-ivory">{formatPrice(c.spent)}</td>
                  <td className="p-4 font-mono text-caption text-stone">
                    {c.last ? formatDateShort(c.last) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && customers.length === 0 && (
          <p className="p-10 text-center font-body text-caption text-stone">No customers yet.</p>
        )}
      </Panel>
    </>
  );
}
