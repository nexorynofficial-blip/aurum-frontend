import { api } from './client';
import { CartItem } from '@/types';

interface ApiCartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
  material?: string;
  variant?: Record<string, string>;
}

export interface ApiCart {
  items: ApiCartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

function mapItems(cart: ApiCart): CartItem[] {
  return cart.items.map((i) => ({
    id: i.id,
    productId: i.productId,
    slug: i.slug,
    name: i.name,
    image: i.image ?? '',
    price: i.price,
    quantity: i.quantity,
    material: i.material,
    variant: i.variant,
  }));
}

export async function apiGetCart(): Promise<CartItem[]> {
  return mapItems(await api.get<ApiCart>('/cart'));
}

export async function apiAddCartItem(
  productId: string,
  quantity: number,
  variant?: Record<string, string>
): Promise<CartItem[]> {
  const r = await api.post<{ cart: ApiCart }>('/cart/items', { productId, quantity, variant });
  return mapItems(r.cart);
}

export async function apiUpdateCartItem(id: string, quantity: number): Promise<CartItem[]> {
  const r = await api.patch<{ cart: ApiCart }>(`/cart/items/${encodeURIComponent(id)}`, { quantity });
  return mapItems(r.cart);
}

export async function apiRemoveCartItem(id: string): Promise<CartItem[]> {
  const r = await api.del<{ cart: ApiCart }>(`/cart/items/${encodeURIComponent(id)}`);
  return mapItems(r.cart);
}

export async function apiClearCart(): Promise<CartItem[]> {
  const r = await api.del<{ cart: ApiCart }>('/cart');
  return mapItems(r.cart);
}
