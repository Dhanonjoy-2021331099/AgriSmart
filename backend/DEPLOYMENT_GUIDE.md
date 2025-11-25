# Vercel Deployment Guide - SmartAgri Backend

## 🔧 Fixes Applied

### 1. **Serverless Function Configuration**
   - Updated `vercel.json` with correct paths
   - Fixed server.js to properly export for Vercel serverless functions
   - Added proper error handling middleware

### 2. **MongoDB Connection Handling**
   - Fixed mongoose connection to work in serverless environment
   - Removed `process.exit()` that was crashing serverless functions
   - Added connection caching for better performance
   - Made connections non-blocking during initialization

### 3. **Error Handling**
   - Added try-catch blocks to all routes
   - Added global error handling middleware
   - Added 404 handler for unknown routes
   - Improved error messages for debugging

## 📋 Deployment Process

### Step 1: Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### Step 2: Navigate to Backend Directory
```bash
cd backend
```

### Step 3: Login to Vercel
```bash
vercel login
```

### Step 4: Set Environment Variables
**IMPORTANT:** You must set these environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `DB_USER` - Your MongoDB username
   - `DB_PASS` - Your MongoDB password
   - `JWT_SECRET` - Your JWT secret key (for authentication)
   - `NODE_ENV` - Set to `production`

### Step 5: Deploy to Vercel

**Option A: Deploy from Backend Folder**
```bash
# Make sure you're in the backend directory
cd backend
vercel
```

**Option B: Deploy from Root (if vercel.json is at root)**
```bash
# From project root
vercel
```

**Option C: Deploy via GitHub (Recommended)**
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set the **Root Directory** to `backend` in Vercel project settings
4. Vercel will auto-deploy on every push

### Step 6: Verify Deployment
1. Check Vercel dashboard for deployment status
2. Visit your deployment URL (e.g., `https://your-project.vercel.app`)
3. Test the API endpoint: `https://your-project.vercel.app/`
4. Check logs in Vercel dashboard if there are any errors

## 🚨 Common Issues & Solutions

### Issue 1: Function Invocation Failed (500 Error)
**Solution:**
- Check that all environment variables are set in Vercel dashboard
- Verify MongoDB credentials are correct
- Check Vercel function logs for specific error messages

### Issue 2: MongoDB Connection Timeout
**Solution:**
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel IPs
- Check that DB_USER and DB_PASS are correctly set
- Verify MongoDB cluster is running

### Issue 3: Module Not Found Errors
**Solution:**
- Ensure `package.json` is in the backend folder
- Run `npm install` before deploying
- Check that all dependencies are listed in `package.json`

### Issue 4: Routes Not Working
**Solution:**
- Verify `vercel.json` routes configuration
- Check that server.js is properly exported
- Ensure all route handlers are properly imported

## 📁 Project Structure for Vercel

```
backend/
├── server.js          # Main server file (exported for Vercel)
├── vercel.json        # Vercel configuration
├── package.json       # Dependencies
├── controllers/       # Route controllers
├── models/           # Database models
├── database/         # Database connection
└── middleware/       # Auth middleware
```

## 🔍 Testing After Deployment

1. **Health Check:**
   ```
   GET https://your-project.vercel.app/
   ```
   Should return: "Smart Agri API is running on Vercel!"

2. **Test Products Endpoint:**
   ```
   GET https://your-project.vercel.app/agriProducts
   ```

3. **Test Auth Endpoint:**
   ```
   POST https://your-project.vercel.app/api/auth/register
   ```

## 📝 Important Notes

- **No `app.listen()`**: Serverless functions don't need to listen on a port
- **Environment Variables**: Must be set in Vercel dashboard, not in `.env` file
- **Cold Starts**: First request after inactivity may be slower (normal for serverless)
- **Connection Pooling**: MongoDB connections are cached to improve performance
- **Error Logs**: Check Vercel dashboard → Functions → Logs for detailed error messages

## 🎯 Next Steps

1. Set all environment variables in Vercel
2. Deploy using one of the methods above
3. Test all API endpoints
4. Monitor logs for any issues
5. Update frontend API URLs to point to Vercel deployment

## 📞 Support

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables are set
3. Test MongoDB connection separately
4. Review error messages in Vercel dashboard

