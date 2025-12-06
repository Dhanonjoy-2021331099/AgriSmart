# 🌾 Agri Smart - Smart Agriculture Management System

## 📋 Project Overview

**Agri Smart** is a modern web-based agricultural management platform that enables farmers to:
- 🤖 Detect crop diseases using AI technology
- 💡 Get expert agricultural advice
- 🛒 Buy and sell agricultural products
- 📊 Monitor real-time sensor data
- 💬 Get instant help from an AI chatbot

---

## 🛠️ Technologies Used

### **Frontend (Client Side)**
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | Core JavaScript library for building UI |
| **Vite** | 5.0.12 | Fast development server and build tool |
| **React Router** | 6.22.3 | Page navigation and routing |
| **Tailwind CSS** | 4.1.17 | Styling framework |
| **DaisyUI** | 5.5.5 | Component library for Tailwind CSS |
| **Framer Motion** | 12.23.25 | Animation library |
| **Axios** | 1.4.0 | HTTP client for API requests |
| **Firebase** | 12.6.0 | Authentication (Login/Signup) |
| **Chart.js** | 4.4.0 | Data visualization (Charts/Graphs) |
| **React Chartjs 2** | 5.2.0 | React wrapper for Chart.js |
| **Lucide React** | 0.555.0 | Icon library |
| **React Toastify** | 11.0.5 | Notification system |

### **Backend (Server Side)**
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest | JavaScript runtime environment |
| **Express.js** | 4.21.2 | Web server framework |
| **MongoDB** | 7.0.0 | NoSQL database |
| **Mongoose** | 7.0.0 | MongoDB Object Data Modeling (ODM) |
| **Firebase Admin** | 13.6.0 | Token verification and admin SDK |
| **JWT** | 9.0.0 | JSON Web Token for authentication |
| **Bcryptjs** | 2.4.3 | Password encryption |
| **Cors** | 2.8.5 | Cross-Origin Resource Sharing |
| **Dotenv** | 16.6.1 | Environment variables management |
| **Axios** | 1.4.0 | External API calls |

---

## 📁 Project Structure

```
SmartAgri/
│
├── backend/                          # Server-side code
│   ├── controllers/                  # API route handlers
│   │   ├── authController.js        # Login/Signup/Logout
│   │   ├── chatbotControllers.js    # AI Chatbot API
│   │   ├── contactController.js     # Contact form handler
│   │   ├── orderController.js       # Order management
│   │   ├── productController.js     # Product CRUD operations
│   │   ├── sensorController.js      # Sensor data API
│   │   └── userController.js        # User profile management
│   │
│   ├── database/                     # Database configuration
│   │   └── connect.js               # MongoDB connection setup
│   │
│   ├── middleware/                   # Middleware functions
│   │   └── auth.js                  # JWT token verification
│   │
│   ├── models/                       # MongoDB schemas
│   │   ├── ContactMessage.js        # Contact message model
│   │   ├── Notification.js          # Notification model
│   │   ├── Order.js                 # Order model
│   │   ├── Product.js               # Product model
│   │   ├── SensorData.js            # Sensor data model
│   │   └── User.js                  # User profile model
│   │
│   ├── seed/                         # Database seeding
│   │   └── seed.js                  # Demo data insertion
│   │
│   ├── agrismart.json               # Firebase Admin SDK config
│   ├── api-handler.js               # Vercel serverless function
│   ├── api.js                       # API routes setup
│   ├── server.js                    # Main server file
│   ├── package.json                 # Backend dependencies
│   └── vercel.json                  # Vercel deployment config
│
└── frontend/                         # Client-side code
    ├── public/                       # Static files
    │
    ├── src/                          # Source code
    │   ├── components/              # Reusable components
    │   │   ├── AIChatBot.js         # AI Chatbot UI
    │   │   ├── ContactModal.jsx     # Contact modal
    │   │   ├── Footer.jsx           # Footer component
    │   │   ├── LeafAnalyer.js       # Leaf disease analysis AI
    │   │   ├── LineChart.jsx        # Line chart component
    │   │   ├── Navbar.jsx           # Navigation bar
    │   │   └── ProtectedClient.jsx  # Protected route wrapper
    │   │
    │   ├── Contexts/                # React Context API
    │   │   ├── AppSettingsContext.jsx    # Theme and language settings
    │   │   ├── AuthProvider.jsx          # Authentication state
    │   │   ├── CartContext.jsx           # Shopping cart state
    │   │   └── AuthContexts/
    │   │       └── AuthContex.jsx        # Auth context logic
    │   │
    │   ├── firebase/                # Firebase configuration
    │   │   └── firebase.config.js   # Firebase initialization
    │   │
    │   ├── hooks/                   # Custom React hooks
    │   │   └── useLocalStorage.js   # LocalStorage management
    │   │
    │   ├── layouts/                 # Layout components
    │   │   └── MainLayout.jsx       # Main layout (Navbar + Footer)
    │   │
    │   ├── pages/                   # Page components
    │   │   ├── AddProduct.jsx       # Add product page
    │   │   ├── Admin.jsx            # Admin dashboard
    │   │   ├── Advice.jsx           # Agricultural advice page
    │   │   ├── AIDetection.jsx      # AI disease detection
    │   │   ├── Cart.jsx             # Shopping cart page
    │   │   ├── Checkout.jsx         # Checkout page
    │   │   ├── Dashboard.jsx        # Dashboard (sensor data)
    │   │   ├── Home.jsx             # Home page
    │   │   ├── Login.jsx            # Login page
    │   │   ├── OrderSuccess.jsx     # Order success page
    │   │   ├── Products.jsx         # Products list page
    │   │   ├── Profile.jsx          # User profile page
    │   │   ├── Register.jsx         # Registration page
    │   │   ├── Signup.jsx           # Signup page
    │   │   ├── Tools.jsx            # Modern tools page
    │   │   └── Banner/
    │   │       └── Banner.jsx       # Home page banner
    │   │
    │   ├── providers/               # Provider wrappers
    │   │   └── AppProviders.jsx     # All context providers combined
    │   │
    │   ├── routes/                  # Routing
    │   │   ├── index.jsx            # Protected routes logic
    │   │   └── router.jsx           # Main router configuration
    │   │
    │   ├── index.css                # Global CSS styles
    │   └── main.jsx                 # React entry point
    │
    ├── index.html                   # HTML template
    ├── package.json                 # Frontend dependencies
    ├── vite.config.js              # Vite configuration
    └── vercel.json                 # Vercel deployment config
```

---



## 🚀 How to Run the Project

### **Prerequisites**
- Node.js (v16+)
- MongoDB Atlas account
- Firebase project
- Git

### **Installation Steps**

#### **1. Clone the Repository**
```bash
git clone https://github.com/Dhanonjoy-2021331099/AgriSmart.git
cd SmartAgri
```

#### **2. Backend Setup**
```bash
cd backend
npm install
```



**Start Backend**
```bash
npm run dev
# Server runs on: http://localhost:5000
```

#### **3. Frontend Setup**
```bash
cd frontend
npm install
```

**Add Firebase credentials to `src/firebase/firebase.config.js`**

**Start Frontend**
```bash
npm run dev
# App runs on: http://localhost:5173
```

---


## 🎨 UI/UX Features

### **Design Principles:**
- Modern & Clean Interface
- Responsive Design (Mobile, Tablet, Desktop)
- Smooth Animations (Framer Motion)
- Accessible Color Schemes
- Intuitive Navigation

### **Styling Tools:**
- Tailwind CSS (Utility-first)
- DaisyUI (Pre-built components)
- Custom CSS Variables (Theme support)
- Lucide Icons (Modern icons)

---

## 📱 Responsive Design

- **Mobile (< 640px)**: Single column layout with hamburger menu
- **Tablet (640px - 1024px)**: 2-column grid
- **Desktop (> 1024px)**: Full layout with optimal spacing

---


### **Q1: What technologies did you use?**
```
A: I built a Full-Stack MERN Application:

Frontend:
- React 18.2.0 - UI building
- Vite - Fast development server
- Tailwind CSS + DaisyUI - Styling
- React Router - Navigation
- Framer Motion - Animations
- Chart.js - Data visualization

Backend:
- Node.js - Runtime
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- Firebase - Authentication
- JWT - Token-based security
```

### **Q2: What database did you use and why?**
```
A: MongoDB (NoSQL Database):

Reasons:
1. Flexible schema - Easy to modify
2. JSON-like documents - Works well with JavaScript
3. Scalable - Handles large datasets
4. Cloud support - Using MongoDB Atlas

Collections:
- users (User profiles)
- products (Product information)
- orders (Order data)
- sensordata (Sensor readings)
- contactmessages (Contact forms)
```

### **Q3: How did you implement authentication?**
```
A: Two-layer authentication system:

1. Firebase Authentication:
   - Email/Password signup/login
   - Google sign-in option
   - Frontend user state management

2. JWT Token:
   - Backend token generation
   - Verification on protected routes
   - Stored in localStorage

Flow:
Login → Firebase Auth → JWT Token → Store locally
→ Include in API calls → Backend verification
```

### **Q4: How does AI feature work?**
```
A: Google Gemini AI API integration:

1. Chatbot (AIChatBot.js):
   - User sends question
   - Gemini API processes
   - Returns AI response
   - Stores chat history

2. Disease Detection (LeafAnalyer.js):
   - Upload image
   - Convert to Base64
   - Send to Gemini API
   - AI analyzes and identifies disease
   - Provides treatment advice

Backend endpoint: /api/chatbot/chat
```

### **Q5: How does frontend-backend communication work?**
```
A: RESTful API Architecture:

1. Frontend uses Axios for HTTP requests
2. Backend Express routes handle requests
3. JSON data exchange
4. CORS enabled for cross-origin requests

Example Flow:
Frontend → axios.get('/api/products')
→ Backend route processes
→ Fetch from MongoDB
→ Return JSON response
→ Frontend displays data
```


### **Q7: How did you make it responsive?**
```
A: Tailwind CSS breakpoints:

- Mobile-first approach
- sm: (640px) - Tablets
- md: (768px) - Small desktop
- lg: (1024px) - Large desktop
- xl: (1280px) - Extra large

```
### **Q9: What security measures did you implement?**
```
A: Multiple security layers:

1. Password encryption with Bcrypt
2. JWT token authentication
3. Protected routes with middleware
4. Input validation
5. CORS configuration
6. Environment variables for secrets
7. Firebase security rules
8. MongoDB injection prevention via Mongoose
```
```
### **Q10: What were the main challenges?**
```
A: Challenges faced and solutions:

1. Firebase + MongoDB integration
   → Solved with JWT token bridge

2. Image upload for AI analysis
   → Used Base64 encoding

3. Real-time sensor data
   → Implemented polling mechanism

4. Theme switching across app
   → Used CSS variables + Context API

5. Responsive design
   → Tailwind breakpoints + testing
```
```
### **Q12: What did you learn from this project?**
```
A: Technical learnings:
- Full-stack development
- REST API design
- Database modeling
- Authentication & Authorization
- State management
- Responsive design
- AI API integration
- Deployment strategies

Soft Skills:
- Project planning
- Code organization
- Problem-solving
- Documentation
- Time management
- Team collaboration
```

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Guide](https://vitejs.dev)

---

## 🎓 Project Highlights

✅ **Full-stack MERN application**  
✅ **AI/ML integration (Gemini AI)**  
✅ **Real-time data visualization**  
✅ **E-commerce functionality**  
✅ **Responsive mobile design**  
✅ **Authentication & Authorization**  
✅ **RESTful API architecture**  
✅ **Modern UI/UX design**  
✅ **Multi-language support**  
✅ **Light/Dark theme support**

---




