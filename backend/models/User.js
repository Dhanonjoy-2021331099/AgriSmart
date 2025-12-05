const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String },
    role: { type: String, enum: ["farmer", "admin"], default: "farmer" },
    googleId: { type: String, sparse: true },
    googleEmail: { type: String },
    photoURL: { type: String },
    address: { type: String, default: "" },
    shippingAddress: { type: String, default: "" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
