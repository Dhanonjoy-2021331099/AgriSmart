import { useLocation, useNavigate } from "react-router-dom";
import { useAppSettings } from "../Contexts/AppSettingsContext";

/**
 * Product Not Found Page
 * Shows when search doesn't find a matching product
 */
export default function ProductNotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, getText } = useAppSettings();
  const isDark = theme === "dark";
  const t = (bn, en) => getText(bn, en);

  const searchQuery = location.state?.searchQuery || "";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      }`}
    >
      <div className="text-center max-w-2xl">
        {/* Large Icon */}
        <div className="mb-8">
          <svg
            className={`w-24 h-24 mx-auto ${
              isDark ? "text-slate-700" : "text-gray-300"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-5xl font-bold mb-4 ${
            isDark ? "text-slate-100" : "text-gray-900"
          }`}
        >
          {t("পণ্য পাওয়া যায়নি", "Product Not Found")}
        </h1>

        {/* Subheading with search query */}
        <p
          className={`text-xl mb-8 ${
            isDark ? "text-slate-300" : "text-gray-700"
          }`}
        >
          {searchQuery
            ? t(
                `"${searchQuery}" নামের কোনো পণ্য আমাদের কাছে নেই।`,
                `We couldn't find any product matching "${searchQuery}".`
              )
            : t(
                "আপনি খুঁজছেন এমন পণ্য আমাদের কাছে উপলব্ধ নয়।",
                "The product you're looking for is not available."
              )}
        </p>

        {/* Description */}
        <p
          className={`text-lg mb-12 ${
            isDark ? "text-slate-400" : "text-gray-600"
          }`}
        >
          {t(
            "আমাদের সম্পূর্ণ পণ্য তালিকা দেখুন অথবা অন্য কিছু খোঁজার চেষ্টা করুন।",
            "Browse our complete product catalog or try searching with different keywords."
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Back to Products Button */}
          <button
            onClick={() => navigate("/products")}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
            }`}
          >
            {t("সব পণ্য দেখুন", "View All Products")}
          </button>

          {/* Go Home Button */}
          <button
            onClick={() => navigate("/")}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? "bg-slate-700 hover:bg-slate-600 text-slate-100"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}
          >
            {t("বাড়িতে যান", "Go Home")}
          </button>
        </div>

        {/* Suggestions */}
        <div
          className={`mt-16 p-8 rounded-2xl ${
            isDark ? "bg-slate-800/50" : "bg-white/50"
          }`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${
              isDark ? "text-slate-100" : "text-gray-900"
            }`}
          >
            {t("অনুসন্ধান টিপস:", "Search Tips:")}
          </h3>
          <ul
            className={`text-left space-y-2 ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}
          >
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-1">•</span>
              <span>
                {t(
                  "পণ্যের সম্পূর্ণ নাম ব্যবহার করুন",
                  "Try using the full product name"
                )}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-1">•</span>
              <span>
                {t(
                  "বড় বা ছোট অক্ষর গুরুত্বহীন",
                  "Capitalization doesn't matter"
                )}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-1">•</span>
              <span>
                {t(
                  "পণ্যের শ্রেণীর নাম দিয়ে খুঁজুন",
                  "Try searching by product category"
                )}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-1">•</span>
              <span>
                {t(
                  "প্রথম কয়েকটি অক্ষর দিয়ে খুঁজুন",
                  "Search using the first few letters"
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
