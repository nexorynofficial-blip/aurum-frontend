import Link from 'next/link';
import { Search, Bell } from 'lucide-react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminUserBadge } from '@/components/admin/AdminUserBadge';

export const metadata = {
  title: 'Admin Console',
  robots: { index: false, follow: false },
};

/** Self-contained dark admin console (§47). Storefront chrome is suppressed. */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
    <div className="flex min-h-dvh bg-obsidian">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-sticky flex h-16 items-center gap-4 border-b border-graphite bg-charcoal/90 px-6 backdrop-blur">
          <Link
            href="/admin/dashboard"
            className="font-display text-body font-light tracking-[0.2em] text-ivory lg:hidden"
          >
            AURUM
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
              <input
                placeholder="Search orders, products…"
                aria-label="Search admin"
                className="h-9 w-64 rounded-full border border-graphite bg-obsidian pl-9 pr-4 font-body text-caption text-ivory placeholder-stone/60 focus:border-brass focus:outline-none"
              />
            </div>
            <button
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-graphite text-stone transition-colors hover:text-brass"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brass" />
            </button>
            <AdminUserBadge />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
    </AdminGuard>
  );
}
