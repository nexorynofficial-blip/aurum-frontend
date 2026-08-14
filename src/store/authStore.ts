'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AuthUser,
  apiLogin,
  apiLogout,
  apiMe,
  apiRegister,
} from '@/lib/api/auth';

interface AuthState {
  user: AuthUser | null;
  hydrated: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<AuthUser>;
  logout: () => Promise<void>;
  /** Refresh the session from the backend (httpOnly cookie is source of truth). */
  hydrate: () => Promise<void>;
  /** Legacy local sign-out (kept for callers that only clear UI state). */
  signOut: () => void;
}

/**
 * Client auth state. The real session lives in the backend's httpOnly cookie;
 * this store mirrors the current user for instant UI (header, account nav).
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,

      login: async (email, password) => {
        const { user } = await apiLogin({ email, password });
        set({ user });
        return user;
      },

      register: async (input) => {
        const { user } = await apiRegister(input);
        set({ user });
        return user;
      },

      logout: async () => {
        try {
          await apiLogout();
        } catch {
          /* clear locally regardless */
        }
        set({ user: null });
      },

      hydrate: async () => {
        try {
          const { user } = await apiMe();
          set({ user, hydrated: true });
        } catch {
          set({ user: null, hydrated: true });
        }
      },

      signOut: () => set({ user: null }),
    }),
    { name: 'aurum-auth', partialize: (s) => ({ user: s.user }) }
  )
);
