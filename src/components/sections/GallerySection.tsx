import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const GallerySection: React.FC = () => {
  const { language } = useStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Open Cargo Bed Loading',
      category: 'Safe Strapping',
      aspect: 'aspect-[4/3]',
      color: 'from-[#C9A96E]/20 to-[#100F0D]',
      svgContent: (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <rect width="400" height="300" fill="#1B1915" />
          <rect x="50" y="100" width="300" height="150" fill="#FAF7F2" rx="10" opacity="0.9" />
          <rect x="70" y="120" width="260" height="110" fill="#E6DFD2" rx="6" />
          <line x1="70" y1="140" x2="330" y2="140" stroke="#C9A96E" strokeWidth="4" strokeDasharray="10 5" />
          <line x1="70" y1="180" x2="330" y2="180" stroke="#C9A96E" strokeWidth="4" strokeDasharray="10 5" />
          <text x="200" y="275" textAnchor="middle" fill="#C9A96E" fontSize="14" fontFamily="serif" fontWeight="bold">
            CHANNI TRANSPORT • LOAD SAFETY
          </text>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Intercity Highway Transit',
      category: 'Punjab Routes',
      aspect: 'aspect-[4/3]',
      color: 'from-[#FAF7F2] to-[#E6DFD2]',
      svgContent: (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <rect width="400" height="300" fill="#141210" />
          <path d="M 0,220 Q 200,180 400,220 L 400,300 L 0,300 Z" fill="#2D2921" />
          <line x1="0" y1="260" x2="400" y2="260" stroke="#C9A96E" strokeWidth="4" strokeDasharray="20 15" />
          <circle cx="200" cy="120" r="50" fill="#C9A96E" opacity="0.15" />
          <text x="200" y="125" textAnchor="middle" fill="#FAF7F2" fontSize="16" fontFamily="serif" fontWeight="bold">
            PUNJAB HIGHWAY EXPRESS
          </text>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Local Market Stock Delivery',
      category: 'Market Dispatch',
      aspect: 'aspect-[4/3]',
      color: 'from-[#C9A96E] to-[#FAF7F2]',
      svgContent: (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <rect width="400" height="300" fill="#181613" />
          <rect x="40" y="80" width="80" height="120" fill="#FAF7F2" rx="4" opacity="0.8" />
          <rect x="140" y="60" width="100" height="140" fill="#E6DFD2" rx="4" opacity="0.8" />
          <rect x="260" y="100" width="90" height="100" fill="#C9A96E" rx="4" opacity="0.8" />
          <text x="200" y="250" textAnchor="middle" fill="#C9A96E" fontSize="14" fontFamily="serif">
            WHOLESALE MARKET HUB
          </text>
        </svg>
      )
    },
    {
      id: 4,
      title: 'House & Furniture Shifting',
      category: 'Careful Loading',
      aspect: 'aspect-[4/3]',
      color: 'from-[#100F0D] to-[#1B1915]',
      svgContent: (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <rect width="400" height="300" fill="#25221C" />
          <rect x="100" y="100" width="200" height="120" stroke="#C9A96E" strokeWidth="2" fill="none" rx="8" />
          <path d="M 120,140 L 280,140 M 120,170 L 280,170" stroke="#E6DFD2" strokeWidth="2" />
          <text x="200" y="70" textAnchor="middle" fill="#FAF7F2" fontSize="15" fontFamily="serif" fontWeight="bold">
            PROTECTIVE FURNITURE SPACE
          </text>
        </svg>
      )
    }
  ];

  return (
    <section
      id="gallery"
      className="py-24 bg-[#FAF7F2] dark:bg-[#100F0D] text-[#141210] dark:text-[#F4EFE6] border-t border-[#E6DFD2] dark:border-[#2D2921]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            FLEET & TRIP GALLERY
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Real Goods Transport in Action
          </h2>
          <p className="text-sm md:text-base text-[#6B6458] dark:text-[#A39B8B]">
            Faithful mini-truck loading and delivery moments across Punjab routes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImg(item.title)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer border border-[#E6DFD2] dark:border-[#2D2921] shadow-lg bg-white dark:bg-[#1B1915]"
              data-testid={`gallery-item-${item.id}`}
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden">
                {item.svgContent}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#C9A96E] text-[#141210] flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] block mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif font-bold text-lg text-[#141210] dark:text-[#F4EFE6]">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-[#1B1915] p-6 rounded-3xl border border-[#C9A96E]/40 text-[#F4EFE6] z-10"
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-serif text-2xl font-bold mb-4">{selectedImg}</h3>
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#100F0D] flex items-center justify-center p-8 border border-[#2D2921]">
                <p className="text-[#C9A96E] font-serif text-xl text-center">
                  CHANNI TRANSPORT • High Resolution Vehicle Photo Placeholder
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
