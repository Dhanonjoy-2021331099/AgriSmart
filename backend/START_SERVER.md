# Backend Server Start Guide

## 🚀 Local Development Server Start

### Step 1: Navigate to Backend Folder
```bash
cd backend
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Create .env File (if not exists)
Create a `.env` file in the `backend` folder with:
```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Step 4: Start Server

**Option A: Development Mode (with auto-reload)**
```bash
npm run dev
```

**Option B: Production Mode**
```bash
npm start
```

### Step 5: Verify Server is Running

You should see:
```
✅ Smart Agri Backend Server running on http://localhost:6001
📡 API Base URL: http://localhost:6001/api
🌐 Test endpoint: http://localhost:6001/
```

### Step 6: Test the Server

Open browser or use curl:
```bash
# Test root endpoint
curl http://localhost:6001/

# Test products endpoint
curl http://localhost:6001/api/products
```

## 🔧 Troubleshooting

### Port Already in Use
If port 6001 is already in use:
```bash
# Find process using port 6001
# Windows:
netstat -ano | findstr :6001

# Kill the process or change PORT in .env
PORT=6002 npm run dev
```

### MongoDB Connection Error
- Check `.env` file has correct `DB_USER` and `DB_PASS`
- Verify MongoDB Atlas network access allows your IP
- Check MongoDB connection string

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📝 Important Notes

- Server runs on **port 6001** by default
- Frontend should use: `http://localhost:6001/api`
- For Vercel deployment, server runs as serverless function (no port needed)
- Local development requires `app.listen()` which is now added conditionally

## ✅ Success Indicators

When server starts successfully, you should see:
- ✅ Server running message
- ✅ MongoDB connection success
- ✅ No error messages
- ✅ Can access http://localhost:6001/ in browser

---

**Now start the server and test!** 🎉

