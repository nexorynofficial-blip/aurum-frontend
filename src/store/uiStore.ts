'use client';

import { create } from 'zustand';

interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  openCart: () => set({ cartOpen: true, searchOpen: false, mobileNavOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  toggleSearch: () =>
    set((s) => ({ searchOpen: !s.searchOpen, cartOpen: false, mobileNavOpen: false })),
  closeSearch: () => set({ searchOpen: false }),
  toggleMobileNav: () =>
    set((s) => ({ mobileNavOpen: !s.mobileNavOpen, cartOpen: false, searchOpen: false })),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  closeAll: () => set({ cartOpen: false, searchOpen: false, mobileNavOpen: false }),
}));
