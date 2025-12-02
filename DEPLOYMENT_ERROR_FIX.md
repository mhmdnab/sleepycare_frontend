# 🚨 Frontend Deployment Error: Server Components Render Error

## Error Message
```
Error: An error occurred in the Server Components render.
The specific message is omitted in production builds to avoid leaking sensitive details.
```

## Root Cause
Your frontend is trying to connect to `http://localhost:8000` (local backend) which doesn't exist in production.

---

## ✅ Solution: Add Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard
1. Navigate to: https://vercel.com
2. Select your **frontend** project (sleepycare-frontend)
3. Go to **Settings** → **Environment Variables**

### Step 2: Add the API URL
```
Name: NEXT_PUBLIC_API_URL
Value: https://sleepycare-backend-80qdtp8pn-ibrahim-hamdans-projects.vercel.app
Environment: Production, Preview, Development
```

⚠️ **Important**:
- Use YOUR actual backend URL (get it from your backend Vercel project)
- NO trailing slash at the end
- Must start with `https://`

### Step 3: Redeploy
1. Go to the **Deployments** tab
2. Click the three dots (•••) on the latest deployment
3. Select **Redeploy**
4. Wait for deployment to complete

---

## How to Find Your Backend URL

### Option 1: From Vercel Dashboard
1. Go to your backend project in Vercel
2. Look for "Domains" section on the project page
3. Copy the URL (e.g., `https://your-project-xxx.vercel.app`)

### Option 2: From Deployment Logs
1. Go to your backend project → Deployments
2. Click on the latest successful deployment
3. The URL is shown at the top of the page

---

## Verify It's Working

### 1. Check API Connection
After redeploying, open your browser console (F12) and check:
- No errors about "localhost:8000"
- No "Server Components render" errors

### 2. Test Backend Directly
Visit your backend URL in the browser:
```
https://your-backend-url.vercel.app/docs
```
You should see the FastAPI documentation page.

### 3. Test Frontend
Visit your frontend and:
- Homepage should load with products
- Shop page should show products and categories
- No console errors

---

## Other Common Issues

### Issue: Backend Still Showing Errors
**Error**: `ValidationError: mongodb_uri Field required`

**Solution**: Add environment variables in your **backend** Vercel project:
```
MONGODB_URI=mongodb+srv://admin:antiops009@cluster0.gljqsea.mongodb.net/
JWT_SECRET=3HpTEOOtFI2C5Ay91B63Nfp6hv1bDrQv
```

### Issue: CORS Errors
**Error**: `Access to fetch blocked by CORS policy`

**Solution**: Update CORS in your backend `app/main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend.vercel.app",  # Add your frontend URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: Pages Are Blank
**Causes**:
1. Environment variable not set → See solution above
2. Backend not responding → Check backend is deployed and running
3. MongoDB connection issue → Check MongoDB Atlas network access

---

## Deployment Checklist

Before deploying, ensure:

### Backend (must be done first)
- [ ] Backend deployed to Vercel
- [ ] Environment variables added (`MONGODB_URI`, `JWT_SECRET`)
- [ ] MongoDB Atlas allows connections from 0.0.0.0/0
- [ ] Backend URL is accessible (test /docs endpoint)
- [ ] CORS configured to allow frontend domain

### Frontend
- [ ] Backend URL obtained from Vercel
- [ ] `NEXT_PUBLIC_API_URL` added to Vercel environment variables
- [ ] Environment variable set for Production, Preview, and Development
- [ ] Frontend redeployed after adding env variable
- [ ] No console errors when visiting the site

---

## Quick Test Commands

### Test Backend
```bash
# Should return API documentation
curl https://your-backend-url.vercel.app/docs

# Should return products list (may be empty)
curl https://your-backend-url.vercel.app/products
```

### Test Frontend Build Locally
```bash
# Set environment variable
$env:NEXT_PUBLIC_API_URL="https://your-backend-url.vercel.app"

# Build
npm run build

# Start production server
npm start
```

---

## Still Having Issues?

### Check Vercel Logs
1. Go to your project → **Deployments**
2. Click on the failed/problematic deployment
3. Look for error messages in the **Build Logs** or **Function Logs**

### Check Browser Console
1. Open your deployed site
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Look for error messages (they'll be more detailed than the generic error)

### Common Error Messages & Solutions

| Error Message | Solution |
|---------------|----------|
| `fetch failed` | Backend URL is wrong or backend is down |
| `ECONNREFUSED` | Backend not accessible, check URL |
| `CORS policy` | Update CORS settings in backend |
| `401 Unauthorized` | JWT token issue, check JWT_SECRET |
| `500 Internal Server Error` | Check backend logs in Vercel |

---

## Production URLs Reference

Update these with your actual URLs:

```bash
# Backend API
BACKEND_URL=https://sleepycare-backend-80qdtp8pn-ibrahim-hamdans-projects.vercel.app

# Frontend App
FRONTEND_URL=https://your-frontend-app.vercel.app

# MongoDB Atlas
MONGODB_URI=mongodb+srv://admin:antiops009@cluster0.gljqsea.mongodb.net/
```

---

## Need More Help?

1. **Backend Issues**: See `sleepycare-backend/VERCEL_DEPLOYMENT.md`
2. **Frontend Issues**: See `VERCEL_DEPLOYMENT.md` (this file's parent)
3. **MongoDB Issues**: Check MongoDB Atlas dashboard for connection issues
4. **Vercel Issues**: Check Vercel documentation or support
