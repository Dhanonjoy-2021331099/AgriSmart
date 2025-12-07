import { useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, BookOpen } from "lucide-react";
import { useAppSettings } from "../Contexts/AppSettingsContext";
import { translations as i18n } from "../i18n/translations";

export default function TipDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language, theme } = useAppSettings();
  const isDark = theme === "dark";
  const langKey = language === "english" ? "english" : "bangla";
  const t = useCallback((key) => i18n[langKey]?.[key] || key, [langKey]);

  // Tips data structure
  const tipsData = {
    "soil-testing": {
      icon: "🌱",
      titleKey: "advice.quickInfo.soilTest.title",
      descKey: "advice.quickInfo.soilTest.desc",
      detailKey: "tips.soilTesting.detail",
      paragraphs: [
        "tips.soilTesting.para1",
        "tips.soilTesting.para2",
        "tips.soilTesting.para3",
      ],
    },
    "water-management": {
      icon: "💧",
      titleKey: "advice.quickInfo.water.title",
      descKey: "advice.quickInfo.water.desc",
      detailKey: "tips.waterManagement.detail",
      paragraphs: [
        "tips.waterManagement.para1",
        "tips.waterManagement.para2",
        "tips.waterManagement.para3",
      ],
    },
    "right-timing": {
      icon: "⏰",
      titleKey: "advice.quickInfo.timing.title",
      descKey: "advice.quickInfo.timing.desc",
      detailKey: "tips.rightTiming.detail",
      paragraphs: [
        "tips.rightTiming.para1",
        "tips.rightTiming.para2",
        "tips.rightTiming.para3",
      ],
    },
    "organic-inputs": {
      icon: "🌿",
      titleKey: "advice.quickInfo.organic.title",
      descKey: "advice.quickInfo.organic.desc",
      detailKey: "tips.organicInputs.detail",
      paragraphs: [
        "tips.organicInputs.para1",
        "tips.organicInputs.para2",
        "tips.organicInputs.para3",
      ],
    },
  };

  const tip = tipsData[slug];

  if (!tip) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 py-20 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
            : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 text-slate-900"
        }`}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{t("tips.notFound")}</h1>
          <button
            onClick={() => navigate("/advice")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg transition"
          >
            <ChevronLeft size={20} /> {t("tips.backToAdvice")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-12 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
          : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/advice")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-8 transition-all ${
            isDark
              ? "hover:bg-slate-800 text-emerald-400"
              : "hover:bg-gray-200 text-emerald-600"
          }`}
          whileHover={{ x: -5 }}
        >
          <ChevronLeft size={20} /> {t("tips.backToAdvice")}
        </motion.button>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-3xl shadow-2xl overflow-hidden ${
            isDark
              ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
              : "bg-white border border-gray-100"
          }`}
        >
          {/* Header with Icon and Title */}
          <div
            className={`p-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden`}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20" />

            <div className="relative z-10">
              <div className="text-6xl mb-4 animate-pulse">{tip.icon}</div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                {t(tip.titleKey)}
              </h1>
              <p className="text-lg text-white/90">{t(tip.descKey)}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 sm:p-12 space-y-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex items-start gap-4 p-6 rounded-2xl ${
                isDark
                  ? "bg-slate-700/50 border border-slate-600"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <BookOpen
                className={`flex-shrink-0 mt-1 ${
                  isDark ? "text-emerald-400" : "text-emerald-600"
                }`}
                size={24}
              />
              <div>
                <h2 className="text-xl font-bold mb-2">Overview</h2>
                <p
                  className={`leading-relaxed ${
                    isDark ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  {t(tip.detailKey)}
                </p>
              </div>
            </motion.div>

            {/* Detailed Paragraphs */}
            <div className="space-y-6">
              {tip.paragraphs.map((paraKey, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isDark
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    {t(`${paraKey}.title`)}
                  </h3>
                  <p
                    className={`leading-relaxed ml-10 ${
                      isDark ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    {t(`${paraKey}.content`)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tips Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`p-6 rounded-2xl border-l-4 ${
                isDark
                  ? "bg-yellow-500/10 border-l-yellow-500 border border-yellow-500/20"
                  : "bg-yellow-50 border-l-yellow-500 border border-yellow-200"
              }`}
            >
              <h3
                className={`font-bold mb-3 flex items-center gap-2 ${
                  isDark ? "text-yellow-400" : "text-yellow-800"
                }`}
              >
                💡 {t("tips.proTip")}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-slate-300" : "text-gray-700"
                }`}
              >
                {t(`${slug}.proTip`)}
              </p>
            </motion.div>
          </div>

          {/* Footer with Back Button */}
          <div
            className={`p-8 border-t ${
              isDark
                ? "border-t-slate-700 bg-slate-800/50"
                : "border-t-gray-200 bg-gray-50"
            }`}
          >
            <motion.button
              onClick={() => navigate("/advice")}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ← {t("tips.backToAdvice")}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
