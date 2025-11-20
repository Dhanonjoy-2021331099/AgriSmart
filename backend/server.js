const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./controllers/authController");
const sensorRoutes = require("./controllers/sensorController");
const contactRoutes = require("./controllers/contactController");
const productRoutes = require("./controllers/productController");

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

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Smart Agri API is running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
