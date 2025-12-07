import { useCallback, useMemo, useState } from "react";
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
import { translations as i18n } from "../i18n/translations";

export default function Advice() {
  const { language, theme } = useAppSettings();
  const langKey = language === "english" ? "english" : "bangla";
  const t = useCallback((key) => i18n[langKey]?.[key] || key, [langKey]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [advice, setAdvice] = useState(null);

  const isDark = theme === "dark";

  const crops = [
    { id: "rice", labelKey: "advice.crops.rice" },
    { id: "wheat", labelKey: "advice.crops.wheat" },
    { id: "maize", labelKey: "advice.crops.maize" },
    { id: "potato", labelKey: "advice.crops.potato" },
    { id: "tomato", labelKey: "advice.crops.tomato" },
    { id: "eggplant", labelKey: "advice.crops.eggplant" },
    { id: "onion", labelKey: "advice.crops.onion" },
  ];

  const seasons = [
    { id: "rabi", labelKey: "advice.seasons.rabi" },
    { id: "kharif", labelKey: "advice.seasons.kharif" },
    { id: "zaid", labelKey: "advice.seasons.zaid" },
  ];

  const quickFacts = useMemo(
    () => [
      {
        icon: "🌱",
        titleKey: "advice.quickInfo.soilTest.title",
        descKey: "advice.quickInfo.soilTest.desc",
      },
      {
        icon: "⏰",
        titleKey: "advice.quickInfo.timing.title",
        descKey: "advice.quickInfo.timing.desc",
      },
      {
        icon: "💧",
        titleKey: "advice.quickInfo.water.title",
        descKey: "advice.quickInfo.water.desc",
      },
      {
        icon: "🌿",
        titleKey: "advice.quickInfo.organic.title",
        descKey: "advice.quickInfo.organic.desc",
      },
    ],
    []
  );

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
    rice: {
      soilKey: "advice.crops.rice.soil",
      seedRateKey: "advice.crops.rice.seedRate",
      spacingKey: "advice.crops.rice.spacing",
      irrigationKey: "advice.crops.rice.irrigation",
      fertilizerKey: "advice.crops.rice.fertilizer",
      pestKey: "advice.crops.rice.pest",
      pestTipKey: "advice.crops.rice.pestTip",
      harvestKey: "advice.crops.rice.harvest",
      yieldKey: "advice.crops.rice.yield",
    },
    wheat: {
      soilKey: "advice.crops.wheat.soil",
      seedRateKey: "advice.crops.wheat.seedRate",
      spacingKey: "advice.crops.wheat.spacing",
      irrigationKey: "advice.crops.wheat.irrigation",
      fertilizerKey: "advice.crops.wheat.fertilizer",
      pestKey: "advice.crops.wheat.pest",
      pestTipKey: "advice.crops.wheat.pestTip",
      harvestKey: "advice.crops.wheat.harvest",
      yieldKey: "advice.crops.wheat.yield",
    },
    maize: {
      soilKey: "advice.crops.maize.soil",
      seedRateKey: "advice.crops.maize.seedRate",
      spacingKey: "advice.crops.maize.spacing",
      irrigationKey: "advice.crops.maize.irrigation",
      fertilizerKey: "advice.crops.maize.fertilizer",
      pestKey: "advice.crops.maize.pest",
      pestTipKey: "advice.crops.maize.pestTip",
      harvestKey: "advice.crops.maize.harvest",
      yieldKey: "advice.crops.maize.yield",
    },
    potato: {
      soilKey: "advice.crops.potato.soil",
      seedRateKey: "advice.crops.potato.seedRate",
      spacingKey: "advice.crops.potato.spacing",
      irrigationKey: "advice.crops.potato.irrigation",
      fertilizerKey: "advice.crops.potato.fertilizer",
      pestKey: "advice.crops.potato.pest",
      pestTipKey: "advice.crops.potato.pestTip",
      harvestKey: "advice.crops.potato.harvest",
      yieldKey: "advice.crops.potato.yield",
    },
    tomato: {
      soilKey: "advice.crops.tomato.soil",
      seedRateKey: "advice.crops.tomato.seedRate",
      spacingKey: "advice.crops.tomato.spacing",
      irrigationKey: "advice.crops.tomato.irrigation",
      fertilizerKey: "advice.crops.tomato.fertilizer",
      pestKey: "advice.crops.tomato.pest",
      pestTipKey: "advice.crops.tomato.pestTip",
      harvestKey: "advice.crops.tomato.harvest",
      yieldKey: "advice.crops.tomato.yield",
    },
    eggplant: {
      soilKey: "advice.crops.eggplant.soil",
      seedRateKey: "advice.crops.eggplant.seedRate",
      spacingKey: "advice.crops.eggplant.spacing",
      irrigationKey: "advice.crops.eggplant.irrigation",
      fertilizerKey: "advice.crops.eggplant.fertilizer",
      pestKey: "advice.crops.eggplant.pest",
      pestTipKey: "advice.crops.eggplant.pestTip",
      harvestKey: "advice.crops.eggplant.harvest",
      yieldKey: "advice.crops.eggplant.yield",
    },
    onion: {
      soilKey: "advice.crops.onion.soil",
      seedRateKey: "advice.crops.onion.seedRate",
      spacingKey: "advice.crops.onion.spacing",
      irrigationKey: "advice.crops.onion.irrigation",
      fertilizerKey: "advice.crops.onion.fertilizer",
      pestKey: "advice.crops.onion.pest",
      pestTipKey: "advice.crops.onion.pestTip",
      harvestKey: "advice.crops.onion.harvest",
      yieldKey: "advice.crops.onion.yield",
    },
    default: {
      soilKey: "advice.crops.default.soil",
      seedRateKey: "advice.crops.default.seedRate",
      spacingKey: "advice.crops.default.spacing",
      irrigationKey: "advice.crops.default.irrigation",
      fertilizerKey: "advice.crops.default.fertilizer",
      pestKey: "advice.crops.default.pest",
      pestTipKey: "advice.crops.default.pestTip",
      harvestKey: "advice.crops.default.harvest",
      yieldKey: "advice.crops.default.yield",
    },
  };

  const seasonGuides = {
    rabi: {
      sowingWindowKey: "advice.seasons.rabi.window",
      summaryKey: "advice.seasons.rabi.summary",
      soilPrepKey: "advice.seasons.rabi.soilPrep",
      irrigationCycleKey: "advice.seasons.rabi.irrigation",
      nutritionKey: "advice.seasons.rabi.nutrition",
      proAdviceKey: "advice.seasons.rabi.proAdvice",
    },
    kharif: {
      sowingWindowKey: "advice.seasons.kharif.window",
      summaryKey: "advice.seasons.kharif.summary",
      soilPrepKey: "advice.seasons.kharif.soilPrep",
      irrigationCycleKey: "advice.seasons.kharif.irrigation",
      nutritionKey: "advice.seasons.kharif.nutrition",
      proAdviceKey: "advice.seasons.kharif.proAdvice",
    },
    zaid: {
      sowingWindowKey: "advice.seasons.zaid.window",
      summaryKey: "advice.seasons.zaid.summary",
      soilPrepKey: "advice.seasons.zaid.soilPrep",
      irrigationCycleKey: "advice.seasons.zaid.irrigation",
      nutritionKey: "advice.seasons.zaid.nutrition",
      proAdviceKey: "advice.seasons.zaid.proAdvice",
    },
    default: {
      sowingWindowKey: "advice.seasons.default.window",
      summaryKey: "advice.seasons.default.summary",
      soilPrepKey: "advice.seasons.default.soilPrep",
      irrigationCycleKey: "advice.seasons.default.irrigation",
      nutritionKey: "advice.seasons.default.nutrition",
      proAdviceKey: "advice.seasons.default.proAdvice",
    },
  };

  const getAdvice = () => {
    if (!selectedCrop || !selectedSeason) {
      alert(t("advice.form.validation"));
      return;
    }

    const cropInfo = cropGuides[selectedCrop] || cropGuides.default;
    const seasonInfo = seasonGuides[selectedSeason] || seasonGuides.default;
    const cropLabelKey = crops.find((c) => c.id === selectedCrop)?.labelKey;
    const seasonLabelKey = seasons.find(
      (s) => s.id === selectedSeason
    )?.labelKey;

    const adviceData = {
      cropLabelKey,
      seasonLabelKey,
      plantingTimeKey: seasonInfo.sowingWindowKey,
      summaryParts: [seasonInfo.summaryKey, cropInfo.soilKey],
      quickFacts: [
        {
          labelKey: "advice.quickFacts.sowing",
          valueKey: seasonInfo.sowingWindowKey,
        },
        {
          labelKey: "advice.quickFacts.irrigation",
          valueKey: seasonInfo.irrigationCycleKey || cropInfo.irrigationKey,
        },
        { labelKey: "advice.quickFacts.soil", valueKey: cropInfo.soilKey },
        { labelKey: "advice.quickFacts.yield", valueKey: cropInfo.yieldKey },
      ],
      blocks: [
        {
          titleKey: "advice.blocks.prep.title",
          icon: "🌱",
          badgeKey: seasonInfo.sowingWindowKey,
          itemKeys: [
            cropInfo.seedRateKey,
            seasonInfo.soilPrepKey,
            cropInfo.spacingKey,
          ],
        },
        {
          titleKey: "advice.blocks.irrigation.title",
          icon: "💧",
          badgeKey: seasonInfo.irrigationCycleKey || cropInfo.irrigationKey,
          itemKeys: [
            cropInfo.irrigationKey,
            cropInfo.fertilizerKey,
            seasonInfo.nutritionKey,
          ],
        },
        {
          titleKey: "advice.blocks.pest.title",
          icon: "🛡️",
          badgeKey: cropInfo.pestKey,
          itemKeys: [
            "advice.blocks.pest.primary",
            cropInfo.pestTipKey,
            "advice.blocks.pest.monitor",
          ],
          badgeValueKey: cropInfo.pestKey,
          primaryPestKey: cropInfo.pestKey,
        },
        {
          titleKey: "advice.blocks.harvest.title",
          icon: "🧺",
          badgeKey: cropInfo.harvestKey,
          itemKeys: [
            cropInfo.harvestKey,
            "advice.blocks.harvest.dry",
            "advice.blocks.harvest.store",
          ],
        },
      ],
      alerts: [
        {
          titleKey: "advice.alerts.caution.title",
          contentKey: cropInfo.pestTipKey,
        },
        {
          titleKey: "advice.alerts.expert.title",
          contentKey: seasonInfo.proAdviceKey,
        },
      ],
    };

    setAdvice(adviceData);
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      }`}
      style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div
            className={`inline-flex items-center gap-2 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6 ${
              isDark ? "bg-slate-800/80" : "bg-white/80"
            }`}
          >
            <Sparkles
              className={`w-5 h-5 ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}
            />
            <span
              className={`text-sm font-semibold uppercase tracking-wide ${
                isDark ? "text-emerald-300" : "text-emerald-700"
              }`}
            >
              {t("advice.tag")}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            {t("advice.title")}
          </h1>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              isDark ? "text-slate-300" : "text-gray-600"
            }`}
          >
            {t("advice.subtitle")}
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
                ? "bg-slate-800/70 border-slate-700/50"
                : "bg-white/70 border-white/50"
            }`}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-slate-100" : "text-gray-800"
                }`}
              >
                {t("advice.form.title")}
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  className={`flex items-center gap-2 mb-3 text-sm font-semibold uppercase tracking-wide ${
                    isDark ? "text-slate-200" : "text-gray-700"
                  }`}
                >
                  <Sprout
                    className={`w-4 h-4 ${
                      isDark ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  />
                  {t("advice.form.selectCrop")}
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl font-medium focus:ring-4 transition-all duration-300 ${
                    isDark
                      ? "bg-slate-700 border-slate-600 text-slate-100 focus:border-emerald-400 focus:ring-emerald-400/20 hover:border-emerald-500"
                      : "bg-white border-gray-200 text-gray-800 focus:border-emerald-500 focus:ring-emerald-500/20 hover:border-emerald-300"
                  }`}
                >
                  <option value="">
                    {t("advice.form.selectCrop.placeholder")}
                  </option>
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {t(crop.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`flex items-center gap-2 mb-3 text-sm font-semibold uppercase tracking-wide ${
                    isDark ? "text-slate-200" : "text-gray-700"
                  }`}
                >
                  <Calendar
                    className={`w-4 h-4 ${
                      isDark ? "text-teal-400" : "text-teal-600"
                    }`}
                  />
                  {t("advice.form.selectSeason")}
                </label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl font-medium focus:ring-4 transition-all duration-300 ${
                    isDark
                      ? "bg-slate-700 border-slate-600 text-slate-100 focus:border-teal-400 focus:ring-teal-400/20 hover:border-teal-500"
                      : "bg-white border-gray-200 text-gray-800 focus:border-teal-500 focus:ring-teal-500/20 hover:border-teal-300"
                  }`}
                >
                  <option value="">
                    {t("advice.form.selectSeason.placeholder")}
                  </option>
                  {seasons.map((season) => (
                    <option key={season.id} value={season.id}>
                      {t(season.labelKey)}
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
                {t("advice.form.submit")}
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Tips Section */}
          <motion.div
            className={`lg:col-span-2 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border ${
              isDark
                ? "bg-slate-800/70 border-slate-700/50"
                : "bg-white/70 border-white/50"
            }`}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-slate-100" : "text-gray-800"
                }`}
              >
                {t("advice.quickInfo.title")}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {quickFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border ${
                    isDark
                      ? "bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600"
                      : "bg-gradient-to-br from-white to-gray-50 border-gray-100"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{fact.icon}</div>
                    <div>
                      <h3
                        className={`font-bold mb-2 ${
                          isDark ? "text-slate-100" : "text-gray-800"
                        }`}
                      >
                        {t(fact.titleKey)}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          isDark ? "text-slate-300" : "text-gray-600"
                        }`}
                      >
                        {t(fact.descKey)}
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
                    <h2 className="text-4xl font-bold">
                      {t(advice.cropLabelKey)}
                    </h2>
                    <p className="text-emerald-100 text-lg">
                      {t("advice.report.title")}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Sun className="w-5 h-5" />
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        {t("advice.report.season")}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {t(advice.seasonLabelKey)}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        {t("advice.report.plantingTime")}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {t(advice.plantingTimeKey)}
                    </p>
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
                          ? "bg-slate-800/70 border-slate-700/50"
                          : "bg-white/70 border-white/50"
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
                          <h3
                            className={`text-xl font-bold ${
                              isDark ? "text-slate-100" : "text-gray-800"
                            }`}
                          >
                            {t(block.titleKey)}
                          </h3>
                          <span
                            className={`inline-block mt-2 px-4 py-1 text-sm font-semibold rounded-full ${
                              isDark
                                ? "bg-gradient-to-r from-slate-600 to-slate-700 text-slate-200"
                                : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
                            }`}
                          >
                            {t(block.badgeKey)}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {block.itemKeys.map((itemKey, i) => (
                          <motion.li
                            key={i}
                            className={`flex items-start gap-3 ${
                              isDark ? "text-slate-300" : "text-gray-700"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                          >
                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">
                              {itemKey === "advice.blocks.pest.primary"
                                ? `${t("advice.blocks.pest.primary")}: ${t(
                                    block.primaryPestKey || ""
                                  )}`
                                : t(itemKey)}
                            </span>
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
                        ? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-700/50"
                        : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
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
                        <h3
                          className={`text-lg font-bold mb-3 ${
                            isDark ? "text-amber-200" : "text-amber-900"
                          }`}
                        >
                          {t(alert.titleKey)}
                        </h3>
                        <p
                          className={`leading-relaxed ${
                            isDark ? "text-amber-100" : "text-amber-800"
                          }`}
                        >
                          {t(alert.contentKey)}
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
              {t("advice.empty.title")}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {t("advice.empty.subtitle")}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
