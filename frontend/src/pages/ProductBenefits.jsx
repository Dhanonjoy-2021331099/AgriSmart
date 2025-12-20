import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSettings } from "../Contexts/AppSettingsContext";
import { motion } from "framer-motion";

/**
 * 🎯 PRODUCT BENEFITS PAGE
 * ✅ Shows full benefits list for a specific product
 * ✅ Dynamic route: /products/[id]/benefits
 * ✅ Back button to product details
 * ✅ Responsive design with dark mode
 * ✅ Beautiful animations
 */
export default function ProductBenefits() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getText, theme } = useAppSettings();
  const t = (bn, en) => getText(bn, en);
  const isDark = theme === "dark";

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiBase =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api";

  // ✅ FETCH PRODUCT DATA
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiBase}/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
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

    fetchProduct();
  }, [id, apiBase]);

  // ✅ LOADING STATE
  if (isLoading) {
    return (
      <div
        className={`min-h-screen py-12 px-4 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div
              className={`h-10 w-40 rounded-lg ${
                isDark ? "bg-slate-800" : "bg-white"
              }`}
            />
            <div
              className={`h-64 rounded-2xl ${
                isDark ? "bg-slate-800" : "bg-white"
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  // ✅ PRODUCT NOT FOUND
  if (!product || !product.benefits || product.benefits.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
        }`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-slate-100" : "text-gray-800"
            }`}
          >
            {t("পণ্য পাওয়া যায়নি", "Product Not Found")}
          </h2>
          <p
            className={`mb-6 text-lg ${
              isDark ? "text-slate-400" : "text-gray-600"
            }`}
          >
            {t(
              "এই পণ্যের কোনো উপকারিতা তথ্য নেই",
              "This product has no benefits information"
            )}
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition"
          >
            {t("পণ্যে ফিরে যান", "Back to Products")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* ✅ BACK BUTTON */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/products/${product._id}`)}
          className={`mb-8 flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isDark
              ? "text-slate-300 hover:bg-slate-800"
              : "text-gray-600 hover:bg-white"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("পণ্যে ফিরে যান", "Back to Product")}
        </motion.button>

        {/* ✅ HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Product Image */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Product Image */}
            <div className="md:w-1/3">
              <div
                className={`rounded-2xl overflow-hidden shadow-2xl ${
                  isDark ? "bg-slate-800" : "bg-white"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400?text=No+Image";
                  }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-2/3 flex flex-col justify-center">
              <h1
                className={`text-4xl font-bold mb-3 ${
                  isDark ? "text-slate-100" : "text-gray-900"
                }`}
              >
                {product.nameBn || product.name}
              </h1>
              {product.nameBn && (
                <p
                  className={`text-xl mb-6 ${
                    isDark ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  {product.name}
                </p>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                {product.category && (
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      isDark
                        ? "bg-emerald-900/30 text-emerald-400"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {product.category}
                  </span>
                )}
                {product.origin && (
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
                      isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {product.origin}
                  </span>
                )}
              </div>

              <div
                className={`text-4xl font-bold ${
                  isDark ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
                ৳{Number(product.price || 0).toLocaleString()}
                <span className="text-xl font-normal text-gray-500">
                  /{product.unit || t("একক", "unit")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ✅ BENEFITS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-8 md:p-12 rounded-3xl shadow-xl mb-12 ${
            isDark ? "bg-slate-800/50" : "bg-white/80"
          }`}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-12 flex items-center gap-4 ${
              isDark ? "text-slate-100" : "text-gray-900"
            }`}
          >
            <span className="text-5xl md:text-6xl">✨</span>
            {t("উপকারিতা", "Benefits")}
          </h2>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {product.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl flex items-start gap-4 ${
                  isDark ? "bg-slate-700/50" : "bg-emerald-50/50"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold ${
                    isDark
                      ? "bg-emerald-900/30 text-emerald-400"
                      : "bg-emerald-200 text-emerald-700"
                  }`}
                >
                  {index + 1}
                </div>
                <div>
                  <svg
                    className="w-6 h-6 text-emerald-500 mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p
                    className={`text-lg font-semibold leading-relaxed ${
                      isDark ? "text-slate-200" : "text-gray-800"
                    }`}
                  >
                    {benefit}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits Count */}
          <div
            className={`mt-12 pt-8 border-t text-center ${
              isDark ? "border-slate-700" : "border-emerald-200"
            }`}
          >
            <p
              className={`text-lg font-semibold ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {t(
                `মোট ${product.benefits.length}টি উপকারিতা রয়েছে`,
                `Total ${product.benefits.length} benefits`
              )}
            </p>
          </div>
        </motion.div>

        {/* ✅ USAGE INSTRUCTIONS - If available */}
        {product.usage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-8 rounded-3xl shadow-xl mb-12 ${
              isDark ? "bg-slate-800/50" : "bg-white/80"
            }`}
          >
            <h3
              className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}
            >
              <span className="text-4xl">📋</span>
              {t("ব্যবহারবিধি", "How to Use")}
            </h3>
            <div
              className={`text-lg leading-relaxed ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {product.usage}
            </div>
          </motion.div>
        )}

        {/* ✅ COMPOSITION - If available */}
        {product.composition && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-8 rounded-3xl shadow-xl mb-12 ${
              isDark ? "bg-slate-800/50" : "bg-white/80"
            }`}
          >
            <h3
              className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}
            >
              <span className="text-4xl">🧪</span>
              {t("উপাদান", "Composition")}
            </h3>
            <div
              className={`text-lg leading-relaxed ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {product.composition}
            </div>
          </motion.div>
        )}

        {/* ✅ ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
              isDark
                ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {t("পণ্য বিস্তারিত দেখুন", "View Product Details")}
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex-1 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg transition-all"
          >
            {t("সব পণ্য দেখুন", "View All Products")}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
