import Link from 'next/link';
import { ArrowRight, Package, Heart, MapPin } from 'lucide-react';
import { demoCustomer, demoOrders, demoAddresses } from '@/lib/data/account';
import { OrderStatusBadge } from '@/components/common/Badge';
import { Price } from '@/components/common/Price';
import { formatDate } from '@/lib/utils';

export const metadata = { title: 'Account' };

export default function AccountOverview() {
  const recent = demoOrders.slice(0, 2);
  const defaultAddress = demoAddresses.find((a) => a.isDefault);

  const stats = [
    { label: 'Orders', value: demoOrders.length, href: '/account/orders', icon: Package },
    { label: 'Saved pieces', value: 3, href: '/wishlist', icon: Heart },
    { label: 'Addresses', value: demoAddresses.length, href: '/account/addresses', icon: MapPin },
  ];

  return (
    <div className="flex flex-col gap-12">
      <header>
        <p className="kicker mb-4">Welcome back</p>
        <h1 className="font-display text-h1 font-light text-ivory">
          Good to see you, {demoCustomer.firstName}.
        </h1>
        <p className="mt-4 font-body text-body text-stone">
          A client of the house since {formatDate(demoCustomer.memberSince)}.
        </p>
      </header>

      {/* Stats */}
      <div className="grid gap-px overflow-hidden rounded-card border border-graphite bg-graphite sm:grid-cols-3">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col gap-4 bg-charcoal p-8 transition-colors hover:bg-slate"
          >
            <Icon className="h-5 w-5 text-brass" />
            <div>
              <p className="font-mono text-h3 tabular-nums text-ivory">{value}</p>
              <p className="mt-1 font-body text-caption text-stone">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-h4 font-light text-ivory">Recent orders</h2>
          <Link
            href="/account/orders"
            className="group inline-flex items-center gap-2 font-body text-caption uppercase tracking-wide text-stone transition-colors hover:text-brass"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="divide-y divide-graphite rounded-card border border-graphite">
          {recent.map((order) => (
            <li key={order.id}>
              <Link
                href={`/account/orders/${order.id}`}
                className="flex flex-wrap items-center justify-between gap-4 p-6 transition-colors hover:bg-charcoal"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-small text-ivory">
                    {order.orderNumber}
                  </span>
                  <span className="font-body text-caption text-stone">
                    {formatDate(order.createdAt)} · {order.lineItems.length}{' '}
                    {order.lineItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <OrderStatusBadge status={order.status} />
                  <Price value={order.total} cents className="text-small text-ivory" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Default address */}
      {defaultAddress && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-h4 font-light text-ivory">
              Default address
            </h2>
            <Link
              href="/account/addresses"
              className="font-body text-caption uppercase tracking-wide text-stone transition-colors hover:text-brass"
            >
              Manage
            </Link>
          </div>
          <div className="rounded-card border border-graphite p-6 font-body text-small leading-relaxed text-stone">
            <p className="mb-1 font-mono text-micro uppercase tracking-luxe text-brass">
              {defaultAddress.label}
            </p>
            <p className="text-ivory">
              {defaultAddress.firstName} {defaultAddress.lastName}
            </p>
            <p>{defaultAddress.street}</p>
            <p>
              {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zipCode}
            </p>
            <p>{defaultAddress.country}</p>
          </div>
        </section>
      )}
    </div>
  );
}
