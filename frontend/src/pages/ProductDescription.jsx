import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSettings } from "../Contexts/AppSettingsContext";

// Dedicated page to show the full product description
export default function ProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getText, theme } = useAppSettings();
  const t = (bn, en) => getText(bn, en);
  const isDark = theme === "dark";

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiBase =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api";

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
        console.error("Error fetching product description:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, apiBase]);

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
        }`}
      >
        <div
          className={`w-full max-w-3xl h-64 rounded-3xl animate-pulse ${
            isDark ? "bg-slate-800/70" : "bg-white"
          }`}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
        }`}
      >
        <div
          className={`text-center p-8 rounded-3xl shadow-xl ${
            isDark ? "bg-slate-900/80 text-slate-100" : "bg-white text-gray-800"
          }`}
        >
          <h1 className="text-3xl font-bold mb-4">
            {t("পণ্য পাওয়া যায়নি", "Product not found")}
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
          >
            {t("পণ্যে ফিরে যান", "Back to products")}
          </button>
        </div>
      </div>
    );
  }

  const productId = product._id || product.id || id;
  const imageSrc =
    product.image || "https://via.placeholder.com/600x400?text=No+Image";
  const descriptionText =
    product.descriptionBn || product.description || "No description available.";

  return (
    <div
      className={`min-h-screen py-12 px-4 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb / Back */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <button
            onClick={() => navigate("/products")}
            className={`hover:text-emerald-600 transition ${
              isDark ? "text-slate-400" : "text-gray-600"
            }`}
          >
            {t("পণ্য", "Products")}
          </button>
          <span className={isDark ? "text-slate-600" : "text-gray-400"}>/</span>
          <button
            onClick={() => navigate(`/products/${productId}`)}
            className={`hover:text-emerald-600 transition ${
              isDark ? "text-slate-400" : "text-gray-600"
            }`}
          >
            {t("বিস্তারিত", "Details")}
          </button>
          <span className={isDark ? "text-slate-600" : "text-gray-400"}>/</span>
          <span
            className={`font-semibold ${
              isDark ? "text-emerald-400" : "text-emerald-700"
            }`}
          >
            {t("বিবরণ", "Description")}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl shadow-2xl overflow-hidden ${
            isDark ? "bg-slate-900/80" : "bg-white"
          }`}
        >
          <div className="grid md:grid-cols-2">
            <div className="relative">
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full max-h-[420px] object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/600x400?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="p-8 flex flex-col gap-6">
              <div className="space-y-1">
                <p
                  className={`text-sm uppercase tracking-[0.08em] ${
                    isDark ? "text-emerald-300/80" : "text-emerald-600"
                  }`}
                >
                  {t("পণ্য", "Product")}
                </p>
                <h1
                  className={`text-3xl font-bold leading-tight ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {product.nameBn || product.name}
                </h1>
                {product.nameBn && (
                  <p className={isDark ? "text-slate-300" : "text-gray-600"}>
                    {product.name}
                  </p>
                )}
              </div>

              <div
                className={`p-5 rounded-2xl border ${
                  isDark
                    ? "border-slate-700 bg-slate-800/70 text-slate-100"
                    : "border-gray-200 bg-gray-50 text-gray-800"
                }`}
              >
                <h2 className="text-lg font-semibold mb-3">
                  {t("সম্পূর্ণ বিবরণ", "Full Description")}
                </h2>
                <p className="leading-relaxed text-base whitespace-pre-line">
                  {descriptionText}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(`/products/${productId}`)}
                  className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-md hover:shadow-lg hover:bg-emerald-500 transition"
                >
                  {t("পণ্যে ফিরে যান", "Back to product")}
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className={`px-5 py-3 rounded-xl font-semibold border transition ${
                    isDark
                      ? "border-slate-600 text-slate-100 hover:bg-slate-800"
                      : "border-gray-300 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {t("সব পণ্য", "All products")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
