const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const admin = require("firebase-admin");

// ✅ Firebase Admin Initialization
// Option 1: Using service account JSON file
try {
  const serviceAccount = require("./agrismart.json");

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

// ------------------- MongoDB Setup -------------------

// Import Mongoose connection (for Product model)
const connectMongoose = require("./database/connect");

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Simple logger middleware
const logger = (req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
};

app.use(logger);

// ------------------- MongoClient Setup (legacy) -------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbp6mif.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let agrismartCollection;

async function connectMongoClient() {
  try {
    await client.connect();
    const myDB = client.db("agrismartDB");
    agrismartCollection = myDB.collection("agriProducts");

    console.log("🔥 Connected to MongoDB (MongoClient) successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
}

// Connect Mongoose and MongoClient
connectMongoose();
connectMongoClient();

// ------------------- API ROUTES -------------------

// GET all products
app.get("/agriProducts", async (req, res) => {
  try {
    const data = await agrismartCollection.find().toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch products" });
  }
});

// Insert new product
app.post("/agriProducts", async (req, res) => {
  try {
    const newProduct = req.body;
    const result = await agrismartCollection.insertOne(newProduct);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: "Failed to insert product" });
  }
});

// Other routes
app.use("/api/auth", authRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Smart Agri API is running");
});

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.log("💡 Please either:");
    console.log(`   1. Stop the process using port ${PORT}`);
    console.log(`   2. Or change PORT in .env file`);
    console.log(`   3. Or run: netstat -ano | findstr :${PORT} to find the process`);
    process.exit(1);
  } else {
    throw err;
  }
});
