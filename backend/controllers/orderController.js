const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

const router = express.Router();

const toObjectId = (id) =>
  mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null;

const decodeTokenIfPresent = (req) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key-change-in-production"
    );
    return decoded?.user?.id || null;
  } catch (err) {
    return null;
  }
};

// Create order (guest allowed, user captured if token present)
router.post("/", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    if (mongoose.connection.readyState !== 1) {
      return res
        .status(503)
        .json({ message: "Database not ready. Please wait..." });
    }

    const {
      customer,
      items,
      paymentMethod = "cod",
      totals,
      timestamp,
      status = "pending",
    } = req.body || {};

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return res.status(400).json({ message: "নাম, ফোন ও ঠিকানা প্রয়োজন।" });
    }

    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: "কার্ট খালি।" });
    }

    const computedSubtotal = items.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    );
    const shipping = totals?.shipping ?? (items.length ? 80 : 0);
    const grandTotal = computedSubtotal + shipping;

    const userIdFromToken = decodeTokenIfPresent(req) || req.body.user;
    const userObjectId =
      userIdFromToken && mongoose.Types.ObjectId.isValid(userIdFromToken)
        ? new mongoose.Types.ObjectId(userIdFromToken)
        : undefined;

    const orderId =
      req.body.orderId ||
      `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`;

    const order = await Order.create({
      orderId,
      ...(userObjectId ? { user: userObjectId } : {}),
      customer,
      items: items.map((item) => ({
        ...item,
        lineTotal:
          item.lineTotal ||
          (Number(item.price) || 0) * (Number(item.quantity) || 0),
        category: item.category || "Uncategorized",
      })),
      paymentMethod,
      status,
      totals: {
        subtotal: computedSubtotal,
        shipping,
        grandTotal,
      },
      placedAt: timestamp ? new Date(timestamp) : new Date(),
    });

    return res
      .status(201)
      .json({ orderId: order.orderId, totals: order.totals });
  } catch (error) {
    console.error("Order save error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        message: "অর্ডার সংরক্ষণ করা যায়নি।",
        detail: error?.message,
      });
    }
  }
});

// Get orders for a user with filters + pagination
router.get("/user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user?.id !== id && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const userObjectId = toObjectId(id);
    if (!userObjectId) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const {
      page = 1,
      limit = 10,
      status,
      search,
      startDate,
      endDate,
    } = req.query;

    const query = { user: userObjectId };

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (search) {
      query.$expr = {
        $regexMatch: {
          input: { $toString: "$_id" },
          regex: search,
          options: "i",
        },
      };
    }

    const pageNumber = Number(page) || 1;
    const limitNumber = Math.min(Number(limit) || 10, 50);

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    return res.json({
      data: orders,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pages: Math.ceil(total / limitNumber) || 1,
      },
    });
  } catch (error) {
    console.error("Fetch user orders error:", error.message);
    res.status(500).json({ message: "Could not load orders" });
  }
});

// Get aggregated statistics for a user
router.get("/stats/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user?.id !== id && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const userObjectId = toObjectId(id);
    if (!userObjectId) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const matchStage = { user: userObjectId };

    const [summary] = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$totals.grandTotal" },
          totalProducts: {
            $sum: {
              $reduce: {
                input: "$items",
                initialValue: 0,
                in: { $add: ["$$value", { $ifNull: ["$$this.quantity", 0] }] },
              },
            },
          },
        },
      },
    ]);

    const [topProduct] = await Order.aggregate([
      { $match: matchStage },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          name: { $first: "$items.name" },
          totalQty: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQty: -1 } },
      { $limit: 1 },
    ]);

    const monthlyOrders = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSpent: { $sum: "$totals.grandTotal" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, month: "$_id", totalSpent: 1, orders: 1 } },
    ]);

    const categoryDistribution = await Order.aggregate([
      { $match: matchStage },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.category",
          total: { $sum: "$items.quantity" },
        },
      },
      { $project: { _id: 0, category: "$_id", total: 1 } },
      { $sort: { total: -1 } },
    ]);

    const productBreakdown = await Order.aggregate([
      { $match: matchStage },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $project: { _id: 0, name: "$_id", totalQuantity: 1 } },
    ]);

    const recentOrders = await Order.find(matchStage)
      .sort({ createdAt: -1 })
      .limit(5)
      .select("_id totals status createdAt")
      .lean();

    return res.json({
      totalOrders: summary?.totalOrders || 0,
      totalProducts: summary?.totalProducts || 0,
      totalSpent: summary?.totalSpent || 0,
      mostFrequentProduct: topProduct
        ? { name: topProduct.name, count: topProduct.totalQty }
        : null,
      monthlyOrders,
      categoryDistribution,
      productBreakdown,
      recentOrders,
    });
  } catch (error) {
    console.error("Order stats error:", error.message);
    res.status(500).json({ message: "Could not load stats" });
  }
});

module.exports = router;
