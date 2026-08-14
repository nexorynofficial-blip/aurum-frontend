'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './authStore';
import { apiAddWishlist, apiGetWishlist, apiRemoveWishlist } from '@/lib/api/wishlist';

interface WishlistState {
  ids: string[];
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  /** Pull the saved list from the backend once signed in. */
  hydrate: () => Promise<void>;
}

const isAuthed = () => Boolean(useAuthStore.getState().user);

/**
 * Wishlist mirrors the backend when signed in (persisted per account) and
 * falls back to local storage for guests. Updates are optimistic.
 */
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (productId) => {
        const has = get().ids.includes(productId);
        set((state) => ({
          ids: has ? state.ids.filter((id) => id !== productId) : [...state.ids, productId],
        }));
        if (isAuthed()) {
          (has ? apiRemoveWishlist(productId) : apiAddWishlist(productId)).catch(() => undefined);
        }
      },

      add: (productId) => {
        if (get().ids.includes(productId)) return;
        set((state) => ({ ids: [...state.ids, productId] }));
        if (isAuthed()) apiAddWishlist(productId).catch(() => undefined);
      },

      remove: (productId) => {
        set((state) => ({ ids: state.ids.filter((id) => id !== productId) }));
        if (isAuthed()) apiRemoveWishlist(productId).catch(() => undefined);
      },

      has: (productId) => get().ids.includes(productId),
      clear: () => set({ ids: [] }),

      hydrate: async () => {
        if (!isAuthed()) return;
        try {
          const remote = await apiGetWishlist();
          // Merge any guest-saved ids up to the account, then adopt the union.
          const local = get().ids;
          const toPush = local.filter((id) => !remote.includes(id));
          await Promise.all(toPush.map((id) => apiAddWishlist(id).catch(() => undefined)));
          set({ ids: Array.from(new Set([...remote, ...local])) });
        } catch {
          /* keep local */
        }
      },
    }),
    { name: 'aurum-wishlist', partialize: (s) => ({ ids: s.ids }) }
  )
);
