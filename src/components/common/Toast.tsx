import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const Toast: React.FC = () => {
  const { toastMessage, toastType, hideToast } = useStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[120] max-w-md bg-[#1B1915] text-[#F4EFE6] border border-[#C9A96E]/50 rounded-2xl p-4 shadow-2xl flex items-start gap-3 backdrop-blur-md"
        >
          {toastType === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toastType === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
          {toastType === 'info' && <Info className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />}

          <p className="text-xs md:text-sm font-sans pr-2 flex-1">{toastMessage}</p>

          <button
            onClick={hideToast}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
