import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  productsApi,
  categoriesApi,
  ordersApi,
  partnersApi,
  adminProductsApi,
  adminCategoriesApi,
  adminOrdersApi,
  adminUsersApi,
  adminPartnersApi,
  authApi,
} from '../api/api';
import type {
  ProductCreate,
  ProductUpdate,
  CategoryCreate,
  CategoryUpdate,
  OrderCreate,
  OrderUpdate,
  PartnerCreate,
  PartnerUpdate,
  UserCreate,
} from '../api/types';

// ============================================
// PRODUCTS
// ============================================

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.getAll(),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: () => productsApi.getByCategory(categoryId),
    enabled: !!categoryId,
  });
};

export const useBestSellers = () => {
  return useQuery({
    queryKey: ['products', 'best-sellers'],
    queryFn: () => productsApi.getBestSellers(),
  });
};

// ============================================
// ADMIN PRODUCTS
// ============================================

export const useAdminProducts = () => {
  return useQuery({
    queryKey: ['admin', 'products'],
    queryFn: () => adminProductsApi.getAll(),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductCreate) => adminProductsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductUpdate }) =>
      adminProductsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminProductsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// ============================================
// CATEGORIES
// ============================================

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll(),
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
};

// ============================================
// ADMIN CATEGORIES
// ============================================

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryCreate) => adminCategoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryUpdate }) =>
      adminCategoriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminCategoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// ============================================
// ORDERS
// ============================================

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.getAll(),
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderCreate) => ordersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// ============================================
// ADMIN ORDERS
// ============================================

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: () => adminOrdersApi.getAll(),
  });
};

export const useAdminOrder = (id: string) => {
  return useQuery({
    queryKey: ['admin', 'orders', id],
    queryFn: () => adminOrdersApi.getById(id),
    enabled: !!id,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: OrderUpdate }) =>
      adminOrdersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// ============================================
// ADMIN USERS
// ============================================

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => adminUsersApi.getAll(),
  });
};

export const useAdminUser = (id: string) => {
  return useQuery({
    queryKey: ['admin', 'users', id],
    queryFn: () => adminUsersApi.getById(id),
    enabled: !!id,
  });
};

export const useUserOrdersCount = (id: string) => {
  return useQuery({
    queryKey: ['admin', 'users', id, 'orders-count'],
    queryFn: () => adminUsersApi.getOrdersCount(id),
    enabled: !!id,
  });
};

// ============================================
// PARTNERS (Public)
// ============================================

export const usePartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: () => partnersApi.getAll(),
  });
};

export const usePartner = (id: string) => {
  return useQuery({
    queryKey: ['partners', id],
    queryFn: () => partnersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PartnerCreate) => adminPartnersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};

export const useUpdatePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PartnerUpdate }) =>
      adminPartnersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};

export const useDeletePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminPartnersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};

// ============================================
// AUTH
// ============================================

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'current-user'],
    queryFn: () => authApi.getCurrentUser(),
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserCreate) => authApi.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] });
    },
  });
};
