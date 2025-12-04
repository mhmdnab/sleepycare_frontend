# TanStack Query Migration Complete ✅

## Overview
Successfully migrated entire Sleepycare e-commerce project from manual data fetching (useState + useEffect) to **TanStack Query v5** for improved performance, caching, and automatic refetching.

## What Was Done

### 1. Infrastructure Setup
- ✅ Installed `@tanstack/react-query` and `@tanstack/react-query-devtools`
- ✅ Created `QueryProvider` with optimal configuration:
  - 1-minute stale time
  - No refetch on window focus
  - 1 retry on failure
  - DevTools enabled for debugging
- ✅ Wrapped root layout with QueryProvider

### 2. Query Hooks Created (`lib/hooks/useQueries.ts`)

#### Products (Public)
- `useProducts()` - Get all products
- `useProduct(id)` - Get single product by ID
- `useProductsByCategory(categoryId)` - Filter by category
- `useBestSellers()` - Get featured products

#### Admin Products
- `useAdminProducts()` - Get all products (admin)
- `useCreateProduct()` - Create new product
- `useUpdateProduct()` - Update existing product
- `useDeleteProduct()` - Delete product

#### Categories
- `useCategories()` - Get all categories
- `useCategory(id)` - Get single category
- `useCreateCategory()` - Create category
- `useUpdateCategory()` - Update category
- `useDeleteCategory()` - Delete category

#### Orders
- `useOrders()` - User orders
- `useOrder(id)` - Single order
- `useCreateOrder()` - Create order
- `useAdminOrders()` - All orders (admin)
- `useAdminOrder(id)` - Single order (admin)
- `useUpdateOrder()` - Update order status

#### Users (Admin)
- `useAdminUsers()` - Get all users
- `useAdminUser(id)` - Get single user
- `useUserOrdersCount(userId)` - Get order count

#### Partners
- `usePartners()` - Get all partners
- `usePartner(id)` - Get single partner
- `useCreatePartner()` - Create partner
- `useUpdatePartner()` - Update partner
- `useDeletePartner()` - Delete partner

#### Authentication
- `useCurrentUser()` - Get current logged-in user
- `useLogin()` - Login mutation
- `useRegister()` - Register mutation

### 3. Pages Converted

#### Admin Pages
- ✅ `app/admin/partners/page.tsx`
  - Before: useState + useEffect + loadPartners()
  - After: usePartners(), useCreatePartner(), useUpdatePartner(), useDeletePartner()

- ✅ `app/admin/products/page.tsx`
  - Before: useState + useEffect + loadProducts() + loadCategories()
  - After: useAdminProducts(), useCategories(), useCreateProduct(), useUpdateProduct(), useDeleteProduct()

- ✅ `app/admin/categories/page.tsx`
  - Before: useState + useEffect + loadCategories()
  - After: useCategories(), useCreateCategory(), useUpdateCategory(), useDeleteCategory()

- ✅ `app/admin/orders/page.tsx`
  - Before: useState + useEffect + loadOrders()
  - After: useAdminOrders(), useUpdateOrder()

- ✅ `app/admin/users/page.tsx`
  - Before: useState + useEffect + loadUsers() + Promise.all
  - After: useAdminUsers(), useUserOrdersCount()

#### Public Pages
- ✅ `app/(main)/page.tsx` (Home)
  - Before: Server component with async data fetching
  - After: Client component with useBestSellers(), useCategories(), usePartners()

- ✅ `app/(main)/shop/page.tsx`
  - Before: useState + useEffect + loadData()
  - After: useProducts(), useCategories()

- ✅ `app/(main)/product/[id]/page.tsx`
  - Before: useState + useEffect + loadProduct()
  - After: useProduct(productId)

#### Components
- ✅ `components/Navbar.tsx`
  - Before: useState + useEffect + loadCategories()
  - After: useCategories()

## Benefits Gained

### 1. Performance Improvements
- **Automatic Caching**: Data cached for 1 minute, reduces unnecessary API calls
- **Request Deduplication**: Multiple components requesting same data = single API call
- **Background Refetching**: Stale data updated in background without blocking UI
- **Optimistic Updates**: UI updates before server confirms (can be added)

### 2. Developer Experience
- **Less Boilerplate**: No more useState + useEffect combos
- **Automatic Loading States**: `isLoading`, `isError`, `isSuccess` built-in
- **DevTools**: Visual query debugging with React Query DevTools
- **Consistent Patterns**: All data fetching follows same hook pattern

### 3. Code Quality
- **Type Safety**: TypeScript types maintained throughout
- **Error Handling**: Built-in error boundaries and retry logic
- **Cache Invalidation**: Automatic cache updates after mutations
- **Separation of Concerns**: Data fetching logic in hooks, UI in components

## Before vs After Examples

### Before (Manual Fetching)
```tsx
export default function PartnersPage() {
  const [partnerList, setPartnerList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const data = await adminPartnersApi.getAll();
      setPartnerList(data);
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await adminPartnersApi.delete(id);
    await loadPartners(); // Manual refetch
  };
}
```

### After (TanStack Query)
```tsx
export default function PartnersPage() {
  const { data: partnerList = [], isLoading: loading } = usePartners();
  const deletePartner = useDeletePartner();

  const handleDelete = async (id) => {
    await deletePartner.mutateAsync(id); // Auto refetch!
  };
}
```

## Automatic Features

### Cache Invalidation
All mutations automatically invalidate related queries:
```tsx
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['partners'] });
}
```

### Loading & Error States
```tsx
const { data, isLoading, isError, error } = useProducts();

if (isLoading) return <Spinner />;
if (isError) return <Error message={error.message} />;
```

### Stale While Revalidate
- Data served from cache immediately
- Fresh data fetched in background
- UI updates seamlessly when new data arrives

## Query Keys Structure
```
['products'] - All products
['products', productId] - Single product
['products', 'best-sellers'] - Best sellers
['products', 'category', categoryId] - By category
['admin', 'products'] - Admin products
['categories'] - All categories
['orders'] - User orders
['admin', 'orders'] - Admin orders
['admin', 'users'] - Admin users
['partners'] - Partners list
['auth', 'me'] - Current user
```

## Configuration Details

### QueryClient Setup
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

### Why These Settings?
- **staleTime: 60s**: E-commerce data doesn't change frequently, 1 minute is reasonable
- **refetchOnWindowFocus: false**: Prevents unnecessary refetches when user tabs back
- **retry: 1**: Try once more on failure, then show error (fast fail for better UX)

## Testing Checklist

### Admin Pages
- [ ] Partners CRUD (create, read, update, delete)
- [ ] Products CRUD with category dropdown
- [ ] Categories CRUD with icon upload
- [ ] Orders list and status updates
- [ ] Users list with order counts

### Public Pages
- [ ] Home page loads best sellers, categories, partners
- [ ] Shop page filters and sorts products
- [ ] Product detail page shows correct product
- [ ] Navbar categories dropdown

### Features to Test
- [ ] Data loads from cache on revisit (instant)
- [ ] Mutations trigger automatic refetch
- [ ] Loading states display properly
- [ ] Error handling works
- [ ] DevTools show query states
- [ ] No duplicate API calls

## DevTools Usage

Access React Query DevTools:
1. Dev server running at `http://localhost:3000`
2. DevTools panel appears at bottom-left
3. Click to expand and see:
   - Active queries
   - Cache state
   - Query timings
   - Refetch triggers

## Next Steps (Optional Enhancements)

### 1. Add Optimistic Updates
```tsx
const updatePartner = useMutation({
  mutationFn: async ({ id, data }) => {
    return await adminPartnersApi.update(id, data);
  },
  onMutate: async (newData) => {
    // Optimistically update UI before server confirms
    await queryClient.cancelQueries(['partners']);
    const previous = queryClient.getQueryData(['partners']);
    queryClient.setQueryData(['partners'], (old) => [...old, newData]);
    return { previous };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['partners'], context.previous);
  },
});
```

### 2. Add Infinite Scroll (Pagination)
```tsx
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['products'],
  queryFn: ({ pageParam = 1 }) => productsApi.getAll(pageParam),
  getNextPageParam: (lastPage, pages) => lastPage.nextPage,
});
```

### 3. Add Prefetching
```tsx
// Prefetch product on hover
const prefetchProduct = (id) => {
  queryClient.prefetchQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.getById(id),
  });
};
```

### 4. Add Query Dependent Fetching
```tsx
const { data: category } = useCategory(categoryId);
const { data: products } = useProductsByCategory(category?.id, {
  enabled: !!category, // Only fetch when category exists
});
```

## Performance Metrics

### Before Migration
- Every page visit = New API call
- Multiple components = Multiple API calls
- Manual loading state management
- Manual error handling
- Manual refetch after mutations

### After Migration
- Page revisit within 1 min = Instant from cache
- Multiple components = Single API call (deduped)
- Automatic loading states
- Automatic error handling
- Automatic refetch after mutations

## Files Modified

### Created
- `lib/providers/QueryProvider.tsx`
- `lib/hooks/useQueries.ts`

### Modified
- `app/layout.tsx` (wrapped with QueryProvider)
- `app/admin/partners/page.tsx`
- `app/admin/products/page.tsx`
- `app/admin/categories/page.tsx`
- `app/admin/orders/page.tsx`
- `app/admin/users/page.tsx`
- `app/(main)/page.tsx`
- `app/(main)/shop/page.tsx`
- `app/(main)/product/[id]/page.tsx`
- `components/Navbar.tsx`

## Migration Status: ✅ COMPLETE

All pages successfully migrated to TanStack Query. The application now benefits from:
- Better performance with smart caching
- Reduced API calls
- Automatic background updates
- Built-in loading and error states
- Powerful DevTools for debugging
- Clean, maintainable code

**Zustand** remains for local state (cart, auth) ✅
**TanStack Query** handles server state (API data) ✅

Best of both worlds! 🚀
