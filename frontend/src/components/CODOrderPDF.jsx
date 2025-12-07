import { jsPDF } from "jspdf";

/**
 * Generate and download a simple, clean Order Confirmation PDF for Cash on Delivery orders
 * @param {Object} order - The order object containing all order details
 */
export const generateCODOrderPDF = (order) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Helper function to add text
  const addText = (text, x, y, options = {}) => {
    const {
      fontSize = 10,
      fontStyle = "normal",
      align = "left",
      color = [0, 0, 0],
    } = options;
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(text, x, y, { align });
  };

  // Header - Company Name
  addText("AgriSmart", pageWidth / 2, yPos, {
    fontSize: 24,
    fontStyle: "bold",
    align: "center",
    color: [16, 185, 129], // Emerald color
  });
  yPos += 8;

  // Subtitle
  addText("Smart Agriculture Solutions", pageWidth / 2, yPos, {
    fontSize: 10,
    align: "center",
    color: [100, 100, 100],
  });
  yPos += 15;

  // Title
  addText("ORDER CONFIRMATION", pageWidth / 2, yPos, {
    fontSize: 16,
    fontStyle: "bold",
    align: "center",
  });
  yPos += 10;

  // Horizontal line
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 10;

  // Order Details Section
  addText("Order Details", 20, yPos, {
    fontSize: 12,
    fontStyle: "bold",
  });
  yPos += 7;

  // Order ID
  addText(`Order ID: ${order.orderId || "N/A"}`, 20, yPos, {
    fontSize: 10,
  });
  yPos += 6;

  // Order Date
  const orderDate = order.timestamp
    ? new Date(order.timestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  addText(`Order Date: ${orderDate}`, 20, yPos, {
    fontSize: 10,
  });
  yPos += 6;

  // Payment Method
  addText("Payment Method: Cash on Delivery (COD)", 20, yPos, {
    fontSize: 10,
    fontStyle: "bold",
    color: [16, 185, 129],
  });
  yPos += 12;

  // Customer Information Section
  addText("Customer Information", 20, yPos, {
    fontSize: 12,
    fontStyle: "bold",
  });
  yPos += 7;

  addText(`Name: ${order.customer?.name || "N/A"}`, 20, yPos, {
    fontSize: 10,
  });
  yPos += 6;

  addText(`Phone: ${order.customer?.phone || "N/A"}`, 20, yPos, {
    fontSize: 10,
  });
  yPos += 6;

  if (order.customer?.email) {
    addText(`Email: ${order.customer.email}`, 20, yPos, {
      fontSize: 10,
    });
    yPos += 6;
  }

  // Split address into multiple lines if too long
  const address = order.customer?.address || "N/A";
  const addressLines = doc.splitTextToSize(address, pageWidth - 60);
  addText(`Address: ${addressLines[0]}`, 20, yPos, {
    fontSize: 10,
  });
  yPos += 6;
  for (let i = 1; i < addressLines.length; i++) {
    addText(addressLines[i], 40, yPos, {
      fontSize: 10,
    });
    yPos += 6;
  }
  yPos += 6;

  // Order Items Section
  addText("Order Items", 20, yPos, {
    fontSize: 12,
    fontStyle: "bold",
  });
  yPos += 7;

  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPos - 5, pageWidth - 40, 8, "F");

  addText("Item", 25, yPos, { fontSize: 10, fontStyle: "bold" });
  addText("Qty", pageWidth - 75, yPos, {
    fontSize: 10,
    fontStyle: "bold",
  });
  addText("Price", pageWidth - 45, yPos, {
    fontSize: 10,
    fontStyle: "bold",
    align: "right",
  });
  yPos += 8;

  // Table items
  if (order.items && order.items.length > 0) {
    order.items.forEach((item, index) => {
      const itemName = item.name || "Unknown Item";
      const quantity = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;
      const lineTotal = Number(item.lineTotal) || price * quantity;

      // Item name (truncate if too long)
      const maxNameWidth = pageWidth - 110;
      const itemNameLines = doc.splitTextToSize(itemName, maxNameWidth);
      addText(itemNameLines[0], 25, yPos, { fontSize: 9 });

      // Quantity
      addText(quantity.toString(), pageWidth - 75, yPos, { fontSize: 9 });

      // Price - Format as number
      const formattedPrice = lineTotal.toLocaleString("en-US", {
        minimumFractionDigits: 0,
      });
      addText(`${formattedPrice} ৳`, pageWidth - 25, yPos, {
        fontSize: 9,
        align: "right",
      });

      yPos += 6;

      // Add new page if needed
      if (yPos > 260 && index < order.items.length - 1) {
        doc.addPage();
        yPos = 20;
      }
    });
  }

  yPos += 5;

  // Totals Section
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 8;

  // Subtotal - Convert to Number
  const subtotal = Number(order.totals?.subtotal) || 0;
  const formattedSubtotal = subtotal.toLocaleString("en-US", {
    minimumFractionDigits: 0,
  });
  addText("Subtotal:", pageWidth - 80, yPos, {
    fontSize: 10,
  });
  addText(`${formattedSubtotal} ৳`, pageWidth - 25, yPos, {
    fontSize: 10,
    align: "right",
  });
  yPos += 6;

  // Shipping - Convert to Number
  const shipping = Number(order.totals?.shipping) || 0;
  const formattedShipping = shipping.toLocaleString("en-US", {
    minimumFractionDigits: 0,
  });
  addText("Shipping Charge:", pageWidth - 80, yPos, {
    fontSize: 10,
  });
  addText(`${formattedShipping} ৳`, pageWidth - 25, yPos, {
    fontSize: 10,
    align: "right",
  });
  yPos += 8;

  // Grand Total - Calculate and Convert to Number
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 85, yPos - 2, pageWidth - 20, yPos - 2);
  yPos += 2;

  const grandTotal =
    Number(order.totals?.grandTotal) || Number(subtotal + shipping);
  const formattedGrandTotal = grandTotal.toLocaleString("en-US", {
    minimumFractionDigits: 0,
  });
  addText("Final Total:", pageWidth - 80, yPos, {
    fontSize: 12,
    fontStyle: "bold",
  });
  addText(`${formattedGrandTotal} ৳`, pageWidth - 25, yPos, {
    fontSize: 12,
    fontStyle: "bold",
    align: "right",
    color: [16, 185, 129],
  });
  yPos += 15;

  // Thank You Message
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, "F");
  yPos += 8;

  addText("Thank You for Your Order!", pageWidth / 2, yPos, {
    fontSize: 12,
    fontStyle: "bold",
    align: "center",
    color: [16, 185, 129],
  });
  yPos += 6;

  addText(
    "Your order will be delivered soon. Payment to be made upon delivery.",
    pageWidth / 2,
    yPos,
    {
      fontSize: 9,
      align: "center",
      color: [100, 100, 100],
    }
  );

  // Footer
  yPos = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(220, 220, 220);
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 5;

  addText("AgriSmart | Smart Agriculture Solutions", pageWidth / 2, yPos, {
    fontSize: 8,
    align: "center",
    color: [120, 120, 120],
  });
  yPos += 4;

  addText(
    "Contact: +880 1712-345678 | Email: info@agrismart.com",
    pageWidth / 2,
    yPos,
    {
      fontSize: 8,
      align: "center",
      color: [120, 120, 120],
    }
  );

  // Generate filename and download
  const filename = `order_confirmation_${order.orderId || "unknown"}.pdf`;
  doc.save(filename);
};

export default generateCODOrderPDF;
