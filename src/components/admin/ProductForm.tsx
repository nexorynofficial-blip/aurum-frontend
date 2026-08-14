'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  adminCreateProduct,
  adminUpdateProduct,
  adminUploadImage,
  adminListCollections,
  type AdminProduct,
  type AdminCollectionRow,
} from '@/lib/api/admin';
import { Panel } from '@/components/admin/AdminUI';
import { Input, Textarea } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { toast } from '@/components/common/Toast';
import { cn } from '@/lib/utils';

type FormState = {
  name: string;
  sku: string;
  slug: string;
  price: string;
  cost: string;
  stock: string;
  weight: string;
  material: string;
  color: string;
  stoneType: string;
  description: string;
  story: string;
  images: string; // comma / newline separated paths
  isNew: boolean;
  isPublished: boolean;
  collectionSlugs: string[];
};

function toForm(p?: AdminProduct): FormState {
  return {
    name: p?.name ?? '',
    sku: p?.sku ?? '',
    slug: p?.slug ?? '',
    price: p ? String(p.price) : '',
    cost: p ? String(p.cost) : '0',
    stock: p ? String(p.stock) : '0',
    weight: p ? String(p.weight) : '0',
    material: p?.material ?? '',
    color: p?.color ?? '',
    stoneType: p?.stoneType ?? '',
    description: p?.description ?? '',
    story: p?.story ?? '',
    images: (p?.images ?? []).join('\n'),
    isNew: p?.isNew ?? false,
    isPublished: p?.isPublished ?? true,
    collectionSlugs: p?.collectionSlugs ?? [],
  };
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function ProductForm({ product }: { product?: AdminProduct }) {
  const router = useRouter();
  const editing = Boolean(product);
  const [f, setF] = useState<FormState>(() => toForm(product));
  const [collections, setCollections] = useState<AdminCollectionRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    adminListCollections().then(setCollections).catch(() => setCollections([]));
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  const imageList = f.images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);

  const toggleCollection = (slug: string) =>
    set(
      'collectionSlugs',
      f.collectionSlugs.includes(slug)
        ? f.collectionSlugs.filter((s) => s !== slug)
        : [...f.collectionSlugs, slug]
    );

  const upload = async (file: File) => {
    if (!product) return;
    try {
      const url = await adminUploadImage(product.id, file);
      set('images', [...imageList, url].join('\n'));
      toast('Image uploaded', 'success');
    } catch {
      toast('Upload failed (S3 not configured?)', 'error');
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    if (!f.name || !f.sku || !f.price) {
      setError('Name, SKU and price are required.');
      return;
    }
    setSaving(true);
    const payload = {
      name: f.name,
      sku: f.sku,
      slug: f.slug || slugify(f.name),
      description: f.description || f.name,
      story: f.story,
      price: Number(f.price),
      cost: Number(f.cost) || 0,
      stock: Math.trunc(Number(f.stock) || 0),
      weight: Number(f.weight) || 0,
      material: f.material,
      color: f.color,
      stoneType: f.stoneType,
      images: imageList,
      isNew: f.isNew,
      isPublished: f.isPublished,
      collectionSlugs: f.collectionSlugs,
    };
    try {
      if (editing && product) await adminUpdateProduct(product.id, payload);
      else await adminCreateProduct(payload);
      toast(editing ? 'Product updated' : 'Product created', 'success');
      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save product');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <Panel>
          <h2 className="mb-5 font-display text-h4 font-light text-ivory">Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" value={f.name} onChange={(e) => set('name', e.target.value)} required className="sm:col-span-2" />
            <Input label="SKU" value={f.sku} onChange={(e) => set('sku', e.target.value)} required />
            <Input label="Slug (auto if blank)" value={f.slug} onChange={(e) => set('slug', e.target.value)} placeholder={slugify(f.name)} />
          </div>
          <div className="mt-4">
            <Textarea label="Description" value={f.description} onChange={(e) => set('description', e.target.value)} />
          </div>
          <div className="mt-4">
            <Textarea label="Story (optional)" value={f.story} onChange={(e) => set('story', e.target.value)} />
          </div>
        </Panel>

        <Panel>
          <h2 className="mb-5 font-display text-h4 font-light text-ivory">Attributes</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Material" value={f.material} onChange={(e) => set('material', e.target.value)} />
            <Input label="Colour" value={f.color} onChange={(e) => set('color', e.target.value)} />
            <Input label="Stone" value={f.stoneType} onChange={(e) => set('stoneType', e.target.value)} />
          </div>
        </Panel>

        <Panel>
          <h2 className="mb-5 font-display text-h4 font-light text-ivory">Images</h2>
          <Textarea
            label="Image paths (one per line, e.g. /images/ring-1.png)"
            value={f.images}
            onChange={(e) => set('images', e.target.value)}
          />
          {imageList.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {imageList.map((src) => (
                <div key={src} className="relative h-16 w-16 overflow-hidden rounded-[8px] bg-slate">
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
          {editing && (
            <label className="mt-4 inline-flex cursor-pointer items-center gap-2 font-body text-caption text-stone hover:text-brass">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
              />
              + Upload an image (requires S3)
            </label>
          )}
        </Panel>
      </div>

      <div className="flex flex-col gap-4">
        <Panel>
          <h2 className="mb-5 font-display text-h4 font-light text-ivory">Pricing & stock</h2>
          <div className="grid gap-4">
            <Input label="Price (USD)" type="number" value={f.price} onChange={(e) => set('price', e.target.value)} required />
            <Input label="Cost (USD)" type="number" value={f.cost} onChange={(e) => set('cost', e.target.value)} />
            <Input label="Stock" type="number" value={f.stock} onChange={(e) => set('stock', e.target.value)} />
            <Input label="Weight (g)" type="number" value={f.weight} onChange={(e) => set('weight', e.target.value)} />
          </div>
        </Panel>

        <Panel>
          <h2 className="mb-5 font-display text-h4 font-light text-ivory">Collections</h2>
          <div className="flex flex-col gap-2">
            {collections.map((c) => (
              <label key={c.id} className="flex cursor-pointer items-center gap-3 font-body text-caption text-stone">
                <input
                  type="checkbox"
                  checked={f.collectionSlugs.includes(c.slug)}
                  onChange={() => toggleCollection(c.slug)}
                  className="h-4 w-4 accent-brass"
                />
                {c.name}
              </label>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="mb-5 font-display text-h4 font-light text-ivory">Visibility</h2>
          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-3 font-body text-caption text-stone">
              <input type="checkbox" checked={f.isPublished} onChange={(e) => set('isPublished', e.target.checked)} className="h-4 w-4 accent-brass" />
              Published (visible on storefront)
            </label>
            <label className="flex cursor-pointer items-center gap-3 font-body text-caption text-stone">
              <input type="checkbox" checked={f.isNew} onChange={(e) => set('isNew', e.target.checked)} className="h-4 w-4 accent-brass" />
              Mark as “New arrival”
            </label>
          </div>
        </Panel>

        {error && <p className={cn('font-body text-caption text-crimson')}>{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" size="md" fullWidth loading={saving}>
            {editing ? 'Save changes' : 'Create product'}
          </Button>
          <Button type="button" variant="outline" size="md" onClick={() => router.push('/admin/products')}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
