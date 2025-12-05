import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { useAuth } from "../Contexts/AuthProvider";
import { useAppSettings } from "../Contexts/AppSettingsContext";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 0 });

export default function Checkout() {
  const { cart, totals, clearCart } = useCart();
  const { user, token, userId } = useAuth();
  const navigate = useNavigate();
  const { theme } = useAppSettings();
  const isDark = theme === 'dark';
  const apiBase =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    paymentMethod: "cod",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        address: user.shippingAddress || user.address || prev.address,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!cart.length) {
      navigate("/cart");
    }
  }, [cart.length, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone || !form.address) {
      setError("নাম, ফোন ও ঠিকানা অবশ্যই দিতে হবে।");
      return;
    }

    const safeUserId =
      userId && String(userId).length === 24 ? userId : undefined;

    const payload = {
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        email: form.email,
      },
      paymentMethod: form.paymentMethod,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        lineTotal: item.price * item.quantity,
        category: item.category || "General",
      })),
      totals,
      timestamp: new Date().toISOString(),
      ...(safeUserId ? { user: safeUserId } : {}),
    };

    try {
      setIsSubmitting(true);
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${apiBase}/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "অর্ডার করতে ব্যর্থ।");
      }

      const data = await res.json();
      const summary = {
        orderId: data.orderId,
        ...payload,
      };
      localStorage.setItem("lastOrder", JSON.stringify(summary));
      clearCart();
      navigate("/order-success", { state: summary });
    } catch (err) {
      console.error("Order submit error", err);
      setError(err.message || "অর্ডার করতে ব্যর্থ।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-12 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'
    }`}>
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit}
          className={`lg:col-span-2 backdrop-blur-xl shadow-2xl rounded-2xl p-8 space-y-4 border ${
            isDark 
              ? 'bg-slate-800/80 border-slate-700/50' 
              : 'bg-white/80 border-white/50'
          }`}
        >
          <h1 className={`text-3xl font-bold mb-2 ${
            isDark ? 'text-slate-100' : 'text-gray-800'
          }`}>চেকআউট</h1>
          <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            আপনার তথ্য দিয়ে অর্ডার সম্পন্ন করুন
          </p>

          {error && (
            <div className={`px-4 py-3 rounded-lg ${
              isDark 
                ? 'bg-red-900/30 text-red-300 border border-red-700/50' 
                : 'bg-red-50 text-red-700'
            }`}>
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`text-sm font-semibold ${
                isDark ? 'text-slate-200' : 'text-gray-700'
              }`}>
                পূর্ণ নাম *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400'
                    : 'border-gray-200 bg-white'
                }`}
                placeholder="আপনার নাম"
                required
              />
            </div>
            <div className="space-y-2">
              <label className={`text-sm font-semibold ${
                isDark ? 'text-slate-200' : 'text-gray-700'
              }`}>
                ফোন নম্বর *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400'
                    : 'border-gray-200 bg-white'
                }`}
                placeholder="01XXXXXXXXX"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-semibold ${
              isDark ? 'text-slate-200' : 'text-gray-700'
            }`}>
              ঠিকানা *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400'
                  : 'border-gray-200 bg-white'
              }`}
              rows={3}
              placeholder="সম্পূর্ণ ঠিকানা লিখুন"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`text-sm font-semibold ${
                isDark ? 'text-slate-200' : 'text-gray-700'
              }`}>
                ইমেইল (ঐচ্ছিক)
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400'
                    : 'border-gray-200 bg-white'
                }`}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className={`text-sm font-semibold ${
                isDark ? 'text-slate-200' : 'text-gray-700'
              }`}>
                পেমেন্ট পদ্ধতি
              </label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-slate-100'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <option value="cod">ক্যাশ অন ডেলিভারি</option>
                <option value="online">অনলাইন পেমেন্ট</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-60"
          >
            {isSubmitting ? "অর্ডার পাঠানো হচ্ছে..." : "অর্ডার সম্পন্ন করুন"}
          </button>
        </form>

        <div className={`backdrop-blur-xl shadow-2xl rounded-2xl p-8 h-fit border ${
          isDark 
            ? 'bg-slate-800/80 border-slate-700/50' 
            : 'bg-white/80 border-white/50'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-slate-100' : 'text-gray-800'
          }`}>
            অর্ডার সারাংশ
          </h2>
          <div className={`space-y-3 ${
            isDark ? 'text-slate-200' : 'text-gray-700'
          }`}>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="font-semibold">
                  {item.name} × {item.quantity}
                </span>
                <span>৳{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className={`flex justify-between pt-2 border-t ${
              isDark ? 'border-slate-600' : 'border-gray-100'
            }`}>
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
        </div>
      </div>
    </div>
  );
}
