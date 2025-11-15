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
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/SmartAgri
JWT_SECRET=your-secret-key-change-in-production
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API=http://localhost:5000/api
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Test:** http://localhost:5000/api

## Features

- Real-time sensor data visualization
- User authentication (Login/Signup)
- Farmer dashboard with live charts
- Admin panel for device management
- Soil & water analysis tools

## Troubleshooting

1. **MongoDB not running:** Make sure MongoDB is installed and running on port 27017
2. **Port already in use:** Change the PORT in backend/.env or use different ports
3. **API connection errors:** Verify NEXT_PUBLIC_API in frontend/.env.local matches backend URL


