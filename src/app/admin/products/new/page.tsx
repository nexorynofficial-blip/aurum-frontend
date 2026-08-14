'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminUI';
import { ProductForm } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-2 font-mono text-micro uppercase tracking-luxe text-stone transition-colors hover:text-brass"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Products
      </Link>
      <AdminPageHeader title="New product" subtitle="Add a piece to the catalogue." />
      <ProductForm />
    </>
  );
}
