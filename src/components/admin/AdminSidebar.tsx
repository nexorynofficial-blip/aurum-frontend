'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Gem,
  Layers,
  Users,
  Boxes,
  BarChart3,
  Megaphone,
  Settings,
  ArrowUpRight,
} from 'lucide-react';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

const nav = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Products', href: '/admin/products', icon: Gem },
  { label: 'Collections', href: '/admin/collections', icon: Layers },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Marketing', href: '/admin/marketing', icon: Megaphone },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-graphite bg-charcoal lg:flex">
      <div className="flex h-16 items-center border-b border-graphite px-6">
        <Link href="/admin/dashboard" className="font-display text-h4 font-light tracking-[0.28em] text-ivory">
          {SITE.name}
        </Link>
        <span className="ml-2 font-mono text-micro uppercase tracking-luxe text-brass">
          Console
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4" aria-label="Admin">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'mb-1 flex items-center gap-3 rounded-input px-3 py-2.5 font-body text-caption transition-colors duration-220',
                active
                  ? 'bg-slate text-ivory'
                  : 'text-stone hover:bg-slate/50 hover:text-ivory'
              )}
            >
              <Icon className={cn('h-4 w-4', active && 'text-brass')} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-graphite p-4">
        <Link
          href="/"
          className="flex items-center justify-between rounded-input px-3 py-2.5 font-body text-caption text-stone transition-colors hover:text-brass"
        >
          View storefront
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
