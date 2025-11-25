# Smart Agri - Smart Agriculture Dashboard

A modern farming dashboard with real-time sensor monitoring, smart irrigation, and crop recommendations.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

## Quick Start

### Option 1: Using the startup script (Recommended)

**Windows (PowerShell):**
```powershell
.\start.ps1
```

**Windows (Command Prompt):**
```cmd
start.bat
```

### Option 2: Manual Setup

1. **Start Backend Server:**
   ```bash
   cd backend
   # Create .env file with:
   # PORT=5000
   # MONGO_URI=mongodb://localhost:27017/smart-agri
   npm install
   npm run dev
   ```

2. **Start Frontend Server (in a new terminal):**
   ```bash
   cd frontend
   # Create .env.local file with:
   # NEXT_PUBLIC_API=http://localhost:5000/api
   npm install
   npm run dev
   ```

## Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory with:
```
# Database
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# Server
PORT=6001

# JWT Secret
JWT_SECRET=your-secret-key-change-in-production

# Firebase Admin SDK (from service account JSON)
FIREBASE_PROJECT_ID=agrismart-b5054
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@agrismart-b5054.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
```

### Frontend (.env)
Create a `.env` file in the `frontend` directory with:
```
# API Base URL
VITE_API_BASE_URL=http://localhost:6001/api

# Firebase Config (from Firebase Console > Project Settings > General > Your apps)
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=agrismart-b5054.firebaseapp.com
VITE_PROJECT_ID=agrismart-b5054
VITE_STORAGE_BUCKET=agrismart-b5054.appspot.com
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

**Note:** To get Firebase config values:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (agrismart-b5054)
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Copy the config values from the Firebase SDK snippet

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Test:** http://localhost:5000/api

## Features

- Real-time sensor data visualization
- User authentication (Login/Signup)
- **Google Sign-In** - Sign in or register with Google account
- **Profile Management** - View Google profile with photo, name, and email
- Farmer dashboard with live charts
- Admin panel for device management
- Soil & water analysis tools

## Troubleshooting

1. **MongoDB not running:** Make sure MongoDB is installed and running on port 27017
2. **Port already in use:** Change the PORT in backend/.env or use different ports
3. **API connection errors:** Verify NEXT_PUBLIC_API in frontend/.env.local matches backend URL


