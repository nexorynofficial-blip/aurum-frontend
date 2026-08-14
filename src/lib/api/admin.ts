import { api, apiFetch, API_BASE } from './client';

/* ---------------- Dashboard ---------------- */
export interface AdminDashboard {
  stats: {
    revenue: number;
    orders: number;
    customers: number;
    products: number;
    aov: number;
    lowStock: number;
  };
  revenueSeries: { label: string; value: number }[];
  topProducts: { name: string; sku: string; sold: number; revenue: number }[];
  inventoryAlerts: { name: string; sku: string; stock: number }[];
  recentOrders: {
    orderNumber: string;
    customer: string;
    status: string;
    total: number;
    items: number;
    date: string;
  }[];
}

export const adminDashboard = () => api.get<AdminDashboard>('/admin/dashboard');

/* ---------------- Products ---------------- */
export interface AdminProductRow {
  id: string;
  name: string;
  sku: string;
  slug: string;
  category: string;
  price: number;
  stock: number;
  image: string | null;
  isPublished: boolean;
}

export interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  story: string;
  price: number;
  cost: number;
  images: string[];
  material: string;
  color: string;
  stoneType: string;
  weight: number;
  stock: number;
  isNew: boolean;
  isPublished: boolean;
  collectionSlugs: string[];
}

export const adminListProducts = (search?: string) =>
  api
    .get<{ products: AdminProductRow[] }>(`/admin/products${search ? `?search=${encodeURIComponent(search)}` : ''}`)
    .then((r) => r.products);

export const adminGetProduct = (id: string) => api.get<AdminProduct>(`/admin/products/${id}`);

export type AdminProductInput = Partial<Omit<AdminProduct, 'id'>>;

export const adminCreateProduct = (input: AdminProductInput) =>
  api.post<{ product: { id: string; slug: string } }>('/admin/products', input);

export const adminUpdateProduct = (id: string, input: AdminProductInput) =>
  api.patch<{ product: { id: string; slug: string } }>(`/admin/products/${id}`, input);

export const adminDeleteProduct = (id: string) =>
  api.del<{ message: string }>(`/admin/products/${id}`);

/** Upload an image (multipart) — returns the stored URL. Requires S3 configured. */
export async function adminUploadImage(productId: string, file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`${API_BASE}/admin/products/${productId}/image`, {
    method: 'POST',
    credentials: 'include',
    body: form,
  });
  if (!res.ok) throw new Error('Image upload failed');
  const data = (await res.json()) as { imageUrl: string };
  return data.imageUrl;
}

/* ---------------- Orders ---------------- */
export interface AdminOrderRow {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customer: string;
  itemCount: number;
  createdAt: string;
  paid: boolean;
}

export const adminListOrders = (status?: string) =>
  api
    .get<{ orders: AdminOrderRow[] }>(`/admin/orders${status && status !== 'all' ? `?status=${status.toUpperCase()}` : ''}`)
    .then((r) => r.orders);

export interface AdminOrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  paid: boolean;
  customer: string;
  email?: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  trackingNumber: string;
  notes: string;
  shippingAddress: Record<string, unknown>;
  shippingMethod: string;
  lineItems: {
    productName: string;
    image: string | null;
    quantity: number;
    priceAtPurchase: number;
    variant?: Record<string, string> | null;
  }[];
}

export const adminGetOrder = (id: string) => api.get<AdminOrderDetail>(`/admin/orders/${id}`);

export const adminUpdateOrder = (
  id: string,
  input: { status?: string; trackingNumber?: string }
) => api.patch<{ order: { id: string; status: string } }>(`/admin/orders/${id}`, input);

/* ---------------- Collections & customers ---------------- */
export interface AdminCollectionRow {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  productCount: number;
  isPublished: boolean;
  sortOrder: number;
}
export const adminListCollections = () =>
  api.get<{ collections: AdminCollectionRow[] }>('/admin/collections').then((r) => r.collections);

export interface AdminCustomerRow {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  last: string | null;
  joined: string;
}
export const adminListCustomers = () =>
  api.get<{ customers: AdminCustomerRow[] }>('/admin/customers').then((r) => r.customers);

/** Verify the current session is an admin (used by the console auth gate). */
export const adminWhoAmI = () => apiFetch<{ user: { role: string; firstName: string } }>('/auth/me');
