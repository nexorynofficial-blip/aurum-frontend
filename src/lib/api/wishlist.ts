import { api } from './client';

export async function apiGetWishlist(): Promise<string[]> {
  const r = await api.get<{ items: { productId: string }[] }>('/wishlist');
  return r.items.map((i) => i.productId);
}

export async function apiAddWishlist(productId: string): Promise<void> {
  await api.post('/wishlist/items', { productId });
}

export async function apiRemoveWishlist(productId: string): Promise<void> {
  await api.del(`/wishlist/items/${encodeURIComponent(productId)}`);
}
