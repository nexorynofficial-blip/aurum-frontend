import { api } from './client';

export interface OrderRow {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  itemCount: number;
}

export interface OrderLine {
  productId: string;
  productName: string;
  image?: string;
  quantity: number;
  priceAtPurchase: number;
  variant?: Record<string, string>;
}

export interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingAddress: Record<string, unknown>;
  notes?: string;
  lineItems: OrderLine[];
}

export async function apiListOrders(): Promise<OrderRow[]> {
  return (await api.get<{ orders: OrderRow[] }>('/orders')).orders;
}

export async function apiGetOrder(id: string): Promise<OrderDetail> {
  return api.get<OrderDetail>(`/orders/${id}`);
}
