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
  const isDark = theme === "dark";
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

  // Online payment states
  const [onlinePayment, setOnlinePayment] = useState({
    provider: "", // bkash, nagad, rocket, upay
    transactionId: "",
    senderNumber: "",
  });

  // Payment provider details
  const paymentProviders = {
    bkash: {
      name: "Bkash",
      number: "01712-345678",
      icon: "💳",
      color: "#E2136E",
      instructions: "Send money to the number above and enter Transaction ID",
    },
    nagad: {
      name: "Nagad",
      number: "01812-345678",
      icon: "📱",
      color: "#F06524",
      instructions: "Send money to the number above and enter Transaction ID",
    },
    rocket: {
      name: "Rocket",
      number: "01912-345678",
      icon: "🚀",
      color: "#8B3A9C",
      instructions: "Send money to the number above and enter Transaction ID",
    },
    upay: {
      name: "Upay",
      number: "01612-345678",
      icon: "💰",
      color: "#0066FF",
      instructions: "Send money to the number above and enter Transaction ID",
    },
  };

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

    // Validate online payment details
    if (form.paymentMethod === "online") {
      if (!onlinePayment.provider) {
        setError("অনুগ্রহ করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন।");
        return;
      }
      if (
        !onlinePayment.transactionId ||
        onlinePayment.transactionId.length < 6
      ) {
        setError("অনুগ্রহ করে সঠিক Transaction ID দিন।");
        return;
      }
      if (
        !onlinePayment.senderNumber ||
        onlinePayment.senderNumber.length < 11
      ) {
        setError(
          "অনুগ্রহ করে আপনার মোবাইল নম্বর দিন যেখান থেকে টাকা পাঠিয়েছেন।"
        );
        return;
      }
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
      // Add online payment details if applicable
      ...(form.paymentMethod === "online" && {
        onlinePaymentDetails: {
          provider: onlinePayment.provider,
          providerName: paymentProviders[onlinePayment.provider]?.name,
          providerNumber: paymentProviders[onlinePayment.provider]?.number,
          transactionId: onlinePayment.transactionId,
          senderNumber: onlinePayment.senderNumber,
          paymentStatus: "pending",
          submittedAt: new Date().toISOString(),
        },
      }),
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
    <div
      className={`min-h-screen px-4 sm:px-6 lg:px-8 py-12 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      }`}
    >
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit}
          className={`lg:col-span-2 backdrop-blur-xl shadow-2xl rounded-2xl p-8 space-y-4 border ${
            isDark
              ? "bg-slate-800/80 border-slate-700/50"
              : "bg-white/80 border-white/50"
          }`}
        >
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? "text-slate-100" : "text-gray-800"
            }`}
          >
            চেকআউট
          </h1>
          <p className={`mb-4 ${isDark ? "text-slate-300" : "text-gray-600"}`}>
            আপনার তথ্য দিয়ে অর্ডার সম্পন্ন করুন
          </p>

          {error && (
            <div
              className={`px-4 py-3 rounded-lg ${
                isDark
                  ? "bg-red-900/30 text-red-300 border border-red-700/50"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold ${
                  isDark ? "text-slate-200" : "text-gray-700"
                }`}
              >
                পূর্ণ নাম *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                  isDark
                    ? "bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                    : "border-gray-200 bg-white"
                }`}
                placeholder="আপনার নাম"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold ${
                  isDark ? "text-slate-200" : "text-gray-700"
                }`}
              >
                ফোন নম্বর *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                  isDark
                    ? "bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                    : "border-gray-200 bg-white"
                }`}
                placeholder="01XXXXXXXXX"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className={`text-sm font-semibold ${
                isDark ? "text-slate-200" : "text-gray-700"
              }`}
            >
              ঠিকানা *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                isDark
                  ? "bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                  : "border-gray-200 bg-white"
              }`}
              rows={3}
              placeholder="সম্পূর্ণ ঠিকানা লিখুন"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold ${
                  isDark ? "text-slate-200" : "text-gray-700"
                }`}
              >
                ইমেইল (ঐচ্ছিক)
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                  isDark
                    ? "bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                    : "border-gray-200 bg-white"
                }`}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold ${
                  isDark ? "text-slate-200" : "text-gray-700"
                }`}
              >
                পেমেন্ট পদ্ধতি
              </label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                  isDark
                    ? "bg-slate-700 border-slate-600 text-slate-100"
                    : "border-gray-200 bg-white"
                }`}
              >
                <option value="cod">ক্যাশ অন ডেলিভারি</option>
                <option value="online">অনলাইন পেমেন্ট</option>
              </select>
            </div>
          </div>

          {/* Online Payment Section */}
          {form.paymentMethod === "online" && (
            <div
              className={`mt-6 p-6 rounded-xl border-2 ${
                isDark
                  ? "bg-slate-700/50 border-emerald-500/30"
                  : "bg-emerald-50 border-emerald-200"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-4 ${
                  isDark ? "text-emerald-400" : "text-emerald-700"
                }`}
              >
                🔐 অনলাইন পেমেন্ট পদ্ধতি নির্বাচন করুন
              </h3>

              {/* Payment Provider Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {Object.entries(paymentProviders).map(([key, provider]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setOnlinePayment({ ...onlinePayment, provider: key })
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      onlinePayment.provider === key
                        ? "border-emerald-500 shadow-lg scale-105"
                        : isDark
                        ? "border-slate-600 hover:border-slate-500"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                    style={{
                      backgroundColor:
                        onlinePayment.provider === key
                          ? `${provider.color}15`
                          : isDark
                          ? "#334155"
                          : "white",
                    }}
                  >
                    <div className="text-3xl mb-2">{provider.icon}</div>
                    <div
                      className={`font-bold ${
                        isDark ? "text-slate-200" : "text-gray-700"
                      }`}
                    >
                      {provider.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Provider Details */}
              {onlinePayment.provider && (
                <div
                  className={`p-5 rounded-xl ${
                    isDark ? "bg-slate-800" : "bg-white"
                  } border ${
                    isDark ? "border-slate-600" : "border-emerald-200"
                  } shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">
                      {paymentProviders[onlinePayment.provider].icon}
                    </span>
                    <div>
                      <h4
                        className={`font-bold text-lg ${
                          isDark ? "text-slate-100" : "text-gray-800"
                        }`}
                      >
                        {paymentProviders[onlinePayment.provider].name}
                      </h4>
                      <p
                        className={`text-sm ${
                          isDark ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        {paymentProviders[onlinePayment.provider].instructions}
                      </p>
                    </div>
                  </div>

                  {/* Business Number */}
                  <div
                    className={`p-4 rounded-lg mb-4 ${
                      isDark ? "bg-slate-700" : "bg-emerald-50"
                    }`}
                  >
                    <label
                      className={`text-sm font-semibold block mb-2 ${
                        isDark ? "text-slate-300" : "text-gray-700"
                      }`}
                    >
                      আমাদের {paymentProviders[onlinePayment.provider].name}{" "}
                      নম্বর:
                    </label>
                    <div
                      className={`text-2xl font-bold ${
                        isDark ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    >
                      📞 {paymentProviders[onlinePayment.provider].number}
                    </div>
                    <p
                      className={`text-xs mt-2 ${
                        isDark ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      এই নম্বরে ৳{formatCurrency(totals.grandTotal)} টাকা পাঠান
                    </p>
                  </div>

                  {/* Sender Number Input */}
                  <div className="mb-4">
                    <label
                      className={`text-sm font-semibold block mb-2 ${
                        isDark ? "text-slate-300" : "text-gray-700"
                      }`}
                    >
                      আপনার {paymentProviders[onlinePayment.provider].name}{" "}
                      নম্বর *
                    </label>
                    <input
                      type="tel"
                      value={onlinePayment.senderNumber}
                      onChange={(e) =>
                        setOnlinePayment({
                          ...onlinePayment,
                          senderNumber: e.target.value,
                        })
                      }
                      placeholder="01XXXXXXXXX"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                        isDark
                          ? "bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                          : "border-gray-200 bg-white"
                      }`}
                      required
                    />
                  </div>

                  {/* Transaction ID Input */}
                  <div>
                    <label
                      className={`text-sm font-semibold block mb-2 ${
                        isDark ? "text-slate-300" : "text-gray-700"
                      }`}
                    >
                      Transaction ID (TrxID) *
                    </label>
                    <input
                      type="text"
                      value={onlinePayment.transactionId}
                      onChange={(e) =>
                        setOnlinePayment({
                          ...onlinePayment,
                          transactionId: e.target.value,
                        })
                      }
                      placeholder="Enter your transaction ID"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
                        isDark
                          ? "bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                          : "border-gray-200 bg-white"
                      }`}
                      required
                    />
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      টাকা পাঠানোর পর যে Transaction ID পেয়েছেন তা এখানে লিখুন
                    </p>
                  </div>

                  {/* Payment Status Note */}
                  <div
                    className={`mt-4 p-3 rounded-lg ${
                      isDark
                        ? "bg-yellow-900/20 text-yellow-400"
                        : "bg-yellow-50 text-yellow-800"
                    } text-sm`}
                  >
                    ⚠️ <strong>নোট:</strong> আপনার পেমেন্ট ম্যানুয়ালি যাচাই করা
                    হবে। অর্ডার কনফার্মেশন ২৪ ঘন্টার মধ্যে পাবেন।
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-60"
          >
            {isSubmitting ? "অর্ডার পাঠানো হচ্ছে..." : "অর্ডার সম্পন্ন করুন"}
          </button>
        </form>

        <div
          className={`backdrop-blur-xl shadow-2xl rounded-2xl p-8 h-fit border ${
            isDark
              ? "bg-slate-800/80 border-slate-700/50"
              : "bg-white/80 border-white/50"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              isDark ? "text-slate-100" : "text-gray-800"
            }`}
          >
            অর্ডার সারাংশ
          </h2>
          <div
            className={`space-y-3 ${
              isDark ? "text-slate-200" : "text-gray-700"
            }`}
          >
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="font-semibold">
                  {item.name} × {item.quantity}
                </span>
                <span>৳{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div
              className={`flex justify-between pt-2 border-t ${
                isDark ? "border-slate-600" : "border-gray-100"
              }`}
            >
              <span>সাবটোটাল</span>
              <span>৳{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>শিপিং</span>
              <span>৳{formatCurrency(totals.shipping)}</span>
            </div>
            <div
              className={`flex justify-between font-bold text-lg ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}
            >
              <span>সর্বমোট</span>
              <span>৳{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
