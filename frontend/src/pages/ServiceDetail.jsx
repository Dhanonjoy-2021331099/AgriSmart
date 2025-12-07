import { useParams, useNavigate } from "react-router-dom";
import { useAppSettings } from "../Contexts/AppSettingsContext";
import { motion } from "framer-motion";
import { useCallback } from "react";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getText, language, theme } = useAppSettings();

  const t = useCallback(
    (key) => {
      const translations = {
        english: {
          // Organic Farming
          "service.organic-farming.title": "Organic Farming",
          "service.organic-farming.short":
            "Sustainable methods for healthy crops and soil",
          "service.organic-farming.overview":
            "Our Commitment to Natural Agriculture",
          "service.organic-farming.para1":
            "We believe in the power of nature and sustainable farming practices. Our organic farming approach eliminates the use of synthetic fertilizers and chemical pesticides, focusing instead on building healthy soil ecosystems that naturally support crop growth.",
          "service.organic-farming.para2":
            "By utilizing organic manure, compost, and natural pest management techniques, we ensure that every harvest is not only healthy for consumption but also beneficial for the long-term fertility of the land. Our methods have been refined over years of experience and continuous learning.",
          "service.organic-farming.para3":
            "We work closely with certified agronomists who monitor soil health through regular testing and analysis. This data-driven approach allows us to optimize crop yields while maintaining the highest environmental standards.",
          "service.organic-farming.para4":
            "Every farm that partners with us receives comprehensive support including training on organic methods, certification assistance, and access to our network of sustainable farming resources.",
          "service.organic-farming.benefits.title": "Key Benefits",
          "service.organic-farming.benefit1":
            "Increased soil fertility and microbial diversity",
          "service.organic-farming.benefit2":
            "Higher nutritional value in crops",
          "service.organic-farming.benefit3": "Reduced input costs over time",
          "service.organic-farming.benefit4":
            "Premium market prices for organic products",
          "service.organic-farming.benefit5":
            "Environmental conservation and climate resilience",
          "service.organic-farming.benefit6":
            "Better long-term farm sustainability",

          // Fresh Produce
          "service.fresh-produce.title": "Fresh Produce",
          "service.fresh-produce.short":
            "Farm-fresh vegetables and fruits delivered to you",
          "service.fresh-produce.overview": "From Our Farm to Your Table",
          "service.fresh-produce.para1":
            "Experience the unmatched freshness of produce picked from our farms and delivered to your doorstep within hours. We eliminate middlemen and unnecessary supply chain delays, ensuring that you receive vegetables and fruits at their peak nutritional value.",
          "service.fresh-produce.para2":
            "Our carefully curated selection includes seasonal vegetables, leafy greens, tropical fruits, and specialty items that are grown using sustainable methods. Every item is hand-picked by our trained agricultural staff who understand quality standards.",
          "service.fresh-produce.para3":
            "We maintain strict hygiene standards and use food-safe handling practices throughout the harvest, sorting, and delivery process. Our cold chain management ensures that produce stays fresh and crisp until it reaches your kitchen.",
          "service.fresh-produce.para4":
            "With our flexible ordering system, you can customize your weekly produce box based on your family's needs and preferences. We also offer special occasion orders and bulk purchases for restaurants and institutions.",
          "service.fresh-produce.benefits.title": "Why Choose Our Produce",
          "service.fresh-produce.benefit1":
            "Harvested at peak ripeness for maximum flavor and nutrition",
          "service.fresh-produce.benefit2":
            "Delivered same-day or next-morning within city limits",
          "service.fresh-produce.benefit3":
            "No pesticide residues - tested for safety",
          "service.fresh-produce.benefit4":
            "Competitive pricing compared to retail markets",
          "service.fresh-produce.benefit5":
            "Flexible ordering and customizable weekly boxes",
          "service.fresh-produce.benefit6":
            "Traceable farm-to-consumer transparency",

          // Livestock Care
          "service.livestock-care.title": "Livestock Care",
          "service.livestock-care.short":
            "Humane and modern care for livestock",
          "service.livestock-care.overview":
            "Modern Farming with Ethical Practices",
          "service.livestock-care.para1":
            "Our livestock management philosophy centers on the wellbeing of animals and sustainable production practices. We maintain spacious open-pen environments that allow animals to express natural behaviors while remaining under professional care and supervision.",
          "service.livestock-care.para2":
            "All animals in our care receive comprehensive health monitoring, including regular veterinary check-ups, vaccination programs, and disease prevention protocols. We prioritize preventive health measures to minimize the need for medications and antibiotics.",
          "service.livestock-care.para3":
            "Nutrition is carefully planned by our expert nutritionists to ensure optimal growth and health. We use high-quality, locally-sourced feed combined with natural supplements. Water quality is continuously monitored for purity and safety.",
          "service.livestock-care.para4":
            "We offer consultation services to farmers looking to improve their livestock management practices, including breeding advice, feed formulation, facility design, and productivity optimization while maintaining humane standards.",
          "service.livestock-care.benefits.title": "Our Livestock Benefits",
          "service.livestock-care.benefit1":
            "Reduced disease incidence through preventive care",
          "service.livestock-care.benefit2":
            "Improved productivity and milk/meat quality",
          "service.livestock-care.benefit3":
            "Lower mortality rates and better animal welfare",
          "service.livestock-care.benefit4":
            "Access to expert veterinary and nutritional guidance",
          "service.livestock-care.benefit5":
            "Natural growth without growth hormones or antibiotics",
          "service.livestock-care.benefit6":
            "Premium market rates for ethically-raised products",

          // Agriculture Consultation
          "service.agriculture-consultation.title": "Agriculture Consultation",
          "service.agriculture-consultation.short":
            "Expert advice to improve yield and reduce waste",
          "service.agriculture-consultation.overview":
            "Expert Guidance for Modern Farming",
          "service.agriculture-consultation.para1":
            "Our team of experienced agronomists and agricultural engineers provides comprehensive consulting services to help you maximize yields, reduce costs, and adopt sustainable practices. We begin with a detailed assessment of your current farming operations.",
          "service.agriculture-consultation.para2":
            "Our consultation covers critical areas including soil testing and analysis, optimal crop selection for your region, irrigation system design and management, integrated pest management strategies, and climate-resilient farming techniques.",
          "service.agriculture-consultation.para3":
            "We provide customized recommendations based on your specific soil conditions, climate zone, available resources, and market opportunities. Our consultants work with you over multiple growing seasons to ensure recommendations are successfully implemented.",
          "service.agriculture-consultation.para4":
            "Beyond initial consulting, we offer ongoing support including regular field visits, troubleshooting assistance, training sessions for your farm team, and connections to suppliers, markets, and financing options.",
          "service.agriculture-consultation.benefits.title":
            "Consultation Services Include",
          "service.agriculture-consultation.benefit1":
            "Comprehensive soil testing and analysis",
          "service.agriculture-consultation.benefit2":
            "Crop selection and rotation planning",
          "service.agriculture-consultation.benefit3":
            "Irrigation and water management optimization",
          "service.agriculture-consultation.benefit4":
            "Pest management and disease control strategies",
          "service.agriculture-consultation.benefit5":
            "Climate adaptation and risk management",
          "service.agriculture-consultation.benefit6":
            "Business planning and market access support",

          // Common strings
          "back.to.services": "Back to Services",
          "service.benefits": "Key Benefits",
        },
        bangla: {
          // Organic Farming
          "service.organic-farming.title": "জৈব চাষাবাদ",
          "service.organic-farming.short":
            "স্বাস্থ্যকর ফসল এবং মাটির জন্য টেকসই পদ্ধতি",
          "service.organic-farming.overview":
            "প্রাকৃতিক কৃষিতে আমাদের অঙ্গীকার",
          "service.organic-farming.para1":
            "আমরা প্রকৃতির শক্তি এবং টেকসই কৃষি পদ্ধতিতে বিশ্বাস করি। আমাদের জৈব চাষাবাদ পদ্ধতি কৃত্রিম সার এবং রাসায়নিক কীটনাশক ব্যবহার নির্মূল করে এবং স্বাস্থ্যকর মাটির ইকোসিস্টেম গড়ে তোলে যা প্রাকৃতিকভাবে ফসল বৃদ্ধিকে সমর্থন করে।",
          "service.organic-farming.para2":
            "জৈব সার, কম্পোস্ট এবং প্রাকৃতিক কীটপতঙ্গ ব্যবস্থাপনা কৌশল ব্যবহার করে, আমরা নিশ্চিত করি যে প্রতিটি ফসল শুধুমাত্র ভোগের জন্য স্বাস্থ্যকর নয় বরং মাটির দীর্ঘমেয়াদী উর্বরতার জন্য উপকারী।",
          "service.organic-farming.para3":
            "আমরা সার্টিফাইড কৃষিবিদদের সাথে ঘনিষ্ঠভাবে কাজ করি যারা নিয়মিত পরীক্ষা এবং বিশ্লেষণের মাধ্যমে মাটির স্বাস্থ্য পর্যবেক্ষণ করেন। এই ডেটা-চালিত পদ্ধতি আমাদের সর্বোচ্চ পরিবেশগত মান বজায় রেখে ফসলের ফলন অপ্টিমাইজ করতে সাহায্য করে।",
          "service.organic-farming.para4":
            "আমাদের সাথে যে প্রতিটি খামার অংশীদারিত্ব করে তা জৈব পদ্ধতির প্রশিক্ষণ, সার্টিফিকেশন সহায়তা এবং টেকসই চাষাবাদ সম্পদের নেটওয়ার্ক অ্যাক্সেস সহ ব্যাপক সহায়তা পায়।",
          "service.organic-farming.benefits.title": "মূল সুবিধাসমূহ",
          "service.organic-farming.benefit1":
            "মাটির উর্বরতা এবং মাইক্রোবায়াল বৈচিত্র্য বৃদ্ধি",
          "service.organic-farming.benefit2": "ফসলে উচ্চতর পুষ্টিগুণ",
          "service.organic-farming.benefit3":
            "সময়ের সাথে হ্রাস পাওয়া ইনপুট খরচ",
          "service.organic-farming.benefit4":
            "জৈব পণ্যের জন্য প্রিমিয়াম বাজার মূল্য",
          "service.organic-farming.benefit5":
            "পরিবেশ সংরক্ষণ এবং জলবায়ু স্থিতিস্থাপকতা",
          "service.organic-farming.benefit6":
            "ভালো দীর্ঘমেয়াদী খামার স্থায়িত্ব",

          // Fresh Produce
          "service.fresh-produce.title": "তাজা পণ্য",
          "service.fresh-produce.short":
            "খামার থেকে তাজা শাকসবজি এবং ফল সরবরাহ",
          "service.fresh-produce.overview": "আমাদের খামার থেকে আপনার টেবিলে",
          "service.fresh-produce.para1":
            "আমাদের খামার থেকে তোলা পণ্য কয়েক ঘণ্টার মধ্যে আপনার দোরগোড়ায় পৌঁছায় - এর তুলনা অতুলনীয়। আমরা মধ্যস্থতাকারী এবং অপ্রয়োজনীয় সরবরাহ শৃঙ্খল বিলম্ব দূর করি, যাতে আপনি সর্বোচ্চ পুষ্টিগত মূল্যে শাকসবজি এবং ফল পান।",
          "service.fresh-produce.para2":
            "আমাদের সাবধানে নির্বাচিত সংগ্রহে মৌসুমী শাকসবজি, সবুজ শাক, গ্রীষ্মমণ্ডলীয় ফল এবং বিশেষ আইটেম অন্তর্ভুক্ত থাকে যা টেকসই পদ্ধতি ব্যবহার করে চাষ করা হয়।",
          "service.fresh-produce.para3":
            "আমরা গুণমানের মান বোঝেন এমন আমাদের প্রশিক্ষিত কৃষি কর্মীদের দ্বারা প্রতিটি আইটেম হাতে তোলা হয়। ফসল কাটা থেকে ডেলিভারি পর্যন্ত প্রক্রিয়ার সময় কঠোর স্বাস্থ্যবিধি মান বজায় রাখি।",
          "service.fresh-produce.para4":
            "আমাদের নমনীয় অর্ডারিং সিস্টেম দিয়ে আপনি আপনার পরিবারের চাহিদা এবং পছন্দ অনুযায়ী আপনার সাপ্তাহিক পণ্য বাক্স কাস্টমাইজ করতে পারেন।",
          "service.fresh-produce.benefits.title": "আমাদের পণ্য বেছে নিন কারণ",
          "service.fresh-produce.benefit1":
            "সর্বোচ্চ স্বাদ এবং পুষ্টির জন্য পরিপক্কতায় তোলা",
          "service.fresh-produce.benefit2":
            "শহরের সীমার মধ্যে একই দিনে বা পরের সকালে সরবরাহ",
          "service.fresh-produce.benefit3":
            "কোনো কীটনাশকের অবশেষ নেই - নিরাপত্তার জন্য পরীক্ষিত",
          "service.fresh-produce.benefit4":
            "খুচরা বাজারের সাথে তুলনীয় প্রতিযোগিতামূলক মূল্য",
          "service.fresh-produce.benefit5":
            "নমনীয় অর্ডারিং এবং কাস্টমাইজযোগ্য সাপ্তাহিক বাক্স",
          "service.fresh-produce.benefit6":
            "সনাক্তকরণযোগ্য খামার-থেকে-ভোক্তা স্বচ্ছতা",

          // Livestock Care
          "service.livestock-care.title": "গবাদি পশু যত্ন",
          "service.livestock-care.short":
            "গবাদি পশুর জন্য মানবিক এবং আধুনিক যত্ন",
          "service.livestock-care.overview":
            "নৈতিক অনুশীলনের সাথে আধুনিক চাষাবাদ",
          "service.livestock-care.para1":
            "আমাদের গবাদি পশু ব্যবস্থাপনা দর্শন পশুর কল্যাণ এবং টেকসই উৎপাদন অনুশীলনের উপর কেন্দ্রীভূত। আমরা বিশাল খোলা-পেন পরিবেশ বজায় রাখি যা পশুদের প্রাকৃতিক আচরণ প্রকাশ করার অনুমতি দেয় পেশাদার যত্ন এবং তত্ত্বাবধানের অধীন থাকার সময়।",
          "service.livestock-care.para2":
            "আমাদের যত্নে থাকা সমস্ত পশু ব্যাপক স্বাস্থ্য পর্যবেক্ষণ পায়, যার মধ্যে নিয়মিত পশুচিকিৎসা পরীক্ষা, টিকাকরণ প্রোগ্রাম এবং রোগ প্রতিরোধ প্রোটোকল রয়েছে।",
          "service.livestock-care.para3":
            "পুষ্টি আমাদের বিশেষজ্ঞ পুষ্টিবিদদের দ্বারা সাবধানে পরিকল্পিত হয় সর্বোত্তম বৃদ্ধি এবং স্বাস্থ্য নিশ্চিত করতে। আমরা উচ্চ মানের, স্থানীয়ভাবে উৎস করা খাবার প্রাকৃতিক সম্পূরক সহ ব্যবহার করি।",
          "service.livestock-care.para4":
            "আমরা এমন কৃষকদের জন্য পরামর্শ পরিষেবা প্রদান করি যারা তাদের গবাদি পশু ব্যবস্থাপনা অনুশীলন উন্নত করতে চায়, প্রজনন পরামর্শ, খাদ্য সূত্র, সুবিধা ডিজাইন এবং উৎপাদনশীলতা অপ্টিমাইজেশন সহ।",
          "service.livestock-care.benefits.title": "আমাদের গবাদি সুবিধা",
          "service.livestock-care.benefit1":
            "প্রতিরোধমূলক যত্নের মাধ্যমে কমানো রোগ ঘটনা",
          "service.livestock-care.benefit2":
            "উন্নত উৎপাদনশীলতা এবং দুধ/মাংসের গুণমান",
          "service.livestock-care.benefit3":
            "কম মৃত্যুর হার এবং ভাল প্রাণী কল্যাণ",
          "service.livestock-care.benefit4":
            "বিশেষজ্ঞ পশুচিকিৎসা এবং পুষ্টি নির্দেশনায় অ্যাক্সেস",
          "service.livestock-care.benefit5":
            "বৃদ্ধির হরমোন বা অ্যান্টিবায়োটিক ছাড়াই প্রাকৃতিক বৃদ্ধি",
          "service.livestock-care.benefit6":
            "নৈতিকভাবে উত্থাপিত পণ্যের জন্য প্রিমিয়াম বাজার হার",

          // Agriculture Consultation
          "service.agriculture-consultation.title": "কৃষি পরামর্শ",
          "service.agriculture-consultation.short":
            "উৎপাদন বৃদ্ধি এবং অপচয় কমাতে বিশেষজ্ঞ পরামর্শ",
          "service.agriculture-consultation.overview":
            "আধুনিক চাষাবাদের জন্য বিশেষজ্ঞ নির্দেশনা",
          "service.agriculture-consultation.para1":
            "আমাদের অভিজ্ঞ কৃষিবিদ এবং কৃষি প্রকৌশলীদের দল ব্যাপক পরামর্শ সেবা প্রদান করে যা আপনাকে ফলন সর্বাধিক করতে, খরচ কমাতে এবং টেকসই অনুশীলন গ্রহণ করতে সাহায্য করে।",
          "service.agriculture-consultation.para2":
            "আমাদের পরামর্শ মাটি পরীক্ষা এবং বিশ্লেষণ, আপনার অঞ্চলের জন্য সর্বোত্তম ফসল নির্বাচন, সেচ ব্যবস্থা ডিজাইন এবং ব্যবস্থাপনা, একীভূত কীটপতঙ্গ ব্যবস্থাপনা কৌশল এবং জলবায়ু-স্থিতিস্থাপক চাষাবাদ কৌশল সহ গুরুত্বপূর্ণ ক্ষেত্রগুলি কভার করে।",
          "service.agriculture-consultation.para3":
            "আমরা আপনার নির্দিষ্ট মাটির অবস্থা, জলবায়ু অঞ্চল, উপলব্ধ সম্পদ এবং বাজার সুযোগের উপর ভিত্তি করে কাস্টমাইজড সুপারিশ প্রদান করি।",
          "service.agriculture-consultation.para4":
            "প্রাথমিক পরামর্শের বাইরে, আমরা নিয়মিত ক্ষেত্র পরিদর্শন, সমস্যা সমাধান সহায়তা, আপনার খামার দলের জন্য প্রশিক্ষণ সেশন এবং সরবরাহকারী, বাজার এবং অর্থায়ন বিকল্পগুলির সংযোগ সহ চলমান সমর্থন প্রদান করি।",
          "service.agriculture-consultation.benefits.title":
            "পরামর্শ পরিষেবাগুলির মধ্যে অন্তর্ভুক্ত",
          "service.agriculture-consultation.benefit1":
            "ব্যাপক মাটি পরীক্ষা এবং বিশ্লেষণ",
          "service.agriculture-consultation.benefit2":
            "ফসল নির্বাচন এবং ঘূর্ণন পরিকল্পনা",
          "service.agriculture-consultation.benefit3":
            "সেচ এবং জল ব্যবস্থাপনা অপ্টিমাইজেশন",
          "service.agriculture-consultation.benefit4":
            "কীটপতঙ্গ ব্যবস্থাপনা এবং রোগ নিয়ন্ত্রণ কৌশল",
          "service.agriculture-consultation.benefit5":
            "জলবায়ু অভিযোজন এবং ঝুঁকি ব্যবস্থাপনা",
          "service.agriculture-consultation.benefit6":
            "ব্যবসায়িক পরিকল্পনা এবং বাজার অ্যাক্সেস সহায়তা",

          // Common strings
          "back.to.services": "সেবায় ফিরে",
          "service.benefits": "মূল সুবিধাসমূহ",
        },
      };

      const langKey = language === "bangla" ? "bangla" : "english";
      return translations[langKey][key] || key;
    },
    [language]
  );

  const servicesData = {
    "organic-farming": {
      icon: "🌱",
      titleKey: "service.organic-farming.title",
      shortKey: "service.organic-farming.short",
      overviewKey: "service.organic-farming.overview",
      paragraphs: [
        "service.organic-farming.para1",
        "service.organic-farming.para2",
        "service.organic-farming.para3",
        "service.organic-farming.para4",
      ],
      benefitsKey: "service.organic-farming.benefits.title",
      benefits: [
        "service.organic-farming.benefit1",
        "service.organic-farming.benefit2",
        "service.organic-farming.benefit3",
        "service.organic-farming.benefit4",
        "service.organic-farming.benefit5",
        "service.organic-farming.benefit6",
      ],
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=600&fit=crop&q=80",
    },
    "fresh-produce": {
      icon: "🍅",
      titleKey: "service.fresh-produce.title",
      shortKey: "service.fresh-produce.short",
      overviewKey: "service.fresh-produce.overview",
      paragraphs: [
        "service.fresh-produce.para1",
        "service.fresh-produce.para2",
        "service.fresh-produce.para3",
        "service.fresh-produce.para4",
      ],
      benefitsKey: "service.fresh-produce.benefits.title",
      benefits: [
        "service.fresh-produce.benefit1",
        "service.fresh-produce.benefit2",
        "service.fresh-produce.benefit3",
        "service.fresh-produce.benefit4",
        "service.fresh-produce.benefit5",
        "service.fresh-produce.benefit6",
      ],
      image:
        "https://images.unsplash.com/photo-1488459716781-6818a6d5ff22?w=1200&h=600&fit=crop&q=80",
    },
    "livestock-care": {
      icon: "🐄",
      titleKey: "service.livestock-care.title",
      shortKey: "service.livestock-care.short",
      overviewKey: "service.livestock-care.overview",
      paragraphs: [
        "service.livestock-care.para1",
        "service.livestock-care.para2",
        "service.livestock-care.para3",
        "service.livestock-care.para4",
      ],
      benefitsKey: "service.livestock-care.benefits.title",
      benefits: [
        "service.livestock-care.benefit1",
        "service.livestock-care.benefit2",
        "service.livestock-care.benefit3",
        "service.livestock-care.benefit4",
        "service.livestock-care.benefit5",
        "service.livestock-care.benefit6",
      ],
      image:
        "https://images.unsplash.com/photo-1500595046891-79fde914d2d9?w=1200&h=600&fit=crop&q=80",
    },
    "agriculture-consultation": {
      icon: "🧑‍🌾",
      titleKey: "service.agriculture-consultation.title",
      shortKey: "service.agriculture-consultation.short",
      overviewKey: "service.agriculture-consultation.overview",
      paragraphs: [
        "service.agriculture-consultation.para1",
        "service.agriculture-consultation.para2",
        "service.agriculture-consultation.para3",
        "service.agriculture-consultation.para4",
      ],
      benefitsKey: "service.agriculture-consultation.benefits.title",
      benefits: [
        "service.agriculture-consultation.benefit1",
        "service.agriculture-consultation.benefit2",
        "service.agriculture-consultation.benefit3",
        "service.agriculture-consultation.benefit4",
        "service.agriculture-consultation.benefit5",
        "service.agriculture-consultation.benefit6",
      ],
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=600&fit=crop&q=80",
    },
  };

  const service = servicesData[slug];

  if (!service) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Service not found</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isDark = theme === "dark";
  const bgColor = isDark ? "#0f172a" : "#ffffff";
  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const textSecondary = isDark ? "#cbd5e1" : "#475569";
  const textMuted = isDark ? "#94a3b8" : "#64748b";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        background: bgColor,
        color: textColor,
        padding: "60px 20px",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/")}
          variants={itemVariants}
          style={{
            background: "none",
            border: `2px solid ${isDark ? "#4ade80" : "#22c55e"}`,
            color: isDark ? "#4ade80" : "#22c55e",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "40px",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s",
          }}
          whileHover={{ scale: 1.05 }}
        >
          ← {t("back.to.services")}
        </motion.button>

        {/* Icon and Title Section */}
        <motion.div
          variants={itemVariants}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <motion.div
            style={{ fontSize: "80px", marginBottom: "20px" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {service.icon}
          </motion.div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              fontWeight: "700",
              marginBottom: "12px",
            }}
          >
            {t(service.titleKey)}
          </h1>
          <p style={{ fontSize: "18px", color: textSecondary }}>
            {t(service.shortKey)}
          </p>
        </motion.div>

        {/* Overview Section */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: "40px",
            padding: "24px",
            background: isDark ? "#1e293b" : "#f8fafc",
            borderRadius: "12px",
            borderLeft: `4px solid ${isDark ? "#4ade80" : "#22c55e"}`,
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            {t(service.overviewKey)}
          </h2>
        </motion.div>

        {/* Detailed Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: "40px" }}
        >
          {service.paragraphs.map((paraKey, idx) => (
            <motion.p
              key={idx}
              variants={itemVariants}
              style={{
                fontSize: "16px",
                lineHeight: "1.8",
                marginBottom: "20px",
                color: textSecondary,
                textAlign: "justify",
              }}
            >
              {t(paraKey)}
            </motion.p>
          ))}
        </motion.div>

        {/* Image */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: "40px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: isDark
              ? "0 10px 40px rgba(0,0,0,0.3)"
              : "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={service.image}
            alt={t(service.titleKey)}
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/1200x600/22c55e/ffffff?text=Service+Image";
            }}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "500px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.div>

        {/* Benefits Section */}
        <motion.div variants={itemVariants}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            {t(service.benefitsKey)}
          </h2>
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {service.benefits.map((benefitKey, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                style={{
                  padding: "20px",
                  background: isDark ? "#1e293b" : "#f8fafc",
                  borderRadius: "8px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
                whileHover={{ y: -4 }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    marginTop: "4px",
                    minWidth: "24px",
                    color: isDark ? "#4ade80" : "#22c55e",
                  }}
                >
                  ✓
                </span>
                <p
                  style={{ fontSize: "14px", color: textSecondary, margin: 0 }}
                >
                  {t(benefitKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: "60px",
            padding: "40px",
            background: isDark ? "#1e293b" : "#f8fafc",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Ready to get started?
          </h3>
          <p
            style={{
              fontSize: "16px",
              color: textSecondary,
              marginBottom: "24px",
            }}
          >
            Contact us today to learn more about this service and how we can
            help your farm.
          </p>
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              setTimeout(() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}
            style={{
              display: "inline-block",
              padding: "14px 36px",
              background: "#22c55e",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 20px rgba(34, 197, 94, 0.4)";
              e.target.style.background = "#16a34a";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.2)";
              e.target.style.background = "#22c55e";
            }}
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
