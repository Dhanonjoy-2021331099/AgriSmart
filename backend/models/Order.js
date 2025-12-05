const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String, default: "" },
  lineTotal: { type: Number, default: 0 },
  category: { type: String, default: "Uncategorized" },
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () =>
        `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .slice(2, 6)
          .toUpperCase()}`,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String },
    },
    items: [OrderItemSchema],
    paymentMethod: { type: String, enum: ["cod", "online"], default: "cod" },
    totals: {
      subtotal: { type: Number, default: 0 },
      shipping: { type: Number, default: 0 },
      grandTotal: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    placedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
