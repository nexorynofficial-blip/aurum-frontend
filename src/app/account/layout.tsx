import { AccountNav } from '@/components/account/AccountNav';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { demoCustomer } from '@/lib/data/account';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shell py-12 md:py-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />

      <div className="mt-10 grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:h-fit">
          <div className="mb-8 border-b border-graphite pb-6">
            <p className="font-mono text-micro uppercase tracking-luxe text-brass">
              Client
            </p>
            <p className="mt-2 font-display text-h4 font-light text-ivory">
              {demoCustomer.firstName} {demoCustomer.lastName}
            </p>
          </div>
          <AccountNav />
        </aside>

        <div>{children}</div>
      </div>
    </div>
  );
}
