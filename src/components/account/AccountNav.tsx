'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutGrid,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

const links = [
  { label: 'Overview', href: '/account', icon: LayoutGrid },
  { label: 'Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/wishlist', icon: Heart },
  { label: 'Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'Settings', href: '/account/settings', icon: Settings },
];

export function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleSignOut = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav aria-label="Account" className="flex flex-col gap-1">
      {links.map(({ label, href, icon: Icon }) => {
        const active =
          href === '/account'
            ? pathname === href
            : pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-input px-4 py-3 font-body text-small transition-colors duration-220',
              active
                ? 'bg-charcoal text-ivory'
                : 'text-stone hover:bg-charcoal/60 hover:text-ivory'
            )}
          >
            <Icon className={cn('h-4 w-4', active && 'text-brass')} />
            {label}
          </Link>
        );
      })}
      <button
        onClick={handleSignOut}
        className="mt-2 flex items-center gap-3 rounded-input px-4 py-3 text-left font-body text-small text-stone transition-colors duration-220 hover:text-crimson"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </nav>
  );
}
