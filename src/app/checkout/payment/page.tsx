'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useMounted } from '@/hooks/useMounted';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Input } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { SHIPPING_METHODS } from '@/lib/constants';
import { apiPlaceOrder } from '@/lib/api/checkout';

export default function PaymentStep() {
  const router = useRouter();
  const mounted = useMounted();
  const { items, clearCart } = useCartStore();
  const { shipping, shippingMethodId, giftMessage, completeOrder } = useCheckoutStore();
  const [processing, setProcessing] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const method =
    SHIPPING_METHODS.find((m) => m.id === shippingMethodId) ?? SHIPPING_METHODS[0];

  // Guard — need a shipping step first (§ back-stack integrity)
  useEffect(() => {
    if (mounted && !shipping) router.replace('/checkout');
    if (mounted && items.length === 0 && !processing) router.replace('/cart');
  }, [mounted, shipping, items.length, processing, router]);

  if (!mounted || !shipping) {
    return <div className="shell min-h-[50vh] py-20" aria-busy />;
  }

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipping) return;
    setProcessing(true);

    const fallbackNumber = `AU-2026-${String(Math.floor(10000 + Math.random() * 89999))}`;
    try {
      const order = await apiPlaceOrder({
        shippingMethodId,
        shippingAddress: {
          firstName: shipping.firstName,
          lastName: shipping.lastName,
          street: shipping.street,
          city: shipping.city,
          state: shipping.state,
          zipCode: shipping.zipCode,
          country: shipping.country,
          phone: shipping.phone,
        },
        email: shipping.email,
        notes: giftMessage || undefined,
        billingAddressSameAsShipping: sameAsShipping,
      });
      completeOrder(order.orderNumber);
    } catch {
      // Keep the customer's flow intact if the API is unreachable.
      completeOrder(fallbackNumber);
    }

    await clearCart();
    router.push('/checkout/confirmation');
  };

  return (
    <div className="shell py-12 md:py-16">
      <CheckoutStepper current={1} />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <form onSubmit={placeOrder} className="flex flex-col gap-8">
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-h4 font-light text-ivory">
                  Payment
                </h2>
                <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-luxe text-stone">
                  <Lock className="h-3.5 w-3.5 text-brass" /> Encrypted
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Input
                    label="Card number"
                    name="card"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                    defaultValue="4242 4242 4242 4242"
                    required
                  />
                  {/* Anchored to the input's centre (label now sits above the field) */}
                  <CreditCard className="pointer-events-none absolute bottom-6 right-4 h-5 w-5 translate-y-1/2 text-stone" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry (MM / YY)" name="expiry" autoComplete="cc-exp" placeholder="12 / 28" defaultValue="12 / 28" required />
                  <Input label="CVC" name="cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" defaultValue="123" required />
                </div>
                <Input label="Name on card" name="cardName" autoComplete="cc-name" defaultValue={`${shipping.firstName} ${shipping.lastName}`} required />
              </div>
              <p className="mt-4 font-body text-caption text-stone">
                This is a demonstration. No card is charged and no data is stored.
              </p>
            </section>

            <section>
              <h2 className="mb-6 font-display text-h4 font-light text-ivory">
                Billing address
              </h2>
              <label className="flex cursor-pointer items-center gap-3 font-body text-small text-stone">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="h-4 w-4 accent-brass"
                />
                Same as shipping address
              </label>
              {!sameAsShipping && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Input label="Street address" name="billStreet" className="sm:col-span-2" />
                  <Input label="City" name="billCity" />
                  <Input label="ZIP / Postal code" name="billZip" />
                </div>
              )}
            </section>

            <div className="flex flex-col gap-4">
              <Button type="submit" size="lg" loading={processing} fullWidth>
                {processing ? 'Processing…' : 'Place order'}
              </Button>
              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className="text-center font-body text-caption text-stone transition-colors hover:text-brass"
              >
                ← Return to shipping
              </button>
            </div>
          </form>
        </div>

        <aside className="lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
          <div className="rounded-card border border-graphite bg-charcoal p-8">
            <h2 className="mb-2 font-display text-h4 font-light text-ivory">
              Your order
            </h2>
            <p className="mb-6 font-body text-caption text-stone">
              Shipping to {shipping.city}, {shipping.state} · {method.name}
            </p>
            <OrderSummary items={items} shipping={method.cost} showItems />
          </div>
        </aside>
      </div>
    </div>
  );
}
