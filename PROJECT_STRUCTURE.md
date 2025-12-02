# WipesMart Project Structure

## Complete File Tree

```
SleepyFrontend/
│
├── 📁 app/
│   ├── 📁 (main)/                    # Customer-facing routes
│   │   ├── layout.tsx               # Main layout with Navbar & Footer
│   │   ├── page.tsx                 # Landing page (/)
│   │   ├── 📁 shop/
│   │   │   └── page.tsx             # Shop page (/shop)
│   │   └── 📁 product/
│   │       └── 📁 [id]/
│   │           └── page.tsx         # Product details (/product/[id])
│   │
│   ├── 📁 auth/                     # Authentication routes
│   │   ├── layout.tsx               # Auth layout
│   │   ├── 📁 login/
│   │   │   └── page.tsx             # Login page
│   │   ├── 📁 register/
│   │   │   └── page.tsx             # Register page
│   │   └── 📁 forgot-password/
│   │       └── page.tsx             # Password reset page
│   │
│   ├── 📁 admin/                    # Admin dashboard
│   │   ├── layout.tsx               # Admin layout with sidebar
│   │   ├── page.tsx                 # Dashboard home
│   │   ├── 📁 products/
│   │   │   └── page.tsx             # Products management
│   │   ├── 📁 orders/
│   │   │   └── page.tsx             # Orders management
│   │   └── 📁 users/
│   │       └── page.tsx             # Users management
│   │
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Global styles
│
├── 📁 components/
│   ├── 📁 ui/                       # Reusable UI components
│   │   ├── Button.tsx               # Button component
│   │   └── Input.tsx                # Input component
│   ├── 📁 admin/
│   │   └── AdminSidebar.tsx         # Admin navigation sidebar
│   ├── Navbar.tsx                   # Main navigation bar
│   ├── Footer.tsx                   # Site footer
│   ├── ProductCard.tsx              # Product card component
│   └── CartDrawer.tsx               # Shopping cart drawer
│
├── 📁 lib/
│   ├── 📁 store/
│   │   └── cart.ts                  # Zustand cart store
│   ├── 📁 data/
│   │   └── mockData.ts              # Mock products, orders, users
│   ├── 📁 api/
│   │   └── mockApi.ts               # Mock API functions
│   └── utils.ts                     # Utility functions
│
├── 📄 package.json                  # Dependencies & scripts
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 tailwind.config.ts            # Tailwind configuration
├── 📄 postcss.config.mjs            # PostCSS config
├── 📄 next.config.mjs               # Next.js config
├── 📄 .eslintrc.json                # ESLint config
├── 📄 .gitignore                    # Git ignore rules
└── 📄 README.md                     # Project documentation

```

## 🔗 Route Mapping

### Public Routes
| Route | File | Description |
|-------|------|-------------|
| `/` | `app/(main)/page.tsx` | Landing page with hero, features, testimonials |
| `/shop` | `app/(main)/shop/page.tsx` | Product listing with filters and search |
| `/product/[id]` | `app/(main)/product/[id]/page.tsx` | Product details page |
| `/auth/login` | `app/auth/login/page.tsx` | User login |
| `/auth/register` | `app/auth/register/page.tsx` | User registration |
| `/auth/forgot-password` | `app/auth/forgot-password/page.tsx` | Password reset |

### Admin Routes
| Route | File | Description |
|-------|------|-------------|
| `/admin` | `app/admin/page.tsx` | Admin dashboard overview |
| `/admin/products` | `app/admin/products/page.tsx` | Products management |
| `/admin/orders` | `app/admin/orders/page.tsx` | Orders management |
| `/admin/users` | `app/admin/users/page.tsx` | Users management |

## 📦 Key Components

### UI Components
- **Button**: Reusable button with variants (primary, secondary, outline, ghost, danger)
- **Input**: Form input with label and error states

### Layout Components
- **Navbar**: Main navigation with cart, search, and mobile menu
- **Footer**: Site footer with links and social media
- **AdminSidebar**: Admin navigation sidebar

### Feature Components
- **ProductCard**: Product display card with image, price, add to cart
- **CartDrawer**: Sliding cart panel with item management

## 🔄 State Management

### Cart Store (Zustand)
```typescript
- items: CartItem[]
- addItem(product)
- removeItem(productId)
- updateQuantity(productId, quantity)
- clearCart()
- getTotalPrice()
- getTotalItems()
```

## 🎨 Styling System

### Tailwind Theme
- **Primary Colors**: Teal/Cyan shades (50-900)
- **Font**: Inter (Google Font)
- **Breakpoints**: Mobile-first responsive design
- **Components**: Utility-first CSS with consistent spacing

## 🛠️ Mock API Structure

### Products API
- `getAll()` - Get all products
- `getById(id)` - Get single product
- `getByCategory(category)` - Filter by category
- `search(query)` - Search products
- `getBestSellers()` - Get top 4 products
- `getRelated(productId)` - Get related products

### Orders API
- `getAll()` - Get all orders
- `create(orderData)` - Create new order

### Users API
- `getAll()` - Get all users
- `login(email, password)` - User login
- `register(userData)` - User registration
- `adminLogin(email, password)` - Admin login

### Admin Products API
- `create(productData)` - Create product
- `update(id, productData)` - Update product
- `delete(id)` - Delete product

## 📊 Mock Data

### Products (12 items)
- Baby Wipes (3 products)
- Antibacterial Wipes (3 products)
- Kitchen Wipes (2 products)
- Furniture Wipes (2 products)
- Glass Wipes (1 product)
- Floor Wipes (1 product)

### Categories (6 types)
- Baby (👶)
- Antibacterial (🧼)
- Kitchen (🍽️)
- Furniture (🛋️)
- Glass (🪟)
- Floor (🧹)

### Testimonials (3 reviews)
- Customer feedback with 5-star ratings

### Orders (3 samples)
- Various statuses: Delivered, Processing, Shipped

### Users (3 samples)
- Customers and Admin roles

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📝 Development Notes

1. **Hot Reload**: All changes auto-refresh
2. **TypeScript**: Full type safety
3. **Client Components**: Use 'use client' for interactive components
4. **Server Components**: Default for better performance
5. **Image Optimization**: Next.js Image component used throughout
6. **Responsive**: Mobile-first design approach
7. **Accessibility**: Semantic HTML and ARIA labels where needed

## 🔐 Authentication Flow (Mock)

1. User enters credentials on login/register page
2. Mock API returns success with fake JWT token
3. Token stored in localStorage
4. User redirected to shop or dashboard
5. (In production: Add proper auth, protected routes, token validation)

## 🎯 Feature Highlights

✅ Fully responsive design
✅ Shopping cart with persistence
✅ Product filtering and search
✅ Admin dashboard with CRUD UI
✅ Mock API ready for backend integration
✅ Clean, modern UI with smooth animations
✅ Type-safe with TypeScript
✅ Optimized images and performance
✅ Modular component architecture
✅ Easy to customize and extend
