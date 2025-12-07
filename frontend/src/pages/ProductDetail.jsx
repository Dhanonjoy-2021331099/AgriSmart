import { useParams, useNavigate } from "react-router-dom";
import { useAppSettings } from "../Contexts/AppSettingsContext";
import { useCart } from "../Contexts/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getText, theme } = useAppSettings();
  const { addToCart } = useCart();
  const t = (bn, en) => getText(bn, en);
  const [quantity, setQuantity] = useState(1);

  const isDark = theme === "dark";
  const bgColor = isDark ? "#0f172a" : "#ffffff";
  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const textSecondary = isDark ? "#cbd5e1" : "#475569";
  const cardBg = isDark ? "#1e293b" : "#ffffff";

  // Featured products data (should match Home.jsx)
  const allProducts = [
    {
      _id: "featured-1",
      name: "Organic Tomatoes",
      nameBn: "জৈব টমেটো",
      price: 120,
      unit: "kg",
      description:
        "Fresh organic tomatoes grown without synthetic pesticides or fertilizers. Perfect for salads, cooking, and sauces. Rich in vitamins and antioxidants.",
      descriptionBn:
        "তাজা জৈব টমেটো যা সিন্থেটিক কীটনাশক বা সার ছাড়াই চাষ করা হয়। সালাদ, রান্না এবং সস তৈরির জন্য উপযুক্ত। ভিটামিন এবং অ্যান্টিঅক্সিডেন্টে সমৃদ্ধ।",
      image:
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1200&q=80",
      category: "Vegetables",
      origin: "Local Farm",
      inStock: true,
    },
    {
      _id: "featured-2",
      name: "Green Beans",
      nameBn: "সবুজ মটরশুটি",
      price: 90,
      unit: "kg",
      description:
        "Crisp and tender green beans, freshly harvested from our farm. Packed with fiber, vitamins, and minerals. Great for stir-fries and side dishes.",
      descriptionBn:
        "আমাদের খামার থেকে সদ্য সংগৃহীত খাস্তা এবং কোমল সবুজ মটরশুটি। ফাইবার, ভিটামিন এবং খনিজ পদার্থে পূর্ণ। ভাজা এবং সাইড ডিশের জন্য দুর্দান্ত।",
      image:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1200&q=80",
      category: "Vegetables",
      origin: "Local Farm",
      inStock: true,
    },
    {
      _id: "featured-3",
      name: "Fresh Lettuce",
      nameBn: "তাজা লেটুস",
      price: 60,
      unit: "pcs",
      description:
        "Crisp, fresh lettuce perfect for salads and sandwiches. Hydroponically grown for maximum freshness and nutrition. Low in calories, high in nutrients.",
      descriptionBn:
        "সালাদ এবং স্যান্ডউইচের জন্য উপযুক্ত খাস্তা, তাজা লেটুস। সর্বাধিক সতেজতা এবং পুষ্টির জন্য হাইড্রোপনিকভাবে চাষ করা। ক্যালোরিতে কম, পুষ্টিতে উচ্চ।",
      image:
        "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?auto=format&fit=crop&w=1200&q=80",
      category: "Vegetables",
      origin: "Local Farm",
      inStock: true,
    },
    {
      _id: "featured-4",
      name: "Organic Eggs",
      nameBn: "জৈব ডিম",
      price: 180,
      unit: "doz",
      description:
        "Farm-fresh organic eggs from free-range chickens. Rich in protein and omega-3 fatty acids. No antibiotics or hormones. Perfect for breakfast and baking.",
      descriptionBn:
        "মুক্ত-পরিসরের মুরগি থেকে খামার-তাজা জৈব ডিম। প্রোটিন এবং ওমেগা-৩ ফ্যাটি অ্যাসিডে সমৃদ্ধ। কোনো অ্যান্টিবায়োটিক বা হরমোন নেই। প্রাতঃরাশ এবং বেকিংয়ের জন্য উপযুক্ত।",
      image:
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=1200&q=80",
      category: "Dairy & Eggs",
      origin: "Local Farm",
      inStock: true,
    },
  ];

  const product = allProducts.find((p) => p._id === id);

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: bgColor,
          color: textColor,
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
          {t("পণ্য পাওয়া যায়নি", "Product Not Found")}
        </h2>
        <button
          onClick={() => navigate("/products")}
          style={{
            padding: "12px 24px",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {t("পণ্যে ফিরে যান", "Back to Products")}
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(
      t(
        `${quantity} ${product.nameBn || product.name} কার্টে যুক্ত হয়েছে`,
        `${quantity} ${product.name} added to cart`
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        background: bgColor,
        color: textColor,
        padding: "80px 20px 60px",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          variants={itemVariants}
          style={{
            background: "none",
            border: `2px solid ${isDark ? "#4ade80" : "#22c55e"}`,
            color: isDark ? "#4ade80" : "#22c55e",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "32px",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s",
          }}
          whileHover={{ scale: 1.05 }}
        >
          ← {t("পিছনে ফিরুন", "Go Back")}
        </motion.button>

        {/* Product Content */}
        <motion.div
          variants={containerVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Product Image */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: isDark
                  ? "0 10px 40px rgba(0,0,0,0.3)"
                  : "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x600/22c55e/ffffff?text=Product+Image";
                }}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "500px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants}>
            {/* Category Badge */}
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                background: isDark
                  ? "rgba(34, 197, 94, 0.2)"
                  : "rgba(34, 197, 94, 0.1)",
                color: isDark ? "#4ade80" : "#15803d",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              {product.category}
            </div>

            {/* Product Name */}
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "700",
                marginBottom: "12px",
                lineHeight: "1.2",
              }}
            >
              {t(product.nameBn, product.name)}
            </h1>

            {/* Stock Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: product.inStock ? "#22c55e" : "#ef4444",
                }}
              />
              <span style={{ fontSize: "14px", color: textSecondary }}>
                {product.inStock
                  ? t("স্টকে আছে", "In Stock")
                  : t("স্টকে নেই", "Out of Stock")}
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                padding: "20px",
                background: isDark ? "#1e293b" : "#f8fafc",
                borderRadius: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#22c55e",
                  marginBottom: "4px",
                }}
              >
                ৳{product.price}
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: textSecondary,
                    marginLeft: "8px",
                  }}
                >
                  / {product.unit}
                </span>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: textSecondary,
                  margin: 0,
                }}
              >
                {t("ডেলিভারি চার্জ আলাদা", "Delivery charges apply")}
              </p>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                {t("বিবরণ", "Description")}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: textSecondary,
                }}
              >
                {t(product.descriptionBn, product.description)}
              </p>
            </div>

            {/* Product Details */}
            <div
              style={{
                marginBottom: "32px",
                padding: "20px",
                background: isDark ? "#1e293b" : "#f8fafc",
                borderRadius: "12px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                {t("পণ্যের বিস্তারিত", "Product Details")}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: textSecondary }}>
                    {t("উৎস", "Origin")}:
                  </span>
                  <span style={{ fontWeight: "600" }}>{product.origin}</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: textSecondary }}>
                    {t("বিভাগ", "Category")}:
                  </span>
                  <span style={{ fontWeight: "600" }}>{product.category}</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                {t("পরিমাণ", "Quantity")}:
              </label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: `2px solid ${isDark ? "#475569" : "#d1d5db"}`,
                    background: cardBg,
                    color: textColor,
                    fontSize: "20px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#22c55e";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = isDark ? "#475569" : "#d1d5db";
                  }}
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                  style={{
                    width: "80px",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "600",
                    border: `2px solid ${isDark ? "#475569" : "#d1d5db"}`,
                    borderRadius: "8px",
                    background: cardBg,
                    color: textColor,
                  }}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: `2px solid ${isDark ? "#475569" : "#d1d5db"}`,
                    background: cardBg,
                    color: textColor,
                    fontSize: "20px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#22c55e";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = isDark ? "#475569" : "#d1d5db";
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{
                  flex: "1",
                  minWidth: "200px",
                  padding: "16px 32px",
                  background: product.inStock ? "#22c55e" : "#94a3b8",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: product.inStock ? "pointer" : "not-allowed",
                  transition: "all 0.3s",
                  boxShadow: product.inStock
                    ? "0 4px 12px rgba(34, 197, 94, 0.3)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (product.inStock) {
                    e.target.style.background = "#16a34a";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 20px rgba(34, 197, 94, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.inStock) {
                    e.target.style.background = "#22c55e";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(34, 197, 94, 0.3)";
                  }
                }}
              >
                🛒 {t("কার্টে যোগ করুন", "Add to Cart")}
              </button>

              <button
                onClick={() => navigate("/cart")}
                style={{
                  padding: "16px 32px",
                  background: "transparent",
                  color: textColor,
                  border: `2px solid ${isDark ? "#475569" : "#d1d5db"}`,
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#22c55e";
                  e.target.style.color = "#22c55e";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = isDark ? "#475569" : "#d1d5db";
                  e.target.style.color = textColor;
                }}
              >
                {t("কার্ট দেখুন", "View Cart")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
