// Sample products with complete details for Product Detail System
// Use this data to seed your database with enhanced product information

const sampleProducts = [
  {
    name: "Organic Fertilizer",
    nameBn: "জৈব সার",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800",
    ],
    price: 450,
    unit: "kg",
    origin: "Dhaka, Bangladesh",
    category: "Fertilizers",
    description:
      "Premium organic fertilizer made from natural compost. Increases crop yield by up to 30% while maintaining soil health. Perfect for all types of crops including vegetables, fruits, and grains.",
    descriptionBn:
      "প্রাকৃতিক কম্পোস্ট থেকে তৈরি প্রিমিয়াম জৈব সার। মাটির স্বাস্থ্য বজায় রেখে ফসলের ফলন ৩০% পর্যন্ত বৃদ্ধি করে। সবজি, ফল এবং শস্য সহ সব ধরনের ফসলের জন্য উপযুক্ত।",
    benefits: [
      "Increases crop yield by 30%",
      "100% organic and chemical-free",
      "Improves soil structure and water retention",
      "Safe for all types of crops",
      "Environmentally friendly and sustainable",
      "Rich in essential nutrients (N-P-K)",
    ],
    usage:
      "Apply 2-3 kg of fertilizer per bigha of land. Mix thoroughly with soil before planting seeds or transplanting seedlings. Water the field immediately after application to help nutrients penetrate the soil. For best results, repeat application every 30 days during the growing season. Can be used for both basal application and top dressing.",
    composition:
      "Nitrogen (N): 15%, Phosphorus (P): 10%, Potassium (K): 12%, Organic Carbon: 25%, Organic Matter: 60%, Moisture: 15%, pH: 6.5-7.5. Also contains beneficial microorganisms and trace minerals.",
    inStock: true,
    rating: 4.5,
    quantity: 500,
  },
  {
    name: "High Yield Rice Seeds",
    nameBn: "উচ্চ ফলনশীল ধান বীজ",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
    ],
    price: 850,
    unit: "kg",
    origin: "Gazipur, Bangladesh",
    category: "Seeds",
    description:
      "BRRI developed high-yield rice variety suitable for all seasons. Resistant to common pests and diseases. Matures in 120-130 days with excellent grain quality.",
    descriptionBn:
      "BRRI উন্নত উচ্চ ফলনশীল ধানের জাত যা সব মৌসুমের জন্য উপযুক্ত। সাধারণ পোকামাকড় ও রোগ প্রতিরোধী। ১২০-১৩০ দিনে পরিপক্ক হয় এবং চমৎকার দানার মান রয়েছে।",
    benefits: [
      "Yields 6-7 tons per hectare",
      "Resistant to brown planthopper and blast disease",
      "Suitable for both Boro and Aman seasons",
      "Short maturity period (120-130 days)",
      "Excellent grain quality and taste",
      "Tolerant to moderate drought",
    ],
    usage:
      "Soak seeds in water for 24 hours before sowing. Use 25-30 kg seeds per hectare for transplanting method. Maintain 3-4 inch water level during vegetative stage. Apply recommended fertilizer doses at proper intervals. Harvest when 80% grains turn golden yellow for best quality.",
    composition:
      "Pure BRRI dhan28 variety with 95% germination rate. Moisture content: 12-13%. Physical purity: 98%. No inert matter or weed seeds. Certified by Bangladesh Seed Certification Agency.",
    inStock: true,
    rating: 4.8,
    quantity: 300,
  },
  {
    name: "Pesticide Spray",
    nameBn: "কীটনাশক স্প্রে",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
    ],
    price: 320,
    unit: "liter",
    origin: "Chittagong, Bangladesh",
    category: "Pesticides",
    description:
      "Broad-spectrum insecticide effective against various crop pests including aphids, whiteflies, and caterpillars. Quick action with long-lasting protection.",
    descriptionBn:
      "বিভিন্ন ফসলের পোকামাকড়ের বিরুদ্ধে কার্যকর ব্রড-স্পেকট্রাম কীটনাশক যার মধ্যে রয়েছে এফিড, সাদা মাছি এবং শুঁয়োপোকা। দ্রুত কাজ করে এবং দীর্ঘস্থায়ী সুরক্ষা প্রদান করে।",
    benefits: [
      "Effective against 15+ types of pests",
      "Quick knockdown effect within 2-3 hours",
      "Protection lasts up to 15 days",
      "Safe for beneficial insects when used properly",
      "Low toxicity to mammals",
      "Compatible with most fungicides",
    ],
    usage:
      "Mix 2-3 ml of pesticide per liter of water. Spray during early morning or late afternoon when temperature is cool. Ensure complete coverage of both upper and lower leaf surfaces. Do not spray during flowering period. Maintain 7-10 days interval between applications. Use protective gear during application.",
    composition:
      "Active ingredient: Imidacloprid 17.8% SL (Systemic insecticide). Inert ingredients and emulsifiers. Pre-harvest interval: 7 days. Safe handling period: 24 hours after application.",
    inStock: true,
    rating: 4.3,
    quantity: 200,
  },
  {
    name: "Irrigation Pump",
    nameBn: "সেচ পাম্প",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800",
    images: [
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800",
      "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=800",
    ],
    price: 12500,
    unit: "piece",
    origin: "Dhaka, Bangladesh",
    category: "Equipment",
    description:
      "Heavy-duty water pump suitable for agricultural irrigation. Diesel-powered with excellent fuel efficiency. Can irrigate up to 5 bigha land continuously.",
    descriptionBn:
      "কৃষি সেচের জন্য উপযুক্ত ভারী-শুল্ক পানির পাম্প। ডিজেল চালিত এবং চমৎকার জ্বালানি দক্ষতা সম্পন্ন। একটানা ৫ বিঘা জমিতে সেচ দিতে পারে।",
    benefits: [
      "High discharge rate: 300 liters per minute",
      "Fuel-efficient: 8-10 hours on 5 liters diesel",
      "Durable cast iron body",
      "Easy maintenance and spare parts available",
      "Can lift water from 25 feet depth",
      "1 year manufacturer warranty",
    ],
    usage:
      "Install pump on stable ground near water source. Connect suction pipe ensuring no air leaks. Prime pump with water before first use. Start engine and adjust throttle for optimal flow. Regular maintenance: Clean filter every 10 hours, change oil every 50 hours. Store in dry place during off-season.",
    composition:
      "Engine: 5.5 HP diesel, 4-stroke. Pump body: Cast iron. Impeller: Brass. Suction size: 3 inches. Delivery size: 2 inches. Max head: 28 meters. Dimensions: 60x45x50 cm. Weight: 45 kg.",
    inStock: true,
    rating: 4.6,
    quantity: 15,
  },
  {
    name: "Vegetable Seeds Mix",
    nameBn: "সবজি বীজের মিশ্রণ",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800",
    ],
    price: 180,
    unit: "packet",
    origin: "Jessore, Bangladesh",
    category: "Seeds",
    description:
      "Premium quality mixed vegetable seeds pack containing tomato, cucumber, beans, spinach, and radish. Perfect for home gardens and small farms.",
    descriptionBn:
      "টমেটো, শসা, বিনস, পালং শাক এবং মুলা সহ প্রিমিয়াম মানের মিশ্রিত সবজি বীজের প্যাক। বাড়ির বাগান এবং ছোট খামারের জন্য উপযুক্ত।",
    benefits: [
      "High germination rate (90%+)",
      "Disease-resistant varieties",
      "Quick harvest in 45-60 days",
      "Organic certified seeds",
      "Perfect for kitchen gardens",
      "Instructions included in Bengali and English",
    ],
    usage:
      "Prepare soil with organic compost before sowing. Plant seeds at recommended depth (1-2 cm). Maintain adequate moisture during germination. Thin seedlings to proper spacing after 2 weeks. Apply balanced fertilizer after 3 weeks. Harvest vegetables when they reach appropriate size for best taste and nutrition.",
    composition:
      "Tomato seeds: 50 seeds (Hybrid variety), Cucumber: 30 seeds (Local improved), Beans: 40 seeds, Spinach: 100 seeds, Radish: 60 seeds. Total weight: 25 grams. Packaged in moisture-proof sealed pouch. Validity: 1 year from packaging date.",
    inStock: true,
    rating: 4.7,
    quantity: 400,
  },
  {
    name: "Bio Fungicide",
    nameBn: "জৈব ছত্রাকনাশক",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
    images: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
    ],
    price: 680,
    unit: "kg",
    origin: "Comilla, Bangladesh",
    category: "Pesticides",
    description:
      "Biological fungicide for controlling fungal diseases in crops. Made from beneficial microorganisms. Safe for organic farming and environmentally friendly.",
    descriptionBn:
      "ফসলের ছত্রাক রোগ নিয়ন্ত্রণের জন্য জৈবিক ছত্রাকনাশক। উপকারী অণুজীব থেকে তৈরি। জৈব চাষের জন্য নিরাপদ এবং পরিবেশ বান্ধব।",
    benefits: [
      "Controls 10+ fungal diseases",
      "100% organic and eco-friendly",
      "No harmful residues on crops",
      "Safe for humans, animals, and beneficial insects",
      "Improves plant immunity",
      "Can be used until harvest day",
    ],
    usage:
      "Mix 5-10 grams per liter of water. Apply as foliar spray during cool hours. Start application at first sign of disease or preventively. Spray every 7-10 days for chronic infections. Can be mixed with organic pesticides. Store in cool, dry place away from direct sunlight. Use within 6 months of opening.",
    composition:
      "Active ingredient: Trichoderma viride (minimum 1x10^9 CFU/gm), Bacillus subtilis (minimum 5x10^8 CFU/gm). Carriers: Talcum powder, organic binders. pH: 6.5-7.5. Non-toxic, biodegradable formulation.",
    inStock: true,
    rating: 4.4,
    quantity: 150,
  },
  {
    name: "Drip Irrigation Kit",
    nameBn: "ড্রিপ সেচ কিট",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800",
    images: [
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800",
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800",
    ],
    price: 5500,
    unit: "set",
    origin: "Rajshahi, Bangladesh",
    category: "Equipment",
    description:
      "Complete drip irrigation system for 1 bigha land. Saves 50-70% water compared to traditional methods. Easy to install and operate.",
    descriptionBn:
      "১ বিঘা জমির জন্য সম্পূর্ণ ড্রিপ সেচ ব্যবস্থা। ঐতিহ্যগত পদ্ধতির তুলনায় ৫০-৭০% পানি সাশ্রয় করে। সহজে ইনস্টল এবং পরিচালনা করা যায়।",
    benefits: [
      "Saves 50-70% water",
      "Reduces fertilizer wastage",
      "Increases crop yield by 20-30%",
      "Prevents weed growth",
      "Suitable for all crops",
      "Low maintenance cost",
    ],
    usage:
      "Install main pipe along field length. Connect lateral pipes with drippers at plant spacing. Connect to water source (tank or pump). Turn on water and check for leaks. Adjust flow rate using control valve. Clean filters weekly. Flush system monthly to prevent clogging. Store properly during off-season.",
    composition:
      "Main pipe: 40mm PVC (50 meters), Lateral pipes: 12mm with inline drippers (300 meters), Filter: 120 mesh screen type, Control valve, Connectors and fittings. Dripper discharge: 2-4 liters per hour. Pressure requirement: 1-1.5 bar. Installation guide included.",
    inStock: true,
    rating: 4.9,
    quantity: 25,
  },
  {
    name: "Compost Maker",
    nameBn: "কম্পোস্ট মেকার",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
    ],
    price: 450,
    unit: "kg",
    origin: "Mymensingh, Bangladesh",
    category: "Fertilizers",
    description:
      "Bio-enzyme powder for rapid composting of organic waste. Converts farm waste into nutrient-rich compost in just 45 days.",
    descriptionBn:
      "জৈব বর্জ্যের দ্রুত কম্পোস্টিংয়ের জন্য বায়ো-এনজাইম পাউডার। খামারের বর্জ্যকে মাত্র ৪৫ দিনে পুষ্টি সমৃদ্ধ কম্পোস্টে রূপান্তরিত করে।",
    benefits: [
      "Reduces composting time by 50%",
      "Eliminates bad odor during composting",
      "Produces high-quality organic fertilizer",
      "Eco-friendly and chemical-free",
      "Cost-effective solution",
      "Easy to use",
    ],
    usage:
      "Mix 1 kg of compost maker with 100 kg organic waste (crop residues, animal manure, kitchen waste). Add water to maintain 50-60% moisture. Cover with plastic sheet or tarpaulin. Turn mixture every 7 days. Compost will be ready in 45-60 days. Sieve before use.",
    composition:
      "Beneficial microorganisms: Lactobacillus, Azotobacter, Phosphate solubilizing bacteria (PSB), Cellulolytic bacteria. Concentration: 1x10^9 CFU per gram. Enzymes: Cellulase, Protease, Lipase. Organic carbon: 15%. pH: 6.5-7.5.",
    inStock: true,
    rating: 4.5,
    quantity: 180,
  },
];

// Export for use in seed scripts
module.exports = sampleProducts;

// Usage instructions:
// 1. Copy this data to your seed script
// 2. Connect to MongoDB
// 3. Insert using: await Product.insertMany(sampleProducts)
// 4. Verify in MongoDB Atlas or Compass
