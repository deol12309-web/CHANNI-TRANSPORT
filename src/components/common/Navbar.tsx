import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Sun, Moon, ShieldCheck } from 'lucide-react';
import { useStore, Language } from '../../store/useStore';
import { TRANSLATIONS } from '../../data/config';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    openPhoneModal,
  } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
    { to: '/admin', label: 'Admin' }
  ];

  const handleNavClick = (to: string) => {
    closeMobileMenu();
    navigate(to);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled
            ? 'bg-[#FAF7F2]/85 dark:bg-[#100F0D]/85 backdrop-blur-md border-b border-[#E6DFD2]/60 dark:border-[#2D2921]/60 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-xl md:text-2xl font-bold tracking-wider text-[#141210] dark:text-[#F4EFE6] flex items-center gap-1.5"
            data-testid="navbar-logo"
          >
            <span>CHANNI</span>
            <span className="text-[#C9A96E]">TRANSPORT</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs uppercase tracking-widest font-semibold transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#C9A96E] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A96E]'
                      : 'text-[#6B6458] dark:text-[#A39B8B] hover:text-[#C9A96E]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center p-1 rounded-full border border-[#E6DFD2] dark:border-[#2D2921] bg-white/50 dark:bg-black/50 text-xs font-semibold">
              {(['en', 'hi', 'pa'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-full transition-all uppercase text-[11px] ${
                    language === lang
                      ? 'bg-[#141210] dark:bg-[#F4EFE6] text-[#FAF7F2] dark:text-[#100F0D] font-bold shadow-sm'
                      : 'text-[#6B6458] dark:text-[#A39B8B] hover:text-[#C9A96E]'
                  }`}
                  data-testid={`lang-btn-${lang}`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिं' : 'ਪੰ'}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-[#E6DFD2] dark:border-[#2D2921] bg-white/50 dark:bg-black/50 text-[#141210] dark:text-[#F4EFE6] hover:border-[#C9A96E] transition-colors"
              aria-label="Toggle Theme"
              data-testid="theme-toggle"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#C9A96E]" />}
            </button>

            {/* Call Dispatch Button */}
            <button
              onClick={() => openPhoneModal()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#C9A96E] hover:bg-[#E4C88E] text-[#0B0B0B] font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-md shadow-[#C9A96E]/20"
              data-testid="navbar-call-btn"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{t.call_now || 'Call Now'}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2.5 rounded-full border border-[#E6DFD2] dark:border-[#2D2921] bg-white/50 dark:bg-black/50 text-[#141210] dark:text-[#F4EFE6]"
              aria-label="Toggle Menu"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#FAF7F2] dark:bg-[#100F0D] flex flex-col justify-between p-8 pt-24 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
                DISPATCH NAVIGATION
              </span>

              <div className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.04 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => closeMobileMenu()}
                      className="font-serif text-3xl font-bold text-[#141210] dark:text-[#F4EFE6] hover:text-[#C9A96E] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="flex flex-col gap-4 border-t border-[#E6DFD2] dark:border-[#2D2921] pt-6">
              <button
                onClick={() => {
                  closeMobileMenu();
                  openPhoneModal();
                }}
                className="w-full py-3.5 rounded-full bg-[#C9A96E] text-[#141210] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call +91 75082 60068 / +91 78371 46640</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
