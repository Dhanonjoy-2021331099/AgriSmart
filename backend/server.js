const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const net = require("net");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const admin = require("firebase-admin");

// ✅ Firebase Admin Initialization
// Option 1: Using service account JSON file
try {
 //onst serviceAccount = require("./agrismart.json");


const decoded = Buffer.from(process.env.FIREBASE_PRIVATE_KEY, "base64").toString("utf-8");
const serviceAccount = JSON.parse(decoded);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("🔥 Firebase Admin Initialized Successfully");
} catch (err) {
  console.error("❌ Firebase Admin Initialization Failed:", err);
}

// ------------------- Import Routes -------------------
const authRoutes = require("./controllers/authController");
const sensorRoutes = require("./controllers/sensorController");
const contactRoutes = require("./controllers/contactController");
const productRoutes = require("./controllers/productController");

// Import MongoDB connection (mongoose for Product model)
const connectMongoose = require("./database/connect");

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection URI (for MongoClient - legacy)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbp6mif.mongodb.net/?retryWrites=true&w=majority`;

// MongoDB Client (for legacy routes)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Global reference
let agrismartCollection;

async function connectMongoClient() {
  try {
    await client.connect();

    const myDB = client.db("agrismartDB");
    agrismartCollection = myDB.collection("agriProducts");

    console.log("🔥 Connected to MongoDB (MongoClient) successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Connect to MongoDB (mongoose for Product model)
connectMongoose();

// Connect to MongoDB (MongoClient for legacy routes)
connectMongoClient();

// ------------------- API ROUTES -------------------

// GET all products
app.get("/agriProducts", async (req, res) => {
  const data = await agrismartCollection.find().toArray();
  res.send(data);
});

// Insert product
app.post("/agriProducts", async (req, res) => {
  const newProduct = req.body;
  const result = await agrismartCollection.insertOne(newProduct);
  res.send(result);
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

// Start Server
const PORT = process.env.PORT || 6000;

// Handle port already in use
const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.log(`💡 Please either:`);
    console.log(`   1. Stop the process using port ${PORT}`);
    console.log(`   2. Or change PORT in .env file`);
    console.log(`   3. Or run: netstat -ano | findstr :${PORT} to find the process`);
    process.exit(1);
  } else {
    // If headers already sent, end the response
    res.end();
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

async function findAvailablePort(startPort, maxAttempts = 10) {
  const testPort = (port) =>
    new Promise((resolve) => {
      const tester = net.createServer()
        .once("error", (err) => {
          if (err.code === "EADDRINUSE") {
            resolve(false);
          } else {
            console.error(`Port check failed on ${port}:`, err.message);
            resolve(false);
          }
        })
        .once("listening", () => {
          tester.close(() => resolve(true));
        })
        .listen(port);
    });

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const portToTry = startPort + attempt;
    // eslint-disable-next-line no-await-in-loop
    const free = await testPort(portToTry);
    if (free) {
      return portToTry;
    }
  }

  throw new Error(`No free ports found between ${startPort} and ${startPort + maxAttempts - 1}`);
}

async function startLocalServer() {
  try {
    const preferredPort = parseInt(process.env.PORT, 10) || 6001;
    const port = await findAvailablePort(preferredPort, 20);
    if (port !== preferredPort) {
      console.warn(
        `⚠️  Port ${preferredPort} is busy. Using fallback port ${port} instead. Set PORT env var to override.`,
      );
    }

    const server = app.listen(port, () => {
      console.log(`✅ Smart Agri Backend Server running on http://localhost:${port}`);
      console.log(`📡 API Base URL: http://localhost:${port}/api`);
      console.log(`🌐 Test endpoint: http://localhost:${port}/`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `❌ Port ${port} became unavailable. Please stop the conflicting process or set PORT to a different value.`,
        );
      } else {
        console.error("Server error:", err);
      }
    });
  } catch (err) {
    console.error("Failed to start local server:", err.message);
  }
}

// ❗ For Vercel: export app directly (no app.listen())
// Vercel automatically handles Express apps as serverless functions
// For local development: start server on port 6001 (or the next available port)
if (require.main === module) {
  startLocalServer();
}

// Export Express app for both Vercel (serverless) and local development
// Vercel's @vercel/node automatically handles Express apps
module.exports = app;
