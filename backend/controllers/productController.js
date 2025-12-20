const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/Product");

// GET /api/products → return latest products first
router.get("/", async (_req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.error(
        "❌ Mongoose not connected. ReadyState:",
        mongoose.connection.readyState
      );
      return res
        .status(503)
        .json({ message: "Database connection not ready. Please wait..." });
    }

    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error.message);
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ message: "পণ্য লোড করা যায়নি।" });
    }
  }
});

// GET /api/products/:id → return single product by ID
router.get("/:id", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.error(
        "❌ Mongoose not connected. ReadyState:",
        mongoose.connection.readyState
      );
      return res
        .status(503)
        .json({ message: "Database connection not ready. Please wait..." });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("❌ Failed to fetch product:", error.message);
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ message: "পণ্য লোড করা যায়নি।" });
    }
  }
});

// POST /api/products → create a new product entry
router.post("/", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.error(
        "❌ Mongoose not connected. ReadyState:",
        mongoose.connection.readyState
      );
      return res
        .status(503)
        .json({ message: "Database connection not ready. Please wait..." });
    }

    const { name, image, price, origin, rating, quantity } = req.body;

    console.log("📦 Received product data:", {
      name,
      image,
      price,
      origin,
      rating,
      quantity,
    });

    if (!name || !price || !origin) {
      return res
        .status(400)
        .json({ message: "নাম, মূল্য ও উৎপত্তি প্রয়োজন।" });
    }

    const product = await Product.create({
      name: name.trim(),
      image: image?.trim() || "",
      price: Number(price),
      origin: origin.trim(),
      rating: Number(rating) || 0,
      quantity: Number(quantity) || 0,
    });

    console.log("✅ Product created successfully:", product._id);
    res.status(201).json(product);
  } catch (error) {
    console.error("❌ Failed to add product:", error.message);
    console.error("Full error:", error);
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({
        message: "পণ্য যুক্ত করা যায়নি।",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
});

module.exports = router;
