import { products } from './products';

export interface AdminOrderRow {
  orderNumber: string;
  customer: string;
  date: string;
  status: 'pending' | 'dispatched' | 'delivered' | 'returned';
  total: number;
  items: number;
}

export const adminStats = {
  revenue: 486250,
  revenueDelta: 12.4,
  orders: 184,
  ordersDelta: 8.1,
  aov: 2642,
  aovDelta: 3.6,
  conversion: 2.8,
  conversionDelta: 0.4,
  visitors: 6420,
  visitorsDelta: -2.2,
};

/** Monthly revenue in thousands — 12 points for the dashboard chart. */
export const revenueSeries = [
  { label: 'Aug', value: 28 },
  { label: 'Sep', value: 31 },
  { label: 'Oct', value: 35 },
  { label: 'Nov', value: 42 },
  { label: 'Dec', value: 58 },
  { label: 'Jan', value: 39 },
  { label: 'Feb', value: 44 },
  { label: 'Mar', value: 47 },
  { label: 'Apr', value: 51 },
  { label: 'May', value: 49 },
  { label: 'Jun', value: 55 },
  { label: 'Jul', value: 62 },
];

export const adminOrders: AdminOrderRow[] = [
  { orderNumber: 'AU-2026-00184', customer: 'Alexandra Chen', date: '2026-07-15', status: 'pending', total: 9800, items: 1 },
  { orderNumber: 'AU-2026-00183', customer: 'Marcus Delacroix', date: '2026-07-15', status: 'pending', total: 5600, items: 1 },
  { orderNumber: 'AU-2026-00182', customer: 'Yuki Tanaka', date: '2026-07-14', status: 'dispatched', total: 3200, items: 2 },
  { orderNumber: 'AU-2026-00181', customer: 'Isabelle Roche', date: '2026-07-14', status: 'dispatched', total: 18500, items: 1 },
  { orderNumber: 'AU-2026-00180', customer: 'James Okafor', date: '2026-07-13', status: 'delivered', total: 2100, items: 1 },
  { orderNumber: 'AU-2026-00179', customer: 'Sofia Marchetti', date: '2026-07-13', status: 'delivered', total: 7400, items: 1 },
  { orderNumber: 'AU-2026-00178', customer: 'Henry Whitfield', date: '2026-07-12', status: 'returned', total: 1450, items: 1 },
  { orderNumber: 'AU-2026-00177', customer: 'Clara Bennett', date: '2026-07-12', status: 'delivered', total: 12600, items: 1 },
];

export const topProducts = products
  .slice(0, 5)
  .map((p, i) => ({
    name: p.name,
    sku: p.sku,
    sold: [42, 38, 31, 27, 19][i],
    revenue: p.price * [42, 38, 31, 27, 19][i],
  }));

export const inventoryAlerts = products
  .filter((p) => p.stock <= 2)
  .map((p) => ({ name: p.name, sku: p.sku, stock: p.stock }));

export const trafficSources = [
  { source: 'Direct', share: 38 },
  { source: 'Organic search', share: 27 },
  { source: 'Journal & referral', share: 19 },
  { source: 'Social', share: 11 },
  { source: 'Email', share: 5 },
];
