const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// GET /api/products → return latest products first
router.get('/', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products', error);
    res.status(500).json({ message: 'পণ্য লোড করা যায়নি।' });
  }
});

// POST /api/products → create a new product entry
router.post('/', async (req, res) => {
  try {
    const { name, image, price, origin, rating, quantity } = req.body;

    if (!name || !price || !origin) {
      return res.status(400).json({ message: 'নাম, মূল্য ও উৎপত্তি প্রয়োজন।' });
    }

    const product = await Product.create({
      name: name.trim(),
      image: image?.trim(),
      price: Number(price),
      origin: origin.trim(),
      rating: Number(rating) || 0,
      quantity: Number(quantity) || 0,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Failed to add product', error);
    res.status(500).json({ message: 'পণ্য যুক্ত করা যায়নি।' });
  }
});

module.exports = router;

