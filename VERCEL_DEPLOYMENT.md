# Vercel Deployment Guide

## Prerequisites

1. **Backend API Deployed**: Your FastAPI backend must be deployed and accessible via HTTPS before deploying the frontend.
2. **MongoDB Atlas**: Ensure your MongoDB Atlas cluster allows connections from all IPs (0.0.0.0/0) or Vercel's IP ranges.

## ⚠️ Critical: Environment Variables

### The Problem
If you see errors like "Server Components render error" or blank pages, it's because the frontend is trying to connect to `http://localhost:8000` which doesn't exist in production.

### The Solution

In your **Frontend** Vercel project settings, add this environment variable:

```
Name: NEXT_PUBLIC_API_URL
Value: https://sleepycare-backend-80qdtp8pn-ibrahim-hamdans-projects.vercel.app
Environment: Production, Preview, Development
```

⚠️ **Important**:
- Replace with YOUR actual backend URL
- Do NOT include a trailing slash
- Must start with `https://`
- After adding, click "Redeploy" for changes to take effect

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or `Sleepycare-frontend` if deploying from parent directory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variables in the "Environment Variables" section
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL production
# Enter your backend API URL when prompted

# Deploy to production
vercel --prod
```

## Important Notes

### API Connectivity
- The frontend makes API calls to the backend during build time for static page generation
- Pages that fetch data at build time (`app/(main)/page.tsx`, `app/(main)/shop/page.tsx`) use `dynamic = 'force-dynamic'` to bypass static generation
- This means these pages will be server-rendered on each request

### CORS Configuration
Ensure your FastAPI backend has CORS configured to allow requests from your Vercel domain:

```python
# In your FastAPI app
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-vercel-app.vercel.app",
        "https://your-custom-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Backend Deployment Options
- **Railway**: Easy Python deployment
- **Render**: Free tier available
- **Fly.io**: Good for Docker deployments
- **AWS EC2/ECS**: More control but requires more setup
- **DigitalOcean App Platform**: Simplified deployment

## Troubleshooting

### Build Failures
- **"fetch failed" errors**: Backend API not accessible during build. Check that `dynamic = 'force-dynamic'` is set for pages that fetch data.
- **Type errors**: Run `npm run build` locally first to catch TypeScript errors.

### Runtime Issues
- **API calls failing**: Check NEXT_PUBLIC_API_URL environment variable
- **CORS errors**: Update backend CORS settings to include your Vercel domain
- **Authentication issues**: Ensure cookies/tokens work across domains (consider using HTTPS for both frontend and backend)

## Performance Optimization

1. **Image Optimization**: Next.js automatically optimizes images from remote sources
2. **Caching**: Configure `Cache-Control` headers in your API responses
3. **Edge Functions**: Consider deploying certain API routes as Edge Functions for better performance

## Monitoring

- Check Vercel's deployment logs for build errors
- Use Vercel Analytics for performance monitoring
- Monitor your backend API separately (e.g., with Sentry, LogRocket)
