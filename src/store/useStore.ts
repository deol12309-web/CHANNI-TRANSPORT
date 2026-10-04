import { create } from 'zustand';

export type Language = 'en' | 'hi' | 'pa';
export type Theme = 'light' | 'dark';

interface AppState {
  language: Language;
  theme: Theme;
  isPhoneModalOpen: boolean;
  isWhatsAppModalOpen: boolean;
  isMobileMenuOpen: boolean;
  selectedPhone: string;
  bookingPreFillGoods: string;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info';

  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  openPhoneModal: (preferredNum?: string) => void;
  closePhoneModal: () => void;
  openWhatsAppModal: (preferredNum?: string) => void;
  closeWhatsAppModal: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setBookingPreFillGoods: (goods: string) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('channi_lang') as Language;
    if (saved && ['en', 'hi', 'pa'].includes(saved)) return saved;
  }
  return 'en';
};

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('channi_theme') as Theme;
    if (saved && ['light', 'dark'].includes(saved)) return saved;
  }
  return 'dark';
};

export const useStore = create<AppState>((set, get) => ({
  language: getInitialLanguage(),
  theme: getInitialTheme(),
  isPhoneModalOpen: false,
  isWhatsAppModalOpen: false,
  isMobileMenuOpen: false,
  selectedPhone: '+917837146640',
  bookingPreFillGoods: '',
  toastMessage: null,
  toastType: 'info',

  setLanguage: (lang: Language) => {
    localStorage.setItem('channi_lang', lang);
    set({ language: lang });
  },

  setTheme: (theme: Theme) => {
    localStorage.setItem('channi_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },

  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(nextTheme);
  },

  openPhoneModal: (preferredNum) => {
    if (preferredNum) {
      set({ selectedPhone: preferredNum, isPhoneModalOpen: true });
    } else {
      set({ isPhoneModalOpen: true });
    }
  },

  closePhoneModal: () => set({ isPhoneModalOpen: false }),

  openWhatsAppModal: (preferredNum) => {
    if (preferredNum) {
      set({ selectedPhone: preferredNum, isWhatsAppModalOpen: true });
    } else {
      set({ isWhatsAppModalOpen: true });
    }
  },

  closeWhatsAppModal: () => set({ isWhatsAppModalOpen: false }),

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  setBookingPreFillGoods: (goods: string) => set({ bookingPreFillGoods: goods }),

  showToast: (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    set({ toastMessage: msg, toastType: type });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 4500);
  },

  hideToast: () => set({ toastMessage: null })
}));
