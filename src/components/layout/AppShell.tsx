'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Header } from './Header';
import { Footer } from './Footer';
import { GoldThread } from './GoldThread';
import { CartDrawer } from './CartDrawer';
import { SearchOverlay } from './SearchOverlay';
import { Toaster } from '@/components/common/Toast';

/**
 * Global chrome. The admin experience (§47) is a self-contained dark console,
 * so the storefront header, footer, and gold thread are suppressed there.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Sync session + cart with the backend on load; then pull the account
  // wishlist once we know who the customer is.
  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const hydrateCart = useCartStore((s) => s.hydrate);
  const hydrateWishlist = useWishlistStore((s) => s.hydrate);
  useEffect(() => {
    hydrateCart();
    hydrateAuth().then(() => hydrateWishlist());
  }, [hydrateAuth, hydrateCart, hydrateWishlist]);

  if (isAdmin) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-max focus:rounded-full focus:bg-ivory focus:px-5 focus:py-3 focus:font-body focus:text-caption focus:text-obsidian"
      >
        Skip to content
      </a>
      <GoldThread />
      <Header />
      <main id="main" className="relative min-h-dvh pt-[var(--nav-height)]">
        {/*
          Global luxury backdrop — one continuous, low-opacity image behind all
          content. It scrolls naturally with the page (not fixed). The hero's
          opaque video covers it at the top, so it reads as beginning right after
          the hero; on other pages it spans the content below the nav.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/background.jpg')] bg-cover bg-center bg-no-repeat opacity-[0.14]"
        />
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <Toaster />
    </>
  );
}
