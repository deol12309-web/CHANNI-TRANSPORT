import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { useStore } from './store/useStore';

import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Preloader } from './components/common/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { Toast } from './components/common/Toast';
import { Navbar } from './components/common/Navbar';
import { PhoneModal } from './components/common/PhoneModal';
import { WhatsAppModal } from './components/common/WhatsAppModal';
import { FloatingButtons } from './components/common/FloatingButtons';
import { Footer } from './components/sections/Footer';

import { HeroSection } from './components/sections/HeroSection';
import { MarqueeBanner } from './components/sections/MarqueeBanner';
import { AboutSection } from './components/sections/AboutSection';
import { PinnedStorySection } from './components/sections/PinnedStorySection';
import { ServicesSection } from './components/sections/ServicesSection';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { GallerySection } from './components/sections/GallerySection';
import { BookingSection } from './components/sections/BookingSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FAQSection } from './components/sections/FAQSection';
import { ContactSection } from './components/sections/ContactSection';

import { AboutPage } from './pages/AboutPage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main Home Page Component
const HomePage: React.FC = () => (
  <main>
    <HeroSection />
    <MarqueeBanner />
    <AboutSection />
    <PinnedStorySection />
    <ServicesSection />
    <WhyChooseUs />
    <GallerySection />
    <BookingSection />
    <TestimonialsSection />
    <FAQSection />
    <ContactSection />
  </main>
);

export const AppContent: React.FC = () => {
  const { theme } = useStore();

  useEffect(() => {
    // Ensure dark class is applied to html element
    document.documentElement.classList.add('dark');

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, [theme]);

  return (
    <div className="relative min-h-screen bg-[#0B0B0B] text-[#FAF7F2] selection:bg-[#C9A96E] selection:text-[#0B0B0B]">
      <ScrollToTop />
      <Preloader />
      <CustomCursor />
      <Toast />
      <PhoneModal />
      <WhatsAppModal />
      <Navbar />
      <FloatingButtons />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesOverviewPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
