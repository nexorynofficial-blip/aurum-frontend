'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminUI';
import { ProductForm } from '@/components/admin/ProductForm';
import { adminGetProduct, type AdminProduct } from '@/lib/api/admin';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<AdminProduct | null | 'missing'>(null);

  useEffect(() => {
    adminGetProduct(params.id)
      .then(setProduct)
      .catch(() => setProduct('missing'));
  }, [params.id]);

  return (
    <>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-2 font-mono text-micro uppercase tracking-luxe text-stone transition-colors hover:text-brass"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Products
      </Link>

      {product === null ? (
        <div className="min-h-[40vh]" aria-busy />
      ) : product === 'missing' ? (
        <p className="font-body text-body text-stone">Product not found.</p>
      ) : (
        <>
          <AdminPageHeader title={product.name} subtitle={`SKU ${product.sku}`} />
          <ProductForm product={product} />
        </>
      )}
    </>
  );
}
