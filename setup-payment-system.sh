#!/bin/bash

# Online Payment System - Quick Setup Script
# AgriSmart Project

echo "🚀 Setting up Online Payment System..."
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory (SmartAgri)"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
cd frontend
npm install jspdf
if [ $? -eq 0 ]; then
    echo "✅ jsPDF installed successfully"
else
    echo "❌ Failed to install jsPDF"
    exit 1
fi

cd ..

echo ""
echo "✅ Installation Complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Update payment numbers in frontend/src/pages/Checkout.jsx"
echo "   2. Restart your development server"
echo "   3. Test the online payment flow"
echo ""
echo "📖 For detailed documentation, see:"
echo "   ONLINE_PAYMENT_SYSTEM_GUIDE.md"
echo ""
echo "🎉 You're ready to accept online payments!"
