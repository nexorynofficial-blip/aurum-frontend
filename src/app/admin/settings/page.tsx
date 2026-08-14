import { AdminPageHeader, Panel } from '@/components/admin/AdminUI';
import { Input, Textarea } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { SITE } from '@/lib/constants';

export default function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeader title="Settings" subtitle="Store configuration." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <h2 className="mb-6 font-display text-h4 font-light text-ivory">Store details</h2>
          <div className="flex flex-col gap-4">
            <Input label="Store name" defaultValue={SITE.name} />
            <Input label="Support email" type="email" defaultValue={SITE.email} />
            <Input label="Telephone" defaultValue={SITE.phone} />
            <Textarea label="Store description" defaultValue={SITE.description} />
          </div>
          <Button size="md" className="mt-6">Save changes</Button>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel>
            <h2 className="mb-6 font-display text-h4 font-light text-ivory">Shipping & tax</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Standard rate ($)" defaultValue="0" inputMode="numeric" />
              <Input label="Express rate ($)" defaultValue="65" inputMode="numeric" />
              <Input label="Tax rate (%)" defaultValue="8.87" inputMode="decimal" />
              <Input label="Free shipping over ($)" defaultValue="0" inputMode="numeric" />
            </div>
            <Button size="md" className="mt-6">Save changes</Button>
          </Panel>

          <Panel>
            <h2 className="mb-6 font-display text-h4 font-light text-ivory">Social links</h2>
            <div className="flex flex-col gap-4">
              <Input label="Instagram" placeholder="https://instagram.com/…" />
              <Input label="Pinterest" placeholder="https://pinterest.com/…" />
            </div>
            <Button size="md" className="mt-6">Save changes</Button>
          </Panel>
        </div>
      </div>
    </>
  );
}
