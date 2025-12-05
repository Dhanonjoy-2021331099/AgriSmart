import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 0 });

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(() => location.state || null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/50 w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ধন্যবাদ! আপনার অর্ডার সম্পন্ন হয়েছে
          </h1>
          <p className="text-gray-600">
            অর্ডার আইডি:{" "}
            <span className="font-semibold text-emerald-700">
              {order.orderId}
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              গ্রাহক তথ্য
            </h2>
            <p className="text-gray-700">নাম: {order.customer?.name}</p>
            <p className="text-gray-700">ফোন: {order.customer?.phone}</p>
            {order.customer?.email && (
              <p className="text-gray-700">ইমেইল: {order.customer.email}</p>
            )}
            <p className="text-gray-700">ঠিকানা: {order.customer?.address}</p>
            <p className="text-gray-700">
              পেমেন্ট:{" "}
              {order.paymentMethod === "online"
                ? "অনলাইন পেমেন্ট"
                : "ক্যাশ অন ডেলিভারি"}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              অর্ডার সারাংশ
            </h2>
            <div className="space-y-2 text-gray-700">
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
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span>সাবটোটাল</span>
                <span>৳{formatCurrency(order.totals?.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>শিপিং</span>
                <span>৳{formatCurrency(order.totals?.shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>সর্বমোট</span>
                <span>৳{formatCurrency(order.totals?.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            to="/products"
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
          >
            আরও কেনাকাটা করুন
          </Link>
          <Link
            to="/"
            className="px-5 py-3 bg-white text-emerald-700 font-semibold rounded-xl border border-emerald-200 hover:shadow"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
