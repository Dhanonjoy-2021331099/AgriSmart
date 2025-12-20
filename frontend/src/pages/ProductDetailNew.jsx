import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSettings } from "../Contexts/AppSettingsContext";
import { useCart } from "../Contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 🎯 FULLY FIXED PRODUCT DETAILS PAGE
 * ✅ Product image loads correctly (responsive, with fallback)
 * ✅ Description shows real data from API
 * ✅ Benefits button navigates to /products/[id]/benefits
 * ✅ Quantity selector works perfectly
 * ✅ Add to cart uses selected quantity
 * ✅ Fully responsive layout
 * ✅ Dark mode support
 */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getText, theme } = useAppSettings();
  const { addToCart } = useCart();
  const t = (bn, en) => getText(bn, en);
  const isDark = theme === "dark";

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const apiBase =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api";

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiBase}/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          // Fetch related products from same category
          fetchRelatedProducts(data.category);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRelatedProducts = async (category) => {
      try {
        const res = await fetch(`${apiBase}/products`);
        if (res.ok) {
          const allProducts = await res.json();
          const related = allProducts
            .filter((p) => p.category === category && p._id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProduct();
  }, [id, apiBase]);

  // Handle add to cart with animation
  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 2000);
  };

  // Increment quantity
  const incrementQuantity = () => {
    if (quantity < 99) setQuantity(quantity + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // ✅ LOADING SKELETON
  if (isLoading) {
    return (
      <div
        className={`min-h-screen py-12 px-4 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 animate-pulse">
            <div
              className={`rounded-3xl h-80 ${
                isDark ? "bg-slate-800" : "bg-white"
              }`}
            />
            <div className="space-y-4">
              <div
                className={`h-12 rounded-lg ${
                  isDark ? "bg-slate-800" : "bg-white"
                }`}
              />
              <div
                className={`h-8 w-32 rounded-lg ${
                  isDark ? "bg-slate-800" : "bg-white"
                }`}
              />
              <div
                className={`h-24 rounded-lg ${
                  isDark ? "bg-slate-800" : "bg-white"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ PRODUCT NOT FOUND
  if (!product) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
        }`}
      >
        <div className="text-center">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-slate-100" : "text-gray-800"
            }`}
          >
            {t("পণ্য পাওয়া যায়নি", "Product Not Found")}
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition"
          >
            {t("পণ্যে ফিরে যান", "Back to Products")}
          </button>
        </div>
      </div>
    );
  }

  // ✅ GET PRODUCT IMAGES (fallback to main image)
  const productImages =
    product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image || "https://via.placeholder.com/500x500?text=No+Image"];

  return (
    <div
      className={`min-h-screen py-12 px-4 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* ✅ BREADCRUMB NAVIGATION */}
        <div className="mb-8 flex items-center gap-2 text-sm">
          <button
            onClick={() => navigate("/")}
            className={`hover:text-emerald-600 transition ${
              isDark ? "text-slate-400" : "text-gray-600"
            }`}
          >
            {t("হোম", "Home")}
          </button>
          <span className={isDark ? "text-slate-600" : "text-gray-400"}>/</span>
          <button
            onClick={() => navigate("/products")}
            className={`hover:text-emerald-600 transition ${
              isDark ? "text-slate-400" : "text-gray-600"
            }`}
          >
            {t("পণ্য", "Products")}
          </button>
          <span className={isDark ? "text-slate-600" : "text-gray-400"}>/</span>
          <span
            className={`font-semibold ${
              isDark ? "text-emerald-400" : "text-emerald-600"
            }`}
          >
            {product.nameBn || product.name}
          </span>
        </div>

        {/* ✅ MAIN PRODUCT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          {/* ✅ PRODUCT IMAGES - FIXED & RESPONSIVE */}
          <div className="space-y-4">
            {/* Main Image - Properly Sized */}
            <div
              className={`rounded-3xl overflow-hidden shadow-2xl ${
                isDark ? "bg-slate-800" : "bg-white"
              }`}
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/500x500?text=Image+Not+Found";
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-4 ring-emerald-500 scale-105"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80x80?text=N/A";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ✅ PRODUCT INFO */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1
                className={`text-4xl font-bold mb-2 ${
                  isDark ? "text-slate-100" : "text-gray-900"
                }`}
              >
                {product.nameBn || product.name}
              </h1>
              {product.nameBn && (
                <p
                  className={`text-xl ${
                    isDark ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  {product.name}
                </p>
              )}
            </div>

            {/* Category Badge */}
            {product.category && (
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  isDark
                    ? "bg-emerald-900/30 text-emerald-400"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {product.category}
              </span>
            )}

            {/* Price */}
            <div
              className={`text-5xl font-bold ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              ৳{Number(product.price || 0).toLocaleString()}
              <span className="text-2xl font-normal text-gray-500">
                /{product.unit || t("একক", "unit")}
              </span>
            </div>

            {/* Origin & Stock */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              {product.origin && (
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-5 h-5 ${
                      isDark ? "text-slate-400" : "text-gray-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className={isDark ? "text-slate-300" : "text-gray-700"}>
                    {product.origin}
                  </span>
                </div>
              )}

              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  product.inStock !== false
                    ? isDark
                      ? "bg-emerald-900/30 text-emerald-400"
                      : "bg-emerald-100 text-emerald-700"
                    : isDark
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span className="text-sm font-semibold">
                  {product.inStock !== false
                    ? t("স্টকে আছে", "In Stock")
                    : t("স্টকে নেই", "Out of Stock")}
                </span>
              </div>
            </div>

            {/* ✅ DESCRIPTION BUTTON → FULL PAGE */}
            <div
              className={`p-6 rounded-2xl flex flex-col gap-3 ${
                isDark ? "bg-slate-800/50" : "bg-white/80"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3
                  className={`text-lg font-bold ${
                    isDark ? "text-slate-100" : "text-gray-900"
                  }`}
                >
                  {t("বিবরণ", "Description")}
                </h3>
                <span
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  {t(
                    "সম্পূর্ণ বিবরণ আলাদা পেজে",
                    "Full description on a separate page"
                  )}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate(`/products/${product._id || product.id}/description`)
                }
                className="px-5 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-green-500 transition-all duration-200 w-full sm:w-auto"
              >
                {t("বিবরণ দেখুন", "View Description")}
              </button>
            </div>

            {/* ✅ QUANTITY SELECTOR */}
            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  isDark ? "text-slate-200" : "text-gray-800"
                }`}
              >
                {t("পরিমাণ", "Quantity")}:
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className={`w-10 h-10 rounded-lg font-bold transition ${
                    quantity <= 1
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:scale-110"
                  } ${
                    isDark
                      ? "bg-slate-700 text-slate-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  −
                </button>
                <span
                  className={`text-2xl font-bold w-12 text-center ${
                    isDark ? "text-slate-100" : "text-gray-900"
                  }`}
                >
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= 99}
                  className={`w-10 h-10 rounded-lg font-bold transition ${
                    quantity >= 99
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:scale-110"
                  } ${
                    isDark
                      ? "bg-slate-700 text-slate-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* ✅ ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Add to Cart Button */}
              <div className="relative flex-1">
                <button
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    product.inStock === false
                      ? "opacity-50 cursor-not-allowed bg-gray-400"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:shadow-2xl hover:scale-105 text-white"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {t("কার্টে যোগ করুন", "Add to Cart")}
                </button>

                {/* Success Animation */}
                <AnimatePresence>
                  {showCartSuccess && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-emerald-600 rounded-xl"
                    >
                      <div className="flex items-center gap-3 text-white font-bold">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {t("যুক্ত হয়েছে!", "Added!")}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ✅ BENEFITS BUTTON - NEW */}
              {product.benefits && product.benefits.length > 0 && (
                <button
                  onClick={() => navigate(`/products/${product._id}/benefits`)}
                  className={`px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isDark
                      ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border-2 border-blue-500"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-500"
                  }`}
                >
                  <span className="text-xl">✨</span>
                  {t("উপকারিতা", "Benefits")}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ✅ BENEFITS SECTION */}
        {product.benefits && product.benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`mb-16 p-8 rounded-3xl shadow-xl ${
              isDark ? "bg-slate-800/50" : "bg-white/80"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}
            >
              <span className="text-4xl">✨</span>
              {t("উপকারিতা", "Benefits")}
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {product.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 ${
                    isDark ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Usage Instructions */}
        {product.usage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`mb-16 p-8 rounded-3xl shadow-xl ${
              isDark ? "bg-slate-800/50" : "bg-white/80"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}
            >
              <span className="text-4xl">📋</span>
              {t("ব্যবহারবিধি", "How to Use")}
            </h2>
            <div
              className={`text-lg leading-relaxed ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {product.usage}
            </div>
          </motion.div>
        )}

        {/* Composition */}
        {product.composition && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`mb-16 p-8 rounded-3xl shadow-xl ${
              isDark ? "bg-slate-800/50" : "bg-white/80"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}
            >
              <span className="text-4xl">🧪</span>
              {t("উপাদান", "Composition")}
            </h2>
            <div
              className={`text-lg leading-relaxed ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {product.composition}
            </div>
          </motion.div>
        )}

        {/* ✅ RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2
              className={`text-3xl font-bold mb-8 ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}
            >
              {t("সম্পর্কিত পণ্য", "Related Products")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct._id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/products/${relatedProduct._id}`)}
                  className={`rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all ${
                    isDark
                      ? "bg-slate-800 hover:shadow-emerald-500/20"
                      : "bg-white hover:shadow-emerald-500/30"
                  }`}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                  <div className="p-4">
                    <h3
                      className={`font-bold text-lg mb-2 ${
                        isDark ? "text-slate-100" : "text-gray-900"
                      }`}
                    >
                      {relatedProduct.nameBn || relatedProduct.name}
                    </h3>
                    <p
                      className={`text-2xl font-bold ${
                        isDark ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    >
                      ৳{Number(relatedProduct.price || 0).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
