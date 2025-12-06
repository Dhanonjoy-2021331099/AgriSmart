import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Droplets,
  Shield,
  Package,
  Calendar,
  TrendingUp,
  Leaf,
  Sun,
  Cloud,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useAppSettings } from "../Contexts/AppSettingsContext";

export default function Advice() {
  const { theme } = useAppSettings();
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [advice, setAdvice] = useState(null);
  
  const isDark = theme === 'dark';

  const crops = ["ধান", "গম", "ভুট্টা", "আলু", "টমেটো", "বেগুন", "পেঁয়াজ"];
  const seasons = ["রবি", "খরিফ", "জায়েদ"];

  const quickFacts = [
    {
      icon: "🌱",
      title: "মাটি পরীক্ষা",
      content: "নিয়মিতভাবে মাটির pH এবং পুষ্টি উপাদান পরীক্ষা করুন",
    },
    {
      icon: "⏰",
      title: "সঠিক সময়",
      content: "মৌসুম অনুযায়ী ফসল বপন করুন",
    },
    {
      icon: "💧",
      title: "পানির ব্যবস্থাপনা",
      content: "প্রয়োজন অনুযায়ী সেচ দিন, অতিরিক্ত সেচ এড়িয়ে চলুন",
    },
    {
      icon: "🌿",
      title: "জৈব সার",
      content: "জৈব সারের ব্যবহার বৃদ্ধি করুন",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  // All existing crop and season data
  const cropGuides = {
    ধান: {
      soil: "দোঁআশ বা এঁটেল মাটি",
      seedRate: "প্রতি বিঘায় ৮-১০ কেজি শোধিত বীজ ব্যবহার করুন",
      spacing: "লাইন দূরত্ব ২০-২৫ সেমি ও গাছের দূরত্ব ১৫ সেমি",
      irrigation: "মোটা করে ৫-৭ দিন অন্তর হালকা সেচ",
      fertilizer:
        "ইউরিয়া ৬০ কেজি, টিএসপি ৪০ কেজি, এমওপি ৩০ কেজি (প্রতি বিঘায়)",
      pest: "পাতাঝরা/ব্লাস্ট রোগ",
      pestTip:
        "কপার-ভিত্তিক বা ট্রাইসাইক্লাজোল স্প্রে করুন এবং ক্ষেতে পানি জমে থাকতে দিন",
      harvest: "ধান দুধ থেকে আঠা পর্যায়ে গেলে কাটাই শুরু করুন",
      yield: "২২-২৫ মণ/বিঘা",
    },
    গম: {
      soil: "অল্প দোঁআশ ও ভালো নিষ্কাশনযুক্ত মাটি",
      seedRate: "প্রতি বিঘায় ২০-২২ কেজি বীজ",
      spacing: "লাইন দূরত্ব ১৮ সেমি",
      irrigation: "মাটির আর্দ্রতা অনুযায়ী ৮-১০ দিন অন্তর সেচ",
      fertilizer: "সুষম ডিএপি ও এমওপি",
      pest: "ঝিল্লি পোকা ও রস্ট",
      pestTip: "রস্ট দেখা গেলে তাৎক্ষণিকভাবে টিল্ট স্প্রে করুন",
      harvest: "শীষ হলুদ হয়ে আর্দ্রতা ২০% হলে কাটাই করুন",
      yield: "১৮-২০ মণ/বিঘা",
    },
    default: {
      soil: "ভাল নিষ্কাশন ও জৈব সমৃদ্ধ দোঁআশ",
      seedRate: "উন্নত জাতের শোধিত বীজ ব্যবহার করুন",
      spacing: "গাছের স্বাস্থ্য অনুযায়ী ২০ সেমি দূরত্ব",
      irrigation: "প্রতি সপ্তাহে ২-৩ বার সেচ",
      fertilizer: "নাইট্রোজেন, ফসফরাস ও পটাশের সুষম মিশ্রণ",
      pest: "সাধারণ ছত্রাক/কীটপতঙ্গ",
      pestTip: "পরিচ্ছন্ন মাঠ ও জৈব কীটনাশক ব্যবহার করুন",
      harvest: "ফসলের ৮০% পরিপক্ব হলে কাটাই করুন",
      yield: "উপযুক্ত পরিচর্যায় উচ্চ ফলন",
    },
  };

  const seasonGuides = {
    রবি: {
      sowingWindow: "নভেম্বর - ডিসেম্বর",
      summary:
        "শীতল ও শুষ্ক আবহাওয়ায় রোগের চাপ কম থাকে, তাই সেচ ও তাপমাত্রা সামঞ্জস্য জরুরি।",
      soilPrep: "মাটি শুকনো অবস্থায় চাষ দিয়ে প্রতিবার রোটাভেটর চালান।",
      irrigationCycle: "৭ দিনে হালকা সেচ",
      nutrition: "মাটির পরীক্ষার ভিত্তিতে প্রাথমিক ডোজ দিন",
      proAdvice: "সকালের কুয়াশা শেষে কীট প্রতিরোধক স্প্রে কার্যকর।",
    },
    খরিফ: {
      sowingWindow: "জুন - জুলাই",
      summary:
        "বর্ষায় অতিরিক্ত আর্দ্রতা থাকায় জল নিষ্কাশন ও রোগব্যবস্থাপনায় সতর্ক থাকুন।",
      soilPrep: "জমি উঁচু করে নালা রাখুন যাতে পানি দ্রুত বের হয়।",
      irrigationCycle: "প্রয়োজনে বৃষ্টির ফাঁকে সেচ",
      nutrition: "জৈব পদার্থ ও জিপসাম প্রয়োগ করুন",
      proAdvice: "ঘন বৃষ্টির পর সিস্টেমিক ফাঙ্গিসাইড প্রয়োগে রোগ কমে।",
    },
    জায়েদ: {
      sowingWindow: "ফেব্রুয়ারি - মার্চ",
      summary:
        "উষ্ণ ও শুষ্ক হাওয়ায় বাষ্পীভবন বেশি, ড্রিপ বা স্প্রিঙ্কলার সেচ উপযোগী।",
      soilPrep: "হালকা সেচ দিয়ে চাষ দিন ও মালচ ব্যবহার করুন।",
      irrigationCycle: "৪-৫ দিনে সেচ",
      nutrition: "ফোলিয়ার স্প্রে করে মাইক্রো নিউট্রিয়েন্ট দিন",
      proAdvice: "গরম বাতাসে সকালে সেচ দিলে পানি সাশ্রয় হয়।",
    },
    default: {
      sowingWindow: "মৌসুম অনুযায়ী",
      summary: "স্থানীয় কৃষি অফিসের সুপারিশ অনুসরণ করুন।",
      soilPrep: "জৈব সার মিশিয়ে জমি ফাইন টিল্থে আনুন।",
      irrigationCycle: "সপ্তাহে ২ বার",
      nutrition: "সমন্বিত সারের ব্যবহার",
      proAdvice: "নিয়মিত রোগবালাই পর্যবেক্ষণ করুন।",
    },
  };

  const getAdvice = () => {
    if (!selectedCrop || !selectedSeason) {
      alert("অনুগ্রহ করে ফসল এবং মৌসুম নির্বাচন করুন");
      return;
    }

    const cropInfo = cropGuides[selectedCrop] || cropGuides.default;
    const seasonInfo = seasonGuides[selectedSeason] || seasonGuides.default;

    const adviceData = {
      crop: selectedCrop,
      season: selectedSeason,
      plantingTime: seasonInfo.sowingWindow,
      summary: `${selectedSeason} মৌসুমে ${selectedCrop} চাষে ${seasonInfo.summary} ${cropInfo.soil}`,
      quickFacts: [
        { label: "বপন সময়", value: seasonInfo.sowingWindow },
        {
          label: "সেচ রুটিন",
          value: seasonInfo.irrigationCycle || cropInfo.irrigation,
        },
        { label: "মাটির ধরন", value: cropInfo.soil },
        { label: "লক্ষ্য ফলন", value: cropInfo.yield },
      ],
      blocks: [
        {
          title: "বীজ বপন ও জমি প্রস্তুতি",
          icon: "🌱",
          badge: seasonInfo.sowingWindow,
          items: [cropInfo.seedRate, seasonInfo.soilPrep, cropInfo.spacing],
        },
        {
          title: "সেচ ও পুষ্টি ব্যবস্থাপনা",
          icon: "💧",
          badge: seasonInfo.irrigationCycle || cropInfo.irrigation,
          items: [
            cropInfo.irrigation,
            cropInfo.fertilizer,
            seasonInfo.nutrition,
          ],
        },
        {
          title: "কীটপতঙ্গ ও রোগ নিয়ন্ত্রণ",
          icon: "🛡️",
          badge: cropInfo.pest,
          items: [
            `প্রধান রোগ: ${cropInfo.pest}`,
            cropInfo.pestTip,
            "সাপ্তাহিক পর্যবেক্ষণ করে আক্রান্ত পাতা সরান",
          ],
        },
        {
          title: "ফসল তোলা ও সংরক্ষণ",
          icon: "🧺",
          badge: cropInfo.harvest,
          items: [
            cropInfo.harvest,
            "কাটার পর ২-৩ দিন ছায়ায় শুকান",
            "শুকনো ও বাতাস চলাচলকারী ঘরে সংরক্ষণ করুন",
          ],
        },
      ],
      alerts: [
        {
          title: "বিশেষ সতর্কতা",
          content: cropInfo.pestTip,
        },
        {
          title: "বিশেষজ্ঞের নোট",
          content: seasonInfo.proAdvice,
        },
      ],
    };

    setAdvice(adviceData);
  };
  
  return (
    <div 
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
          : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'
      }`}
      style={{ color: isDark ? '#f8fafc' : '#0f172a' }}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div className={`inline-flex items-center gap-2 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6 ${
            isDark ? 'bg-slate-800/80' : 'bg-white/80'
          }`}>
            <Sparkles className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`text-sm font-semibold uppercase tracking-wide ${
              isDark ? 'text-emerald-300' : 'text-emerald-700'
            }`}>
              বিশেষজ্ঞ পরামর্শ
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            কৃষি পরামর্শ
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            আপনার ফসলের জন্য বিশেষজ্ঞ পরামর্শ পান 🌾
          </p>
        </motion.div>

        {/* Input Form Section */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-12"
          variants={itemVariants}
        >
          <motion.div
            className={`lg:col-span-1 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border ${
              isDark 
                ? 'bg-slate-800/70 border-slate-700/50' 
                : 'bg-white/70 border-white/50'
            }`}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-slate-100' : 'text-gray-800'
              }`}>
                পরামর্শ চাইতে
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className={`flex items-center gap-2 mb-3 text-sm font-semibold uppercase tracking-wide ${
                  isDark ? 'text-slate-200' : 'text-gray-700'
                }`}>
                  <Sprout className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  ফসল নির্বাচন করুন
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl font-medium focus:ring-4 transition-all duration-300 ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-emerald-400 focus:ring-emerald-400/20 hover:border-emerald-500'
                      : 'bg-white border-gray-200 text-gray-800 focus:border-emerald-500 focus:ring-emerald-500/20 hover:border-emerald-300'
                  }`}
                >
                  <option value="">ফসল নির্বাচন করুন</option>
                  {crops.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`flex items-center gap-2 mb-3 text-sm font-semibold uppercase tracking-wide ${
                  isDark ? 'text-slate-200' : 'text-gray-700'
                }`}>
                  <Calendar className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
                  মৌসুম নির্বাচন করুন
                </label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl font-medium focus:ring-4 transition-all duration-300 ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-400 focus:ring-teal-400/20 hover:border-teal-500'
                      : 'bg-white border-gray-200 text-gray-800 focus:border-teal-500 focus:ring-teal-500/20 hover:border-teal-300'
                  }`}
                >
                  <option value="">মৌসুম নির্বাচন করুন</option>
                  {seasons.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                onClick={getAdvice}
                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Lightbulb className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                পরামর্শ পান
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Tips Section */}
          <motion.div
            className={`lg:col-span-2 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border ${
              isDark 
                ? 'bg-slate-800/70 border-slate-700/50' 
                : 'bg-white/70 border-white/50'
            }`}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-slate-100' : 'text-gray-800'
              }`}>দ্রুত তথ্য</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {quickFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border ${
                    isDark
                      ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600'
                      : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{fact.icon}</div>
                    <div>
                      <h3 className={`font-bold mb-2 ${
                        isDark ? 'text-slate-100' : 'text-gray-800'
                      }`}>
                        {fact.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-gray-600'
                      }`}>
                        {fact.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Advice Display Section */}
        <AnimatePresence mode="wait">
          {advice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Header Info */}
              <motion.div
                className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl p-10 text-white"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold">{advice.crop}</h2>
                    <p className="text-emerald-100 text-lg">
                      পরামর্শ প্রতিবেদন
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Sun className="w-5 h-5" />
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        মৌসুম
                      </span>
                    </div>
                    <p className="text-2xl font-bold">{advice.season}</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        রোপণ সময়
                      </span>
                    </div>
                    <p className="text-2xl font-bold">{advice.plantingTime}</p>
                  </div>
                </div>
              </motion.div>

              {/* Detailed Blocks */}
              <div className="grid md:grid-cols-2 gap-6">
                {advice.blocks.map((block, index) => {
                  const iconMap = {
                    "🌱": Sprout,
                    "💧": Droplets,
                    "🛡️": Shield,
                    "🧺": Package,
                  };
                  const IconComponent = iconMap[block.icon] || Leaf;
                  const colors = [
                    "from-emerald-500 to-teal-500",
                    "from-teal-500 to-cyan-500",
                    "from-cyan-500 to-blue-500",
                    "from-blue-500 to-indigo-500",
                  ];

                  return (
                    <motion.div
                      key={index}
                      className={`backdrop-blur-xl rounded-2xl shadow-xl p-8 border hover:shadow-2xl transition-all duration-300 ${
                        isDark
                          ? 'bg-slate-800/70 border-slate-700/50'
                          : 'bg-white/70 border-white/50'
                      }`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`p-4 bg-gradient-to-br ${
                            colors[index % 4]
                          } rounded-xl shadow-lg`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${
                            isDark ? 'text-slate-100' : 'text-gray-800'
                          }`}>
                            {block.title}
                          </h3>
                          <span className={`inline-block mt-2 px-4 py-1 text-sm font-semibold rounded-full ${
                            isDark
                              ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-200'
                              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
                          }`}>
                            {block.badge}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {block.items.map((item, i) => (
                          <motion.li
                            key={i}
                            className={`flex items-start gap-3 ${
                              isDark ? 'text-slate-300' : 'text-gray-700'
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                          >
                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>

              {/* Alerts Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {advice.alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    className={`rounded-2xl shadow-lg p-8 border-2 ${
                      isDark
                        ? 'bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-700/50'
                        : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-500 rounded-xl">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          isDark ? 'text-amber-200' : 'text-amber-900'
                        }`}>
                          {alert.title}
                        </h3>
                        <p className={`leading-relaxed ${
                          isDark ? 'text-amber-100' : 'text-amber-800'
                        }`}>
                          {alert.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!advice && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-6">
              <Cloud className="w-16 h-16 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              ফসল এবং মৌসুম নির্বাচন করুন
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              আপনার ফসলের জন্য বিস্তারিত কৃষি পরামর্শ পেতে উপরের ফর্মটি পূরণ
              করুন
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
