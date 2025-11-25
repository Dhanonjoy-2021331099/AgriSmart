const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./controllers/authController");
const sensorRoutes = require("./controllers/sensorController");
const contactRoutes = require("./controllers/contactController");
const productRoutes = require("./controllers/productController");

<<<<<<< HEAD
// MongoDB Connect Function  
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/SmartAgri';
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected to SmartAgri database");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
=======
// Import MongoDB connection (mongoose for Product model)
const connectMongoose = require("./database/connect");
>>>>>>> 3a342950525c6f61523691db7b950d9e97727cfd

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
    console.error("❌ MongoDB Connection Failed:", error);
  }
}

// Connect to MongoDB (mongoose for Product model)
connectMongoose();

// Connect to MongoDB (MongoClient for legacy routes)
connectMongoClient();

// =============== API ROUTES ===============

// GET all products
app.get("/agriProducts", async (req, res) => {
  const data = await agrismartCollection.find().toArray();
  res.send(data);
});

// Insert new product
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

// Test
app.get("/", (req, res) => {
  res.send("Smart Agri API is running");
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
    throw err;
  }
});
