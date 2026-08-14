'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';
import {
  apiAddCartItem,
  apiClearCart,
  apiGetCart,
  apiRemoveCartItem,
  apiUpdateCartItem,
} from '@/lib/api/cart';

interface AddToCartArgs {
  product: Product;
  quantity?: number;
  variant?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  hydrated: boolean;
  /** Load the authoritative cart from the backend (Redis). */
  hydrate: () => Promise<void>;
  addItem: (args: AddToCartArgs) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  subtotal: () => number;
  count: () => number;
}

/** Stable id for a product + variant combination (local fallback only). */
function lineId(productId: string, variant?: Record<string, string>): string {
  const v = variant
    ? Object.entries(variant)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, val]) => `${k}:${val}`)
        .join('|')
    : '';
  return v ? `${productId}__${v}` : productId;
}

/**
 * Cart state backed by the API. Every mutation calls the backend and replaces
 * the local list with the authoritative response. If the API is unreachable it
 * falls back to a local, persisted cart so the storefront still works offline.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,

      hydrate: async () => {
        try {
          set({ items: await apiGetCart(), hydrated: true });
        } catch {
          set({ hydrated: true });
        }
      },

      addItem: async ({ product, quantity = 1, variant }) => {
        try {
          set({ items: await apiAddCartItem(product.id, quantity, variant) });
        } catch {
          const id = lineId(product.id, variant);
          set((state) => {
            const existing = state.items.find((i) => i.id === id);
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.id === id ? { ...i, quantity: i.quantity + quantity } : i
                ),
              };
            }
            const item: CartItem = {
              id,
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: product.images[0],
              price: product.price,
              quantity,
              material: product.material,
              variant,
            };
            return { items: [...state.items, item] };
          });
        }
      },

      removeItem: async (id) => {
        try {
          set({ items: await apiRemoveCartItem(id) });
        } catch {
          set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
        }
      },

      updateQuantity: async (id, quantity) => {
        try {
          set({ items: await apiUpdateCartItem(id, quantity) });
        } catch {
          set((state) => ({
            items: state.items
              .map((i) => (i.id === id ? { ...i, quantity } : i))
              .filter((i) => i.quantity > 0),
          }));
        }
      },

      clearCart: async () => {
        try {
          set({ items: await apiClearCart() });
        } catch {
          set({ items: [] });
        }
      },

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'aurum-cart', partialize: (s) => ({ items: s.items }) }
  )
);
