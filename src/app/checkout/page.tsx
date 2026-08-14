'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useMounted } from '@/hooks/useMounted';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Input, Select, Textarea } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { SHIPPING_METHODS } from '@/lib/constants';

/** Selectable countries for the shipping form (§ B — dropdown, not free text). */
const COUNTRY_OPTIONS = [
  'United States', 'Canada', 'United Kingdom', 'Ireland', 'France', 'Germany',
  'Italy', 'Spain', 'Portugal', 'Netherlands', 'Belgium', 'Switzerland',
  'Austria', 'Sweden', 'Norway', 'Denmark', 'Australia', 'New Zealand',
  'Japan', 'Singapore', 'Hong Kong', 'United Arab Emirates',
].map((c) => ({ label: c, value: c }));

export default function ShippingStep() {
  const router = useRouter();
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const {
    shipping,
    shippingMethodId,
    giftMessage,
    setShipping,
    setShippingMethod,
    setGiftMessage,
  } = useCheckoutStore();

  const [mode, setMode] = useState<'guest' | 'account'>('guest');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedMethod =
    SHIPPING_METHODS.find((m) => m.id === shippingMethodId) ?? SHIPPING_METHODS[0];

  if (!mounted) return <div className="shell min-h-[50vh] py-20" aria-busy />;

  if (items.length === 0) {
    return (
      <div className="shell py-16">
        <EmptyState
          title="Your bag is empty"
          message="Add a piece before proceeding to checkout."
          action={{ label: 'Explore the collection', href: '/collections/all' }}
        />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const required = [
      'email',
      'firstName',
      'lastName',
      'street',
      'city',
      'state',
      'zipCode',
    ];
    const next: Record<string, string> = {};
    required.forEach((field) => {
      if (!String(form.get(field) ?? '').trim()) next[field] = 'Required';
    });
    const email = String(form.get('email') ?? '');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Enter a valid email';

    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Focus first invalid field (§ focus-management)
      const first = document.getElementById(Object.keys(next)[0]);
      first?.focus();
      return;
    }

    setShipping({
      email,
      firstName: String(form.get('firstName')),
      lastName: String(form.get('lastName')),
      street: String(form.get('street')),
      city: String(form.get('city')),
      state: String(form.get('state')),
      zipCode: String(form.get('zipCode')),
      country: String(form.get('country')),
      phone: String(form.get('phone') ?? ''),
    });
    router.push('/checkout/payment');
  };

  return (
    <div className="shell py-12 md:py-16">
      <CheckoutStepper current={0} />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          {/* Guest / account choice (UC-4) */}
          <div className="mb-10 inline-flex rounded-full border border-graphite p-1">
            {(['guest', 'account'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'rounded-full px-6 py-2.5 font-body text-caption transition-colors duration-220',
                  mode === m ? 'bg-ivory text-obsidian' : 'text-stone hover:text-ivory'
                )}
              >
                {m === 'guest' ? 'Continue as guest' : 'Sign in'}
              </button>
            ))}
          </div>

          {mode === 'account' && (
            <div className="mb-10 rounded-card border border-graphite bg-charcoal p-6">
              <p className="font-body text-caption text-stone">
                Returning client? <span className="text-ivory">Sign in</span> to
                auto-fill your saved addresses and payment methods. For this
                preview, continue as guest below.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            <section>
              <h2 className="mb-6 font-display text-h4 font-light text-ivory">
                Contact
              </h2>
              <Input
                label="Email address"
                name="email"
                id="email"
                type="email"
                autoComplete="email"
                required
                defaultValue={shipping?.email}
                error={errors.email}
              />
            </section>

            <section>
              <h2 className="mb-6 font-display text-h4 font-light text-ivory">
                Shipping address
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="First name" name="firstName" id="firstName" autoComplete="given-name" required defaultValue={shipping?.firstName} error={errors.firstName} />
                <Input label="Last name" name="lastName" id="lastName" autoComplete="family-name" required defaultValue={shipping?.lastName} error={errors.lastName} />
                <Input label="Street address" name="street" id="street" autoComplete="street-address" required defaultValue={shipping?.street} error={errors.street} className="sm:col-span-2" />
                <Input label="City" name="city" id="city" autoComplete="address-level2" required defaultValue={shipping?.city} error={errors.city} />
                <Input label="State / Region" name="state" id="state" autoComplete="address-level1" required defaultValue={shipping?.state} error={errors.state} />
                <Input label="ZIP / Postal code" name="zipCode" id="zipCode" autoComplete="postal-code" inputMode="numeric" required defaultValue={shipping?.zipCode} error={errors.zipCode} />
                <Select label="Country" name="country" id="country" defaultValue={shipping?.country ?? 'United States'} options={COUNTRY_OPTIONS} />
                <Input label="Phone (optional)" name="phone" id="phone" type="tel" autoComplete="tel" defaultValue={shipping?.phone} className="sm:col-span-2" />
              </div>
            </section>

            {/* Shipping method */}
            <section>
              <h2 className="mb-6 font-display text-h4 font-light text-ivory">
                Delivery
              </h2>
              <div className="flex flex-col gap-3">
                {SHIPPING_METHODS.map((method) => {
                  const active = shippingMethodId === method.id;
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setShippingMethod(method.id)}
                      className={cn(
                        'flex items-center justify-between gap-4 rounded-input border p-6 text-left transition-colors duration-220',
                        active ? 'border-brass bg-brass/5' : 'border-graphite hover:border-stone'
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-full border',
                            active ? 'border-brass' : 'border-graphite'
                          )}
                        >
                          {active && <span className="h-2.5 w-2.5 rounded-full bg-brass" />}
                        </span>
                        <span className="flex flex-col gap-1">
                          <span className="block font-body text-small text-ivory">
                            {method.name}
                          </span>
                          <span className="block font-body text-caption text-stone">
                            {method.description}
                          </span>
                        </span>
                      </span>
                      <span className="font-mono text-small tabular-nums text-ivory">
                        {method.cost === 0 ? 'Complimentary' : `$${method.cost}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <Textarea
                label="Gift message (optional)"
                name="giftMessage"
                defaultValue={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="A note to accompany your piece…"
              />
            </section>

            <Button type="submit" size="lg" className="self-start">
              Continue with Payment
            </Button>
          </form>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
          <div className="rounded-card border border-graphite bg-charcoal p-8">
            <h2 className="mb-8 font-display text-h4 font-light text-ivory">
              Your order
            </h2>
            <OrderSummary items={items} shipping={selectedMethod.cost} showItems />
          </div>
        </aside>
      </div>
    </div>
  );
}
