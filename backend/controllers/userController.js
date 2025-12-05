const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user?.id !== id && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const user = await User.findById(id).select("-password").lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    console.error("Get user error:", error.message);
    res.status(500).json({ message: "Could not load user" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user?.id !== id && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const allowedFields = [
      "name",
      "phone",
      "address",
      "shippingAddress",
      "photoURL",
      "bio",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      select: "-password",
    }).lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    console.error("Update user error:", error.message);
    res.status(500).json({ message: "Could not update user" });
  }
});

module.exports = router;
