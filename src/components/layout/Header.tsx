'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { useMounted } from '@/hooks/useMounted';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const mounted = useMounted();

  const { openCart, toggleSearch, toggleMobileNav, mobileNavOpen, closeMobileNav } =
    useUIStore();
  const cartCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const authUser = useAuthStore((s) => s.user);
  const signedIn = mounted && !!authUser;

  // Solid after 120px (§16)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  const isAdmin = pathname?.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-overlay bg-obsidian transition-all duration-350 ease-luxe',
        solid || mobileNavOpen
          ? 'border-b border-graphite/60'
          : 'border-b border-transparent'
      )}
    >
      <div className="flex h-[var(--nav-height)] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Far left — wordmark (plain branding) + mobile menu toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileNav}
            className="text-ivory transition-colors hover:text-brass lg:hidden"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link
            href="/"
            className="font-display text-h4 font-light tracking-[0.32em] text-ivory"
            aria-label={`${SITE.name} — home`}
          >
            {SITE.name}
          </Link>
        </div>

        {/* Middle — primary navigation */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'link-underline font-body text-caption uppercase tracking-wide transition-colors duration-220',
                pathname === link.href
                  ? 'text-brass'
                  : 'text-ivory hover:text-brass'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Far right — action icons: Search · Wishlist · Cart · Account */}
        <div className="flex items-center gap-4 md:gap-5">
          <button
            onClick={toggleSearch}
            className="text-ivory transition-colors duration-220 hover:text-brass"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/wishlist"
            className="relative hidden text-ivory transition-colors duration-220 hover:text-brass sm:block"
            aria-label={`Wishlist${mounted && wishlistCount ? `, ${wishlistCount} items` : ''}`}
          >
            <Heart className="h-5 w-5" />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brass px-1 font-mono text-[10px] text-obsidian">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            className="relative text-ivory transition-colors duration-220 hover:text-brass"
            aria-label={`Shopping bag${mounted && cartCount ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {mounted && cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brass px-1 font-mono text-[10px] text-obsidian">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account — icon + text; text becomes the customer's first name once authed */}
          <Link
            href={signedIn ? '/account' : '/login'}
            className="flex items-center gap-2 text-ivory transition-colors duration-220 hover:text-brass"
            aria-label={signedIn ? `Account, ${authUser!.firstName}` : 'Sign in or log in'}
          >
            <User className="h-5 w-5" />
            <span className="hidden whitespace-nowrap font-body text-caption tracking-wide md:inline">
              {signedIn ? authUser!.firstName : 'Sign In | Login'}
            </span>
          </Link>
        </div>
      </div>

      <MobileNav open={mobileNavOpen} signedIn={signedIn} firstName={authUser?.firstName} />
    </header>
  );
}

function MobileNav({
  open,
  signedIn,
  firstName,
}: {
  open: boolean;
  signedIn: boolean;
  firstName?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden border-t border-graphite/70 bg-charcoal transition-[max-height] duration-350 ease-luxe lg:hidden',
        open ? 'max-h-[26rem]' : 'max-h-0'
      )}
    >
      <nav className="shell flex flex-col py-6" aria-label="Mobile">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="border-b border-graphite/40 py-4 font-display text-h4 font-light text-ivory transition-colors hover:text-brass"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-4 flex gap-6">
          <Link
            href="/wishlist"
            className="font-body text-caption uppercase tracking-wide text-stone hover:text-brass"
          >
            Wishlist
          </Link>
          <Link
            href={signedIn ? '/account' : '/login'}
            className="font-body text-caption uppercase tracking-wide text-stone hover:text-brass"
          >
            {signedIn ? firstName : 'Sign In | Login'}
          </Link>
        </div>
      </nav>
    </div>
  );
}
