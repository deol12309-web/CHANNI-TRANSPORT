import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Truck,
  MapPin,
  Calendar,
  Phone,
  Edit3,
  Share2,
  Calculator,
  ShieldCheck,
  Copy,
  Clock
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import {
  SERVICES_LIST,
  PUNJAB_TOWNS,
  PHONE_NUMBERS,
  LeadItem,
  TownDistance,
  TRANSLATIONS_GLOBAL
} from '../../data/config';

interface WizardProps {
  initialServiceId?: string;
  onComplete?: (refNo: string) => void;
}

export const QuoteBookingWizard: React.FC<WizardProps> = ({ initialServiceId }) => {
  const { language, showToast } = useStore();
  const [step, setStep] = useState(1);

  // Form State
  const [selectedService, setSelectedService] = useState(initialServiceId || SERVICES_LIST[0].id);
  const [pickupTown, setPickupTown] = useState('Ludhiana Hub');
  const [dropTown, setDropTown] = useState('Jalandhar');
  const [customPickupDetail, setCustomPickupDetail] = useState('');
  const [customDropDetail, setCustomDropDetail] = useState('');
  const [goodsSize, setGoodsSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [goodsDesc, setGoodsDesc] = useState('');
  const [bookingDate, setBookingDate] = useState('Tomorrow 9:00 AM');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Result state
  const [confirmedLead, setConfirmedLead] = useState<LeadItem | null>(null);

  // Quote Distance Calculation
  const calculateEstimate = () => {
    const pTownObj = PUNJAB_TOWNS.find((t: TownDistance) => t.town.includes(pickupTown)) || PUNJAB_TOWNS[0];
    const dTownObj = PUNJAB_TOWNS.find((t: TownDistance) => t.town.includes(dropTown)) || PUNJAB_TOWNS[1];

    const distanceKm = Math.abs(pTownObj.distFromLudhianaKm - dTownObj.distFromLudhianaKm) + 15;
    const sObj = SERVICES_LIST.find((s) => s.id === selectedService) || SERVICES_LIST[0];

    const sizeMultiplier = goodsSize === 'small' ? 1 : goodsSize === 'medium' ? 1.25 : 1.6;
    const basePrice = sObj.basePrice ?? 400;
    const perKmRate = sObj.perKmRate ?? 25;
    const estMin = Math.round((basePrice + distanceKm * perKmRate) * sizeMultiplier);
    const estMax = Math.round(estMin * 1.2);

    return { estMin, estMax, distanceKm };
  };

  const estimate = calculateEstimate();

  const handleNextStep = () => {
    if (step === 2 && (!pickupTown || !dropTown)) {
      showToast('Please select valid Pickup and Drop towns.', 'error');
      return;
    }
    if (step === 3 && !bookingDate) {
      showToast('Please enter preferred date/time.', 'error');
      return;
    }
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!customerName.trim() || cleanPhone.length < 10) {
      showToast('Please enter your full name and valid 10-digit phone number.', 'error');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refNo = `CT-2026-${randomNum}`;
    const sObj = SERVICES_LIST.find((s) => s.id === selectedService) || SERVICES_LIST[0];

    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      referenceNo: refNo,
      name: customerName.trim(),
      phone: customerPhone.trim(),
      pickup: `${pickupTown} ${customPickupDetail ? `(${customPickupDetail})` : ''}`,
      drop: `${dropTown} ${customDropDetail ? `(${customDropDetail})` : ''}`,
      goods: `${sObj.titleKey} - ${goodsDesc || 'Commercial Load'}`,
      weightSize: `${goodsSize.toUpperCase()} LOAD`,
      date: bookingDate,
      estimatedPriceRange: `₹${estimate.estMin.toLocaleString()} - ₹${estimate.estMax.toLocaleString()}`,
      status: 'New',
      notes: notes.trim() || 'Booked via Instant Quote Wizard',
      createdAt: new Date().toISOString(),
      sourcePage: 'Instant Quote Wizard',
      language: language
    };

    // Save to LocalStorage
    try {
      const existingStr = localStorage.getItem('channi_leads');
      const existingLeads: LeadItem[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('channi_leads', JSON.stringify([newLead, ...existingLeads]));
    } catch (err) {
      console.error('Error saving lead to localStorage:', err);
    }

    setConfirmedLead(newLead);
    showToast(`Booking Confirmation ${refNo} generated successfully!`, 'success');

    // Launch WhatsApp
    const waText =
      `Hello CHANNI TRANSPORT, I have submitted a booking inquiry!\n\n` +
      `📌 Reference No: ${refNo}\n` +
      `👤 Name: ${newLead.name}\n` +
      `📞 Phone: ${newLead.phone}\n` +
      `🚚 Service: ${sObj.titleKey}\n` +
      `📍 Pickup: ${newLead.pickup}\n` +
      `🏁 Drop: ${newLead.drop}\n` +
      `📦 Size / Goods: ${newLead.weightSize} (${newLead.goods})\n` +
      `📅 Date: ${newLead.date}\n` +
      `💰 Est. Range: ${newLead.estimatedPriceRange}`;

    const waUrl = `https://wa.me/917508260068?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const copyRefCode = () => {
    if (confirmedLead) {
      navigator.clipboard.writeText(confirmedLead.referenceNo);
      showToast(`Copied ${confirmedLead.referenceNo} to clipboard!`, 'success');
    }
  };

  if (confirmedLead) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 md:p-12 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#C9A96E] shadow-2xl space-y-6 text-center text-[#141210] dark:text-[#F4EFE6]"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            BOOKING INQUIRY CONFIRMED
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2">
            Reference: {confirmedLead.referenceNo}
          </h2>
          <p className="text-sm text-[#6B6458] dark:text-[#A39B8B] mt-2">
            Our dispatch manager will review your route and call you within 10 minutes to confirm vehicle arrival time.
          </p>
        </div>

        {/* Estimated Price Display */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] max-w-md mx-auto">
          <span className="text-xs font-semibold text-[#C9A96E] uppercase tracking-wider block">
            ESTIMATED FARE RANGE:
          </span>
          <span className="font-serif text-3xl font-bold text-[#141210] dark:text-[#F4EFE6] block mt-1">
            {confirmedLead.estimatedPriceRange}
          </span>
          <span className="text-[11px] text-[#6B6458] dark:text-[#A39B8B] block mt-1">
            *Estimated rate. Final rate confirmed directly on phone call.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={`tel:${PHONE_NUMBERS[0].raw}`}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C9A96E] hover:bg-[#B8923F] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Call Dispatch Now ({PHONE_NUMBERS[0].display})</span>
          </a>

          <button
            onClick={copyRefCode}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#141210] dark:border-[#F4EFE6] hover:border-[#C9A96E] text-[#141210] dark:text-[#F4EFE6] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Reference Code</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-6 md:p-10 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-2xl space-y-8 text-[#141210] dark:text-[#F4EFE6]">
      {/* Wizard Header & Stepper */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            INSTANT QUOTE & BOOKING WIZARD
          </span>
          <span className="font-mono text-xs font-bold text-[#C9A96E]">STEP 0{step} / 04</span>
        </div>

        {/* Stepper Progress Bar */}
        <div className="w-full h-1.5 bg-[#E6DFD2] dark:bg-[#2D2921] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C9A96E]"
            initial={{ width: '25%' }}
            animate={{ width: `${step * 25}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* STEP 1: SERVICE TYPE */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <h3 className="font-serif text-2xl font-bold">Step 1: Choose Your Transport Service</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES_LIST.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedService(srv.id)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  selectedService === srv.id
                    ? 'border-[#C9A96E] bg-[#C9A96E]/10 font-bold shadow-md'
                    : 'border-[#E6DFD2] dark:border-[#2D2921] bg-[#FAF7F2] dark:bg-[#100F0D]'
                }`}
                data-testid={`wizard-service-${srv.id}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base">{srv.titleKey}</span>
                  <Truck className="w-5 h-5 text-[#C9A96E]" />
                </div>
                <span className="text-xs text-[#6B6458] dark:text-[#A39B8B] block mt-1">
                  Base fare starting from ₹{srv.basePrice}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* STEP 2: PICKUP & DROP TOWNS + QUOTE ESTIMATOR */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <h3 className="font-serif text-2xl font-bold">Step 2: Pickup & Drop Locations</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-[#C9A96E]">Pickup Town</label>
              <select
                value={pickupTown}
                onChange={(e) => setPickupTown(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] font-sans text-sm"
              >
                {PUNJAB_TOWNS.map((t: TownDistance) => (
                  <option key={t.town} value={t.town}>
                    {t.town}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Specific Street / Landmark (Optional)"
                value={customPickupDetail}
                onChange={(e) => setCustomPickupDetail(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-[#C9A96E]">Drop Town</label>
              <select
                value={dropTown}
                onChange={(e) => setDropTown(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] font-sans text-sm"
              >
                {PUNJAB_TOWNS.map((t: TownDistance) => (
                  <option key={t.town} value={t.town}>
                    {t.town}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Specific Street / Landmark (Optional)"
                value={customDropDetail}
                onChange={(e) => setCustomDropDetail(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-xs"
              />
            </div>
          </div>

          {/* Live Quote Box */}
          <div className="p-5 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-[#C9A96E]" />
              <div>
                <span className="text-xs font-semibold text-[#C9A96E] uppercase block">LIVE ESTIMATED FARE:</span>
                <span className="font-serif text-2xl font-bold">
                  ₹{estimate.estMin.toLocaleString()} - ₹{estimate.estMax.toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-[#6B6458] dark:text-[#A39B8B] hidden sm:block">
              ~{estimate.distanceKm} km route distance
            </span>
          </div>
        </motion.div>
      )}

      {/* STEP 3: GOODS SIZE & DATE */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <h3 className="font-serif text-2xl font-bold">Step 3: Load Weight & Preferred Timing</h3>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-[#C9A96E]">Select Load Size</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'small', label: 'Small Load (Up to 400kg)' },
                { key: 'medium', label: 'Medium Load (400kg - 800kg)' },
                { key: 'large', label: 'Full Tempo (800kg+)' }
              ].map((sz) => (
                <button
                  key={sz.key}
                  type="button"
                  onClick={() => setGoodsSize(sz.key as any)}
                  className={`p-3 rounded-2xl text-xs font-bold border ${
                    goodsSize === sz.key
                      ? 'border-[#C9A96E] bg-[#C9A96E] text-[#141210]'
                      : 'border-[#E6DFD2] dark:border-[#2D2921]'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Date Chips */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-[#C9A96E]">Date & Pickup Time</label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setBookingDate('Book for Today (Immediate)')}
                className="px-4 py-2 rounded-full border border-[#C9A96E] text-xs font-bold hover:bg-[#C9A96E] hover:text-[#141210]"
              >
                Book for Today
              </button>
              <button
                type="button"
                onClick={() => setBookingDate('Book for Tomorrow (Morning 9 AM)')}
                className="px-4 py-2 rounded-full border border-[#C9A96E] text-xs font-bold hover:bg-[#C9A96E] hover:text-[#141210]"
              >
                Book for Tomorrow
              </button>
            </div>
            <input
              type="text"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-sm"
            />
          </div>
        </motion.div>
      )}

      {/* STEP 4: REVIEW & CONTACT */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <h3 className="font-serif text-2xl font-bold">Step 4: Contact & Final Review</h3>

          {/* Summary Card with Edits */}
          <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E6DFD2] dark:border-[#2D2921]">
              <span>
                <strong>Service:</strong> {SERVICES_LIST.find((s) => s.id === selectedService)?.titleKey}
              </span>
              <button onClick={() => setStep(1)} className="text-[#C9A96E] underline flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-[#E6DFD2] dark:border-[#2D2921]">
              <span>
                <strong>Route:</strong> {pickupTown} ➔ {dropTown}
              </span>
              <button onClick={() => setStep(2)} className="text-[#C9A96E] underline flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-[#E6DFD2] dark:border-[#2D2921]">
              <span>
                <strong>Load / Date:</strong> {goodsSize.toUpperCase()} • {bookingDate}
              </span>
              <button onClick={() => setStep(3)} className="text-[#C9A96E] underline flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="pt-1 text-[#C9A96E] font-bold text-sm">
              Estimated Rate: ₹{estimate.estMin.toLocaleString()} - ₹{estimate.estMax.toLocaleString()}
            </div>
          </div>

          {/* Contact Input Form */}
          <form onSubmit={handleConfirmSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-sm"
              />
              <input
                type="tel"
                required
                placeholder="Mobile Number *"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] font-mono text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#C9A96E] hover:bg-[#B8923F] text-[#141210] font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2"
              data-testid="submit-booking-wizard"
            >
              <span>Confirm & Send WhatsApp Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#E6DFD2] dark:border-[#2D2921]">
        {step > 1 ? (
          <button
            onClick={handlePrevStep}
            className="px-6 py-3 rounded-full border border-[#E6DFD2] dark:border-[#2D2921] text-xs font-bold flex items-center gap-2 hover:border-[#C9A96E]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : <div />}

        {step < 4 && (
          <button
            onClick={handleNextStep}
            className="px-8 py-3.5 rounded-full bg-[#141210] dark:bg-[#F4EFE6] text-[#FAF7F2] dark:text-[#100F0D] text-xs font-bold flex items-center gap-2 hover:bg-[#C9A96E] dark:hover:bg-[#C9A96E]"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
