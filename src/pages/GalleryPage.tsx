import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const galleryItems = [
    { id: 0, title: 'Mini Truck Cargo Bed Loading', cat: 'Loading', color: '#1B1915' },
    { id: 1, title: 'Plywood & Hardware Transit', cat: 'Intercity', color: '#141210' },
    { id: 2, title: 'Wholesale Market Delivery', cat: 'Market', color: '#25221C' },
    { id: 3, title: 'House Shifting Furniture Load', cat: 'Shifting', color: '#181613' },
    { id: 4, title: 'Cement & Tile Construction Transport', cat: 'Loading', color: '#100F0D' },
    { id: 5, title: 'Night Route Intercity Trip', cat: 'Intercity', color: '#1B1915' }
  ];

  const categories = ['All', 'Loading', 'Intercity', 'Market', 'Shifting'];

  const filtered = filter === 'All' ? galleryItems : galleryItems.filter((i) => i.cat === filter);

  const handlePrev = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const handleNext = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % galleryItems.length);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-12 text-[#141210] dark:text-[#F4EFE6]">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
          PHOTO GALLERY
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
          Tempo Goods Transport Gallery
        </h1>
        <p className="text-base text-[#6B6458] dark:text-[#A39B8B]">
          Explore real loading, intercity routes, and market deliveries across Punjab.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filter === cat
                ? 'bg-[#C9A96E] text-[#141210]'
                : 'bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] text-[#6B6458]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedIdx(item.id)}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E6DFD2] dark:border-[#2D2921] bg-[#1B1915] cursor-pointer shadow-lg p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center text-xs text-[#C9A96E]">
              <span className="font-mono">0{item.id + 1}</span>
              <span className="uppercase tracking-wider font-semibold">{item.cat}</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#FAF7F2]">{item.title}</h3>
              <span className="text-xs text-[#C9A96E] flex items-center gap-1 group-hover:underline">
                <ZoomIn className="w-4 h-4" /> Expand Photo
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <button onClick={() => setSelectedIdx(null)} className="absolute top-6 right-6 text-white p-2">
            <X className="w-8 h-8" />
          </button>

          <button onClick={handlePrev} className="absolute left-6 text-white p-2">
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-3xl w-full p-8 rounded-3xl bg-[#1B1915] border border-[#C9A96E] text-[#FAF7F2] space-y-4 text-center">
            <h2 className="font-serif text-3xl font-bold">{galleryItems[selectedIdx].title}</h2>
            <div className="aspect-[16/9] rounded-2xl bg-[#100F0D] flex items-center justify-center p-6 border border-[#2D2921]">
              <span className="text-[#C9A96E] font-serif text-xl">
                CHANNI TRANSPORT • High Resolution Vehicle Photo #{selectedIdx + 1}
              </span>
            </div>
          </div>

          <button onClick={handleNext} className="absolute right-6 text-white p-2">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
};
