import { api } from './client';

export interface PlaceOrderInput {
  shippingMethodId: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
  };
  email?: string;
  notes?: string;
  billingAddressSameAsShipping?: boolean;
}

export interface PlacedOrder {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  estimatedDelivery: string;
}

/** Simulated checkout — creates a paid order (no Stripe keys required). */
export async function apiPlaceOrder(input: PlaceOrderInput): Promise<PlacedOrder> {
  const r = await api.post<{ order: PlacedOrder }>('/checkout/place-order', input);
  return r.order;
}

export interface ShippingOption {
  id: string;
  name: string;
  cost: number;
  estimatedDays: number;
}

export async function apiShippingOptions(): Promise<{
  shippingMethods: ShippingOption[];
  estimatedTax: number;
  subtotal: number;
}> {
  return api.post('/checkout/shipping', {});
}
