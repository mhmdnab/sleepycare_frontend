# Backend Integration Guide

## Overview
The frontend is now fully integrated with the FastAPI backend. All API calls are made to the backend server instead of using mock data.

## Configuration

### Environment Variables
The frontend uses the following environment variable:
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: `http://localhost:8000`)

This is configured in `.env.local`.

### Backend URL
Make sure your backend is running on `http://localhost:8000` or update the `.env.local` file accordingly.

## API Integration

### Authentication Flow
1. **Registration**: `POST /auth/register`
   - Creates a new user account
   - Returns JWT token
   - Token is automatically stored in localStorage

2. **Login**: `POST /auth/login`
   - Uses OAuth2PasswordRequestForm (form-urlencoded)
   - Returns JWT token
   - Token is automatically stored in localStorage

3. **Get Current User**: `GET /auth/me`
   - Requires authentication
   - Returns current user information

4. **Logout**: Client-side only
   - Removes token from localStorage

### Protected Routes
All authenticated requests automatically include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### API Modules

#### Products (`/products`)
- `GET /products` - List all products
- `GET /products/{id}` - Get product by ID
- `GET /products/category/{category_id}` - Get products by category

#### Categories (`/categories`)
- `GET /categories` - List all categories

#### Orders (`/orders`)
- `GET /orders` - List user's orders (requires auth)
- `POST /orders` - Create new order (requires auth)

#### Admin Routes (require admin role)
- `/admin/products` - Manage products
- `/admin/categories` - Manage categories
- `/admin/orders` - Manage all orders

## Key Files

### API Client (`lib/api/client.ts`)
- Handles all HTTP requests
- Manages JWT token storage
- Provides methods: `get`, `post`, `put`, `delete`, `postForm`
- Automatically includes Authorization header when token is present

### API Types (`lib/api/types.ts`)
- TypeScript interfaces for all API request/response types
- Matches backend Pydantic models

### API Services (`lib/api/mockApi.ts`)
- Now renamed but contains real API implementations
- Organized by domain: auth, products, categories, orders, admin
- Provides high-level API methods for components to use

### Auth Store (`lib/store/auth.ts`)
- Zustand store for authentication state
- Persists user data to localStorage
- Methods: `setUser`, `logout`, `checkAuth`

### Cart Store (`lib/store/cart.ts`)
- Manages shopping cart state
- Uses Product interface compatible with backend ProductRead

## Usage Examples

### Login
```typescript
import { authApi } from '@/lib/api/mockApi';
import { useAuthStore } from '@/lib/store/auth';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authApi.login(email, password);
    const user = await authApi.getCurrentUser();
    useAuthStore.getState().setUser(user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Fetch Products
```typescript
import { productsApi } from '@/lib/api/mockApi';

const fetchProducts = async () => {
  try {
    const products = await productsApi.getAll();
    setProducts(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};
```

### Create Order
```typescript
import { ordersApi } from '@/lib/api/mockApi';
import { useCartStore } from '@/lib/store/cart';

const handleCheckout = async () => {
  const cartItems = useCartStore.getState().items;

  const orderData = {
    items: cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
    })),
  };

  try {
    const order = await ordersApi.create(orderData);
    console.log('Order created:', order);
    useCartStore.getState().clearCart();
  } catch (error) {
    console.error('Failed to create order:', error);
  }
};
```

### Admin - Create Product
```typescript
import { adminProductsApi } from '@/lib/api/mockApi';

const handleCreateProduct = async (productData) => {
  try {
    const product = await adminProductsApi.create({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      image_url: productData.image_url,
      category_id: productData.category_id,
    });
    console.log('Product created:', product);
  } catch (error) {
    console.error('Failed to create product:', error);
  }
};
```

## Error Handling

All API methods throw errors that can be caught with try-catch:

```typescript
try {
  await productsApi.getAll();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message); // User-friendly error message from backend
  }
}
```

Backend errors are returned in the format:
```json
{
  "detail": "Error message"
}
```

## Authentication Check on App Load

To check if the user is authenticated when the app loads, use the `checkAuth` method:

```typescript
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth';

function App() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  // Rest of your app
}
```

## Testing the Integration

### Prerequisites
1. Backend server running on `http://localhost:8000`
2. Database initialized with seed data
3. Frontend running on `http://localhost:3000`

### Steps to Test
1. **Start Backend**:
   ```bash
   cd sleepycare-backend
   uvicorn app.main:app --reload
   ```

2. **Seed Database** (if not already done):
   ```bash
   python seed_admin.py
   python seed_products.py
   ```

3. **Start Frontend**:
   ```bash
   cd Sleepycare-frontend
   npm run dev
   ```

4. **Test Features**:
   - Browse products on the shop page
   - View product details
   - Add items to cart
   - Register a new account
   - Login with registered account
   - Create an order
   - Login as admin and manage products

## Backend API Documentation

When the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These provide interactive API documentation for all available endpoints.

## Troubleshooting

### CORS Issues
The backend is configured to allow all origins. If you encounter CORS issues:
1. Check that the backend is running
2. Verify the `FRONTEND_URL` in backend `.env`
3. Check browser console for specific CORS errors

### Authentication Issues
- Check that JWT token is being saved to localStorage
- Verify token is included in Authorization header
- Check token expiration (default: 30 minutes)

### API Connection Issues
- Verify backend is running on correct port
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Use browser DevTools Network tab to inspect requests

## Next Steps

### Recommended Enhancements
1. Add loading states for all API calls
2. Implement proper error boundaries
3. Add toast notifications for success/error messages
4. Implement refresh token mechanism
5. Add search functionality endpoint in backend
6. Add pagination for product listings
7. Implement image upload for products
8. Add email verification for new users
9. Implement password strength requirements
10. Add rate limiting on API endpoints
