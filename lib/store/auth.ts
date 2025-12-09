import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRead } from '../api/types';
import { authApi } from '../api/api';
import { setOnTokenExpired } from '../api/client';

interface AuthStore {
  user: UserRead | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserRead | null) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => {
      // Register the token expired callback (only on client side)
      if (typeof window !== 'undefined') {
        setOnTokenExpired(() => {
          const { logout } = get();
          logout();
        });
      }

      return {
        user: null,
        isAuthenticated: false,
        isLoading: true,

        setUser: (user: UserRead | null) => {
          set({
            user,
            isAuthenticated: !!user,
            isLoading: false
          });
        },

        logout: () => {
          authApi.logout();
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth-storage');
            localStorage.removeItem('token');
          }
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        },

        checkAuth: async () => {
          try {
            const user = await authApi.getCurrentUser();
            set({
              user,
              isAuthenticated: true,
              isLoading: false
            });
          } catch {
            // Token is invalid or expired - clear auth state
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth-storage');
              localStorage.removeItem('token');
            }
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false
            });
          }
        },
      };
    },
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
