const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    nameBn: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      default: "kg",
      trim: true,
    },
    origin: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    descriptionBn: {
      type: String,
      default: "",
    },
    benefits: {
      type: [String],
      default: [],
    },
    usage: {
      type: String,
      default: "",
    },
    composition: {
      type: String,
      default: "",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
