import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSettings } from "../Contexts/AppSettingsContext";
import PaymentReceipt from "../components/PaymentReceipt";
import { generateCODOrderPDF } from "../components/CODOrderPDF";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 0 });

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useAppSettings();
  const isDark = theme === "dark";
  const [order, setOrder] = useState(() => location.state || null);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    if (!order) {
      const saved = localStorage.getItem("lastOrder");
      if (saved) {
        try {
          setOrder(JSON.parse(saved));
        } catch (error) {
          console.error("Failed to parse lastOrder", error);
        }
      }
    }
  }, [order]);

  useEffect(() => {
    if (!order) {
      const timer = setTimeout(() => navigate("/products"), 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [order, navigate]);

  if (!order) return null;

  // Show detailed receipt for online payments
  if (order.paymentMethod === "online" && showReceipt) {
    return (
      <div
        className={`min-h-screen py-12 px-4 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
        }`}
      >
        <div className="max-w-5xl mx-auto mb-6">
          <button
            onClick={() => setShowReceipt(false)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isDark
                ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } shadow-md`}
          >
            ← Back to Summary
          </button>
        </div>
        <PaymentReceipt order={order} isDark={isDark} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center px-4 py-12 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto backdrop-blur-xl shadow-2xl rounded-3xl p-10 border w-full ${
          isDark
            ? "bg-slate-800/80 border-slate-700/50"
            : "bg-white/80 border-white/50"
        }`}
      >
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {order.paymentMethod === "online" ? "💳" : "✅"}
          </div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? "text-slate-100" : "text-gray-800"
            }`}
          >
            {order.paymentMethod === "online"
              ? "পেমেন্ট সফল হয়েছে! 🎉"
              : "ধন্যবাদ! আপনার অর্ডার সম্পন্ন হয়েছে"}
          </h1>
          <p className={isDark ? "text-slate-300" : "text-gray-600"}>
            অর্ডার আইডি:{" "}
            <span
              className={`font-semibold ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              {order.orderId}
            </span>
          </p>
          {order.paymentMethod === "online" && order.onlinePaymentDetails && (
            <div
              className={`mt-4 p-4 rounded-xl inline-block ${
                isDark
                  ? "bg-yellow-900/30 text-yellow-400"
                  : "bg-yellow-50 text-yellow-800"
              }`}
            >
              <p className="text-sm">
                ⏳ <strong>পেমেন্ট যাচাই চলছে</strong>
              </p>
              <p className="text-xs mt-1">
                আপনার পেমেন্ট ২৪ ঘন্টার মধ্যে যাচাই করা হবে
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className={`rounded-2xl p-6 border ${
              isDark
                ? "bg-emerald-900/20 border-emerald-700"
                : "bg-emerald-50 border-emerald-100"
            }`}
          >
            <h2
              className={`text-xl font-bold mb-3 ${
                isDark ? "text-slate-100" : "text-gray-800"
              }`}
            >
              গ্রাহক তথ্য
            </h2>
            <div className={isDark ? "text-slate-300" : "text-gray-700"}>
              <p>নাম: {order.customer?.name}</p>
              <p>ফোন: {order.customer?.phone}</p>
              {order.customer?.email && <p>ইমেইল: {order.customer.email}</p>}
              <p>ঠিকানা: {order.customer?.address}</p>
              <p className="mt-2 font-semibold">
                পেমেন্ট:{" "}
                {order.paymentMethod === "online"
                  ? "অনলাইন পেমেন্ট"
                  : "ক্যাশ অন ডেলিভারি"}
              </p>
              {order.onlinePaymentDetails && (
                <div
                  className={`mt-3 p-3 rounded-lg ${
                    isDark ? "bg-slate-700" : "bg-white"
                  }`}
                >
                  <p className="text-sm font-semibold mb-1">
                    {order.onlinePaymentDetails.providerName}
                  </p>
                  <p className="text-xs">
                    TrxID: {order.onlinePaymentDetails.transactionId}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 border shadow-sm ${
              isDark
                ? "bg-slate-700/50 border-slate-600"
                : "bg-white border-gray-100"
            }`}
          >
            <h2
              className={`text-xl font-bold mb-3 ${
                isDark ? "text-slate-100" : "text-gray-800"
              }`}
            >
              অর্ডার সারাংশ
            </h2>
            <div
              className={`space-y-2 ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {order.items?.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm"
                >
                  <span className="font-semibold">
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ৳
                    {formatCurrency(
                      item.lineTotal || (item.price || 0) * (item.quantity || 1)
                    )}
                  </span>
                </div>
              ))}
              <div
                className={`flex justify-between pt-2 border-t ${
                  isDark ? "border-slate-600" : "border-gray-100"
                }`}
              >
                <span>সাবটোটাল</span>
                <span>৳{formatCurrency(order.totals?.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>শিপিং</span>
                <span>৳{formatCurrency(order.totals?.shipping)}</span>
              </div>
              <div
                className={`flex justify-between font-bold text-lg ${
                  isDark ? "text-emerald-400" : "text-gray-900"
                }`}
              >
                <span>সর্বমোট</span>
                <span>৳{formatCurrency(order.totals?.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {order.paymentMethod === "online" && (
            <button
              onClick={() => setShowReceipt(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              📄 View Payment Receipt
            </button>
          )}
          {order.paymentMethod === "cod" && (
            <button
              onClick={() => generateCODOrderPDF(order)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              📥 Download Order Confirmation
            </button>
          )}
          <Link
            to="/products"
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
          >
            আরও কেনাকাটা করুন
          </Link>
          <Link
            to="/"
            className={`px-5 py-3 font-semibold rounded-xl border transition ${
              isDark
                ? "bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600"
                : "bg-white text-emerald-700 border-emerald-200 hover:shadow"
            }`}
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
