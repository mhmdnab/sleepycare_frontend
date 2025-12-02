import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!user && !isLoading) {
      checkAuth();
    }
  }, [user, isLoading, checkAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    setUser,
    logout,
  };
}
