const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./controllers/authController");
const sensorRoutes = require("./controllers/sensorController");
const contactRoutes = require("./controllers/contactController");
const productRoutes = require("./controllers/productController");
const connectMongoose = require("./database/connect");

const app = express();

// CORS
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// Middleware to ensure JSON content type for all API responses
app.use((req, res, next) => {
  // Only set JSON for API routes, not for static files
  if (!req.path.includes('.')) {
    res.setHeader('Content-Type', 'application/json');
  }
  next();
});

// =============== MongoDB (MongoClient) ==================

let agrismartCollection;
let mongoClientPromise;
let mongooseConnected = false;

async function connectMongoClient() {
  try {
    if (!mongoClientPromise) {
      if (!process.env.DB_USER || !process.env.DB_PASS) {
        throw new Error("DB_USER and DB_PASS environment variables are required");
      }

      const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbp6mif.mongodb.net/?retryWrites=true&w=majority`;

      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      mongoClientPromise = client.connect();
    }

    const client = await mongoClientPromise;
    const db = client.db("agrismartDB");
    agrismartCollection = db.collection("agriProducts");
    return agrismartCollection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Initialize connections (non-blocking for serverless)
// Connections will be established on first request if needed
(async () => {
  try {
    // Try to connect both but don't block if they fail
    // Connections will be retried on first request
    Promise.allSettled([
      connectMongoClient().catch(err => console.error("MongoClient init error:", err.message)),
      connectMongoose().then(() => { mongooseConnected = true; }).catch(err => console.error("Mongoose init error:", err.message))
    ]).then(() => {
      console.log("Initial connection attempts completed");
    });
  } catch (error) {
    console.error("Initial connection error:", error.message);
    // Don't throw - connections will be retried on first request
  }
})();

// =============== API ROUTES ===============

// GET all products
app.get("/agriProducts", async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    await connectMongoClient();
    const data = await agrismartCollection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: "Failed to fetch products", message: error.message });
    }
  }
});

// Insert product
app.post("/agriProducts", async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    await connectMongoClient();
    const result = await agrismartCollection.insertOne(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error inserting product:", error);
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: "Failed to insert product", message: error.message });
    }
  }
});

// Other routes
app.use("/api/auth", authRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ 
    message: "Smart Agri API is running on Vercel!",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Error handling middleware (must be before 404 handler)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  // Ensure response hasn't been sent and set JSON header
  if (!res.headersSent) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ 
      error: "Internal server error", 
      message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong" 
    });
  }
});

// 404 handler (must be last)
app.use((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({ 
    error: "Route not found",
    path: req.path,
    method: req.method
  });
});

// ❗ For Vercel: export app directly (no app.listen())
// For local development: start server on port 6001
if (require.main === module) {
  // This means the file is being run directly, not imported
  const PORT = process.env.PORT || 6001;
  app.listen(PORT, () => {
    console.log(`✅ Smart Agri Backend Server running on http://localhost:${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🌐 Test endpoint: http://localhost:${PORT}/`);
  });
}

// Export for both Vercel (serverless) and local development
module.exports = app;
