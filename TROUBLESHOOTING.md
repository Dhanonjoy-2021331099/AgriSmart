# Troubleshooting Guide - Backend Connection Issues

## 🔴 Problem: "ব্যাকএন্ড সার্ভার চালু আছে কিনা পরীক্ষা করুন"

এই error আসে যখন frontend backend-এর সাথে connect করতে পারে না।

## ✅ Fixes Applied

### 1. **Frontend - AddProduct.jsx**
   - ✅ Content-Type check before parsing JSON
   - ✅ Better error messages with API URL
   - ✅ Proper error handling for fetch failures
   - ✅ Accept header added to requests

### 2. **Backend - productController.js**
   - ✅ Explicit Content-Type headers
   - ✅ Better error handling
   - ✅ Database connection status check

## 🔍 Common Causes & Solutions

### 1. **Backend Server Not Running**
**Solution:**
```bash
cd backend
npm run dev
# বা
node server.js
```

### 2. **Wrong API URL**
**Check:**
- Frontend `.env.local` বা Vercel environment variables
- `VITE_API_BASE_URL` সঠিক আছে কিনা
- Backend URL এর শেষে `/api` আছে কিনা

**Example:**
```env
# Local development
VITE_API_BASE_URL=http://localhost:6001

# Production (Vercel)
VITE_API_BASE_URL=https://your-backend.vercel.app
```

### 3. **CORS Issues**
**Check backend server.js:**
```javascript
app.use(cors({
  origin: "*",  // Should allow all origins
  credentials: true
}));
```

### 4. **Database Connection Issues**
**Check:**
- MongoDB connection string
- Environment variables (`DB_USER`, `DB_PASS`)
- Network access in MongoDB Atlas

### 5. **Port Mismatch**
**Check:**
- Backend running on port 6001?
- Frontend calling correct port?

## 🧪 Testing Steps

### 1. **Test Backend Directly:**
```bash
# Test root endpoint
curl http://localhost:6001/

# Test products GET
curl http://localhost:6001/api/products

# Test products POST
curl -X POST http://localhost:6001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":100,"origin":"BD"}'
```

### 2. **Check Browser Console:**
- Open browser DevTools (F12)
- Go to Network tab
- Try to add product
- Check the request:
  - URL correct?
  - Status code?
  - Response body?
  - Headers?

### 3. **Check Backend Logs:**
```bash
# Look for:
- Connection errors
- Request received logs
- Database errors
```

## 📝 Debug Checklist

- [ ] Backend server running?
- [ ] Correct port (6001)?
- [ ] API URL correct in frontend?
- [ ] CORS configured?
- [ ] Database connected?
- [ ] Environment variables set?
- [ ] Network tab shows request?
- [ ] Response is JSON (not HTML)?

## 🚀 Quick Fixes

### If backend not running:
```bash
cd backend
npm install
npm run dev
```

### If API URL wrong:
1. Check `.env.local` in frontend
2. Or check Vercel environment variables
3. Update `VITE_API_BASE_URL`

### If CORS error:
- Check backend CORS configuration
- Ensure `origin: "*"` is set

### If database error:
- Check MongoDB connection
- Verify credentials
- Check network access

## 📞 Still Having Issues?

1. **Check Browser Console:**
   - Any JavaScript errors?
   - Network request details?

2. **Check Backend Logs:**
   - Server starting?
   - Requests received?
   - Any errors?

3. **Test with curl/Postman:**
   - Direct API testing
   - Bypass frontend issues

---

**Most Common Issue:** Backend server not running or wrong API URL! 🎯

