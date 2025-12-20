import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../Contexts/AppSettingsContext";

/**
 * Professional Search Bar Component with Auto-Suggestions
 * Features:
 * - Live filtering as user types
 * - Auto-suggestion dropdown with matching products
 * - Beautiful gradient design (agriculture theme)
 * - Smooth animations and hover effects
 * - Click outside to close dropdown
 * - Mobile responsive
 * - Dark/Light theme support
 */
export default function SearchBar({ products, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { theme, getText } = useAppSettings();
  const isDark = theme === "dark";
  const t = (bn, en) => getText(bn, en);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
      onFilterChange(products); // Show all products
    } else {
      // Filter products based on search query
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      onFilterChange(filtered); // Update parent with filtered products
    }
  };

  // Handle suggestion click - Navigate to product details
  const handleSuggestionClick = (product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
    // Navigate to product detail page
    navigate(`/products/${product._id}`);
  };

  // Clear search
  const handleClear = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    onFilterChange(products); // Reset to all products
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when ESC key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto mb-12">
      {/* Search Input Container */}
      <div className="relative group">
        {/* Gradient Background Effect */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300 ${
            isDark ? "opacity-40 group-hover:opacity-60" : ""
          }`}
        />

        {/* Main Search Input */}
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className={`w-5 h-5 transition-colors ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            placeholder={t("পণ্য খুঁজুন...", "Search products...")}
            className={`w-full pl-14 pr-24 py-4 rounded-full text-base font-medium shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
              isDark
                ? "bg-slate-800/90 backdrop-blur-xl text-slate-100 placeholder-slate-400 focus:ring-emerald-500/30 border border-slate-700 hover:border-emerald-500/50"
                : "bg-white/90 backdrop-blur-xl text-gray-800 placeholder-gray-400 focus:ring-emerald-500/30 border border-gray-200 hover:border-emerald-400"
            }`}
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={handleClear}
              className={`absolute right-16 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-all hover:scale-110 ${
                isDark
                  ? "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Search Button */}
          <button
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md ${
              isDark
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            }`}
          >
            {t("খুঁজুন", "Search")}
          </button>
        </div>
      </div>

      {/* Auto-Suggestion Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          className={`absolute w-full mt-3 rounded-2xl shadow-2xl overflow-hidden z-50 border backdrop-blur-xl animate-fadeIn ${
            isDark
              ? "bg-slate-800/95 border-slate-700"
              : "bg-white/95 border-gray-200"
          }`}
        >
          {/* Dropdown Header */}
          <div
            className={`px-5 py-3 font-semibold text-sm border-b ${
              isDark
                ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-slate-700 text-emerald-400"
                : "bg-gradient-to-r from-emerald-50 to-teal-50 border-gray-200 text-emerald-700"
            }`}
          >
            {t(
              `${filteredSuggestions.length}টি পণ্য পাওয়া গেছে`,
              `${filteredSuggestions.length} products found`
            )}
          </div>

          {/* Suggestions List */}
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {filteredSuggestions.map((product) => (
              <button
                key={product._id}
                onClick={() => handleSuggestionClick(product)}
                className={`w-full px-5 py-4 flex items-center gap-4 transition-all duration-200 border-b last:border-b-0 ${
                  isDark
                    ? "hover:bg-gradient-to-r hover:from-emerald-900/30 hover:to-teal-900/30 border-slate-700/50 text-slate-200"
                    : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 border-gray-100 text-gray-800"
                }`}
              >
                {/* Product Image */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 shadow-md">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-grow text-left">
                  <p className="font-semibold text-base leading-tight">
                    {product.name}
                  </p>
                  {product.category && (
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      {product.category}
                    </p>
                  )}
                </div>

                {/* Product Price */}
                <div className="flex-shrink-0">
                  <span
                    className={`font-bold text-lg ${
                      isDark ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    ৳{Number(product.price || 0).toLocaleString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {showSuggestions && searchQuery && filteredSuggestions.length === 0 && (
        <div
          className={`absolute w-full mt-3 rounded-2xl shadow-2xl p-8 text-center border backdrop-blur-xl animate-fadeIn ${
            isDark
              ? "bg-slate-800/95 border-slate-700"
              : "bg-white/95 border-gray-200"
          }`}
        >
          <svg
            className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? "text-slate-600" : "text-gray-300"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p
            className={`text-lg font-semibold mb-2 ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}
          >
            {t("কোনো পণ্য পাওয়া যায়নি", "No products found")}
          </p>
          <p className={isDark ? "text-slate-400" : "text-gray-500"}>
            {t(
              "অন্য কিছু খুঁজে দেখুন",
              "Try searching with different keywords"
            )}
          </p>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDark ? "#1e293b" : "#f1f5f9"};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? "#10b981" : "#14b8a6"};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "#059669" : "#0d9488"};
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
