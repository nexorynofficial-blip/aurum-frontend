import { Plus, Mail, Percent, Sparkles } from 'lucide-react';
import { AdminPageHeader, Panel, StatCard, StatusPill } from '@/components/admin/AdminUI';
import { Button } from '@/components/common/Button';

const campaigns = [
  { name: 'Summer Private View', channel: 'Email', status: 'active', sent: 4820, open: '48%' },
  { name: 'The Signet — Journal feature', channel: 'Journal', status: 'active', sent: 2140, open: '31%' },
  { name: 'Autumn Preview (draft)', channel: 'Email', status: 'draft', sent: 0, open: '—' },
];

export default function AdminMarketingPage() {
  return (
    <>
      <AdminPageHeader
        title="Marketing"
        subtitle="Campaigns, promotions, and audience."
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" /> New campaign
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Subscribers" value="12,480" delta={5.4} />
        <StatCard label="Avg. open rate" value="42" suffix="%" delta={1.8} />
        <StatCard label="Attributed revenue" value="$68,200" delta={9.1} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {[
          { icon: Mail, title: 'Newsletter', body: 'Send a private view to your subscriber list.' },
          { icon: Percent, title: 'Promotions', body: 'Create and track promotion codes.' },
          { icon: Sparkles, title: 'Featured pieces', body: 'Curate what appears on the homepage.' },
        ].map(({ icon: Icon, title, body }) => (
          <Panel key={title}>
            <Icon className="h-5 w-5 text-brass" />
            <h3 className="mt-4 font-display text-h4 font-light text-ivory">{title}</h3>
            <p className="mt-2 font-body text-caption text-stone">{body}</p>
          </Panel>
        ))}
      </div>

      <Panel className="mt-4 p-0">
        <div className="border-b border-graphite p-4">
          <h2 className="font-display text-h4 font-light text-ivory">Campaigns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-graphite">
                {['Campaign', 'Channel', 'Status', 'Sent', 'Open rate'].map((h) => (
                  <th key={h} className="p-4 font-mono text-micro uppercase tracking-luxe text-stone">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite">
              {campaigns.map((c) => (
                <tr key={c.name} className="transition-colors hover:bg-slate/40">
                  <td className="p-4 font-body text-caption text-ivory">{c.name}</td>
                  <td className="p-4 font-body text-caption text-stone">{c.channel}</td>
                  <td className="p-4"><StatusPill status={c.status} /></td>
                  <td className="p-4 font-mono text-caption tabular-nums text-stone">{c.sent.toLocaleString()}</td>
                  <td className="p-4 font-mono text-caption text-ivory">{c.open}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
