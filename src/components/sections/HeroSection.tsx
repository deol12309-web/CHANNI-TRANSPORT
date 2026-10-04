import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, ShieldCheck, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../../store/useStore';
import { CONFIG, CHAPTERS, TRANSLATIONS } from '../../config';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const { language, openPhoneModal } = useStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoFallbackRef = useRef<HTMLVideoElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const totalFrames = CONFIG.frames.totalFrames;

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];
    let isCancelled = false;

    // Detect mobile device to skip odd frames if needed for performance
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 2 : 1;

    const loadImages = async () => {
      for (let i = 1; i <= totalFrames; i += step) {
        if (isCancelled) break;
        const img = new Image();
        img.src = CONFIG.frames.framePath(i);

        img.onload = () => {
          loadedCount++;
          const progressPercent = Math.min(100, Math.round((loadedCount / (totalFrames / step)) * 100));
          setLoadProgress(progressPercent);

          if (loadedCount >= Math.floor(totalFrames / step)) {
            setIsLoaded(true);
          }
        };

        img.onerror = () => {
          console.warn(`Frame failed to load: frame_${i}.webp`);
          // Mark error if initial frames fail
          if (i <= 5) setHasError(true);
        };

        imgArray.push(img);
      }
      setImages(imgArray);
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames]);

  // Draw frame on canvas with Object-Fit: Cover
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clamp frame index
    const clampedIdx = Math.max(0, Math.min(images.length - 1, frameIndex));
    const img = images[clampedIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Object-fit cover algorithm
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let renderW = width;
    let renderH = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderH = width / imgRatio;
      offsetY = (height - renderH) / 2;
    } else {
      renderW = height * imgRatio;
      offsetX = (width - renderW) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Dark luxury gradient overlay for text readability
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(11, 11, 11, 0.7)');
    gradient.addColorStop(0.5, 'rgba(11, 11, 11, 0.3)');
    gradient.addColorStop(1, 'rgba(11, 11, 11, 0.85)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  };

  // GSAP ScrollTrigger scrub binding
  useEffect(() => {
    if (!containerRef.current || images.length === 0) return;

    const obj = { currentFrame: 0 };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Frame update
        const targetFrame = Math.floor(progress * (images.length - 1));
        obj.currentFrame = targetFrame;
        drawFrame(targetFrame);

        // Chapter index update (0: hero, 1: ch1, 2: ch2, 3: ch3, 4: ch4)
        if (progress < 0.15) {
          setCurrentChapterIndex(0);
        } else if (progress >= 0.15 && progress < 0.38) {
          setCurrentChapterIndex(1);
        } else if (progress >= 0.38 && progress < 0.60) {
          setCurrentChapterIndex(2);
        } else if (progress >= 0.60 && progress < 0.80) {
          setCurrentChapterIndex(3);
        } else {
          setCurrentChapterIndex(4);
        }
      },
    });

    // Draw initial frame
    drawFrame(0);

    const handleResize = () => drawFrame(Math.floor(obj.currentFrame));
    window.addEventListener('resize', handleResize);

    return () => {
      trigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [images]);

  return (
    <section ref={containerRef} className="relative h-[450vh] bg-[#0B0B0B] text-[#FAF7F2]">
      {/* Sticky Hero Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Canvas or Video Fallback */}
        {!hasError ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500"
          />
        ) : (
          <video
            ref={videoFallbackRef}
            src={CONFIG.frames.fallbackVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          />
        )}

        {/* Ambient Top & Bottom Gold Line Highlights */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent z-10" />

        {/* Content Overlays */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full h-full flex flex-col justify-between pt-24 pb-12 pointer-events-none">
          {/* Top Tag & Stats Bar */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C9A96E]/30 bg-[#0B0B0B]/60 backdrop-blur-md text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.tagline}</span>
            </div>

            {/* Quick Contact Badge */}
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono tracking-wider text-[#FAF7F2]/80">
              <span>PUNJAB GOODS LOGISTICS</span>
              <span className="text-[#C9A96E]">● 24/7 DISPATCH</span>
            </div>
          </div>

          {/* MAIN HERO CONTENT (Shown when chapter === 0) */}
          <AnimatePresence mode="wait">
            {currentChapterIndex === 0 && (
              <motion.div
                key="hero-main"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="my-auto pointer-events-auto max-w-4xl"
              >
                <div className="overflow-hidden mb-2">
                  <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-[#C9A96E] uppercase block mb-1">
                    FAMILY-RUN FREIGHT LOGISTICS
                  </span>
                  <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#FAF7F2] leading-[0.95]">
                    CHANNI <span className="text-[#C9A96E] italic font-normal">TRANSPORT</span>
                  </h1>
                </div>

                <p className="max-w-2xl text-base md:text-xl text-[#FAF7F2]/80 font-sans font-light leading-relaxed mb-8">
                  {t.hero_subhead}
                </p>

                {/* Two Big Clickable Call Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`tel:${CONFIG.phones[0].raw}`}
                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#C9A96E] hover:bg-[#E4C88E] text-[#0B0B0B] font-semibold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C9A96E]/20 hover:scale-105"
                    data-testid="hero-call-primary"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>{t.call_dispatch}</span>
                  </a>

                  <a
                    href={`tel:${CONFIG.phones[1].raw}`}
                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-[#C9A96E]/50 bg-[#0B0B0B]/60 backdrop-blur-md text-[#C9A96E] hover:bg-[#C9A96E]/10 font-semibold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
                    data-testid="hero-call-secondary"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t.call_owner}</span>
                  </a>
                </div>
              </motion.div>
            )}

            {/* CHAPTER OVERLAYS (Chapters 1 to 4) */}
            {currentChapterIndex >= 1 && currentChapterIndex <= 4 && (
              <motion.div
                key={`chapter-${currentChapterIndex}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="my-auto pointer-events-auto max-w-2xl glass-card p-6 md:p-10 rounded-3xl border border-[#C9A96E]/30 bg-[#0B0B0B]/80 backdrop-blur-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-serif text-4xl md:text-5xl font-bold text-[#C9A96E]">
                    {CHAPTERS[currentChapterIndex - 1].number}
                  </span>
                  <div className="h-6 w-[1px] bg-[#C9A96E]/40" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#FAF7F2]/60 font-mono">
                    CHAPTER {currentChapterIndex} OF 4
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#FAF7F2] mb-3">
                  {t[CHAPTERS[currentChapterIndex - 1].titleKey] || CHAPTERS[currentChapterIndex - 1].number}
                </h2>

                <p className="text-sm md:text-lg text-[#FAF7F2]/80 font-light leading-relaxed mb-6">
                  {t[CHAPTERS[currentChapterIndex - 1].descKey]}
                </p>

                {/* Chapter Thin Progress Bar */}
                <div className="w-full h-[2px] bg-[#FAF7F2]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9A96E] transition-all duration-150"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          ((scrollProgress - (0.15 + (currentChapterIndex - 1) * 0.22)) / 0.22) * 100
                        )
                      )}%`,
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Controls & Scroll Indicator */}
          <div className="flex items-end justify-between pointer-events-auto">
            {/* Scroll Chapter Progress Dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const scrollTarget =
                      idx === 0
                        ? 0
                        : (containerRef.current?.offsetHeight || 0) * (0.2 + (idx - 1) * 0.2);
                    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentChapterIndex === idx
                      ? 'w-8 bg-[#C9A96E]'
                      : 'w-2 bg-[#FAF7F2]/30 hover:bg-[#FAF7F2]/60'
                  }`}
                  aria-label={`Go to chapter ${idx}`}
                />
              ))}
            </div>

            {/* Animated Scroll Down Indicator */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C9A96E]">
                {t.scroll_hint}
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-4 h-7 rounded-full border border-[#C9A96E]/60 flex justify-center p-1"
              >
                <div className="w-1 h-2 bg-[#C9A96E] rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
