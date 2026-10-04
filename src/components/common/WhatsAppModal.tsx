import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS, PHONE_NUMBERS } from '../../data/config';

export const WhatsAppModal: React.FC = () => {
  const { isWhatsAppModalOpen, closeWhatsAppModal, language, bookingPreFillGoods } = useStore();
  const t = TRANSLATIONS[language];

  const getWhatsAppUrl = (phoneRaw: string) => {
    const defaultMsg = bookingPreFillGoods
      ? `Hello CHANNI TRANSPORT, I want to inquire about transporting: ${bookingPreFillGoods}. Please share rate details.`
      : `Hello CHANNI TRANSPORT, I want to book a mini-truck for goods transport. Please assist.`;
    return `https://wa.me/${phoneRaw.replace('+', '')}?text=${encodeURIComponent(defaultMsg)}`;
  };

  return (
    <AnimatePresence>
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWhatsAppModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#FAF7F2] dark:bg-[#1B1915] border border-[#C9A96E]/40 rounded-3xl p-6 md:p-8 shadow-2xl z-10 text-[#141210] dark:text-[#F4EFE6]"
          >
            {/* Close Button */}
            <button
              onClick={closeWhatsAppModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Close modal"
              data-testid="close-wa-modal"
            >
              <X className="w-5 h-5 text-[#6B6458] dark:text-[#A39B8B]" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-bold">WhatsApp Dispatch</h3>
                <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">Select dispatch number to open chat:</p>
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3 my-6">
              {PHONE_NUMBERS.map((phone) => (
                <a
                  key={phone.raw}
                  href={getWhatsAppUrl(phone.raw)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => closeWhatsAppModal()}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] hover:border-emerald-500 transition-all duration-300 shadow-sm"
                  data-testid={`wa-btn-${phone.raw}`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {phone.label}
                    </span>
                    <span className="font-mono text-lg font-bold">
                      {phone.display}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
