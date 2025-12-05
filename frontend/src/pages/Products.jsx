import { useEffect, useState } from "react";
import { useAppSettings } from "../Contexts/AppSettingsContext";
import { useCart } from "../Contexts/CartContext";
import ContactModal from "../components/ContactModal";

export default function Products() {
  const apiBase =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api";
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { getText } = useAppSettings();
  const t = (bn, en) => getText(bn, en);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiBase}/products`);

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Non-JSON response received:");
          console.error("Status:", res.status);
          console.error("Content-Type:", contentType);
          console.error("Response preview:", text.substring(0, 500));

          let errorMsg = t(
            "সার্ভার JSON নয় এমন রেসপন্স দিয়েছে। ",
            "Server returned non-JSON response. "
          );
          if (text.includes("<!DOCTYPE") || text.includes("<html")) {
            errorMsg += t(
              "ব্যাকএন্ড হয়তো HTML error দিচ্ছে। Vercel লগ দেখুন।",
              "Backend may be returning an HTML error page. Check server logs."
            );
          } else if (res.status === 0 || !res.status) {
            errorMsg += t(
              "ব্যাকএন্ডে সংযোগ করা যাচ্ছে না।",
              "Cannot reach the backend."
            );
          } else {
            errorMsg += t(
              ` স্ট্যাটাস ${res.status} পাওয়া গেছে। লগ পরীক্ষা করুন।`,
              ` Received status ${res.status}. Check backend logs.`
            );
          }
          errorMsg += t(
            ` API URL: ${apiBase}/products`,
            ` API URL: ${apiBase}/products`
          );
          throw new Error(errorMsg);
        }

        if (!res.ok) {
          throw new Error(
            t(
              `পণ্য লোড করা যাচ্ছে না (${res.status})।`,
              `Unable to load products (${res.status}).`
            )
          );
        }
        const data = await res.json();
        const normalized = data.map((item) => {
          const price =
            item.price ??
            item.price_usd ??
            item.priceUsd ??
            item.priceBDT ??
            item.price_bdt ??
            0;
          const quantity =
            item.quantity ??
            item.quantity_ton ??
            item.quantityTon ??
            item.stock ??
            0;
          const rating =
            item.rating ?? item.rating_value ?? item.ratingValue ?? 0;

          return {
            ...item,
            price,
            quantity,
            rating,
          };
        });
        setProducts(normalized);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        const errorMsg = err.message.includes("fetch")
          ? t(
              "ব্যাকএন্ড সার্ভার চালু আছে কিনা পরীক্ষা করুন।",
              "Please make sure the backend server is running."
            )
          : err.message || t("কিছু ভুল হয়েছে।", "Something went wrong.");
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [apiBase, t]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "var(--bg, #f8f9fa)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
            color: "#333",
            textAlign: "center",
          }}
        >
          {t("আমাদের পণ্য", "Our Products")}
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "50px",
            fontSize: "18px",
          }}
        >
          {t(
            "আধুনিক কৃষির জন্য প্রয়োজনীয় সব সরঞ্জাম",
            "All the essentials for modern farming"
          )}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px",
            marginTop: "40px",
          }}
        >
          {isLoading && (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              {t("পণ্য লোড হচ্ছে...", "Loading products...")}
            </p>
          )}

          {error && !isLoading && (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#b91c1c",
                fontWeight: 600,
              }}
            >
              {error}
            </p>
          )}

          {!isLoading && !error && products.length === 0 && (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#475569",
              }}
            >
              {t(
                "এখনও কোনো পণ্য যোগ করা হয়নি। অনুগ্রহ করে “পণ্য যুক্ত করুন” পাতায় গিয়ে নতুন পণ্য যোগ করুন।",
                'No products have been added yet. Please use "Add Product" to create one.'
              )}
            </p>
          )}

          {!isLoading &&
            !error &&
            products.map((product) => (
              <div
                key={product._id}
                className="card"
                style={{
                  padding: "30px",
                  transition: "all 0.3s",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "15px",
                    background: "#f8fafc",
                    border: "1px dashed #cbd5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <span style={{ fontSize: "64px" }}>🛒</span>
                  )}
                </div>

                <div>
                  <h2
                    style={{
                      color: "#333",
                      marginBottom: "6px",
                      fontSize: "24px",
                    }}
                  >
                    {product.name}
                  </h2>
                  <p style={{ color: "#64748b", margin: 0 }}>
                    উৎপত্তি: {product.origin || "—"}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    color: "#475569",
                    fontWeight: 600,
                  }}
                >
                  <span>মূল্য: ${product.price}</span>
                  <span>রেটিং: {product.rating} ⭐</span>
                  <span>পরিমাণ: {product.quantity} টন</span>
                </div>

                <div
                  style={{ display: "flex", gap: "10px", marginTop: "auto" }}
                >
                  <button
                    style={{
                      flex: 1,
                      padding: "12px",
                      background:
                        "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "16px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onClick={() => addToCart(product)}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    🛒 কার্টে যোগ করুন
                  </button>

                  <button
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "white",
                      color: "#667eea",
                      border: "2px solid #667eea",
                      borderRadius: "10px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onClick={() => setIsContactModalOpen(true)}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#667eea";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "white";
                      e.target.style.color = "#667eea";
                    }}
                  >
                    এখনই যোগাযোগ করুন
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Contact Section */}
        <div
          style={{
            marginTop: "60px",
            padding: "40px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "20px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "32px", marginBottom: "15px" }}>
            আরও তথ্য চাই?
          </h2>
          <p style={{ fontSize: "18px", marginBottom: "25px", opacity: 0.95 }}>
            আমাদের সাথে যোগাযোগ করুন এবং আপনার কৃষি ব্যবস্থাপনার জন্য সেরা
            সমাধান পান
          </p>
          <button
            style={{
              padding: "14px 32px",
              background: "white",
              color: "#667eea",
              border: "none",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => setIsContactModalOpen(true)}
            onMouseEnter={(e) =>
              (e.target.style.transform = "translateY(-3px)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            যোগাযোগ করুন
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
