/**
 * 🧪 SAMPLE PRODUCTS FOR TESTING SEARCH
 * Use these products to test the search functionality
 *
 * How to use:
 * 1. Copy this array
 * 2. Paste in your backend seed file
 * 3. Or use in MongoDB to insert test data
 */

const testProducts = [
  {
    _id: "507f1f77bcf86cd799439001",
    name: "Organic Fertilizer",
    nameBn: "জৈব সার",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
    price: 450,
    unit: "kg",
    origin: "Dhaka, Bangladesh",
    category: "Fertilizers",
    description: "Premium organic fertilizer for all crops",
    descriptionBn: "সকল ফসলের জন্য প্রিমিয়াম জৈব সার",
    benefits: ["Increases yield", "Eco-friendly", "Natural nutrients"],
    usage: "Apply 2-3 kg per bigha",
    composition: "Nitrogen 15%, Phosphorus 10%, Potassium 12%",
    inStock: true,
    rating: 4.5,
    quantity: 500,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "507f1f77bcf86cd799439002",
    name: "High Yield Rice Seeds",
    nameBn: "উচ্চ ফলনশীল ধান বীজ",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    price: 850,
    unit: "kg",
    origin: "Gazipur, Bangladesh",
    category: "Seeds",
    description: "BRRI developed high-yield rice variety",
    descriptionBn: "BRRI উন্নত উচ্চ ফলনশীল ধানের জাত",
    benefits: [
      "High yield (6-7 tons/hectare)",
      "Pest resistant",
      "Quick maturity",
    ],
    usage: "Use 25-30 kg per hectare",
    composition: "Pure BRRI variety with 95% germination",
    inStock: true,
    rating: 4.8,
    quantity: 300,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    _id: "507f1f77bcf86cd799439003",
    name: "Pesticide Spray",
    nameBn: "কীটনাশক স্প্রে",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
    price: 320,
    unit: "liter",
    origin: "Chittagong, Bangladesh",
    category: "Pesticides",
    description: "Broad-spectrum insecticide",
    descriptionBn: "ব্যাপক কীটনাশক",
    benefits: ["Effective on 15+ pests", "Quick action", "Long protection"],
    usage: "Mix 2-3 ml per liter of water",
    composition: "Imidacloprid 17.8% SL",
    inStock: true,
    rating: 4.3,
    quantity: 200,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    _id: "507f1f77bcf86cd799439004",
    name: "Irrigation Pump",
    nameBn: "সেচ পাম্প",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400",
    price: 12500,
    unit: "piece",
    origin: "Dhaka, Bangladesh",
    category: "Equipment",
    description: "Heavy-duty diesel water pump",
    descriptionBn: "ভারী শুল্ক ডিজেল পানির পাম্প",
    benefits: ["300 liters/minute", "Fuel efficient", "Durable"],
    usage: "Install on stable ground near water",
    composition: "5.5 HP diesel engine, Cast iron body",
    inStock: true,
    rating: 4.6,
    quantity: 15,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    _id: "507f1f77bcf86cd799439005",
    name: "Vegetable Seeds Mix",
    nameBn: "সবজি বীজের মিশ্রণ",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
    price: 180,
    unit: "packet",
    origin: "Jessore, Bangladesh",
    category: "Seeds",
    description:
      "Mixed vegetable seeds (tomato, cucumber, beans, spinach, radish)",
    descriptionBn: "মিশ্রিত সবজির বীজ",
    benefits: ["High germination (90%+)", "Disease resistant", "Quick harvest"],
    usage: "Sow at proper depth in prepared soil",
    composition:
      "Tomato 50, Cucumber 30, Beans 40, Spinach 100, Radish 60 seeds",
    inStock: true,
    rating: 4.7,
    quantity: 400,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
  {
    _id: "507f1f77bcf86cd799439006",
    name: "Bio Fungicide",
    nameBn: "জৈব ছত্রাকনাশক",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400",
    price: 680,
    unit: "kg",
    origin: "Comilla, Bangladesh",
    category: "Pesticides",
    description: "Biological fungicide for crop diseases",
    descriptionBn: "ফসলের রোগের জন্য জৈব ছত্রাকনাশক",
    benefits: ["Controls 10+ diseases", "100% organic", "Safe for humans"],
    usage: "Mix 5-10 grams per liter",
    composition: "Trichoderma viride and Bacillus subtilis",
    inStock: true,
    rating: 4.4,
    quantity: 150,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    _id: "507f1f77bcf86cd799439007",
    name: "Drip Irrigation Kit",
    nameBn: "ড্রিপ সেচ কিট",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400",
    price: 5500,
    unit: "set",
    origin: "Rajshahi, Bangladesh",
    category: "Equipment",
    description: "Complete drip system for 1 bigha",
    descriptionBn: "১ বিঘার জন্য সম্পূর্ণ ড্রিপ ব্যবস্থা",
    benefits: [
      "Saves 50-70% water",
      "Reduces fertilizer waste",
      "Increases yield",
    ],
    usage: "Install pipes with inline drippers",
    composition: "40mm PVC main pipe (50m), 12mm lateral pipes (300m)",
    inStock: true,
    rating: 4.9,
    quantity: 25,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    _id: "507f1f77bcf86cd799439008",
    name: "Compost Maker",
    nameBn: "কম্পোস্ট মেকার",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
    price: 450,
    unit: "kg",
    origin: "Mymensingh, Bangladesh",
    category: "Fertilizers",
    description: "Bio-enzyme powder for rapid composting",
    descriptionBn: "দ্রুত কম্পোস্টিংয়ের জন্য জৈব-এনজাইম",
    benefits: ["50% faster composting", "Eliminates odor", "High quality"],
    usage: "Mix with organic waste in 1:100 ratio",
    composition: "Beneficial microorganisms and enzymes",
    inStock: true,
    rating: 4.5,
    quantity: 180,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20"),
  },
];

/**
 * 🧪 SEARCH TEST CASES
 *
 * Test 1: Exact match
 *   Input: "Organic Fertilizer"
 *   Expected: Navigate to /products/507f1f77bcf86cd799439001
 *
 * Test 2: Partial match
 *   Input: "Organic"
 *   Expected: Navigate to /products/507f1f77bcf86cd799439001
 *
 * Test 3: Case insensitive
 *   Input: "organic FERTILIZER"
 *   Expected: Navigate to /products/507f1f77bcf86cd799439001
 *
 * Test 4: Not found
 *   Input: "NonExistentProduct"
 *   Expected: Navigate to /products/not-found
 *
 * Test 5: Partial search
 *   Input: "rice"
 *   Expected: Navigate to /products/507f1f77bcf86cd799439002
 *
 * Test 6: Empty input
 *   Input: ""
 *   Expected: Show toast error "Please enter a product name."
 */

module.exports = testProducts;
