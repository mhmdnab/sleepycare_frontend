# 🧼 WipesMart - E-commerce Frontend

A modern, feature-rich e-commerce platform for selling premium wipes. Built with Next.js 14, TypeScript, and TailwindCSS.

## ✨ Features

### Customer Features
- **Landing Page**: Hero section, product showcase, features, testimonials, and CTAs
- **Product Shopping**: Advanced filtering by category and price, search functionality, sorting options
- **Product Details**: Full product information with related products
- **Shopping Cart**: Persistent cart with add/remove/update functionality using Zustand
- **User Authentication**: Login, register, and password reset pages

### Admin Features
- **Admin Dashboard**: Overview statistics and quick actions
- **Product Management**: View, search, and manage products
- **Order Management**: Track and manage customer orders
- **User Management**: View and manage user accounts

## 🎨 Design Features

- Clean, modern UI with soft hygienic theme (teal, white, light blue)
- Fully responsive design for all devices
- Smooth animations and transitions
- Professional typography
- Accessible and user-friendly interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand (for cart)
- **Icons**: Lucide React
- **Images**: Next.js Image optimization

## 📁 Project Structure

```
SleepyFrontend/
├── app/
│   ├── (main)/              # Main customer-facing pages
│   │   ├── page.tsx         # Landing page
│   │   ├── shop/            # Shopping page
│   │   ├── product/[id]/    # Product details
│   │   └── layout.tsx       # Main layout with navbar/footer
│   ├── auth/                # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── admin/               # Admin dashboard
│   │   ├── products/
│   │   ├── orders/
│   │   ├── users/
│   │   └── layout.tsx       # Admin layout with sidebar
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── admin/
│   │   └── AdminSidebar.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── CartDrawer.tsx
├── lib/
│   ├── store/
│   │   └── cart.ts          # Zustand cart store
│   ├── data/
│   │   └── mockData.ts      # Mock data
│   ├── api/
│   │   └── mockApi.ts       # Mock API functions
│   └── utils.ts             # Utility functions
└── public/                  # Static assets

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Pages Overview

### Customer Pages

#### 1. Landing Page (`/`)
- Hero section with product showcase
- Category grid
- Features section (eco-friendly, safe, effective)
- Best sellers showcase
- Customer testimonials
- Call-to-action sections

#### 2. Shop Page (`/shop`)
- Product grid with card layout
- Category filters (baby, antibacterial, kitchen, etc.)
- Price range filters
- Search functionality
- Sort by name or price
- Responsive filters sidebar

#### 3. Product Details (`/product/[id]`)
- Large product image
- Full product description
- Price and stock information
- Quantity selector
- Add to cart functionality
- Related products section

#### 4. Authentication Pages
- **Login** (`/auth/login`): User login with email/password
- **Register** (`/auth/register`): New user registration
- **Forgot Password** (`/auth/forgot-password`): Password reset UI

### Admin Pages

#### 1. Dashboard (`/admin`)
- Statistics cards (products, orders, users, revenue)
- Quick action links

#### 2. Products (`/admin/products`)
- Products table with search
- Product details (image, name, category, price, stock)
- Edit and delete actions (UI ready)

#### 3. Orders (`/admin/orders`)
- Orders table with search and filters
- Order details (customer, items, status, date)
- Status filtering (Processing, Shipped, Delivered)

#### 4. Users (`/admin/users`)
- Users table with search
- User details (name, email, role, join date, orders)

## 🛒 Cart Management

The shopping cart uses Zustand for state management with these features:
- Add items to cart
- Remove items from cart
- Update item quantities
- Persistent cart (stored in localStorage)
- Real-time cart total calculation
- Cart drawer with smooth animations

## 🎨 Styling

### Color Scheme
- **Primary**: Teal/Cyan (`#14b8a6`)
- **Background**: White, light gray
- **Accents**: Soft blues and greens
- **Text**: Dark gray for readability

### Components
All components are built with:
- Consistent spacing and typography
- Hover effects and transitions
- Mobile-first responsive design
- Accessible color contrast

## 🔌 Mock API

All API calls are mocked for frontend development:
- `productsApi`: Get all products, get by ID, search, filter by category
- `ordersApi`: Get all orders, create order
- `usersApi`: Login, register, get all users
- `adminProductsApi`: CRUD operations for products

### Mock Data Includes
- 12 sample products across 6 categories
- 3 customer testimonials
- Sample orders and users
- All with realistic data

## 🎯 Key Features Implementation

### 1. Responsive Design
- Mobile menu for navigation
- Collapsible filters on mobile
- Responsive grid layouts
- Touch-friendly interactions

### 2. Performance
- Next.js Image optimization
- Dynamic imports where needed
- Efficient re-renders with proper state management

### 3. User Experience
- Loading states for async operations
- Error handling and validation
- Smooth transitions and animations
- Intuitive navigation

## 🔧 Customization

### Adding New Products
Edit `lib/data/mockData.ts`:
```typescript
export const mockProducts: Product[] = [
  {
    id: 'unique-id',
    name: 'Product Name',
    price: 19.99,
    image: 'image-url',
    category: 'category-id',
    description: 'Product description',
    stock: 100,
  },
  // ...
];
```

### Adding New Categories
Edit `lib/data/mockData.ts`:
```typescript
export const categories = [
  { id: 'new-category', name: 'New Category', icon: '🎨' },
  // ...
];
```

### Styling Customization
Edit `tailwind.config.ts` to customize colors, fonts, and other theme settings.

## 📦 Dependencies

### Core
- `next`: 14.2.3
- `react`: 18.3.1
- `typescript`: 5.x

### State Management
- `zustand`: 4.5.2

### UI & Styling
- `tailwindcss`: 3.4.3
- `lucide-react`: 0.376.0
- `clsx`: 2.1.1
- `tailwind-merge`: 2.3.0

## 🚧 Future Enhancements

When connecting to a real FastAPI backend:
1. Replace mock API calls in `lib/api/mockApi.ts` with actual HTTP requests
2. Add authentication token management
3. Implement proper error handling
4. Add loading states for all data fetching
5. Implement pagination for large datasets
6. Add form validation with libraries like Zod
7. Implement actual checkout flow

## 📝 Notes

- All API endpoints are currently mocked
- Authentication is simulated (any credentials work)
- Product images use Unsplash placeholders
- Cart persists in browser localStorage
- Admin routes are not protected (add auth in production)

## 🤝 Development Tips

1. **Hot Reload**: Changes auto-reload in development
2. **TypeScript**: Full type safety throughout the project
3. **Component Isolation**: Components are modular and reusable
4. **Mock Data**: Easy to modify in `lib/data/mockData.ts`

## 📄 License

This project is for demonstration purposes.

---

Built with ❤️ using Next.js 14 and TailwindCSS
