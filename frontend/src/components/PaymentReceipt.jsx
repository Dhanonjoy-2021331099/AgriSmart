import { useRef } from "react";
import { jsPDF } from "jspdf";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 0 });

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function PaymentReceipt({ order, isDark = false }) {
  const receiptRef = useRef(null);

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Header
    pdf.setFillColor(21, 128, 61);
    pdf.rect(0, 0, pageWidth, 40, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text("AgriSmart", pageWidth / 2, 20, { align: "center" });

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Payment Receipt", pageWidth / 2, 30, { align: "center" });

    // Reset text color
    pdf.setTextColor(0, 0, 0);
    yPosition = 50;

    // Order ID and Date
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Receipt Details", 15, yPosition);
    yPosition += 7;

    pdf.setFont("helvetica", "normal");
    pdf.text(`Order ID: ${order.orderId}`, 15, yPosition);
    yPosition += 5;
    pdf.text(
      `Date: ${formatDate(order.timestamp || new Date())}`,
      15,
      yPosition
    );
    yPosition += 10;

    // Customer Information
    pdf.setFont("helvetica", "bold");
    pdf.text("Customer Information", 15, yPosition);
    yPosition += 7;

    pdf.setFont("helvetica", "normal");
    pdf.text(`Name: ${order.customer?.name}`, 15, yPosition);
    yPosition += 5;
    pdf.text(`Phone: ${order.customer?.phone}`, 15, yPosition);
    yPosition += 5;
    if (order.customer?.email) {
      pdf.text(`Email: ${order.customer.email}`, 15, yPosition);
      yPosition += 5;
    }
    pdf.text(`Address: ${order.customer?.address}`, 15, yPosition, {
      maxWidth: pageWidth - 30,
    });
    yPosition += 10;

    // Payment Information
    pdf.setFont("helvetica", "bold");
    pdf.text("Payment Information", 15, yPosition);
    yPosition += 7;

    pdf.setFont("helvetica", "normal");
    pdf.text(
      `Method: ${
        order.paymentMethod === "online" ? "Online Payment" : "Cash on Delivery"
      }`,
      15,
      yPosition
    );
    yPosition += 5;

    if (order.onlinePaymentDetails) {
      pdf.text(
        `Provider: ${order.onlinePaymentDetails.providerName}`,
        15,
        yPosition
      );
      yPosition += 5;
      pdf.text(
        `Transaction ID: ${order.onlinePaymentDetails.transactionId}`,
        15,
        yPosition
      );
      yPosition += 5;
      pdf.text(
        `Sender Number: ${order.onlinePaymentDetails.senderNumber}`,
        15,
        yPosition
      );
      yPosition += 5;
      pdf.text(
        `Status: ${order.onlinePaymentDetails.paymentStatus.toUpperCase()}`,
        15,
        yPosition
      );
      yPosition += 5;
    }
    yPosition += 5;

    // Order Items
    pdf.setFont("helvetica", "bold");
    pdf.text("Order Items", 15, yPosition);
    yPosition += 7;

    // Table header
    pdf.setFillColor(240, 240, 240);
    pdf.rect(15, yPosition - 5, pageWidth - 30, 8, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text("Item", 20, yPosition);
    pdf.text("Qty", pageWidth - 60, yPosition, { align: "right" });
    pdf.text("Price", pageWidth - 40, yPosition, { align: "right" });
    pdf.text("Total", pageWidth - 20, yPosition, { align: "right" });
    yPosition += 8;

    // Table rows
    pdf.setFont("helvetica", "normal");
    order.items?.forEach((item) => {
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(item.name.substring(0, 30), 20, yPosition);
      pdf.text(String(item.quantity), pageWidth - 60, yPosition, {
        align: "right",
      });
      pdf.text(`${formatCurrency(item.price)}`, pageWidth - 40, yPosition, {
        align: "right",
      });
      pdf.text(
        `${formatCurrency(item.lineTotal || item.price * item.quantity)}`,
        pageWidth - 20,
        yPosition,
        {
          align: "right",
        }
      );
      yPosition += 6;
    });

    yPosition += 5;

    // Totals
    pdf.setDrawColor(200, 200, 200);
    pdf.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 7;

    pdf.setFont("helvetica", "normal");
    pdf.text("Subtotal:", pageWidth - 60, yPosition);
    pdf.text(
      `৳${formatCurrency(order.totals?.subtotal)}`,
      pageWidth - 20,
      yPosition,
      {
        align: "right",
      }
    );
    yPosition += 6;

    pdf.text("Shipping:", pageWidth - 60, yPosition);
    pdf.text(
      `৳${formatCurrency(order.totals?.shipping)}`,
      pageWidth - 20,
      yPosition,
      {
        align: "right",
      }
    );
    yPosition += 8;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Grand Total:", pageWidth - 60, yPosition);
    pdf.text(
      `৳${formatCurrency(order.totals?.grandTotal)}`,
      pageWidth - 20,
      yPosition,
      {
        align: "right",
      }
    );

    // Footer
    yPosition = pageHeight - 20;
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "italic");
    pdf.setTextColor(100, 100, 100);
    pdf.text(
      "Thank you for your purchase! For any queries, contact us at contact@agrismart.com",
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );

    // Save the PDF
    pdf.save(`AgriSmart-Receipt-${order.orderId}.pdf`);
  };

  return (
    <div ref={receiptRef}>
      {/* Receipt Preview */}
      <div
        className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-2xl border ${
          isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-emerald-500">
          <div className="text-4xl mb-2">🌾</div>
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-slate-100" : "text-gray-800"
            }`}
          >
            AgriSmart
          </h1>
          <p
            className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}
          >
            Payment Receipt
          </p>
        </div>

        {/* Receipt Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3
              className={`text-sm font-semibold mb-2 ${
                isDark ? "text-slate-300" : "text-gray-600"
              }`}
            >
              Receipt Details
            </h3>
            <p
              className={`text-lg font-bold ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              Order ID: {order.orderId}
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Date: {formatDate(order.timestamp || new Date())}
            </p>
          </div>

          <div
            className={`p-4 rounded-xl ${
              isDark ? "bg-slate-700" : "bg-emerald-50"
            }`}
          >
            <h3
              className={`text-sm font-semibold mb-2 ${
                isDark ? "text-slate-300" : "text-gray-600"
              }`}
            >
              Payment Status
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {order.onlinePaymentDetails?.paymentStatus === "verified"
                  ? "✅"
                  : order.onlinePaymentDetails?.paymentStatus === "rejected"
                  ? "❌"
                  : "⏳"}
              </span>
              <span
                className={`font-bold ${
                  order.onlinePaymentDetails?.paymentStatus === "verified"
                    ? "text-green-600"
                    : order.onlinePaymentDetails?.paymentStatus === "rejected"
                    ? "text-red-600"
                    : isDark
                    ? "text-yellow-400"
                    : "text-yellow-600"
                }`}
              >
                {order.onlinePaymentDetails?.paymentStatus === "verified"
                  ? "Verified"
                  : order.onlinePaymentDetails?.paymentStatus === "rejected"
                  ? "Rejected"
                  : "Pending Verification"}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div
          className={`p-5 rounded-xl mb-6 ${
            isDark ? "bg-slate-700/50" : "bg-gray-50"
          }`}
        >
          <h3
            className={`text-lg font-bold mb-3 ${
              isDark ? "text-slate-200" : "text-gray-800"
            }`}
          >
            Customer Information
          </h3>
          <div
            className={`grid md:grid-cols-2 gap-3 text-sm ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}
          >
            <div>
              <span className="font-semibold">Name:</span>{" "}
              {order.customer?.name}
            </div>
            <div>
              <span className="font-semibold">Phone:</span>{" "}
              {order.customer?.phone}
            </div>
            {order.customer?.email && (
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {order.customer.email}
              </div>
            )}
            <div className="md:col-span-2">
              <span className="font-semibold">Address:</span>{" "}
              {order.customer?.address}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        {order.onlinePaymentDetails && (
          <div
            className={`p-5 rounded-xl mb-6 border-2 ${
              isDark
                ? "bg-emerald-900/20 border-emerald-700"
                : "bg-emerald-50 border-emerald-200"
            }`}
          >
            <h3
              className={`text-lg font-bold mb-3 ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              💳 Payment Information
            </h3>
            <div
              className={`grid md:grid-cols-2 gap-3 text-sm ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              <div>
                <span className="font-semibold">Method:</span> Online Payment
              </div>
              <div>
                <span className="font-semibold">Provider:</span>{" "}
                {order.onlinePaymentDetails.providerName}
              </div>
              <div>
                <span className="font-semibold">Transaction ID:</span>{" "}
                <span className="font-mono bg-white px-2 py-1 rounded text-emerald-600">
                  {order.onlinePaymentDetails.transactionId}
                </span>
              </div>
              <div>
                <span className="font-semibold">Sender Number:</span>{" "}
                {order.onlinePaymentDetails.senderNumber}
              </div>
              <div>
                <span className="font-semibold">Provider Number:</span>{" "}
                {order.onlinePaymentDetails.providerNumber}
              </div>
              <div>
                <span className="font-semibold">Submitted:</span>{" "}
                {formatDate(order.onlinePaymentDetails.submittedAt)}
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="mb-6">
          <h3
            className={`text-lg font-bold mb-3 ${
              isDark ? "text-slate-200" : "text-gray-800"
            }`}
          >
            Order Items
          </h3>
          <div className="space-y-2">
            {order.items?.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  isDark ? "bg-slate-700/50" : "bg-gray-50"
                }`}
              >
                <div>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-slate-200" : "text-gray-800"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    Qty: {item.quantity} × ৳{formatCurrency(item.price)}
                  </p>
                </div>
                <p
                  className={`font-bold ${
                    isDark ? "text-slate-200" : "text-gray-800"
                  }`}
                >
                  ৳
                  {formatCurrency(item.lineTotal || item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div
          className={`border-t-2 pt-4 ${
            isDark ? "border-slate-600" : "border-gray-200"
          }`}
        >
          <div
            className={`flex justify-between mb-2 ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}
          >
            <span>Subtotal:</span>
            <span>৳{formatCurrency(order.totals?.subtotal)}</span>
          </div>
          <div
            className={`flex justify-between mb-4 ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}
          >
            <span>Shipping:</span>
            <span>৳{formatCurrency(order.totals?.shipping)}</span>
          </div>
          <div
            className={`flex justify-between text-xl font-bold ${
              isDark ? "text-emerald-400" : "text-emerald-600"
            }`}
          >
            <span>Grand Total:</span>
            <span>৳{formatCurrency(order.totals?.grandTotal)}</span>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-8 text-center">
          <button
            onClick={downloadPDF}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            📄 Download Receipt (PDF)
          </button>
        </div>

        {/* Footer */}
        <div
          className={`mt-8 pt-6 border-t text-center text-sm ${
            isDark
              ? "border-slate-600 text-slate-400"
              : "border-gray-200 text-gray-500"
          }`}
        >
          <p>Thank you for your purchase!</p>
          <p>For any queries, contact us at contact@agrismart.com</p>
        </div>
      </div>
    </div>
  );
}
