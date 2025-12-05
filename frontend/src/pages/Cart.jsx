import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { useAppSettings } from "../Contexts/AppSettingsContext";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 0 });

export default function Cart() {
  const { cart, increment, decrement, removeFromCart, totals } = useCart();
  const navigate = useNavigate();
  const { theme } = useAppSettings();
  const isDark = theme === 'dark';

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
          : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'
      }`}>
        <div className={`backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center ${
          isDark ? 'bg-slate-800/80 border border-slate-700/50' : 'bg-white/80'
        }`}>
          <div className="text-6xl mb-4">🛒</div>
          <h1 className={`text-3xl font-bold mb-2 ${
            isDark ? 'text-slate-100' : 'text-gray-800'
          }`}>
            আপনার কার্ট খালি
          </h1>
          <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            পণ্য যোগ করতে প্রোডাক্ট পেজে যান।
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
          >
            পণ্য দেখুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-12 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'
    }`}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className={`backdrop-blur-xl shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row gap-4 border ${
                isDark 
                  ? 'bg-slate-800/80 border-slate-700/50' 
                  : 'bg-white/80 border-white/50'
              }`}
            >
              <div className={`w-full sm:w-32 h-32 rounded-xl overflow-hidden flex items-center justify-center ${
                isDark ? 'bg-slate-700' : 'bg-gray-100'
              }`}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">🌾</span>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`text-xl font-bold ${
                      isDark ? 'text-slate-100' : 'text-gray-800'
                    }`}>
                      {item.name}
                    </h3>
                    <p className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-gray-500'
                    }`}>
                      একক মূল্য: ৳{formatCurrency(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-sm text-red-500 hover:text-red-600 font-semibold"
                  >
                    মুছে ফেলুন
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decrement(item._id)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-bold ${
                      isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-100'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    -
                  </button>
                  <span className={`text-lg font-semibold w-10 text-center ${
                    isDark ? 'text-slate-100' : 'text-gray-800'
                  }`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increment(item._id)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-bold ${
                      isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-100'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    +
                  </button>
                </div>

                <div className={`font-semibold ${
                  isDark ? 'text-slate-200' : 'text-gray-700'
                }`}>
                  মোট: ৳{formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`backdrop-blur-xl shadow-2xl rounded-2xl p-6 h-fit border ${
          isDark 
            ? 'bg-slate-800/80 border-slate-700/50' 
            : 'bg-white/80 border-white/50'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-slate-100' : 'text-gray-800'
          }`}>
            কার্ট সারাংশ
          </h2>
          <div className={`space-y-3 ${
            isDark ? 'text-slate-200' : 'text-gray-700'
          }`}>
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span>৳{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>শিপিং</span>
              <span>৳{formatCurrency(totals.shipping)}</span>
            </div>
            <div className={`flex justify-between font-bold text-lg ${
              isDark ? 'text-slate-100' : 'text-gray-900'
            }`}>
              <span>সর্বমোট</span>
              <span>৳{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition"
          >
            চেকআউট করুন
          </button>
        </div>
      </div>
    </div>
  );
}
