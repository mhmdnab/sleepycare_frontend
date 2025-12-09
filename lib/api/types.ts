// Auth Types
export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserRead {
  id: string;
  name: string;
  email: string;
  role: string;
  provider: string;
  created_at: string;
  orders_count: number;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

// Product Types
export interface ProductRead {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  category_id: string | null;
}

export interface ProductCreate {
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  image_url?: string | null;
  category_id?: string | null;
}

export interface ProductUpdate {
  name?: string | null;
  description?: string | null;
  price?: number | null;
  stock?: number | null;
  image_url?: string | null;
  category_id?: string | null;
}

// Category Types
export interface CategoryRead {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

export interface CategoryCreate {
  name: string;
  description?: string | null;
  icon?: string | null;
}

export interface CategoryUpdate {
  name?: string | null;
  description?: string | null;
  icon?: string | null;
}

// Order Types
export interface OrderItemCreate {
  product_id: string;
  quantity: number; // Must be >= 1
  unit_price: number; // Must be >= 0
}

export interface OrderItemRead {
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface OrderCreate {
  items: OrderItemCreate[];
}

export interface OrderRead {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  created_at: string; // ISO 8601 datetime string
  items: OrderItemRead[];
}

export interface OrderUpdate {
  status?: string;
}

// Cart Types (for frontend use)
export interface CartItem {
  product_id: string;
  quantity: number;
}

// Transaction Types
export interface TransactionCreate {
  order_id: string;
  amount: number;
  payment_method: string;
  status?: string;
}

export interface TransactionRead {
  id: string;
  order_id: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

// Partner Types
export interface PartnerRead {
  id: string;
  name: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface PartnerCreate {
  name: string;
  icon: string;
}

export interface PartnerUpdate {
  name?: string | null;
  icon?: string | null;
}
