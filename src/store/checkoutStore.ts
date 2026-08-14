'use client';

import { create } from 'zustand';

export interface ShippingDetails {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

interface CheckoutState {
  shipping: ShippingDetails | null;
  shippingMethodId: string;
  giftMessage: string;
  lastOrderNumber: string | null;
  setShipping: (details: ShippingDetails) => void;
  setShippingMethod: (id: string) => void;
  setGiftMessage: (message: string) => void;
  completeOrder: (orderNumber: string) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  shipping: null,
  shippingMethodId: 'standard',
  giftMessage: '',
  lastOrderNumber: null,
  setShipping: (shipping) => set({ shipping }),
  setShippingMethod: (shippingMethodId) => set({ shippingMethodId }),
  setGiftMessage: (giftMessage) => set({ giftMessage }),
  completeOrder: (lastOrderNumber) => set({ lastOrderNumber }),
  reset: () =>
    set({ shipping: null, shippingMethodId: 'standard', giftMessage: '' }),
}));
