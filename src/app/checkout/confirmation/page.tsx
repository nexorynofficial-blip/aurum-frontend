'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Mail, Package, Clock } from 'lucide-react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useMounted } from '@/hooks/useMounted';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper';
import { Button } from '@/components/common/Button';
import { formatDate } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ConfirmationStep() {
  const router = useRouter();
  const mounted = useMounted();
  const { lastOrderNumber, shipping, reset } = useCheckoutStore();

  useEffect(() => {
    if (mounted && !lastOrderNumber) router.replace('/');
  }, [mounted, lastOrderNumber, router]);

  if (!mounted || !lastOrderNumber) {
    return <div className="shell min-h-[50vh] py-20" aria-busy />;
  }

  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 7);

  const steps = [
    { icon: Mail, title: 'Confirmation sent', body: `A receipt is on its way${shipping ? ` to ${shipping.email}` : ''}.` },
    { icon: Package, title: 'Prepared by hand', body: 'Your piece is inspected, engraved if requested, and cased.' },
    { icon: Clock, title: 'Insured delivery', body: `Estimated arrival by ${formatDate(delivery)}.` },
  ];

  return (
    <div className="shell py-12 md:py-16">
      <CheckoutStepper current={2} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto mt-16 max-w-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-brass text-brass"
        >
          <Check className="h-7 w-7" />
        </motion.div>

        <p className="kicker mb-4">Order confirmed</p>
        <h1 className="font-display text-h1 font-light text-ivory md:text-hero">
          Thank you.
        </h1>
        <p className="mt-6 font-body text-body text-stone">
          Your order has been received and is now in the care of the atelier.
        </p>

        <div className="mt-8 inline-flex flex-col items-center gap-1 rounded-card border border-graphite bg-charcoal px-10 py-6">
          <span className="font-mono text-micro uppercase tracking-luxe text-stone">
            Order number
          </span>
          <span className="font-mono text-h4 tracking-wide text-brass">
            {lastOrderNumber}
          </span>
        </div>
      </motion.div>

      {/* Next steps */}
      <div className="mx-auto mt-16 grid max-w-4xl gap-px overflow-hidden rounded-card border border-graphite bg-graphite md:grid-cols-3">
        {steps.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex flex-col gap-4 bg-charcoal p-8">
            <Icon className="h-5 w-5 text-brass" />
            <h3 className="font-display text-h4 font-light text-ivory">{title}</h3>
            <p className="font-body text-caption leading-relaxed text-stone">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Button href="/account/orders" size="lg" onClick={reset}>
          Track your order
        </Button>
        <Button href="/collections/all" variant="outline" size="lg" onClick={reset}>
          Continue shopping
        </Button>
      </div>
    </div>
  );
}
