import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Camera,
  Leaf,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useAppSettings } from "../Contexts/AppSettingsContext";

const aiDetectionText = {
  en: {
    "aiDetection.tag": "AI Technology",
    "aiDetection.title": "AI Detection",
    "aiDetection.subtitle":
      "Identify crop diseases and pests quickly and accurately",
    "aiDetection.upload.title": "Upload a photo",
    "aiDetection.upload.select": "Choose an image",
    "aiDetection.upload.drag": "or drag & drop",
    "aiDetection.crop": "Crop selected area",
    "aiDetection.detect": "Analyze with AI",
    "aiDetection.detecting": "Analyzing...",
    "aiDetection.results.title": "Detection Results",
    "aiDetection.severityLabel": "Severity",
    "aiDetection.causes.title": "Causes",
    "aiDetection.solutions.title": "Remedies",
    "aiDetection.empty.title": "Start detection",
    "aiDetection.empty.subtitle": "Upload an image to analyze",
    "aiDetection.features.title": "Benefits of AI detection",
    "aiDetection.features.fast.title": "Fast detection",
    "aiDetection.features.fast.copy":
      "Identify diseases in seconds and get instant advice",
    "aiDetection.features.accurate.title": "Accurate results",
    "aiDetection.features.accurate.copy":
      "Advanced AI models provide 90%+ precision",
    "aiDetection.features.expert.title": "Expert guidance",
    "aiDetection.features.expert.copy":
      "Automated treatment suggestions and remedies",
  },
  bn: {
    "aiDetection.tag": "এআই প্রযুক্তি",
    "aiDetection.title": "এআই শনাক্তকরণ",
    "aiDetection.subtitle":
      "আপনার ফসলের রোগ এবং কীটপতঙ্গ দ্রুত ও সঠিকভাবে শনাক্ত করুন",
    "aiDetection.upload.title": "ছবি আপলোড করুন",
    "aiDetection.upload.select": "ছবি নির্বাচন করুন",
    "aiDetection.upload.drag": "অথবা টেনে এনে ছাড়ুন",
    "aiDetection.crop": "নির্বাচিত এলাকা ক্রপ করুন",
    "aiDetection.detect": "এআই দিয়ে বিশ্লেষণ করুন",
    "aiDetection.detecting": "বিশ্লেষণ চলছে...",
    "aiDetection.results.title": "শনাক্তকরণ ফলাফল",
    "aiDetection.severityLabel": "তীব্রতা",
    "aiDetection.causes.title": "কারণসমূহ",
    "aiDetection.solutions.title": "প্রতিকার",
    "aiDetection.empty.title": "শনাক্তকরণ শুরু করুন",
    "aiDetection.empty.subtitle": "ছবি আপলোড করে বিশ্লেষণ করুন",
    "aiDetection.features.title": "এআই শনাক্তকরণের সুবিধা",
    "aiDetection.features.fast.title": "দ্রুত শনাক্তকরণ",
    "aiDetection.features.fast.copy":
      "কয়েক সেকেন্ডে রোগ শনাক্ত করুন এবং তাৎক্ষণিক পরামর্শ পান",
    "aiDetection.features.accurate.title": "সঠিক ফলাফল",
    "aiDetection.features.accurate.copy":
      "উন্নত এআই মডেল ব্যবহার করে ৯০%+ নির্ভুলতা",
    "aiDetection.features.expert.title": "বিশেষজ্ঞ পরামর্শ",
    "aiDetection.features.expert.copy":
      "স্বয়ংক্রিয় চিকিৎসা পরামর্শ এবং প্রতিকারের উপায়",
  },
};

const diseaseProfiles = [
  {
    disease: { bn: "পাতাঝরা ব্লাইট", en: "Brown Spot Blight" },
    latinName: { bn: "Bipolaris oryzae", en: "Bipolaris oryzae" },
    confidence: "92%",
    severity: { bn: "উচ্চ", en: "High" },
    summary: {
      bn: "পাতার কিনারা থেকে বাদামী দাগ শুরু হয়ে ধীরে ধীরে পাতাকে শুকিয়ে ফেলে। দ্রুত ব্যবস্থা না নিলে ফলনের ৩০-৪০% নষ্ট হয়।",
      en: "Brown lesions start at the leaf edges and slowly dry the leaf. Without quick action, yields may drop by 30-40%.",
    },
    causes: [
      {
        bn: "গরম ও আর্দ্র পরিবেশে ছত্রাকের দ্রুত বংশবিস্তার",
        en: "Rapid fungal spread in warm and humid conditions",
      },
      {
        bn: "অতিরিক্ত নাইট্রোজেন সার ব্যবহারে নরম পাতা তৈরি",
        en: "Soft leaves caused by excessive nitrogen fertilization",
      },
      {
        bn: "ঘন লাগানো জমিতে বাতাস চলাচলে বাধা",
        en: "Dense planting restricts airflow",
      },
    ],
    solutions: [
      {
        bn: "৭-১০ দিন পরপর কপার-ভিত্তিক ফাংগিসাইড স্প্রে করুন",
        en: "Spray copper-based fungicide every 7-10 days",
      },
      {
        bn: "গাছের মাঝের পাতা পাতলা করে বাতাস চলাচল নিশ্চিত করুন",
        en: "Thin inner leaves to improve airflow",
      },
      {
        bn: "সেচের পানি জমে না থাকলে রোগ কমে",
        en: "Avoid standing water to reduce disease pressure",
      },
    ],
    blogSections: [
      {
        title: {
          bn: "দ্রুত শনাক্তকরণ কেন জরুরি?",
          en: "Why rapid detection matters",
        },
        content: {
          bn: "পাতার উপর লম্বাটে বাদামী দাগ দেখা গেলে ২৪ ঘণ্টার মধ্যে ট্রিটমেন্ট শুরু করলে ছত্রাক ছড়ানো ঠেকানো সম্ভব। দেরি করলে দাগগুলো মধ্যভাগে ধূসর হয়ে চারপাশে গাঢ় বাদামী রিং তৈরি করে।",
          en: "Treat within 24 hours of spotting elongated brown lesions to stop spread. Delays turn centers gray with dark brown rings.",
        },
      },
      {
        title: { bn: "জনপ্রিয় কৃষকদের অভিজ্ঞতা", en: "Farmer spotlight" },
        content: {
          bn: "ঝিনাইদহের কৃষক মিজানুল হক ক্রপ মনিটরিং সেন্সর ব্যবহার করে আর্দ্রতার তথ্য দেখে সেচ কমিয়েছেন। ফলে ব্লাইটের মাত্রা ৫০% কমেছে এবং স্প্রে খরচ অর্ধেকে নেমেছে।",
          en: "Farmer Mizanul from Jhenaidah used moisture sensors to reduce irrigation, cutting blight by 50% and spray costs in half.",
        },
      },
    ],
  },
  {
    disease: { bn: "ব্ল্যাক স্পট ফাঙ্গাস", en: "Black Spot Fungus" },
    latinName: { bn: "Alternaria solani", en: "Alternaria solani" },
    confidence: "88%",
    severity: { bn: "মাঝারি", en: "Medium" },
    summary: {
      bn: "টমেটো ও আলুর পাতায় কালচে বৃত্তাকার দাগ তৈরি হয় যা দ্রুত বড় হয়ে পাতাকে ঝলসে দেয়।",
      en: "Dark circular spots form on tomato and potato leaves, quickly enlarging and scorching foliage.",
    },
    causes: [
      {
        bn: "হঠাৎ তাপমাত্রা পরিবর্তন ও শিশিরপাত",
        en: "Sudden temperature shifts and heavy dew",
      },
      {
        bn: "পূর্বের ফসলের গাছের অবশিষ্টাংশ না পরিষ্কার করা",
        en: "Uncleared crop residue from previous harvest",
      },
      {
        bn: "উচ্চ আর্দ্রতায় জৈব সার অবশিষ্ট গরম হয়ে যাওয়া",
        en: "Organic residue heating under high humidity",
      },
    ],
    solutions: [
      {
        bn: "আবোনিক তামা-ওক্সিক্লোরাইড বা ক্লোরোথালোনিল স্প্রে",
        en: "Apply copper oxychloride or chlorothalonil sprays",
      },
      {
        bn: "ফসল কাটার পরে জমির আবর্জনা পুড়িয়ে ফেলুন",
        en: "Burn field debris after harvest",
      },
      {
        bn: "প্রতি ১৫ দিনে জৈব মুলচ উলটে দিন যাতে বাতাস ঢোকে",
        en: "Turn organic mulch every 15 days to aerate",
      },
    ],
    blogSections: [
      {
        title: { bn: "লক্ষণ ও পর্যবেক্ষণ", en: "Symptoms to watch" },
        content: {
          bn: "পাতার উপরের অংশে ছোট কালো দাগ দিয়ে শুরু হয়। ধীরে ধীরে দাগের চারদিকে হলুদ বর্ডার তৈরি হয়। সঠিক সময়ে শনাক্ত না হলে ফলের গায়েও কালো দাগ পড়ে।",
          en: "Starts as small black spots on upper leaves; yellow halos form as they expand. Late detection leads to fruit spots too.",
        },
      },
      {
        title: {
          bn: "প্রতিরোধে স্মার্ট ক্যালেন্ডার",
          en: "Smart calendar prevention",
        },
        content: {
          bn: "AI শিডিউলার বৃষ্টির সম্ভাবনা দেখিয়ে সতর্ক করলে আগেই প্রতিরোধক স্প্রে করলে আক্রান্ত ক্ষেত্র ৬০% কমে।",
          en: "Using AI rain alerts to spray preventively can cut affected area by 60%.",
        },
      },
    ],
  },
  {
    disease: { bn: "লিফ কার্ল ভাইরাস", en: "Leaf Curl Virus" },
    latinName: { bn: "Begomovirus spp.", en: "Begomovirus spp." },
    confidence: "79%",
    severity: { bn: "নিম্ন", en: "Low" },
    summary: {
      bn: "পাতা উপরের দিকে কুঁকড়ে যায়, রঙ হালকা হয়ে ধমনী বেরিয়ে আসে। ভাইরাস হলেও দ্রুত পরিচর্যায় ক্ষতি কমানো যায়।",
      en: "Leaves curl upward, fade in color, and veins protrude. Damage stays low with timely care despite being viral.",
    },
    causes: [
      {
        bn: "সাদা মাছি বা অ্যাফিডের আক্রমণ",
        en: "Whitefly or aphid infestation",
      },
      {
        bn: "দূষিত চারা/ডাল ব্যবহার",
        en: "Using infected seedlings or cuttings",
      },
      {
        bn: "একই জমিতে বারবার একই ফসল",
        en: "Repeatedly planting the same crop on the same land",
      },
    ],
    solutions: [
      {
        bn: "সাদা মাছি প্রতিরোধে নীল আঠালো ফাঁদ ব্যবহার",
        en: "Use blue sticky traps to control whiteflies",
      },
      {
        bn: "ভাইরাসমুক্ত জাতের চারা সংগ্রহ",
        en: "Plant virus-free varieties",
      },
      {
        bn: "নিয়মিত জৈব কীটনাশক (নিম তেল) ব্যবহার",
        en: "Apply organic pesticides (neem oil) regularly",
      },
    ],
    blogSections: [
      {
        title: { bn: "কীভাবে দ্রুত আলাদা করবেন", en: "How to spot quickly" },
        content: {
          bn: "পাতা হাতের তালুর মতো বাঁকা হয়ে যায়, শিরা মোটা ও গা ছাড়া হয়। নতুন পাতায় বিকৃতি বেশি থাকে।",
          en: "Leaves curve like a palm with prominent veins; distortion is most visible on new leaves.",
        },
      },
      {
        title: { bn: "ব্যবস্থাপনার রুটিন", en: "Management routine" },
        content: {
          bn: "৩ দিনের ব্যবধানে নিম তেল স্প্রে, আক্রান্ত পাতা তুলে পুড়িয়ে ফেলা এবং পরবর্তী রোপণে প্রতিরোধী জাত ব্যবহারে রোগের পুনরাবৃত্তি কমে।",
          en: "Spray neem oil every 3 days, remove and burn infected leaves, and use resistant varieties in the next planting to reduce recurrence.",
        },
      },
    ],
  },
];

export default function AIDetection() {
  const { language, theme } = useAppSettings();
  const langKey = language === "bangla" ? "bn" : "en";
  const isDark = theme === "dark";
  const t = useCallback(
    (key) => aiDetectionText[langKey]?.[key] || key,
    [langKey]
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropRect, setCropRect] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageContainerRef = useRef(null);

  const localizedProfiles = useMemo(
    () =>
      diseaseProfiles.map((profile) => ({
        disease: profile.disease[langKey],
        latinName: profile.latinName[langKey],
        confidence: profile.confidence,
        severity: profile.severity[langKey],
        summary: profile.summary[langKey],
        causes: profile.causes.map((c) => c[langKey]),
        solutions: profile.solutions.map((s) => s[langKey]),
        blogSections: profile.blogSections.map((section) => ({
          title: section.title[langKey],
          content: section.content[langKey],
        })),
      })),
    [langKey]
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setCroppedImage(null);
        setCropRect(null);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRelativePosition = (clientX, clientY) => {
    if (!imageContainerRef.current) return null;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
    return { x, y, rect };
  };

  const handleMouseDown = (e) => {
    const position = getRelativePosition(e.clientX, e.clientY);
    if (!position) return;
    setIsDragging(true);
    setDragStart({ x: position.x, y: position.y });
    setCropRect({ x: position.x, y: position.y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;
    const position = getRelativePosition(e.clientX, e.clientY);
    if (!position) return;
    const width = position.x - dragStart.x;
    const height = position.y - dragStart.y;
    setCropRect({
      x: width < 0 ? position.x : dragStart.x,
      y: height < 0 ? position.y : dragStart.y,
      width: Math.abs(width),
      height: Math.abs(height),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCropConfirm = () => {
    if (!selectedImage || !cropRect || !imageContainerRef.current) return;
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const containerWidth = imageContainerRef.current.offsetWidth;
      const containerHeight = imageContainerRef.current.offsetHeight;
      const scaleX = img.naturalWidth / containerWidth;
      const scaleY = img.naturalHeight / containerHeight;

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(cropRect.width * scaleX));
      canvas.height = Math.max(1, Math.round(cropRect.height * scaleY));

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        cropRect.x * scaleX,
        cropRect.y * scaleY,
        cropRect.width * scaleX,
        cropRect.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      setCroppedImage(canvas.toDataURL("image/png"));
    };
  };

  const handleDetection = async () => {
    if (!selectedImage && !croppedImage) return;

    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const locale = langKey === "bn" ? "bn-BD" : "en-US";
      const profile =
        localizedProfiles[Math.floor(Math.random() * localizedProfiles.length)];
      setResult({
        ...profile,
        detectedImage: croppedImage || selectedImage,
        timestamp: new Date().toLocaleString(locale),
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
      }`}
    >
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-64 md:h-80 bg-gradient-to-r from-green-800/90 to-emerald-600/75 relative">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=60"
            alt="AI Detection"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center justify-center text-center">
            <div className="max-w-3xl text-white flex flex-col items-center">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {t("aiDetection.tag")}
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-extrabold leading-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t("aiDetection.title")}
              </motion.h1>

              <motion.p
                className="mt-4 text-lg text-green-100/90"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t("aiDetection.subtitle")}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 border ${
                isDark
                  ? "bg-slate-800/80 border-slate-700/50"
                  : "bg-white/80 border-white/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-slate-100" : "text-gray-800"
                  }`}
                >
                  {t("aiDetection.upload.title")}
                </h2>
              </div>

              <div className="border-2 border-dashed border-green-300 rounded-2xl p-8 bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-500 transition-colors">
                {selectedImage ? (
                  <div
                    ref={imageContainerRef}
                    className="relative rounded-xl overflow-hidden cursor-crosshair"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                    {cropRect && (
                      <div
                        style={{
                          position: "absolute",
                          left: `${cropRect.x}px`,
                          top: `${cropRect.y}px`,
                          width: `${cropRect.width}px`,
                          height: `${cropRect.height}px`,
                          border: "2px solid #10b981",
                          background: "rgba(16, 185, 129, 0.1)",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer">
                    <Upload
                      className={`w-16 h-16 mb-4 ${
                        isDark ? "text-green-400" : "text-green-600"
                      }`}
                    />
                    <p
                      className={`text-lg font-semibold mb-2 ${
                        isDark ? "text-slate-200" : "text-gray-700"
                      }`}
                    >
                      {t("aiDetection.upload.select")}
                    </p>
                    <p
                      className={`text-sm mb-4 ${
                        isDark ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      {t("aiDetection.upload.drag")}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {selectedImage && !croppedImage && (
                <motion.button
                  onClick={handleCropConfirm}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  {t("aiDetection.crop")}
                </motion.button>
              )}

              {croppedImage && (
                <>
                  <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={croppedImage}
                      alt="Cropped"
                      className="w-full h-auto max-h-64 object-contain bg-gray-100"
                    />
                  </div>

                  <motion.button
                    onClick={handleDetection}
                    disabled={loading}
                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("aiDetection.detecting")}
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-5 h-5" />
                        {t("aiDetection.detect")}
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div
              className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 border ${
                isDark
                  ? "bg-slate-800/80 border-slate-700/50"
                  : "bg-white/80 border-white/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-slate-100" : "text-gray-800"
                  }`}
                >
                  {t("aiDetection.results.title")}
                </h2>
              </div>

              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Disease Header */}
                  <div
                    className={`rounded-2xl p-6 border-2 ${
                      isDark
                        ? "bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-700/50"
                        : "bg-gradient-to-r from-red-50 to-orange-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3
                          className={`text-2xl font-bold ${
                            isDark ? "text-red-200" : "text-red-900"
                          }`}
                        >
                          {result.disease}
                        </h3>
                        <p
                          className={`text-sm italic mt-1 ${
                            isDark ? "text-red-300" : "text-red-700"
                          }`}
                        >
                          {result.latinName}
                        </p>
                      </div>
                      <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-full text-sm">
                        {result.confidence}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle
                        className={`w-5 h-5 ${
                          isDark ? "text-red-400" : "text-red-600"
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          isDark ? "text-red-200" : "text-red-800"
                        }`}
                      >
                        {t("aiDetection.severityLabel")}: {result.severity}
                      </span>
                    </div>

                    <p
                      className={`leading-relaxed ${
                        isDark ? "text-red-100" : "text-red-900"
                      }`}
                    >
                      {result.summary}
                    </p>
                  </div>

                  {/* Causes */}
                  <div
                    className={`rounded-2xl p-6 border ${
                      isDark
                        ? "bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-amber-700/50"
                        : "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200"
                    }`}
                  >
                    <h4
                      className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                        isDark ? "text-amber-200" : "text-amber-900"
                      }`}
                    >
                      <span className="text-2xl">🦠</span>
                      {t("aiDetection.causes.title")}
                    </h4>
                    <ul className="space-y-2">
                      {result.causes.map((cause, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-3 ${
                            isDark ? "text-amber-100" : "text-amber-800"
                          }`}
                        >
                          <span
                            className={`font-bold ${
                              isDark ? "text-amber-400" : "text-amber-500"
                            }`}
                          >
                            •
                          </span>
                          <span className="leading-relaxed">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div
                    className={`rounded-2xl p-6 border ${
                      isDark
                        ? "bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700/50"
                        : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                    }`}
                  >
                    <h4
                      className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                        isDark ? "text-green-200" : "text-green-900"
                      }`}
                    >
                      <CheckCircle
                        className={`w-5 h-5 ${
                          isDark ? "text-green-400" : "text-green-600"
                        }`}
                      />
                      {t("aiDetection.solutions.title")}
                    </h4>
                    <ul className="space-y-3">
                      {result.solutions.map((solution, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-3 rounded-xl p-3 ${
                            isDark
                              ? "text-green-100 bg-slate-700/60"
                              : "text-green-800 bg-white/60"
                          }`}
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Blog Sections */}
                  {result.blogSections?.map((section, idx) => (
                    <div
                      key={idx}
                      className={`rounded-2xl p-6 border ${
                        isDark
                          ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700/50"
                          : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
                      }`}
                    >
                      <h4
                        className={`text-lg font-bold mb-3 ${
                          isDark ? "text-blue-200" : "text-blue-900"
                        }`}
                      >
                        {section.title}
                      </h4>
                      <p
                        className={`leading-relaxed ${
                          isDark ? "text-blue-100" : "text-blue-800"
                        }`}
                      >
                        {section.content}
                      </p>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <div
                    className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                      isDark
                        ? "bg-gradient-to-br from-slate-700 to-slate-800"
                        : "bg-gradient-to-br from-gray-100 to-gray-200"
                    }`}
                  >
                    <Leaf
                      className={`w-12 h-12 ${
                        isDark ? "text-slate-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      isDark ? "text-slate-200" : "text-gray-700"
                    }`}
                  >
                    {t("aiDetection.empty.title")}
                  </h3>
                  <p className={isDark ? "text-slate-400" : "text-gray-500"}>
                    {t("aiDetection.empty.subtitle")}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-slate-100" : "text-gray-800"
            }`}
          >
            {t("aiDetection.features.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className={`backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center border ${
                isDark
                  ? "bg-slate-800/70 border-slate-700/50"
                  : "bg-white/70 border-white/50"
              }`}
              whileHover={{
                y: -5,
                shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-slate-100" : "text-gray-800"
                }`}
              >
                {t("aiDetection.features.fast.title")}
              </h3>
              <p
                className={`leading-relaxed ${
                  isDark ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {t("aiDetection.features.fast.copy")}
              </p>
            </motion.div>

            <motion.div
              className={`backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center border ${
                isDark
                  ? "bg-slate-800/70 border-slate-700/50"
                  : "bg-white/70 border-white/50"
              }`}
              whileHover={{
                y: -5,
                shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-slate-100" : "text-gray-800"
                }`}
              >
                {t("aiDetection.features.accurate.title")}
              </h3>
              <p
                className={`leading-relaxed ${
                  isDark ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {t("aiDetection.features.accurate.copy")}
              </p>
            </motion.div>

            <motion.div
              className={`backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center border ${
                isDark
                  ? "bg-slate-800/70 border-slate-700/50"
                  : "bg-white/70 border-white/50"
              }`}
              whileHover={{
                y: -5,
                shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-slate-100" : "text-gray-800"
                }`}
              >
                {t("aiDetection.features.expert.title")}
              </h3>
              <p
                className={`leading-relaxed ${
                  isDark ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {t("aiDetection.features.expert.copy")}
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
