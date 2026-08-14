'use client';

import { useState } from 'react';
import { Plus, Star, Pencil, Trash2 } from 'lucide-react';
import { demoAddresses } from '@/lib/data/account';
import { Address } from '@/types';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Field';
import { toast } from '@/components/common/Toast';
import { cn } from '@/lib/utils';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(demoAddresses);
  const [adding, setAdding] = useState(false);

  const setDefault = (id: string) => {
    setAddresses((a) => a.map((addr) => ({ ...addr, isDefault: addr.id === id })));
    toast('Default address updated', 'success');
  };

  const remove = (id: string) => {
    setAddresses((a) => a.filter((addr) => addr.id !== id));
    toast('Address removed');
  };

  const addAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: Address = {
      id: `addr-${Date.now()}`,
      label: String(form.get('label') || 'Address'),
      firstName: String(form.get('firstName')),
      lastName: String(form.get('lastName')),
      street: String(form.get('street')),
      city: String(form.get('city')),
      state: String(form.get('state')),
      zipCode: String(form.get('zipCode')),
      country: String(form.get('country') || 'United States'),
      isDefault: addresses.length === 0,
    };
    setAddresses((a) => [...a, next]);
    setAdding(false);
    toast('Address added', 'success');
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker mb-4">Saved Addresses</p>
          <h1 className="font-display text-h1 font-light text-ivory">Addresses</h1>
        </div>
        {!adding && (
          <Button size="md" variant="outline" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" /> Add address
          </Button>
        )}
      </header>

      {adding && (
        <form
          onSubmit={addAddress}
          className="rounded-card border border-graphite bg-charcoal p-6 md:p-8"
        >
          <h2 className="mb-6 font-display text-h4 font-light text-ivory">
            New address
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Label (e.g. Home)" name="label" />
            <div className="hidden sm:block" />
            <Input label="First name" name="firstName" required />
            <Input label="Last name" name="lastName" required />
            <Input label="Street address" name="street" required className="sm:col-span-2" />
            <Input label="City" name="city" required />
            <Input label="State / Region" name="state" required />
            <Input label="ZIP / Postal code" name="zipCode" required />
            <Input label="Country" name="country" defaultValue="United States" />
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="submit" size="md">Save address</Button>
            <Button type="button" variant="ghost" size="md" onClick={() => setAdding(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={cn(
              'flex flex-col rounded-card border p-6 transition-colors',
              address.isDefault ? 'border-brass/50' : 'border-graphite'
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-micro uppercase tracking-luxe text-brass">
                {address.label}
              </span>
              {address.isDefault && (
                <span className="inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-luxe text-stone">
                  <Star className="h-3 w-3 fill-brass text-brass" /> Default
                </span>
              )}
            </div>
            <div className="flex-1 font-body text-small leading-relaxed text-stone">
              <p className="text-ivory">
                {address.firstName} {address.lastName}
              </p>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zipCode}
              </p>
              <p>{address.country}</p>
            </div>
            <div className="mt-6 flex items-center gap-4 border-t border-graphite pt-4">
              {!address.isDefault && (
                <button
                  onClick={() => setDefault(address.id)}
                  className="font-body text-caption text-stone transition-colors hover:text-brass"
                >
                  Set as default
                </button>
              )}
              <button
                className="ml-auto inline-flex items-center gap-1.5 font-body text-caption text-stone transition-colors hover:text-ivory"
                aria-label={`Edit ${address.label}`}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                onClick={() => remove(address.id)}
                className="inline-flex items-center gap-1.5 font-body text-caption text-stone transition-colors hover:text-crimson"
                aria-label={`Remove ${address.label}`}
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
