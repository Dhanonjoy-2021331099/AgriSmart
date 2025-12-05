import { useRef, useState } from "react";
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

export default function AIDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropRect, setCropRect] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageContainerRef = useRef(null);

  const diseaseProfiles = [
    {
      disease: "পাতাঝরা ব্লাইট",
      latinName: "Bipolaris oryzae",
      confidence: "92%",
      severity: "উচ্চ",
      summary:
        "পাতার কিনারা থেকে বাদামী দাগ শুরু হয়ে ধীরে ধীরে পাতাকে শুকিয়ে ফেলে। দ্রুত ব্যবস্থা না নিলে ফলনের ৩০-৪০% নষ্ট হয়।",
      causes: [
        "গরম ও আর্দ্র পরিবেশে ছত্রাকের দ্রুত বংশবিস্তার",
        "অতিরিক্ত নাইট্রোজেন সার ব্যবহারে নরম পাতা তৈরি",
        "ঘন লাগানো জমিতে বাতাস চলাচলে বাধা",
      ],
      solutions: [
        "৭-১০ দিন পরপর কপার-ভিত্তিক ফাংগিসাইড স্প্রে করুন",
        "গাছের মাঝের পাতা পাতলা করে বাতাস চলাচল নিশ্চিত করুন",
        "সেচের পানি জমে না থাকলে রোগ কমে",
      ],
      blogSections: [
        {
          title: "দ্রুত শনাক্তকরণ কেন জরুরি?",
          content:
            "পাতার উপর লম্বাটে বাদামী দাগ দেখা গেলে ২৪ ঘণ্টার মধ্যে ট্রিটমেন্ট শুরু করলে ছত্রাক ছড়ানো ঠেকানো সম্ভব। দেরি করলে দাগগুলো মধ্যভাগে ধূসর হয়ে চারপাশে গাঢ় বাদামী রিং তৈরি করে।",
        },
        {
          title: "জনপ্রিয় কৃষকদের অভিজ্ঞতা",
          content:
            "ঝিনাইদহের কৃষক মিজানুল হক ক্রপ মনিটরিং সেন্সর ব্যবহার করে আর্দ্রতার তথ্য দেখে সেচ কমিয়েছেন। ফলে ব্লাইটের মাত্রা ৫০% কমেছে এবং স্প্রে খরচ অর্ধেকে নেমেছে।",
        },
      ],
    },
    {
      disease: "ব্ল্যাক স্পট ফাঙ্গাস",
      latinName: "Alternaria solani",
      confidence: "88%",
      severity: "মাঝারি",
      summary:
        "টমেটো ও আলুর পাতায় কালচে বৃত্তাকার দাগ তৈরি হয় যা দ্রুত বড় হয়ে পাতাকে ঝলসে দেয়।",
      causes: [
        "হঠাৎ তাপমাত্রা পরিবর্তন ও শিশিরপাত",
        "পূর্বের ফসলের গাছের অবশিষ্টাংশ না পরিষ্কার করা",
        "উচ্চ আর্দ্রতায় জৈব সার অবশিষ্ট গরম হয়ে যাওয়া",
      ],
      solutions: [
        "আবোনিক তামা-ওক্সিক্লোরাইড বা ক্লোরোথালোনিল স্প্রে",
        "ফসল কাটার পরে জমির আবর্জনা পুড়িয়ে ফেলুন",
        "প্রতি ১৫ দিনে জৈব মুলচ উলটে দিন যাতে বাতাস ঢোকে",
      ],
      blogSections: [
        {
          title: "লক্ষণ ও পর্যবেক্ষণ",
          content:
            "পাতার উপরের অংশে ছোট কালো দাগ দিয়ে শুরু হয়। ধীরে ধীরে দাগের চারদিকে হলুদ বর্ডার তৈরি হয়। সঠিক সময়ে শনাক্ত না হলে ফলের গায়েও কালো দাগ পড়ে।",
        },
        {
          title: "প্রতিরোধে স্মার্ট ক্যালেন্ডার",
          content:
            "AI শিডিউলার বৃষ্টির সম্ভাবনা দেখিয়ে সতর্ক করলে আগেই প্রতিরোধক স্প্রে করলে আক্রান্ত ক্ষেত্র ৬০% কমে।",
        },
      ],
    },
    {
      disease: "লিফ কার্ল ভাইরাস",
      latinName: "Begomovirus spp.",
      confidence: "79%",
      severity: "নিম্ন",
      summary:
        "পাতা উপরের দিকে কুঁকড়ে যায়, রঙ হালকা হয়ে ধমনী বেরিয়ে আসে। ভাইরাস হলেও দ্রুত পরিচর্যায় ক্ষতি কমানো যায়।",
      causes: [
        "সাদা মাছি বা অ্যাফিডের আক্রমণ",
        "দূষিত চারা/ডাল ব্যবহার",
        "একই জমিতে বারবার একই ফসল",
      ],
      solutions: [
        "সাদা মাছি প্রতিরোধে নীল আঠালো ফাঁদ ব্যবহার",
        "ভাইরাসমুক্ত জাতের চারা সংগ্রহ",
        "নিয়মিত জৈব কীটনাশক (নিম তেল) ব্যবহার",
      ],
      blogSections: [
        {
          title: "কীভাবে দ্রুত আলাদা করবেন",
          content:
            "পাতা হাতের তালুর মতো বাঁকা হয়ে যায়, শিরা মোটা ও গা ছাড়া হয়। নতুন পাতায় বিকৃতি বেশি থাকে।",
        },
        {
          title: "ব্যবস্থাপনার রুটিন",
          content:
            "৩ দিনের ব্যবধানে নিম তেল স্প্রে, আক্রান্ত পাতা তুলে পুড়িয়ে ফেলা এবং পরবর্তী রোপণে প্রতিরোধী জাত ব্যবহারে রোগের পুনরাবৃত্তি কমে।",
        },
      ],
    },
  ];

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
    // Simulate AI detection
    setResult(null);
    setTimeout(() => {
      const profile =
        diseaseProfiles[Math.floor(Math.random() * diseaseProfiles.length)];
      setResult({
        ...profile,
        detectedImage: croppedImage || selectedImage,
        timestamp: new Date().toLocaleString("bn-BD"),
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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
          <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">এআই প্রযুক্তি</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-extrabold leading-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                এআই শনাক্তকরণ
              </motion.h1>

              <motion.p
                className="mt-4 text-lg text-green-100/90"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                আপনার ফসলের রোগ এবং কীটপতঙ্গ দ্রুত ও সঠিকভাবে শনাক্ত করুন
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
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  ছবি আপলোড করুন
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
                    <Upload className="w-16 h-16 text-green-600 mb-4" />
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      ছবি নির্বাচন করুন
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      অথবা টেনে এনে ছাড়ুন
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
                  নির্বাচিত এলাকা ক্রপ করুন
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
                        বিশ্লেষণ চলছে...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-5 h-5" />
                        এআই দিয়ে বিশ্লেষণ করুন
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
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  শনাক্তকরণ ফলাফল
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
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-red-900">
                          {result.disease}
                        </h3>
                        <p className="text-sm text-red-700 italic mt-1">
                          {result.latinName}
                        </p>
                      </div>
                      <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-full text-sm">
                        {result.confidence}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">
                        তীব্রতা: {result.severity}
                      </span>
                    </div>

                    <p className="text-red-900 leading-relaxed">
                      {result.summary}
                    </p>
                  </div>

                  {/* Causes */}
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                    <h4 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🦠</span>
                      কারণসমূহ
                    </h4>
                    <ul className="space-y-2">
                      {result.causes.map((cause, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-amber-800"
                        >
                          <span className="text-amber-500 font-bold">•</span>
                          <span className="leading-relaxed">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      প্রতিকার
                    </h4>
                    <ul className="space-y-3">
                      {result.solutions.map((solution, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-green-800 bg-white/60 rounded-xl p-3"
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
                      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
                    >
                      <h4 className="text-lg font-bold text-blue-900 mb-3">
                        {section.title}
                      </h4>
                      <p className="text-blue-800 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
                    <Leaf className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    শনাক্তকরণ শুরু করুন
                  </h3>
                  <p className="text-gray-500">ছবি আপলোড করে বিশ্লেষণ করুন</p>
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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            এআই শনাক্তকরণের সুবিধা
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center border border-white/50"
              whileHover={{
                y: -5,
                shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                দ্রুত শনাক্তকরণ
              </h3>
              <p className="text-gray-600 leading-relaxed">
                কয়েক সেকেন্ডে রোগ শনাক্ত করুন এবং তাৎক্ষণিক পরামর্শ পান
              </p>
            </motion.div>

            <motion.div
              className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center border border-white/50"
              whileHover={{
                y: -5,
                shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                সঠিক ফলাফল
              </h3>
              <p className="text-gray-600 leading-relaxed">
                উন্নত এআই মডেল ব্যবহার করে ৯০%+ নির্ভুলতা
              </p>
            </motion.div>

            <motion.div
              className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center border border-white/50"
              whileHover={{
                y: -5,
                shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                বিশেষজ্ঞ পরামর্শ
              </h3>
              <p className="text-gray-600 leading-relaxed">
                স্বয়ংক্রিয় চিকিৎসা পরামর্শ এবং প্রতিকারের উপায়
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
