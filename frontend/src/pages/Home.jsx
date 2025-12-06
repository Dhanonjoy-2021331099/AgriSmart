import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSettings } from "../Contexts/AppSettingsContext";

export default function Home() {
  const { getText, theme } = useAppSettings();
  const t = (bn, en) => getText(bn, en);
  const [selectedService, setSelectedService] = useState(null);

  // Theme-aware colors
  const isDark = theme === "dark";
  const bgColor = isDark ? "#0f172a" : "#ffffff";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const textSecondary = isDark ? "#cbd5e1" : "#475569";
  const textMuted = isDark ? "#94a3b8" : "#64748b";

  // Review system state
  const [reviews, setReviews] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);

  // Story modal state
  const [showStoryModal, setShowStoryModal] = useState(false);

  // Hero background slider state
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Hero background images - limited to 3 visible slides
  const heroImages = [
    "data:image/jpeg;base64,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", // Mango orchard
    
    "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?auto=format&fit=crop&w=1600&h=900&q=90", // Fresh tomatoes (now 2nd image)
    "data:image/jpeg;base64,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", // Green field panorama
  ];

  // Auto-rotate hero background every 2 seconds
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2000);

    return () => clearInterval(heroTimer);
  }, []);

  // Initialize testimonials with hardcoded + localStorage reviews
  useEffect(() => {
    const loadReviews = () => {
      try {
        const savedReviews = localStorage.getItem("customerReviews");
        const parsedReviews = savedReviews ? JSON.parse(savedReviews) : [];

        // Combine hardcoded testimonials with user reviews
        const allTestimonials = [
          ...testimonials,
          ...parsedReviews.map((review) => ({
            name: review.name,
            text: review.review_text,
            email: review.email,
            timestamp: review.timestamp,
            isUserReview: true,
          })),
        ];

        setReviews(allTestimonials);
      } catch (error) {
        console.error("Error loading reviews:", error);
        setReviews(testimonials); // Fallback to hardcoded testimonials
      }
    };

    loadReviews();
  }, []);

  // Auto-rotate testimonials every 4 seconds
  useEffect(() => {
    if (reviews.length === 0) return;

    const timer = setInterval(() => {
      setDisplayIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  // Add new review to the system
  const addReview = (newReview) => {
    try {
      // Get existing reviews from localStorage
      const savedReviews = localStorage.getItem("customerReviews");
      const reviewsArray = savedReviews ? JSON.parse(savedReviews) : [];

      // Add new review with timestamp
      const reviewWithTimestamp = {
        ...newReview,
        timestamp: new Date().toISOString(),
      };
      reviewsArray.push(reviewWithTimestamp);

      // Save to localStorage
      localStorage.setItem("customerReviews", JSON.stringify(reviewsArray));

      // Update state to show new review
      const updatedTestimonials = [
        ...reviews,
        {
          name: newReview.name,
          text: newReview.review_text,
          email: newReview.email,
          timestamp: reviewWithTimestamp.timestamp,
          isUserReview: true,
        },
      ];

      setReviews(updatedTestimonials);
      setDisplayIndex(updatedTestimonials.length - 1); // Show the new review
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const services = [
    {
      title: t("জৈব চাষাবাদ", "Organic Farming"),
      desc: t(
        "স্বাস্থ্যকর ফসল এবং মাটির জন্য টেকসই পদ্ধতি",
        "Sustainable methods for healthy crops and soil"
      ),
      details: t(
        "আমরা রাসায়নিক সার ছাড়াই প্রাকৃতিক উপায়ে ফসল উৎপাদন করি। জৈব সার, কম্পোস্ট এবং প্রাকৃতিক কীটনাশক ব্যবহার করে মাটির স্বাস্থ্য রক্ষা করি।",
        "We produce crops naturally without chemical fertilizers. Using organic manure, compost, and natural pesticides to maintain soil health."
      ),
      icon: "🌱",
    },
    {
      title: t("তাজা পণ্য", "Fresh Produce"),
      desc: t(
        "খামার থেকে তাজা শাকসবজি এবং ফল সরবরাহ",
        "Farm-fresh vegetables and fruits delivered to you"
      ),
      details: t(
        "সকালে তোলা ফসল দুপুরে আপনার দরজায়। কোনো মধ্যস্থতাকারী নেই, শুধু তাজা এবং পুষ্টিকর খাবার। দ্রুত ডেলিভারি এবং সর্বোত্তম মান নিশ্চিত।",
        "Crops picked in the morning delivered to your door by noon. No middlemen, just fresh and nutritious food. Fast delivery and best quality guaranteed."
      ),
      icon: "🍅",
    },
    {
      title: t("গবাদি পশু যত্ন", "Livestock Care"),
      desc: t(
        "গবাদি পশুর জন্য মানবিক এবং আধুনিক যত্ন",
        "Humane and modern care for livestock"
      ),
      details: t(
        "আমাদের খামারে গবাদি পশুদের খোলা পরিবেশে রাখা হয়। নিয়মিত স্বাস্থ্য পরীক্ষা, পুষ্টিকর খাবার এবং প্রাকৃতিক চিকিৎসা পদ্ধতি অনুসরণ করি।",
        "Our farm keeps livestock in open environments. Regular health checks, nutritious feed, and natural treatment methods are followed."
      ),
      icon: "🐄",
    },
    {
      title: t("কৃষি পরামর্শ", "Agriculture Consultation"),
      desc: t(
        "উৎপাদন বৃদ্ধি এবং অপচয় কমাতে বিশেষজ্ঞ পরামর্শ",
        "Expert advice to improve yield and reduce waste"
      ),
      details: t(
        "অভিজ্ঞ কৃষিবিদ এবং বিশেষজ্ঞদের পরামর্শ পান। মাটি পরীক্ষা, ফসল নির্বাচন, সেচ ব্যবস্থাপনা এবং রোগ নিয়ন্ত্রণে সহায়তা প্রদান করি।",
        "Get advice from experienced agronomists and experts. We provide assistance in soil testing, crop selection, irrigation management, and disease control."
      ),
      icon: "🧑‍🌾",
    },
  ];

  const products = [
    {
      name: t("জৈব টমেটো", "Organic Tomatoes"),
      price: "৳120/kg",
      img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: t("সবুজ মটরশুটি", "Green Beans"),
      price: "৳90/kg",
      img: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: t("তাজা লেটুস", "Fresh Lettuce"),
      price: "৳60/pcs",
      img: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: t("জৈব ডিম", "Organic Eggs"),
      price: "৳180/doz",
      img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=60",
    },
  ];

  const testimonials = [
    {
      name: "রহিম",
      text: t(
        "আমি এখন পর্যন্ত সেরা জৈব শাকসবজি পেয়েছি। ডেলিভারি মসৃণ এবং তাজা ছিল!",
        "Best organic vegs I ever had. Delivery was smooth and fresh!"
      ),
    },
    {
      name: "শারমিন",
      text: t(
        "দুর্দান্ত গ্রাহক সহায়তা এবং অত্যন্ত নির্ভরযোগ্য খামার পণ্য।",
        "Great customer support and very reliable farm produce."
      ),
    },
    {
      name: "আজিজ",
      text: t(
        "উচ্চ মানের, সুস্বাদু ফল। আবার অর্ডার করব।",
        "High-quality, tasty fruits. Will order again."
      ),
    },
  ];

  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTestiIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <div style={{ minHeight: "100vh", background: bgColor, color: textColor }}>
      {/* Service Modal */}
      {selectedService && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "20px",
          }}
          onClick={() => setSelectedService(null)}
        >
          <div
            style={{
              background: cardBg,
              padding: "32px",
              borderRadius: "16px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              maxWidth: "500px",
              width: "100%",
              color: textColor,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
                color: textColor,
              }}
            >
              {selectedService.icon}
            </div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "12px",
                color: textColor,
              }}
            >
              {selectedService.title}
            </h2>
            <p
              style={{
                marginBottom: "16px",
                lineHeight: "1.6",
                color: textSecondary,
              }}
            >
              {selectedService.details}
            </p>
            <button
              onClick={() => setSelectedService(null)}
              style={{
                padding: "12px 24px",
                background: "#15803d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#166534")}
              onMouseLeave={(e) => (e.target.style.background = "#15803d")}
            >
              {t("বন্ধ করুন", "Close")}
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section style={{ position: "relative" }}>
        <div
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          style={{
            height: "520px",
            background:
              "linear-gradient(to right, rgba(22, 101, 52, 0.85), rgba(21, 128, 61, 0.65))",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Image Slider */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            {heroImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`farm background ${index + 1}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: index === heroImageIndex ? 1 : 0,
                  transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  animation:
                    index === heroImageIndex
                      ? isHeroHovered
                        ? "kenBurnsHover 18s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
                        : "kenBurns 15s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
                      : "none",
                  willChange: index === heroImageIndex ? "transform" : "auto",
                }}
              />
            ))}
            {/* Dark Overlay for Text Clarity */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.25))",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Image Indicator Dots */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "10px",
              zIndex: 10,
            }}
          >
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroImageIndex(index)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background:
                    index === heroImageIndex
                      ? "white"
                      : "rgba(255, 255, 255, 0.5)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
                onMouseEnter={(e) => {
                  if (index !== heroImageIndex) {
                    e.target.style.background = "rgba(255, 255, 255, 0.8)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== heroImageIndex) {
                    e.target.style.background = "rgba(255, 255, 255, 0.5)";
                  }
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <div
            style={{
              position: "relative",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 24px",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: "800px", color: "white" }}>
              <h2
                style={{
                  fontSize: "48px",
                  fontWeight: "800",
                  lineHeight: "1.2",
                  marginBottom: "16px",
                }}
              >
                {t("তাজা। জৈব। স্থানীয়।", "Fresh. Organic. Local.")}
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: "rgba(220, 252, 231, 0.9)",
                  marginBottom: "24px",
                }}
              >
                {t(
                  "আমরা প্রাকৃতিক পদ্ধতি ব্যবহার করে স্বাস্থ্যকর এবং টেকসই পণ্য উৎপাদন করি - আমাদের খামার থেকে আপনার টেবিলে সরবরাহ করা হয়।",
                  "We grow healthy and sustainable produce using natural methods — delivered from our farm to your table."
                )}
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  to="/products"
                  style={{
                    padding: "12px 24px",
                    background: isDark ? "#15803d" : "orange",
                    color: isDark ? "orange" : "#15803d",
                    fontWeight: "600",
                    borderRadius: "8px",
                    textDecoration: "none",
                    boxShadow: `0 4px 6px ${isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    if (isDark) {
                      e.target.style.background = "#166534";
                    } else {
                      e.target.style.opacity = "0.9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    if (isDark) {
                      e.target.style.background = "#15803d";
                    } else {
                      e.target.style.opacity = "1";
                    }
                  }}
                >
                  {t("পণ্য দেখুন", "Shop Products")}
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    padding: "12px 24px",
                    background: isDark ? "transparent" : "white",
                    color: isDark ? "white" : "#15803d",
                    border: isDark ? "2px solid white" : "2px solid transparent",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (isDark) {
                      e.target.style.background = "white";
                      e.target.style.color = "#15803d";
                    } else {
                      e.target.style.background = "#f0f0f0";
                      e.target.style.color = "#15803d";
                    }
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    if (isDark) {
                      e.target.style.background = "transparent";
                      e.target.style.color = "white";
                    } else {
                      e.target.style.background = "white";
                      e.target.style.color = "#15803d";
                    }
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  {t("আরও জানুন", "Learn More")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        style={{
          width: "100%",
          margin: "56px 0",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        <h3
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "8px",
          }}
        >
          {t("আমাদের সেবা", "Our Services")}
        </h3>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          {t(
            "আপনার খামার এবং পরিবারকে সহায়তা করার জন্য আমরা যা অফার করি।",
            "What we offer to support your farm and family."
          )}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((s, idx) => (
            <div
              key={idx}
              style={{
                padding: "24px",
                background: cardBg,
                borderRadius: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.15)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                {s.icon}
              </div>
              <h4
                style={{
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: textColor,
                }}
              >
                {s.title}
              </h4>
              <p
                style={{
                  color: textSecondary,
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                {s.desc}
              </p>
              <button
                onClick={() => setSelectedService(s)}
                style={{
                  color: isDark ? "#4ade80" : "#15803d",
                  fontWeight: "500",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "14px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = isDark ? "#86efac" : "#166534";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = isDark ? "#4ade80" : "#15803d";
                }}
              >
                {t("আরও জানুন →", "Learn more →")}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          width: "100%",
          margin: "64px 0",
          padding: "0 24px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "32px",
          flexWrap: "wrap",
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: "1 1 400px" }}>
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=60"
            alt="about farm"
            style={{
              width: "100%",
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          />
        </div>
        <div style={{ flex: "1 1 400px" }}>
          <h3
            style={{
              fontSize: "32px",
              fontWeight: "600",
              marginBottom: "16px",
              color: textColor,
            }}
          >
            {t("আমাদের খামার সম্পর্কে", "About Our Farm")}
          </h3>
          <p
            style={{
              color: textSecondary,
              lineHeight: "1.7",
              marginBottom: "16px",
            }}
          >
            {t(
              "আমরা একটি পরিবার-চালিত খামার যা জৈব পদ্ধতি এবং টেকসই কৃষিতে মনোনিবেশ করে। আমাদের লক্ষ্য হল ভবিষ্যত প্রজন্মের জন্য জমি রক্ষা করার সাথে সাথে পুষ্টিকর খাদ্য উৎপাদন করা।",
              "We are a family-run farm focused on organic methods and sustainable agriculture. Our mission is to produce nutritious food while protecting the land for future generations."
            )}
          </p>
          <ul
            style={{
              color: textSecondary,
              lineHeight: "1.8",
              marginBottom: "24px",
            }}
          >
            <li>
              {t("• প্রত্যয়িত জৈব অনুশীলন", "• Certified organic practices")}
            </li>
            <li>
              {t(
                "• স্থানীয় বিতরণ এবং সম্প্রদায় সহায়তা",
                "• Local distribution & community support"
              )}
            </li>
            <li>
              {t(
                "• পরিবেশ বান্ধব প্যাকেজিং এবং পুনর্ব্যবহার",
                "• Eco-friendly packaging and recycling"
              )}
            </li>
          </ul>
          <button
            onClick={() => setShowStoryModal(true)}
            style={{
              padding: "12px 24px",
              background: "#15803d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            {t("আমাদের গল্প পড়ুন", "Read Our Story")}
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        style={{
          width: "100%",
          margin: "64px 0",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "32px",
                fontWeight: "600",
                color: textColor,
                marginBottom: "4px",
              }}
            >
              {t("বৈশিষ্ট্যযুক্ত পণ্য", "Featured Products")}
            </h3>
            <p style={{ color: textSecondary }}>
              {t(
                "আমাদের সর্বশেষ ফসল থেকে তাজা নির্বাচন।",
                "Fresh picks from our latest harvest."
              )}
            </p>
          </div>
          <Link
            to="/products"
            style={{
              padding: "10px 20px",
              border: `1px solid ${isDark ? "#475569" : "#d1d5db"}`,
              borderRadius: "8px",
              textDecoration: "none",
              color: textColor,
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = "#15803d")}
            onMouseLeave={(e) =>
              (e.target.style.borderColor = isDark ? "#475569" : "#d1d5db")
            }
          >
            {t("সব দেখুন", "View All")}
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {products.map((p, i) => (
            <div
              key={i}
              style={{
                borderRadius: "16px",
                background: cardBg,
                boxShadow: isDark
                  ? "0 1px 3px rgba(0,0,0,0.3)"
                  : "0 1px 3px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = isDark
                  ? "0 10px 25px rgba(0,0,0,0.5)"
                  : "0 10px 25px rgba(0,0,0,0.15)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = isDark
                  ? "0 1px 3px rgba(0,0,0,0.3)"
                  : "0 1px 3px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px" }}>
                <h4
                  style={{
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: textColor,
                  }}
                >
                  {p.name}
                </h4>
                <p style={{ color: textSecondary, marginBottom: "16px" }}>
                  {p.price}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "#15803d",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {t("কার্টে যোগ করুন", "Add to cart")}
                  </button>
                  <button
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {t("বিস্তারিত", "Details")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "64px auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            background: "rgba(21, 128, 61, 0.05)",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: "600",
                  color: textColor,
                  marginBottom: "16px",
                }}
              >
                {t("কেন আমাদের বেছে নিবেন", "Why Choose Us")}
              </h3>
              <p style={{ color: textSecondary, marginBottom: "16px" }}>
                {t(
                  "আমরা আধুনিক পরিবেশবান্ধব কৌশলগুলির সাথে ঐতিহ্যবাহী কৃষি জ্ঞান মিশ্রিত করি।",
                  "We blend traditional farming wisdom with modern eco-friendly techniques."
                )}
              </p>
              <ul style={{ color: textSecondary, lineHeight: "1.8" }}>
                <li>✔️ {t("১০০% জৈব পণ্য", "100% organic produce")}</li>
                <li>
                  ✔️{" "}
                  {t(
                    "স্থানীয়ভাবে উৎস এবং খুঁজে পাওয়া যায়",
                    "Locally sourced & traceable"
                  )}
                </li>
                <li>
                  ✔️{" "}
                  {t(
                    "টেকসই এবং নৈতিক চাষাবাদ",
                    "Sustainable & ethical farming"
                  )}
                </li>
              </ul>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  padding: "16px",
                  background: cardBg,
                  borderRadius: "12px",
                  boxShadow: isDark
                    ? "0 1px 3px rgba(0,0,0,0.3)"
                    : "0 1px 3px rgba(0,0,0,0.1)",
                  color: textColor,
                }}
              >
                {t(
                  "অভিজ্ঞ কৃষিবিদ: কৃষকদের জন্য সহায়তা এবং প্রশিক্ষণ।",
                  "Experienced Agronomists: Support and training for farmers."
                )}
              </div>
              <div
                style={{
                  padding: "16px",
                  background: cardBg,
                  borderRadius: "12px",
                  boxShadow: isDark
                    ? "0 1px 3px rgba(0,0,0,0.3)"
                    : "0 1px 3px rgba(0,0,0,0.1)",
                  color: textColor,
                }}
              >
                {t(
                  "কমিউনিটি প্রোগ্রাম: স্থানীয় বাজার দিবস এবং স্কুল পৌঁছানো।",
                  "Community Programs: Local market days and school outreach."
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          width: "100%",
          margin: "56px 0",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        <h3
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: textColor,
            marginBottom: "24px",
          }}
        >
          {t("গ্রাহকরা যা বলেন", "What Customers Say")}
        </h3>
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: cardBg,
              borderRadius: "16px",
              padding: "32px",
              boxShadow: isDark
                ? "0 4px 6px rgba(0,0,0,0.3)"
                : "0 4px 6px rgba(0,0,0,0.1)",
              minHeight: "140px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  color: textSecondary,
                  fontStyle: "italic",
                  fontSize: "18px",
                  marginBottom: "16px",
                }}
              >
                "{reviews.length > 0 ? reviews[displayIndex].text : ""}"
              </p>
              <p style={{ fontWeight: "600", color: "#1f2937" }}>
                — {reviews.length > 0 ? reviews[displayIndex].name : ""}
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            {reviews.map((t, i) => (
              <button
                key={i}
                onClick={() => setDisplayIndex(i)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: i === displayIndex ? "#15803d" : "#d1d5db",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <NewsletterSection t={t} onReviewSubmit={addReview} />

      {/* Story Modal */}
      {showStoryModal && (
        <StoryModal t={t} onClose={() => setShowStoryModal(false)} />
      )}
    </div>
  );
}

function NewsletterSection({ t, onReviewSubmit }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Review form state
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const apiBase =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api";

  // Email validation function
  const isValidEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");

    // Validate email
    if (!email.trim()) {
      setError(t("ইমেইল প্রয়োজন", "Email is required"));
      return;
    }

    if (!isValidEmail(email)) {
      setError(t("একটি বৈধ ইমেইল প্রবেশ করুন", "Please enter a valid email"));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiBase}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: email.trim(),
          message: "Subscribed to newsletter",
        }),
      });

      if (!response.ok) {
        throw new Error(t("সাবস্ক্রাইব করতে ব্যর্থ", "Failed to subscribe"));
      }

      toast.success(
        t("সাবস্ক্রাইবের জন্য ধন্যবাদ!", "Thank you for subscribing!")
      );
      setEmail("");
      setError("");
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setError(
        t(
          "সাবস্ক্রাইব করতে ব্যর্থ। পুনরায় চেষ্টা করুন।",
          "Failed to subscribe. Please try again."
        )
      );
      toast.error(t("সাবস্ক্রাইবে ত্রুটি", "Subscription error"));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setReviewError("");

    // Validate form
    if (!reviewName.trim()) {
      setReviewError(t("নাম প্রয়োজন", "Name is required"));
      return;
    }

    if (!reviewEmail.trim()) {
      setReviewError(t("ইমেইল প্রয়োজন", "Email is required"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reviewEmail.trim())) {
      setReviewError(
        t("একটি বৈধ ইমেইল প্রবেশ করুন", "Please enter a valid email")
      );
      return;
    }

    if (!reviewMessage.trim()) {
      setReviewError(
        t("পর্যালোচনা বার্তা প্রয়োজন", "Review message is required")
      );
      return;
    }

    if (!reviewRating) {
      setReviewError(t("রেটিং নির্বাচন করুন", "Please select a rating"));
      return;
    }

    setReviewLoading(true);

    try {
      // Add review to the system
      onReviewSubmit({
        name: reviewName.trim(),
        email: reviewEmail.trim(),
        review_text: reviewMessage.trim(),
        rating: reviewRating,
      });

      // Also save to backend
      const apiBase =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api";
      await fetch(`${apiBase}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: reviewName.trim(),
          email: reviewEmail.trim(),
          message: `[REVIEW] Rating: ${reviewRating}/5 - ${reviewMessage.trim()}`,
        }),
      }).catch((err) => console.error("Backend save error (non-fatal):", err));

      toast.success(
        t("আপনার প্রতিক্রিয়ার জন্য ধন্যবাদ!", "Thanks for your feedback!")
      );
      setReviewName("");
      setReviewEmail("");
      setReviewMessage("");
      setReviewRating(5);
      setReviewError("");
    } catch (err) {
      console.error("Review submission error:", err);
      setReviewError(
        t(
          "পর্যালোচনা জমা দিতে ব্যর্থ। পুনরায় চেষ্টা করুন।",
          "Failed to submit review. Please try again."
        )
      );
      toast.error(t("পর্যালোচনা ত্রুটি", "Review error"));
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        width: "100%",
        margin: "64px 0 120px",
        padding: "0 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#15803d",
          color: "white",
          borderRadius: "16px",
          padding: "48px 32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          boxShadow: "0 8px 32px rgba(21, 128, 61, 0.25)",
          alignItems: "start",
        }}
      >
        {/* Left Column: Newsletter Subscription */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "12px",
                color: "white",
                letterSpacing: "-0.5px",
                margin: 0,
              }}
            >
              {t("তাজা পণ্য সরবরাহ পান", "Get fresh produce delivered")}
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {t(
                "সাপ্তাহিক বক্স বা কাস্টম অর্ডারের জন্য সাইন আপ করুন।",
                "Sign up for weekly boxes or custom orders."
              )}
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            style={{
              display: "flex",
              gap: "12px",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onBlur={() => {
                  if (email && !isValidEmail(email)) {
                    setError(t("বৈধ ইমেইল প্রয়োজন", "Valid email required"));
                  }
                }}
                placeholder={t("আপনার ইমেইল", "Your email")}
                disabled={isLoading}
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: error
                    ? "2px solid #ef4444"
                    : "2px solid rgba(255, 255, 255, 0.3)",
                  fontSize: "15px",
                  fontWeight: "500",
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#1f2937",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow: error
                    ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.6)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(255, 255, 255, 0.15)";
                }}
              />
              {error && (
                <span
                  style={{
                    fontSize: "13px",
                    color: "#fecaca",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  ⚠️ {error}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              style={{
                padding: "14px 28px",
                background: "white",
                color: "#15803d",
                border: "none",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: isLoading || !email ? "not-allowed" : "pointer",
                fontSize: "15px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                opacity: isLoading || !email ? 0.7 : 1,
                transform: isLoading ? "scale(0.98)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isLoading && email) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
                  e.target.style.background = "#f5f5f5";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                e.target.style.background = "white";
              }}
            >
              {isLoading
                ? t("সাবস্ক্রাইব করছে...", "Subscribing...")
                : t("সাবস্ক্রাইব করুন", "Subscribe")}
            </button>
          </form>

          <p
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.75)",
              margin: 0,
            }}
          >
            {t(
              "আমরা আপনার ইমেইল স্প্যাম করব না।",
              "We'll never spam your email."
            )}
          </p>
        </div>

        {/* Vertical Divider */}
        <div
          style={{
            display: "none",
            width: "1px",
            background: "rgba(255, 255, 255, 0.2)",
            minHeight: "300px",
          }}
        />

        {/* Right Column: Customer Review Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "12px",
                color: "white",
                letterSpacing: "-0.5px",
                margin: 0,
              }}
            >
              {t("আপনার মতামত শেয়ার করুন", "Share Your Review")}
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {t(
                "আপনার অভিজ্ঞতা এবং প্রতিক্রিয়া আমাদের জানান।",
                "Tell us about your experience and feedback."
              )}
            </p>
          </div>

          <form
            onSubmit={handleSubmitReview}
            style={{
              display: "flex",
              gap: "16px",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            {/* Name Field */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <input
                type="text"
                value={reviewName}
                onChange={(e) => {
                  setReviewName(e.target.value);
                  setReviewError("");
                }}
                placeholder={t("আপনার নাম", "Your name")}
                disabled={reviewLoading}
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border:
                    reviewError && !reviewName
                      ? "2px solid #ef4444"
                      : "2px solid rgba(255, 255, 255, 0.3)",
                  fontSize: "15px",
                  fontWeight: "500",
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#1f2937",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow:
                    reviewError && !reviewName
                      ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
                      : "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.6)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(255, 255, 255, 0.15)";
                }}
              />
            </div>

            {/* Email Field */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <input
                type="email"
                value={reviewEmail}
                onChange={(e) => {
                  setReviewEmail(e.target.value);
                  setReviewError("");
                }}
                placeholder={t("আপনার ইমেইল", "Your email")}
                disabled={reviewLoading}
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border:
                    reviewError && !reviewEmail
                      ? "2px solid #ef4444"
                      : "2px solid rgba(255, 255, 255, 0.3)",
                  fontSize: "15px",
                  fontWeight: "500",
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#1f2937",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow:
                    reviewError && !reviewEmail
                      ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
                      : "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.6)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(255, 255, 255, 0.15)";
                }}
              />
            </div>

            {/* Rating Field */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "rgba(255, 255, 255, 0.95)",
                }}
              >
                {t("রেটিং (1-5 তারকা)", "Rating (1-5 stars)")}
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setReviewRating(star);
                      setReviewError("");
                    }}
                    disabled={reviewLoading}
                    style={{
                      fontSize: "24px",
                      background: "none",
                      border: "none",
                      cursor: reviewLoading ? "not-allowed" : "pointer",
                      padding: "4px",
                      transition: "transform 0.2s ease",
                      opacity: star <= reviewRating ? 1 : 0.4,
                      transform:
                        star <= reviewRating ? "scale(1.1)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (!reviewLoading) {
                        e.target.style.transform = "scale(1.2)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform =
                        star <= reviewRating ? "scale(1.1)" : "scale(1)";
                    }}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Review Message Field */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <textarea
                value={reviewMessage}
                onChange={(e) => {
                  setReviewMessage(e.target.value);
                  setReviewError("");
                }}
                placeholder={t(
                  "আপনার অভিজ্ঞতা শেয়ার করুন...",
                  "Share your experience..."
                )}
                disabled={reviewLoading}
                rows="4"
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border:
                    reviewError && !reviewMessage
                      ? "2px solid #ef4444"
                      : "2px solid rgba(255, 255, 255, 0.3)",
                  fontSize: "15px",
                  fontWeight: "500",
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#1f2937",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "all 0.3s ease",
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxShadow:
                    reviewError && !reviewMessage
                      ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
                      : "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.6)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(255, 255, 255, 0.15)";
                }}
              />
            </div>

            {/* Error Message */}
            {reviewError && (
              <span
                style={{
                  fontSize: "13px",
                  color: "#fecaca",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                ⚠️ {reviewError}
              </span>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                reviewLoading || !reviewName || !reviewEmail || !reviewMessage
              }
              style={{
                padding: "14px 28px",
                background: "white",
                color: "#15803d",
                border: "none",
                borderRadius: "10px",
                fontWeight: "700",
                cursor:
                  reviewLoading || !reviewName || !reviewEmail || !reviewMessage
                    ? "not-allowed"
                    : "pointer",
                fontSize: "15px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                opacity:
                  reviewLoading || !reviewName || !reviewEmail || !reviewMessage
                    ? 0.7
                    : 1,
                transform: reviewLoading ? "scale(0.98)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (
                  !reviewLoading &&
                  reviewName &&
                  reviewEmail &&
                  reviewMessage
                ) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
                  e.target.style.background = "#f5f5f5";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                e.target.style.background = "white";
              }}
            >
              {reviewLoading
                ? t("জমা দিচ্ছে...", "Submitting...")
                : t("পর্যালোচনা জমা দিন", "Submit Review")}
            </button>
          </form>

          <p
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.75)",
              margin: 0,
            }}
          >
            {t(
              "আপনার প্রতিক্রিয়া আমাদের উন্নতিতে সাহায্য করে।",
              "Your feedback helps us improve."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

function StoryModal({ t, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const { theme } = useAppSettings();
  const isDark = theme === "dark";

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match animation duration
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 999,
          animation: isClosing
            ? "fadeOut 0.3s ease-out"
            : "fadeIn 0.3s ease-in",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          overflow: "auto",
        }}
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
            borderRadius: "16px",
            maxWidth: "900px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            animation: isClosing
              ? "slideDown 0.3s ease-out"
              : "slideUp 0.4s ease-out",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: "sticky",
              top: "16px",
              right: "16px",
              float: "right",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#f3f4f6",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              transition: "all 0.3s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#15803d";
              e.target.style.color = "white";
              e.target.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#f3f4f6";
              e.target.style.color = "inherit";
              e.target.style.transform = "rotate(0deg)";
            }}
            title={t("বন্ধ করুন", "Close")}
          >
            ✕
          </button>

          {/* Content */}
          <div style={{ padding: "40px 32px 32px" }}>
            {/* Header */}
            <div style={{ marginBottom: "40px", textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "42px",
                  fontWeight: "700",
                  color: "#15803d",
                  marginBottom: "12px",
                  letterSpacing: "-0.5px",
                }}
              >
                {t("আমাদের গল্প", "Our Story")}
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                {t(
                  "জৈব কৃষিতে আমাদের যাত্রা এবং প্রতিশ্রুতি",
                  "Our journey in organic agriculture and commitment"
                )}
              </p>
            </div>

            {/* Origin Story */}
            <Section
              t={t}
              title="শুরুর গল্প"
              enTitle="Our Origin"
              icon="🌱"
              content={t(
                "আমাদের খামার ১৯৯৫ সালে শুরু হয়েছিল একটি ছোট পরিবারের স্বপ্ন থেকে। প্রজন্মের পর প্রজন্ম ধরে কৃষিকাজ করা আমাদের পরিবার বুঝতে পেরেছিল যে রাসায়নিক পদ্ধতি মাটি এবং পরিবেশের জন্য ক্ষতিকর। তাই আমরা সিদ্ধান্ত নিয়েছিলাম সম্পূর্ণভাবে জৈব পদ্ধতিতে রূপান্তরিত হতে।",
                "Our farm started in 1995 from a small family's dream. With generations of farming heritage, our family understood that chemical methods harm soil and environment. We decided to completely transition to organic methods."
              )}
            />

            {/* Mission & Vision */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              <Section
                t={t}
                title="আমাদের মিশন"
                enTitle="Our Mission"
                icon="🎯"
                content={t(
                  "স্বাস্থ্যকর, পুষ্টিকর এবং জৈব খাদ্য উৎপাদন করা যা আমাদের সম্প্রদায়কে লালিত করে এবং পরিবেশকে সুরক্ষিত রাখে।",
                  "Produce healthy, nutritious organic food that nourishes our community while protecting the environment."
                )}
                small
              />
              <Section
                t={t}
                title="আমাদের দৃষ্টিভঙ্গি"
                enTitle="Our Vision"
                icon="👁️"
                content={t(
                  "একটি টেকসই ভবিষ্যত তৈরি করা যেখানে জৈব কৃষি মূলধারা হবে এবং প্রতিটি পরিবার তাজা, রাসায়নিক-মুক্ত খাদ্য পাবে।",
                  "Create a sustainable future where organic farming becomes mainstream and every family has access to fresh, chemical-free food."
                )}
                small
              />
            </div>

            {/* Quality Commitment */}
            <Section
              t={t}
              title="গুণমান এবং জৈব প্রতিশ্রুতি"
              enTitle="Quality & Organic Commitment"
              icon="✅"
              content={t(
                "আমরা শূন্য রাসায়নিক সার, কীটনাশক বা হার্বিসাইড ব্যবহার করি। প্রতিটি পণ্য কঠোর পরীক্ষা এবং জৈব সার্টিফিকেশনের মাধ্যমে যায়। আমাদের মাটি পরীক্ষা করা হয় নিয়মিত যাতে সর্বোচ্চ পুষ্টি নিশ্চিত করা যায়।",
                "We use zero chemical fertilizers, pesticides, or herbicides. Every product undergoes strict testing and organic certification. Our soil is tested regularly to ensure maximum nutrition."
              )}
            />

            {/* What Makes Us Different */}
            <Section
              t={t}
              title="আমরা কেন আলাদা"
              enTitle="What Makes Us Different"
              icon="⭐"
              content={
                <ul
                  style={{
                    margin: "12px 0",
                    paddingLeft: "24px",
                    color: "#374151",
                    lineHeight: "1.8",
                  }}
                >
                  <li>
                    {t(
                      "সম্পূর্ণ স্বচ্ছতা - প্রতিটি পণ্যের উৎস ট্র্যাক করা যায়",
                      "Complete transparency - trace origin of every product"
                    )}
                  </li>
                  <li>
                    {t(
                      "পরিবার পরিচালিত - ২৪ বছরের অভিজ্ঞতা",
                      "Family-run - 24 years of experience"
                    )}
                  </li>
                  <li>
                    {t(
                      "স্থানীয় সম্প্রদায়ের সাথে সরাসরি সম্পর্ক",
                      "Direct relationship with local community"
                    )}
                  </li>
                  <li>
                    {t(
                      "প্রিমিয়াম গুণমান, ন্যায্য মূল্যে",
                      "Premium quality at fair prices"
                    )}
                  </li>
                  <li>
                    {t(
                      "পরিবেশ বান্ধব প্যাকেজিং এবং বিতরণ",
                      "Eco-friendly packaging and delivery"
                    )}
                  </li>
                </ul>
              }
            />

            {/* Customer Benefits */}
            <Section
              t={t}
              title="গ্রাহক সুবিধা"
              enTitle="Customer Benefits"
              icon="🎁"
              content={
                <ul
                  style={{
                    margin: "12px 0",
                    paddingLeft: "24px",
                    color: "#374151",
                    lineHeight: "1.8",
                  }}
                >
                  <li>
                    {t(
                      "কোন ক্ষতিকর রাসায়নিক নেই - নিরাপদ পরিবারের খাবার",
                      "No harmful chemicals - safe family food"
                    )}
                  </li>
                  <li>
                    {t(
                      "উচ্চতর পুষ্টিমান - সুস্থ জীবনযাপন",
                      "Higher nutritional value - healthier living"
                    )}
                  </li>
                  <li>
                    {t(
                      "তাজা সরবরাহ - ফার্ম থেকে টেবিলে ২৪ ঘন্টার মধ্যে",
                      "Fresh delivery - farm to table within 24 hours"
                    )}
                  </li>
                  <li>
                    {t(
                      "সম্প্রদায় সমর্থন - স্থানীয় অর্থনীতি শক্তিশালী করা",
                      "Community support - strengthen local economy"
                    )}
                  </li>
                  <li>
                    {t(
                      "পরিবেশ সংরক্ষণে অংশীদার হওয়া",
                      "Be part of environmental conservation"
                    )}
                  </li>
                </ul>
              }
            />

            {/* Products & Services */}
            <Section
              t={t}
              title="আমাদের পণ্য ও সেবা"
              enTitle="Our Products & Services"
              icon="🥬"
              content={
                <div>
                  <p style={{ color: "#374151", marginBottom: "12px" }}>
                    {t(
                      "আমরা বিভিন্ন জৈব পণ্য এবং সেবা প্রদান করি:",
                      "We provide various organic products and services:"
                    )}
                  </p>
                  <ul
                    style={{
                      margin: "12px 0",
                      paddingLeft: "24px",
                      color: "#374151",
                      lineHeight: "1.8",
                    }}
                  >
                    <li>
                      {t(
                        "তাজা সবজি - মৌসুমী এবং বছরব্যাপী",
                        "Fresh vegetables - seasonal and year-round"
                      )}
                    </li>
                    <li>
                      {t("জৈব ফল এবং বেরি", "Organic fruits and berries")}
                    </li>
                    <li>
                      {t(
                        "হার্বস এবং মশলা - প্রাকৃতিক সুগন্ধ",
                        "Herbs and spices - natural aroma"
                      )}
                    </li>
                    <li>
                      {t("খামার তাজা দুধ এবং দই", "Farm-fresh milk and yogurt")}
                    </li>
                    <li>
                      {t(
                        "প্রশিক্ষণ এবং কর্মশালা - জৈব কৃষির জন্য",
                        "Training and workshops - on organic farming"
                      )}
                    </li>
                    <li>
                      {t(
                        "স্কুল কর্মসূচি - শিশুদের জন্য সচেতনতা",
                        "School programs - awareness for children"
                      )}
                    </li>
                  </ul>
                </div>
              }
            />

            {/* Certifications */}
            <Section
              t={t}
              title="শংসাপত্র এবং স্বীকৃতি"
              enTitle="Certifications & Awards"
              icon="🏆"
              content={
                <ul
                  style={{
                    margin: "12px 0",
                    paddingLeft: "24px",
                    color: "#374151",
                    lineHeight: "1.8",
                  }}
                >
                  <li>
                    ✓{" "}
                    {t(
                      "আন্তর্জাতিক জৈব শংসাপত্র",
                      "International Organic Certification"
                    )}
                  </li>
                  <li>
                    ✓{" "}
                    {t(
                      "জাতীয় কৃষি মান অনুমোদন",
                      "National Agricultural Standards Approval"
                    )}
                  </li>
                  <li>
                    ✓{" "}
                    {t(
                      "পরিবেশ বান্ধব ব্যবসায়ের জন্য স্বীকৃতি",
                      "Recognition for Eco-Friendly Business"
                    )}
                  </li>
                  <li>
                    ✓{" "}
                    {t(
                      "সম্প্রদায় সেবা পুরস্কার ২০২১",
                      "Community Service Award 2021"
                    )}
                  </li>
                  <li>
                    ✓{" "}
                    {t(
                      "টেকসই কৃষি নেতৃত্ব পুরস্কার ২০২৩",
                      "Sustainable Farming Leadership Award 2023"
                    )}
                  </li>
                </ul>
              }
            />

            {/* Sustainable Practices */}
            <Section
              t={t}
              title="টেকসই কৃষি অনুশীলন"
              enTitle="Sustainable Farming Practices"
              icon="🌍"
              content={
                <div>
                  <p style={{ color: "#374151", marginBottom: "12px" }}>
                    {t(
                      "আমরা অনেক টেকসই অনুশীলন অনুসরণ করি:",
                      "We follow many sustainable practices:"
                    )}
                  </p>
                  <ul
                    style={{
                      margin: "12px 0",
                      paddingLeft: "24px",
                      color: "#374151",
                      lineHeight: "1.8",
                    }}
                  >
                    <li>
                      {t(
                        "ফসল ঘূর্ণন - মাটির স্বাস্থ্য উন্নত করা",
                        "Crop rotation - improve soil health"
                      )}
                    </li>
                    <li>
                      {t(
                        "কম্পোস্টিং এবং বায়োডাইনামিক পদ্ধতি",
                        "Composting and biodynamic methods"
                      )}
                    </li>
                    <li>
                      {t(
                        "জল সংরক্ষণ - ড্রিপ সেচ এবং রেইন হার্ভেস্টিং",
                        "Water conservation - drip irrigation & rain harvesting"
                      )}
                    </li>
                    <li>
                      {t(
                        "জৈব বৈচিত্র্য সংরক্ষণ এবং বিরল প্রজাতি সুরক্ষা",
                        "Biodiversity conservation & rare species protection"
                      )}
                    </li>
                    <li>
                      {t("সৌর শক্তি ব্যবহার", "Solar energy utilization")}
                    </li>
                    <li>
                      {t(
                        "শূন্য বর্জ্য নীতি - সবকিছু পুনর্ব্যবহার করা হয়",
                        "Zero-waste policy - everything is reused"
                      )}
                    </li>
                  </ul>
                </div>
              }
            />

            {/* Community Impact */}
            <Section
              t={t}
              title="সম্প্রদায় এবং পরিবেশ প্রভাব"
              enTitle="Community & Environmental Impact"
              icon="❤️"
              content={
                <div>
                  <p style={{ color: "#374151", marginBottom: "12px" }}>
                    {t(
                      "আমরা বিশ্বাস করি ব্যবসা শুধু লাভের জন্য নয়, বরং সমাজের কল্যাণের জন্য।",
                      "We believe business is not just for profit, but for the good of society."
                    )}
                  </p>
                  <ul
                    style={{
                      margin: "12px 0",
                      paddingLeft: "24px",
                      color: "#374151",
                      lineHeight: "1.8",
                    }}
                  >
                    <li>
                      {t(
                        "• ৫০০+ সম্প্রদায়ের সদস্যদের কর্মসংস্থান সৃষ্টি",
                        "• Created employment for 500+ community members"
                      )}
                    </li>
                    <li>
                      {t(
                        "• স্থানীয় স্কুলে ১০টি বৃত্তি কর্মসূচি",
                        "• 10 scholarship programs in local schools"
                      )}
                    </li>
                    <li>
                      {t(
                        "• জৈব কৃষি প্রশিক্ষণ ১০,০০০+ কৃষকদের জন্য",
                        "• Organic farming training for 10,000+ farmers"
                      )}
                    </li>
                    <li>
                      {t(
                        "• ৫০০ হেক্টর জমি পুনরুদ্ধার এবং পুনর্বনায়ন",
                        "• Recovered and reforested 500 hectares of land"
                      )}
                    </li>
                    <li>
                      {t(
                        "• প্রতি বছর ১০,০০০ গাছ রোপণ",
                        "• Plant 10,000 trees every year"
                      )}
                    </li>
                  </ul>
                </div>
              }
            />

            {/* Call to Action */}
            <div
              style={{
                marginTop: "40px",
                padding: "24px",
                background: isDark
                  ? "linear-gradient(135deg, #065f46 0%, #047857 100%)"
                  : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                borderRadius: "12px",
                textAlign: "center",
                borderLeft: "4px solid #15803d",
              }}
            >
              <h3
                style={{
                  color: isDark ? "#6ee7b7" : "#15803d",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                {t("আমাদের পরিবারে যোগ দিন", "Join Our Family")}
              </h3>
              <p
                style={{
                  color: isDark ? "#a7f3d0" : "#4b7c59",
                  margin: 0,
                  lineHeight: "1.6",
                }}
              >
                {t(
                  "আপনার স্বাস্থ্য এবং পরিবেশ রক্ষার জন্য আজই জৈব পণ্য অর্ডার করুন। আমরা আপনার বিশ্বাসের মূল্য দিই এবং সর্বোত্তম সেবা প্রদানের জন্য প্রতিশ্রুতিবদ্ধ।",
                  "Order organic products today for your health and environmental protection. We value your trust and are committed to providing the best service."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(30px);
          }
        }

        @keyframes kenBurns {
          from {
            transform: scale(1) translateZ(0);
          }
          to {
            transform: scale(1.08) translateZ(0);
          }
        }

        @keyframes kenBurnsHover {
          from {
            transform: scale(1) translateZ(0);
          }
          to {
            transform: scale(1.12) translateZ(0);
          }
        }
      `}</style>
    </>
  );
}

function Section({ t, title, enTitle, icon, content, small }) {
  const { theme } = useAppSettings();
  const isDark = theme === "dark";
  const bgColor = isDark
    ? small
      ? "#1e293b"
      : "#334155"
    : small
    ? "#f9fafb"
    : "#f3f4f6";
  const textColor = isDark ? "#f8fafc" : "#374151";
  const headingColor = "#15803d";

  return (
    <div
      style={{
        marginBottom: small ? "16px" : "32px",
        padding: small ? "16px" : "20px",
        background: bgColor,
        borderRadius: "12px",
        borderLeft: "4px solid #15803d",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(4px)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 4px 12px rgba(21, 128, 61, 0.3)"
          : "0 4px 12px rgba(21, 128, 61, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <h3
        style={{
          fontSize: small ? "18px" : "22px",
          fontWeight: "600",
          color: headingColor,
          margin: "0 0 12px 0",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: small ? "24px" : "28px" }}>{icon}</span>
        {t(title, enTitle)}
      </h3>
      <div
        style={{
          fontSize: small ? "14px" : "15px",
          color: textColor,
          lineHeight: "1.7",
          margin: 0,
        }}
      >
        {content}
      </div>
    </div>
  );
}
