import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSettings } from "../Contexts/AppSettingsContext";

export default function Home() {
  const { getText } = useAppSettings();
  const t = (bn, en) => getText(bn, en);
  const [selectedService, setSelectedService] = useState(null);

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
    "https://images.unsplash.com/photo-1585470881645-b9498f8ecb41?auto=format&fit=crop&w=1600&h=900&q=90", // Mango orchard
    "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?auto=format&fit=crop&w=1600&h=900&q=90", // Fresh tomatoes (now 2nd image)
    "https://images.unsplash.com/photo-1563833717765-00598643a922?auto=format&fit=crop&w=1600&h=900&q=90", // Green field panorama
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
    <div style={{ minHeight: "100vh", background: "#fff" }}>
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
              background: "white",
              padding: "32px",
              borderRadius: "16px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              maxWidth: "500px",
              width: "100%",
              color: "#374151",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>
              {selectedService.icon}
            </div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "12px",
                color: "#1f2937",
              }}
            >
              {selectedService.title}
            </h2>
            <p
              style={{
                marginBottom: "16px",
                lineHeight: "1.6",
                color: "#4b5563",
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
                    background: "white",
                    color: "#15803d",
                    fontWeight: "600",
                    borderRadius: "8px",
                    textDecoration: "none",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.transform = "translateY(0)")
                  }
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
                    background: "transparent",
                    color: "white",
                    border: "2px solid white",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "white";
                    e.target.style.color = "#15803d";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "white";
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
                background: "white",
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
                  color: "#1f2937",
                }}
              >
                {s.title}
              </h4>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                {s.desc}
              </p>
              <button
                onClick={() => setSelectedService(s)}
                style={{
                  color: "#15803d",
                  fontWeight: "500",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "14px",
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
              color: "#1f2937",
            }}
          >
            {t("আমাদের খামার সম্পর্কে", "About Our Farm")}
          </h3>
          <p
            style={{
              color: "#4b5563",
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
              color: "#4b5563",
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
                color: "#1f2937",
                marginBottom: "4px",
              }}
            >
              {t("বৈশিষ্ট্যযুক্ত পণ্য", "Featured Products")}
            </h3>
            <p style={{ color: "#6b7280" }}>
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
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = "#15803d")}
            onMouseLeave={(e) => (e.target.style.borderColor = "#d1d5db")}
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
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                overflow: "hidden",
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
                    color: "#1f2937",
                  }}
                >
                  {p.name}
                </h4>
                <p style={{ color: "#4b5563", marginBottom: "16px" }}>
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
                  color: "#1f2937",
                  marginBottom: "16px",
                }}
              >
                {t("কেন আমাদের বেছে নিবেন", "Why Choose Us")}
              </h3>
              <p style={{ color: "#4b5563", marginBottom: "16px" }}>
                {t(
                  "আমরা আধুনিক পরিবেশবান্ধব কৌশলগুলির সাথে ঐতিহ্যবাহী কৃষি জ্ঞান মিশ্রিত করি।",
                  "We blend traditional farming wisdom with modern eco-friendly techniques."
                )}
              </p>
              <ul style={{ color: "#374151", lineHeight: "1.8" }}>
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
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
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
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
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
            color: "#1f2937",
            marginBottom: "24px",
          }}
        >
          {t("গ্রাহকরা যা বলেন", "What Customers Say")}
        </h3>
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              minHeight: "140px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  color: "#374151",
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
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                borderRadius: "12px",
                textAlign: "center",
                borderLeft: "4px solid #15803d",
              }}
            >
              <h3
                style={{
                  color: "#15803d",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                {t("আমাদের পরিবারে যোগ দিন", "Join Our Family")}
              </h3>
              <p
                style={{
                  color: "#4b7c59",
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
  return (
    <div
      style={{
        marginBottom: small ? "16px" : "32px",
        padding: small ? "16px" : "20px",
        background: small ? "#f9fafb" : "#f3f4f6",
        borderRadius: "12px",
        borderLeft: "4px solid #15803d",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(21, 128, 61, 0.1)";
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
          color: "#15803d",
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
          color: "#374151",
          lineHeight: "1.7",
          margin: 0,
        }}
      >
        {content}
      </div>
    </div>
  );
}
