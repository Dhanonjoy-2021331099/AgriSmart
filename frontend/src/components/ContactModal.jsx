import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const contactInfo = {
    phone: "01783062908",
    whatsapp: "01783062908",
    email: "2021331099@student.sust.edu",
    address: "Sylhet, Bangladesh",
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          style={{ margin: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-8 py-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-1">যোগাযোগ করুন</h2>
              <p className="text-emerald-50 text-sm">
                আমরা সর্বদা আপনার সেবায় প্রস্তুত
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Contact Items */}
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      ফোন নম্বর
                    </p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-lg font-semibold text-slate-900 dark:text-white hover:text-emerald-600 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      ইমেইল
                    </p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      হোয়াটসঅ্যাপ
                    </p>
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-slate-900 dark:text-white hover:text-green-600 transition-colors"
                    >
                      {contactInfo.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      ঠিকানা
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 hover:scale-[1.02]"
                >
                  <Phone size={18} />
                  <span>কল করুন</span>
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200 hover:scale-[1.02]"
                >
                  <MessageCircle size={18} />
                  <span>হোয়াটসঅ্যাপ</span>
                </a>
              </div>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 w-full"
              >
                <Mail size={18} />
                <span>ইমেইল পাঠান</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
