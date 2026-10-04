import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowUp } from 'lucide-react';
import { useStore, Language } from '../../store/useStore';
import { TRANSLATIONS, PHONE_NUMBERS } from '../../data/config';

export const Footer: React.FC = () => {
  const { language, setLanguage } = useStore();
  const t = TRANSLATIONS[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141210] dark:bg-[#0A0908] text-[#FAF7F2] py-16 border-t border-[#C9A96E]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-12 border-b border-[#2D2921]">
          {/* Brand Wordmark */}
          <div className="space-y-2">
            <Link to="/" className="font-serif text-3xl md:text-5xl font-bold tracking-wider inline-block">
              CHANNI <span className="text-[#C9A96E] italic font-normal">TRANSPORT</span>
            </Link>
            <p className="text-xs md:text-sm text-[#A39B8B] tracking-widest uppercase">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Contact & Scroll Top */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${PHONE_NUMBERS[0].raw}`}
              className="px-6 py-3 rounded-full bg-[#C9A96E] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#B8923F] transition-all"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{PHONE_NUMBERS[0].display}</span>
            </a>

            <button
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full border border-[#2D2921] hover:border-[#C9A96E] flex items-center justify-center text-[#C9A96E] transition-colors"
              aria-label="Scroll to top"
              data-testid="footer-back-to-top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#A39B8B]">
          <div className="space-y-3">
            <span className="text-[#C9A96E] uppercase font-bold tracking-wider block">PAGES</span>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white">Services Overview</Link></li>
              <li><Link to="/gallery" className="hover:text-white">Fleet Gallery</Link></li>
              <li><Link to="/reviews" className="hover:text-white">Client Reviews</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#C9A96E] uppercase font-bold tracking-wider block">HELP & LEGAL</span>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact & Map</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#C9A96E] uppercase font-bold tracking-wider block">DISPATCH</span>
            <ul className="space-y-2">
              <li><Link to="/admin" className="hover:text-white">Admin Dispatch Portal</Link></li>
              <li><a href={`tel:${PHONE_NUMBERS[1].raw}`} className="hover:text-white">{PHONE_NUMBERS[1].display}</a></li>
              <li><a href="https://wa.me/917508260068" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp Chat</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#C9A96E] uppercase font-bold tracking-wider block">LANGUAGES</span>
            <div className="flex flex-col gap-2">
              {(['en', 'hi', 'pa'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-left uppercase tracking-wider transition-colors ${
                    language === lang ? 'text-[#C9A96E] font-bold underline' : 'hover:text-[#FAF7F2]'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'ਪੰਜਾਬੀ'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2D2921] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#A39B8B]">
          <p>{t.footer.rights}</p>
          <p className="text-[11px] opacity-70 italic">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};
