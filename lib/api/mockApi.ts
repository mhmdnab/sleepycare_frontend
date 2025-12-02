import { apiClient } from './client';
import {
  ProductRead,
  ProductCreate,
  ProductUpdate,
  CategoryRead,
  CategoryCreate,
  CategoryUpdate,
  OrderRead,
  OrderCreate,
  OrderUpdate,
  UserRead,
  UserCreate,
  TokenResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  TransactionCreate,
  TransactionRead,
} from './types';
import { Product } from '../store/cart';

// Helper function to convert backend ProductRead to frontend Product
const toFrontendProduct = (product: ProductRead): Product => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image_url || '/placeholder-product.jpg',
  category: product.category_id || '',
  description: product.description || '',
  stock: product.stock,
});

// Auth API
export const authApi = {
  register: async (userData: UserCreate): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>('/auth/register', userData);
    apiClient.setToken(response.access_token);
    return response;
  },

  login: async (email: string, password: string): Promise<TokenResponse> => {
    const response = await apiClient.postForm<TokenResponse>('/auth/login', {
      username: email,
      password: password,
    });
    apiClient.setToken(response.access_token);
    return response;
  },

  logout: () => {
    apiClient.setToken(null);
  },

  getCurrentUser: async (): Promise<UserRead> => {
    return apiClient.get<UserRead>('/auth/me');
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await apiClient.post<void>('/auth/forgot-password', data);
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await apiClient.post<void>('/auth/reset-password', data);
  },
};

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const products = await apiClient.get<ProductRead[]>('/products');
    return products.map(toFrontendProduct);
  },

  getById: async (id: string): Promise<Product | null> => {
    try {
      const product = await apiClient.get<ProductRead>(`/products/${id}`);
      return toFrontendProduct(product);
    } catch {
      return null;
    }
  },

  getByCategory: async (categoryId: string): Promise<Product[]> => {
    const products = await apiClient.get<ProductRead[]>(`/products/category/${categoryId}`);
    return products.map(toFrontendProduct);
  },

  search: async (query: string): Promise<Product[]> => {
    // If backend doesn't have search endpoint, do client-side filtering
    const allProducts = await productsApi.getAll();
    const lowerQuery = query.toLowerCase();
    return allProducts.filter(
      p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
  },

  getBestSellers: async (): Promise<Product[]> => {
    // Get all products and return first 4 (or implement proper best sellers logic)
    const products = await productsApi.getAll();
    return products.slice(0, 4);
  },

  getRelated: async (productId: string): Promise<Product[]> => {
    const product = await productsApi.getById(productId);
    if (!product || !product.category) return [];

    const categoryProducts = await productsApi.getByCategory(product.category);
    return categoryProducts.filter(p => p.id !== productId).slice(0, 4);
  },
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<CategoryRead[]> => {
    return apiClient.get<CategoryRead[]>('/categories');
  },

  getById: async (id: string): Promise<CategoryRead> => {
    return apiClient.get<CategoryRead>(`/categories/${id}`);
  },
};

// Orders API
export const ordersApi = {
  getAll: async (): Promise<OrderRead[]> => {
    return apiClient.get<OrderRead[]>('/orders');
  },

  getById: async (id: string): Promise<OrderRead> => {
    return apiClient.get<OrderRead>(`/orders/${id}`);
  },

  create: async (orderData: OrderCreate): Promise<OrderRead> => {
    return apiClient.post<OrderRead>('/orders', orderData);
  },
};

// Transactions API
export const transactionsApi = {
  create: async (transactionData: TransactionCreate): Promise<TransactionRead> => {
    return apiClient.post<TransactionRead>('/transactions', transactionData);
  },

  getByOrderId: async (orderId: string): Promise<TransactionRead[]> => {
    return apiClient.get<TransactionRead[]>(`/transactions/order/${orderId}`);
  },
};

// Admin Categories API
export const adminCategoriesApi = {
  create: async (categoryData: CategoryCreate): Promise<CategoryRead> => {
    return apiClient.post<CategoryRead>('/admin/categories', categoryData);
  },

  update: async (id: string, categoryData: CategoryUpdate): Promise<CategoryRead> => {
    return apiClient.put<CategoryRead>(`/admin/categories/${id}`, categoryData);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete<void>(`/admin/categories/${id}`);
  },
};

// Admin Products API
export const adminProductsApi = {
  create: async (productData: ProductCreate): Promise<ProductRead> => {
    return apiClient.post<ProductRead>('/admin/products', productData);
  },

  update: async (id: string, productData: ProductUpdate): Promise<ProductRead> => {
    return apiClient.put<ProductRead>(`/admin/products/${id}`, productData);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete<void>(`/admin/products/${id}`);
  },
};

// Admin Orders API
export const adminOrdersApi = {
  getAll: async (): Promise<OrderRead[]> => {
    return apiClient.get<OrderRead[]>('/admin/orders');
  },

  getById: async (id: string): Promise<OrderRead> => {
    return apiClient.get<OrderRead>(`/admin/orders/${id}`);
  },

  update: async (id: string, orderData: OrderUpdate): Promise<OrderRead> => {
    return apiClient.put<OrderRead>(`/admin/orders/${id}`, orderData);
  },
};

// Admin Users API
export const adminUsersApi = {
  getAll: async (): Promise<UserRead[]> => {
    return apiClient.get<UserRead[]>('/admin/users');
  },

  getById: async (id: string): Promise<UserRead> => {
    return apiClient.get<UserRead>(`/admin/users/${id}`);
  },

  getOrdersCount: async (id: string): Promise<{ user_id: string; orders_count: number }> => {
    return apiClient.get<{ user_id: string; orders_count: number }>(`/admin/users/${id}/orders-count`);
  },
};

// Users API (for backward compatibility with existing code)
export const usersApi = {
  getAll: async (): Promise<UserRead[]> => {
    // This would need an admin endpoint in the backend
    return [];
  },

  login: async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    const user = await authApi.getCurrentUser();
    return {
      success: true,
      user,
      token: response.access_token,
    };
  },

  register: async (userData: UserCreate) => {
    const response = await authApi.register(userData);
    const user = await authApi.getCurrentUser();
    return {
      success: true,
      user,
      token: response.access_token,
    };
  },

  adminLogin: async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    const user = await authApi.getCurrentUser();

    if (user.role !== 'admin') {
      authApi.logout();
      throw new Error('Unauthorized: Admin access required');
    }

    return {
      success: true,
      user,
      token: response.access_token,
    };
  },
};
