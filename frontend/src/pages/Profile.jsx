import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Calendar,
  ChevronRight,
  DollarSign,
  Edit3,
  ImagePlus,
  Mail,
  MapPin,
  Package2,
  Phone,
  Search,
  Filter,
  ShoppingBag,
  Star,
  User,
  ShoppingCart,
} from "lucide-react";
import { useAuth } from "../Contexts/AuthProvider";

const cardHover = { whileHover: { y: -2, scale: 1.01 } };

const palette = [
  "#22c55e",
  "#10b981",
  "#06b6d4",
  "#6366f1",
  "#f59e0b",
  "#f97316",
];

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 0 });

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function Profile() {
  const navigate = useNavigate();
  const apiBase =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api";
  const { user, userId, token, updateProfile } = useAuth();

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalSpent: 0,
    mostFrequentProduct: null,
    monthlyOrders: [],
    categoryDistribution: [],
    productBreakdown: [],
    recentOrders: [],
  });
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: "",
    shippingAddress: "",
    photoURL: "",
    bio: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  const ordersSectionRef = useRef(null);
  const spendSectionRef = useRef(null);
  const categorySectionRef = useRef(null);
  const productBreakdownSectionRef = useRef(null);

  const headers = useMemo(
    () => ({ Authorization: token ? `Bearer ${token}` : undefined }),
    [token]
  );

  useEffect(() => {
    if (user) {
      setEditForm((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        shippingAddress: user.shippingAddress || "",
        photoURL: user.photoURL || "",
        bio: user.bio || "",
      }));
    }
  }, [user]);

  const fetchStats = async () => {
    if (!userId || !token) return;
    try {
      setLoadingStats(true);
      const res = await axios.get(`${apiBase}/orders/stats/${userId}`, {
        headers,
      });
      setStats((prev) => ({ ...prev, ...(res.data || {}) }));
    } catch (error) {
      console.error("Failed to load stats", error?.message || error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchOrders = async (page = 1) => {
    if (!userId || !token) return;
    try {
      setLoadingOrders(true);
      const params = new URLSearchParams({ page, limit: 8 });
      if (filters.search) params.append("search", filters.search);
      if (filters.status) params.append("status", filters.status);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const res = await axios.get(
        `${apiBase}/orders/user/${userId}?${params.toString()}`,
        { headers }
      );

      setOrders(res.data?.data || []);
      setMeta(res.data?.meta || { page: 1, pages: 1, total: 0 });
    } catch (error) {
      console.error("Failed to load orders", error?.message || error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token, userId]);

  useEffect(() => {
    fetchOrders(meta.page || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    token,
    userId,
    filters.search,
    filters.status,
    filters.startDate,
    filters.endDate,
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm((prev) => ({ ...prev, photoURL: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async () => {
    if (!userId || !token) {
      toast.error("Please login to update profile");
      return;
    }
    
    try {
      setSavingProfile(true);
      const updatedUser = await updateProfile(editForm);
      
      if (updatedUser) {
        toast.success("Profile updated successfully!");
        // Wait a bit for state to update, then close modal
        setTimeout(() => {
          setShowEdit(false);
        }, 300);
        fetchStats();
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Profile update failed", error?.message || error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSavingProfile(false);
    }
  };

  const monthlyChartData = useMemo(() => {
    if (!stats.monthlyOrders?.length)
      return [{ month: "No Data", totalSpent: 0 }];
    return stats.monthlyOrders;
  }, [stats.monthlyOrders]);

  const categoryChartData = useMemo(() => {
    if (!stats.categoryDistribution?.length) {
      return [{ category: "No Data", total: 1 }];
    }
    return stats.categoryDistribution;
  }, [stats.categoryDistribution]);

  const statCards = [
    {
      title: "মোট অর্ডার",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "from-emerald-500 to-teal-500",
      target: () =>
        ordersSectionRef.current?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: "পণ্য সংখ্যা",
      value: stats.totalProducts,
      icon: Package2,
      color: "from-sky-500 to-blue-500",
      target: () =>
        productBreakdownSectionRef.current?.scrollIntoView({
          behavior: "smooth",
        }),
    },
    {
      title: "মোট খরচ",
      value: `৳${formatCurrency(stats.totalSpent)}`,
      icon: DollarSign,
      color: "from-amber-500 to-orange-500",
      target: () =>
        spendSectionRef.current?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: "সর্বাধিক জনপ্রিয় পণ্য",
      value: stats.mostFrequentProduct?.name || "-",
      icon: Star,
      color: "from-purple-500 to-indigo-500",
      target: () =>
        categorySectionRef.current?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  const renderStatus = (status) => {
    const map = {
      pending: "bg-amber-100 text-amber-800",
      delivered: "bg-emerald-100 text-emerald-700",
      cancelled: "bg-rose-100 text-rose-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-indigo-100 text-indigo-700",
    };
    return map[status] || "bg-gray-100 text-gray-700";
  };

  const recentOrders = stats.recentOrders || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-400">Welcome back</p>
            <h1 className="text-3xl font-semibold">User Profile Dashboard</h1>
          </div>
          <button
            onClick={() => setShowEdit(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:scale-[1.01] transition"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
        </div>

        <div className="grid lg:grid-cols-[340px,1fr] gap-6">
          <motion.div
            className="bg-slate-900/70 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur"
            {...cardHover}
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/60 to-teal-500/40 border border-white/10 flex items-center justify-center overflow-hidden">
                {editForm.photoURL ? (
                  <img
                    src={editForm.photoURL}
                    alt={editForm.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-white" size={36} />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Profile
                </p>
                <h2 className="text-xl font-semibold leading-tight">
                  {user?.name || "User"}
                </h2>
                <p className="text-sm text-emerald-300/80">
                  {user?.role === "admin" ? "Administrator" : "Customer"}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-200">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                <Mail size={16} className="text-emerald-300" />
                <span>{user?.email || "—"}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                <Phone size={16} className="text-emerald-300" />
                <span>{user?.phone || "—"}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                <MapPin size={16} className="text-emerald-300" />
                <span>{user?.shippingAddress || user?.address || "—"}</span>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-4 text-sm text-slate-100">
              <p className="font-medium text-emerald-200">Shipping Address</p>
              <p className="text-slate-300 mt-1">
                {user?.shippingAddress ||
                  "Add a shipping address to speed up checkout."}
              </p>
              <button
                onClick={() => setShowEdit(true)}
                className="mt-3 inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200"
              >
                <Edit3 size={16} /> Update
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {statCards.map((card, idx) => (
              <motion.button
                key={card.title}
                type="button"
                onClick={card.target}
                className={`text-left rounded-3xl bg-gradient-to-br ${card.color} text-white p-5 shadow-xl flex flex-col gap-2 focus:outline-none focus:ring-2 focus:ring-white/50`}
                {...cardHover}
                transition={{ delay: idx * 0.03 }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80">{card.title}</p>
                  <card.icon size={18} />
                </div>
                <h3 className="text-2xl font-semibold">{card.value}</h3>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2 bg-slate-900/70 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur"
            ref={spendSectionRef}
            {...cardHover}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Analytics
                </p>
                <h3 className="text-lg font-semibold">Monthly Spend</h3>
              </div>
              {loadingStats && (
                <span className="text-xs text-slate-400">Loading...</span>
              )}
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="month" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #1f2937",
                    }}
                    labelStyle={{ color: "#cbd5e1" }}
                  />
                  <Bar
                    dataKey="totalSpent"
                    fill="#22c55e"
                    radius={[8, 8, 8, 8]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-900/70 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur"
            ref={categorySectionRef}
            {...cardHover}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Categories
                </p>
                <h3 className="text-lg font-semibold">Product Mix</h3>
              </div>
              {loadingStats && (
                <span className="text-xs text-slate-400">Loading...</span>
              )}
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    dataKey="total"
                    nameKey="category"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell
                        key={entry.category}
                        fill={palette[index % palette.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #1f2937",
                    }}
                    labelStyle={{ color: "#cbd5e1" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-200">
              {categoryChartData.map((c, idx) => (
                <div
                  key={c.category}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: palette[idx % palette.length] }}
                    />
                    <span>{c.category}</span>
                  </div>
                  <span className="text-slate-300">{c.total} items</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-3 bg-slate-900/70 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur"
            ref={productBreakdownSectionRef}
            {...cardHover}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Purchases
                </p>
                <h3 className="text-lg font-semibold">Product Breakdown</h3>
              </div>
              {loadingStats && (
                <span className="text-xs text-slate-400">Loading...</span>
              )}
            </div>

            {stats.productBreakdown?.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stats.productBreakdown.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => navigate("/products")}
                    className="relative group bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-4 hover:border-emerald-400/40 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ShoppingCart size={20} className="text-emerald-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-2xl font-bold text-emerald-300">
                          {item.totalQuantity}
                        </p>
                        <p className="text-xs text-slate-400">items</p>
                      </div>
                    </div>
                    <p className="font-medium text-slate-100 truncate">
                      {item.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 border border-white/10 flex items-center justify-center mb-4">
                  <ShoppingCart size={28} className="text-slate-500" />
                </div>
                <p className="text-slate-400 text-sm">
                  No purchase data available yet.
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Start ordering to see your product breakdown here.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            className="bg-slate-900/70 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur"
            {...cardHover}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Recent
                </p>
                <h3 className="text-lg font-semibold">Recent Orders</h3>
              </div>
              <button
                onClick={() =>
                  document
                    .getElementById("order-history")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-emerald-300 text-sm inline-flex items-center gap-1"
              >
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">Order #{order._id}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-300">
                      ৳{formatCurrency(order.totals?.grandTotal)}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${renderStatus(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
              {!recentOrders.length && (
                <p className="text-sm text-slate-400">
                  No recent orders found.
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-900/70 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur"
            {...cardHover}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Favorite
                </p>
                <h3 className="text-lg font-semibold">Most Ordered Product</h3>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                <Star className="text-emerald-300" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Top product</p>
                <p className="text-lg font-semibold">
                  {stats.mostFrequentProduct?.name || "Not enough data"}
                </p>
                {stats.mostFrequentProduct?.count && (
                  <p className="text-sm text-emerald-300">
                    {stats.mostFrequentProduct.count} items ordered
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Orders */}
        <motion.div
          className="bg-slate-900/70 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur"
          id="order-history"
          ref={ordersSectionRef}
          {...cardHover}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                History
              </p>
              <h3 className="text-lg font-semibold">All Orders</h3>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-3 py-2">
                <Search size={16} className="text-slate-400" />
                <input
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, search: e.target.value }))
                  }
                  placeholder="Search by Order ID"
                  className="bg-transparent outline-none text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, status: e.target.value }))
                }
                className="bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-slate-100"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-3 py-2">
                <Calendar size={16} className="text-slate-400" />
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, startDate: e.target.value }))
                  }
                  className="bg-transparent outline-none text-slate-100"
                />
                <span className="text-slate-500">to</span>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, endDate: e.target.value }))
                  }
                  className="bg-transparent outline-none text-slate-100"
                />
              </div>
              <button
                onClick={() => fetchOrders(1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
              >
                <Filter size={16} /> Apply
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left">Order ID</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t border-white/5">
                    <td className="px-4 py-3 font-medium">{order._id}</td>
                    <td className="px-4 py-3 text-slate-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-emerald-200">
                      ৳{formatCurrency(order.totals?.grandTotal)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${renderStatus(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {!orders.length && (
                  <tr>
                    <td
                      className="px-4 py-5 text-center text-slate-400"
                      colSpan={4}
                    >
                      {loadingOrders ? "Loading..." : "No orders found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-300 mt-4">
            <div>
              Page {meta.page} of {meta.pages}
            </div>
            <div className="flex gap-2">
              <button
                disabled={meta.page <= 1}
                onClick={() => fetchOrders(meta.page - 1)}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                disabled={meta.page >= meta.pages}
                onClick={() => fetchOrders(meta.page + 1)}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                onClick={() => setShowEdit(false)}
                className="text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Full Name</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Phone</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="Phone"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-slate-300">Address</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100"
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, address: e.target.value }))
                  }
                  placeholder="Address"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-slate-300">
                  Shipping Address
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100"
                  value={editForm.shippingAddress}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      shippingAddress: e.target.value,
                    }))
                  }
                  placeholder="Shipping address"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-slate-300">Bio</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100"
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, bio: e.target.value }))
                  }
                  placeholder="Short bio"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-slate-300">Profile Photo</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                    {editForm.photoURL ? (
                      <img
                        src={editForm.photoURL}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImagePlus className="text-slate-400" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 rounded-xl border border-white/10 text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileSave}
                disabled={savingProfile}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white disabled:opacity-60"
              >
                {savingProfile ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
