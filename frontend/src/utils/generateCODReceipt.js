import { jsPDF } from "jspdf";

/**
 * AUTO-GENERATE & DOWNLOAD Order Confirmation PDF for Cash on Delivery
 *
 * @param {Object} orderData - Order information
 * @param {string} orderData.name - Customer name
 * @param {string} orderData.phone - Customer phone
 * @param {string} orderData.address - Customer address
 * @param {Array} orderData.items - Array of {name, qty, price}
 * @param {number} orderData.total - Total amount
 * @param {string} orderData.payment - Payment method (should be "Cash on Delivery")
 * @param {string} [orderData.orderId] - Optional order ID (will generate random 8-digit if not provided)
 *
 * @example
 * generateCODReceipt({
 *   name: "John Doe",
 *   phone: "01700000000",
 *   address: "Sylhet, Bangladesh",
 *   items: [
 *     { name: "Tomato Seeds", qty: 2, price: 120 },
 *     { name: "Organic Fertilizer", qty: 1, price: 350 }
 *   ],
 *   total: 590,
 *   payment: "Cash on Delivery"
 * });
 */
export const generateCODReceipt = (orderData) => {
  // Generate random 8-digit Order ID if not provided
  const orderId =
    orderData.orderId ||
    Math.floor(10000000 + Math.random() * 90000000).toString();

  // Create new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 20; // Starting Y position

  // ============================================
  // HEADER SECTION
  // ============================================

  // Store Logo Placeholder (you can add an actual logo image later)
  doc.setFillColor(16, 185, 129); // Emerald green
  doc.circle(pageWidth / 2, y + 5, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("AS", pageWidth / 2, y + 7, { align: "center" });

  y += 20;

  // Store Name
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("AgriSmart", pageWidth / 2, y, { align: "center" });

  y += 8;

  // Tagline
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Smart Agriculture Solutions", pageWidth / 2, y, {
    align: "center",
  });

  y += 15;

  // ============================================
  // TITLE
  // ============================================
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("ORDER CONFIRMATION", pageWidth / 2, y, { align: "center" });

  y += 3;

  // Horizontal line under title
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.8);
  doc.line(40, y, pageWidth - 40, y);

  y += 12;

  // ============================================
  // ORDER INFO BOX
  // ============================================
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, y, pageWidth - 40, 20, 2, 2, "F");

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Order ID: ${orderId}`, 25, y + 7);

  // Current Date & Time
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${dateStr}`, 25, y + 13);
  doc.text(`Time: ${timeStr}`, pageWidth - 25, y + 13, { align: "right" });

  y += 28;

  // ============================================
  // CUSTOMER INFORMATION
  // ============================================
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129);
  doc.text("Customer Information", 20, y);

  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  doc.text(`Name:`, 20, y);
  doc.setFont("helvetica", "bold");
  doc.text(orderData.name || "N/A", 45, y);

  y += 6;

  doc.setFont("helvetica", "normal");
  doc.text(`Phone:`, 20, y);
  doc.setFont("helvetica", "bold");
  doc.text(orderData.phone || "N/A", 45, y);

  y += 6;

  doc.setFont("helvetica", "normal");
  doc.text(`Address:`, 20, y);

  // Handle long addresses - wrap text
  const address = orderData.address || "N/A";
  const addressLines = doc.splitTextToSize(address, pageWidth - 70);
  doc.setFont("helvetica", "bold");
  doc.text(addressLines, 45, y);
  y += addressLines.length * 5 + 2;

  y += 8;

  // ============================================
  // ORDER ITEMS TABLE
  // ============================================
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129);
  doc.text("Order Items", 20, y);

  y += 8;

  // Table Header
  doc.setFillColor(240, 240, 240);
  doc.rect(20, y - 5, pageWidth - 40, 8, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Item", 25, y);
  doc.text("Qty", pageWidth - 80, y, { align: "center" });
  doc.text("Price", pageWidth - 45, y, { align: "center" });
  doc.text("Total", pageWidth - 25, y, { align: "right" });

  y += 8;

  // Table Items
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const items = orderData.items || [];
  items.forEach((item, index) => {
    const itemName = item.name || "Unknown Item";
    const qty = Number(item.qty) || Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    const lineTotal = qty * price;

    // Item name (truncate if too long)
    const maxWidth = pageWidth - 120;
    const itemLines = doc.splitTextToSize(itemName, maxWidth);
    doc.text(itemLines[0], 25, y);

    // Quantity
    doc.text(qty.toString(), pageWidth - 80, y, { align: "center" });

    // Unit Price
    const formattedPrice = price.toLocaleString("en-US");
    doc.text(`${formattedPrice} ৳`, pageWidth - 45, y, { align: "center" });

    // Line Total
    const formattedTotal = lineTotal.toLocaleString("en-US");
    doc.text(`${formattedTotal} ৳`, pageWidth - 25, y, { align: "right" });

    y += 6;

    // Add page if needed
    if (y > pageHeight - 60 && index < items.length - 1) {
      doc.addPage();
      y = 20;
    }
  });

  y += 5;

  // ============================================
  // TOTAL SECTION
  // ============================================
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(20, y, pageWidth - 20, y);

  y += 8;

  // Total Amount
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Total Amount:", pageWidth - 90, y);

  const totalAmount = Number(orderData.total) || 0;
  const formattedTotal = totalAmount.toLocaleString("en-US");

  doc.setFontSize(14);
  doc.setTextColor(16, 185, 129);
  doc.text(`${formattedTotal} ৳`, pageWidth - 25, y, { align: "right" });

  y += 10;

  // Payment Method
  doc.setFillColor(255, 250, 230);
  doc.roundedRect(20, y, pageWidth - 40, 12, 2, 2, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(200, 100, 0);
  doc.text("💰 Payment Method:", 25, y + 7);
  doc.setTextColor(0, 0, 0);
  doc.text(orderData.payment || "Cash on Delivery", pageWidth / 2 - 10, y + 7);

  y += 20;

  // ============================================
  // THANK YOU MESSAGE
  // ============================================
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(30, y, pageWidth - 60, 22, 3, 3, "F");

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129);
  doc.text("Thank You for Your Order!", pageWidth / 2, y + 8, {
    align: "center",
  });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("Your order will be delivered soon.", pageWidth / 2, y + 14, {
    align: "center",
  });
  doc.text("Payment to be made upon delivery.", pageWidth / 2, y + 19, {
    align: "center",
  });

  // ============================================
  // FOOTER
  // ============================================
  const footerY = pageHeight - 15;
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);
  doc.line(30, footerY, pageWidth - 30, footerY);

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "AgriSmart | Smart Agriculture Solutions",
    pageWidth / 2,
    footerY + 5,
    { align: "center" }
  );
  doc.text(
    "Contact: +880 1712-345678 | Email: info@agrismart.com",
    pageWidth / 2,
    footerY + 9,
    { align: "center" }
  );

  // ============================================
  // AUTO DOWNLOAD PDF
  // ============================================
  const filename = `Order_Confirmation_${orderId}.pdf`;
  doc.save(filename);

  console.log(`✅ PDF Generated: ${filename}`);
  return orderId;
};

export default generateCODReceipt;
