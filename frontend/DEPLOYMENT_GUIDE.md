# Vercel Frontend Deployment Guide - SmartAgri

## 📋 Deployment Process (Deploy করার প্রক্রিয়া)

### Step 1: Environment Variables Set করুন

**Vercel Dashboard এ যান:**
1. Project → **Settings** → **Environment Variables**
2. এই variable add করুন:
   - `VITE_API_BASE_URL` = `https://your-backend-url.vercel.app`
     - Example: `https://smart-agri-backend.vercel.app`
     - **Important:** Backend URL এর শেষে `/api` লাগবে না, শুধু base URL

### Step 2: Build Command Check করুন

Frontend build করার জন্য:
```bash
cd frontend
npm run build
```

Build successful হলে `dist` folder create হবে।

### Step 3: Deploy করুন

**Option A: Vercel CLI দিয়ে (Recommended)**

```bash
# Frontend folder এ যান
cd frontend

# Vercel login (যদি আগে login না করেন)
vercel login

# Deploy করুন
vercel

# Production এ deploy করতে চাইলে
vercel --prod
```

**Option B: GitHub Integration (Best Practice)**

1. **Code GitHub এ Push করুন:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Vercel Dashboard এ:**
   - **Add New Project** → GitHub repository select করুন
   - **Root Directory** = `frontend` set করুন
   - **Framework Preset** = `Vite` (auto-detect হবে)
   - **Build Command** = `npm run build` (auto-detect হবে)
   - **Output Directory** = `dist` (auto-detect হবে)
   - **Install Command** = `npm install` (auto-detect হবে)

3. **Environment Variables Add করুন:**
   - `VITE_API_BASE_URL` = আপনার backend URL

4. **Deploy** button click করুন

### Step 4: Verify Deployment

1. **Check Vercel Dashboard:**
   - Deployment status দেখুন
   - Logs check করুন

2. **Test Website:**
   - Visit: `https://your-frontend-url.vercel.app`
   - Home page load হওয়া check করুন
   - Login/Register page test করুন
   - API calls working আছে কিনা check করুন

## 🔧 Configuration Files

### vercel.json
Frontend folder এ `vercel.json` file আছে যা:
- SPA routing handle করে (React Router)
- Build settings define করে
- Rewrites configure করে

### Environment Variables

**Local Development (.env.local):**
```env
VITE_API_BASE_URL=http://localhost:6001
```

**Production (Vercel Dashboard):**
```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

## 🚨 Common Issues & Solutions

### Issue 1: 404 Error on Refresh
**Problem:** React Router routes কাজ করছে না
**Solution:** `vercel.json` এ `rewrites` configuration আছে, এটি check করুন

### Issue 2: API Calls Fail
**Problem:** Backend URL সঠিক নয়
**Solution:**
- Vercel Dashboard এ `VITE_API_BASE_URL` check করুন
- Backend URL এর শেষে `/api` বা `/` আছে কিনা check করুন
- Browser console এ network errors check করুন

### Issue 3: Build Fails
**Problem:** Dependencies missing বা build errors
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue 4: Assets Not Loading
**Problem:** Images বা CSS load হচ্ছে না
**Solution:**
- `public` folder এ assets আছে কিনা check করুন
- `vite.config.js` এ base path check করুন
- Build output (`dist` folder) check করুন

### Issue 5: CORS Errors
**Problem:** Backend CORS configuration
**Solution:**
- Backend `server.js` এ CORS properly configured আছে
- Backend URL frontend থেকে accessible আছে কিনা check করুন

## 📁 Project Structure

```
frontend/
├── vercel.json          # Vercel configuration
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
├── index.html           # Entry point
├── dist/                # Build output (generated)
├── public/              # Static assets
└── src/                 # Source code
    ├── components/      # React components
    ├── pages/          # Page components
    ├── routes/         # Routing configuration
    └── ...
```

## 🔍 Testing Checklist

After deployment, test these:

- [ ] Home page loads correctly
- [ ] Navigation works
- [ ] Login/Register pages load
- [ ] API calls to backend work
- [ ] Products page loads data
- [ ] Dashboard works (if logged in)
- [ ] All routes work on refresh (no 404)
- [ ] Images and assets load
- [ ] Mobile responsive design works

## 📝 Important Notes

1. **Environment Variables:**
   - `VITE_` prefix দিয়ে variable define করতে হবে
   - Vercel Dashboard এ set করতে হবে
   - `.env` file Vercel এ কাজ করবে না (build time এ inject হয়)

2. **Build Output:**
   - `dist` folder automatically generate হয়
   - Vercel automatically serve করে

3. **Routing:**
   - React Router SPA routing
   - `vercel.json` এ rewrites configuration আছে
   - সব routes `index.html` এ redirect হয়

4. **API Base URL:**
   - Backend URL set করতে হবে
   - Example: `https://smart-agri-backend.vercel.app`
   - Code এ `/api` path add হয়

5. **Auto Deploy:**
   - GitHub integration enable করলে
   - প্রতিটি push এ auto-deploy হবে

## 🎯 Next Steps

1. ✅ Backend deploy করুন (যদি এখনো না করেন)
2. ✅ Backend URL note করুন
3. ✅ Frontend environment variable set করুন
4. ✅ Frontend deploy করুন
5. ✅ Test করুন সব features
6. ✅ Custom domain add করুন (optional)

## 📞 Troubleshooting

**Logs Check:**
- Vercel Dashboard → **Deployments** → Click on deployment → **Functions** → **Logs**

**Build Logs:**
- Vercel Dashboard → **Deployments** → Build logs দেখুন

**Runtime Errors:**
- Browser console check করুন
- Network tab check করুন API calls

**Common Commands:**
```bash
# Local build test
cd frontend
npm run build
npm run preview

# Check build output
ls -la dist/

# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vite Documentation: https://vitejs.dev/
- React Router: https://reactrouter.com/

---

**Deployment Complete!** 🎉

Frontend এখন live! Backend URL সঠিকভাবে set করুন এবং test করুন।


