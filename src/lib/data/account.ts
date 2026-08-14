import { Order, Address } from '@/types';
import { PLACEHOLDER } from '@/lib/constants';

/** Demo account — stands in for an authenticated customer session. */
export const demoCustomer = {
  firstName: 'Alexandra',
  lastName: 'Chen',
  email: 'alexandra@example.com',
  memberSince: '2021-03-01',
};

export const demoAddresses: Address[] = [
  {
    id: 'addr-1',
    label: 'Residence',
    firstName: 'Alexandra',
    lastName: 'Chen',
    street: '212 Fifth Avenue, Apt 14B',
    city: 'New York',
    state: 'NY',
    zipCode: '10010',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Studio',
    firstName: 'Alexandra',
    lastName: 'Chen',
    street: '9 Crosby Street, Floor 3',
    city: 'New York',
    state: 'NY',
    zipCode: '10013',
    country: 'United States',
  },
];

export const demoOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'AU-2026-00184',
    status: 'delivered',
    createdAt: '2026-06-02T10:24:00Z',
    estimatedDelivery: '2026-06-09',
    subtotal: 9800,
    tax: 869.5,
    shipping: 0,
    total: 10669.5,
    trackingNumber: '1Z999AA10123456784',
    shippingAddress: demoAddresses[0],
    notes: 'Please gift wrap — anniversary.',
    lineItems: [
      {
        productName: 'Solstice Solitaire',
        image: PLACEHOLDER,
        quantity: 1,
        priceAtPurchase: 9800,
        variant: { Size: '52' },
      },
    ],
  },
  {
    id: 'order-2',
    orderNumber: 'AU-2026-00092',
    status: 'dispatched',
    createdAt: '2026-07-08T15:40:00Z',
    estimatedDelivery: '2026-07-18',
    subtotal: 5600,
    tax: 497,
    shipping: 65,
    total: 6162,
    trackingNumber: '1Z999AA10987654321',
    shippingAddress: demoAddresses[0],
    lineItems: [
      {
        productName: 'Lumen Drops',
        image: PLACEHOLDER,
        quantity: 1,
        priceAtPurchase: 5600,
      },
    ],
  },
  {
    id: 'order-3',
    orderNumber: 'AU-2026-00048',
    status: 'pending',
    createdAt: '2026-07-14T09:05:00Z',
    estimatedDelivery: '2026-07-24',
    subtotal: 3720,
    tax: 330,
    shipping: 0,
    total: 4050,
    shippingAddress: demoAddresses[1],
    lineItems: [
      {
        productName: 'Aurum Signet',
        image: PLACEHOLDER,
        quantity: 1,
        priceAtPurchase: 3200,
        variant: { Metal: 'Yellow Gold', Size: '54' },
      },
      {
        productName: 'Vanity Tray',
        image: PLACEHOLDER,
        quantity: 1,
        priceAtPurchase: 540,
      },
    ],
  },
];

export function getOrder(id: string): Order | undefined {
  return demoOrders.find((o) => o.id === id || o.orderNumber === id);
}
