import Link from 'next/link';
import { SITE } from '@/lib/constants';

/**
 * Checkout wears a stripped-back chrome — minimal distractions (§27).
 * The global header still renders; here we add a quiet secure-checkout bar
 * of context beneath it.
 */
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[80vh]">
      <div className="border-b border-graphite">
        <div className="shell flex items-center justify-between py-8">
          <Link
            href="/cart"
            className="font-mono text-micro uppercase tracking-luxe text-stone transition-colors hover:text-brass"
          >
            ← Return to bag
          </Link>
          <p className="font-mono text-micro uppercase tracking-luxe text-stone">
            Secure Checkout · {SITE.name}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
