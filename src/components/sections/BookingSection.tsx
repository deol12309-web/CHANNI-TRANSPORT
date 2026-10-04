import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, PhoneCall, Calendar, MapPin, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS, PHONE_NUMBERS } from '../../data/config';

export const BookingSection: React.FC = () => {
  const { language, bookingPreFillGoods, showToast } = useStore();
  const t = TRANSLATIONS[language];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [goods, setGoods] = useState('');
  const [weight, setWeight] = useState('');
  const [datetime, setDatetime] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedPhoneRaw, setSelectedPhoneRaw] = useState(PHONE_NUMBERS[0].raw);

  useEffect(() => {
    if (bookingPreFillGoods) {
      setGoods(bookingPreFillGoods);
    }
  }, [bookingPreFillGoods]);

  const validate = () => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!name.trim() || cleanPhone.length < 10 || !pickup.trim() || !drop.trim()) {
      return false;
    }
    return true;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast(t.booking.errorToast, 'error');
      return;
    }

    const message =
      `Hello CHANNI TRANSPORT, I want to book a mini-truck for goods transport.\n\n` +
      `👤 Name: ${name.trim()}\n` +
      `📞 Phone: ${phone.trim()}\n` +
      `📍 Pickup Location: ${pickup.trim()}\n` +
      `🏁 Drop Location: ${drop.trim()}\n` +
      `📦 Type of Goods: ${goods.trim() || 'General Commercial Load'}\n` +
      `⚖️ Approx Weight: ${weight.trim() || 'Not specified'}\n` +
      `📅 Date & Time: ${datetime.trim() || 'As soon as possible'}\n` +
      `📝 Notes: ${notes.trim() || 'None'}`;

    const cleanNum = selectedPhoneRaw.replace('+', '');
    const waUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;

    showToast(t.booking.successToast, 'success');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCallbackRequest = () => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!name.trim() || cleanPhone.length < 10) {
      showToast('Please enter your Name and a valid 10-digit Mobile number for callback.', 'error');
      return;
    }

    const message =
      `Hello CHANNI TRANSPORT, please call me back for a booking inquiry.\n\n` +
      `👤 Name: ${name.trim()}\n` +
      `📞 Phone: ${phone.trim()}`;

    const cleanNum = selectedPhoneRaw.replace('+', '');
    const waUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;

    showToast('Callback request ready! Sending on WhatsApp...', 'info');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="booking"
      className="py-24 bg-[#FAF7F2] dark:bg-[#100F0D] text-[#141210] dark:text-[#F4EFE6] border-t border-[#E6DFD2] dark:border-[#2D2921]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Description Card */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
              {t.booking.badge}
            </span>

            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
              {t.booking.title}
            </h2>

            <p className="text-base md:text-lg text-[#6B6458] dark:text-[#A39B8B] leading-relaxed">
              {t.booking.subtitle}
            </p>

            {/* Direct Call Quick Box */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] space-y-4 shadow-lg">
              <h3 className="font-serif text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">
                Prefer Direct Phone Call?
              </h3>
              <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">
                Tap below to instantly speak with our dispatch team on either line:
              </p>

              <div className="flex flex-col gap-3">
                {PHONE_NUMBERS.map((p) => (
                  <a
                    key={p.raw}
                    href={`tel:${p.raw}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] hover:border-[#C9A96E] transition-all"
                    data-testid={`booking-direct-call-${p.raw}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-[#C9A96E]">{p.label}</span>
                      <span className="font-mono text-base font-bold">{p.display}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#C9A96E] text-[#141210] flex items-center justify-center font-bold">
                      <PhoneCall className="w-4 h-4 fill-current" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Booking Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleWhatsAppSubmit}
              className="p-8 md:p-10 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-2xl space-y-6"
              data-testid="booking-form"
            >
              {/* Preferred Dispatch Number Radio Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E] block">
                  {t.booking.preferredPhoneLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PHONE_NUMBERS.map((p) => (
                    <label
                      key={p.raw}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        selectedPhoneRaw === p.raw
                          ? 'border-[#C9A96E] bg-[#C9A96E]/10 font-bold'
                          : 'border-[#E6DFD2] dark:border-[#2D2921] bg-transparent'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredPhone"
                        value={p.raw}
                        checked={selectedPhoneRaw === p.raw}
                        onChange={() => setSelectedPhoneRaw(p.raw)}
                        className="accent-[#C9A96E]"
                      />
                      <div className="flex flex-col text-xs">
                        <span>{p.label}</span>
                        <span className="font-mono font-bold">{p.display}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#141210] dark:text-[#F4EFE6]">
                    {t.booking.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.booking.namePlaceholder}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] focus:border-[#C9A96E] focus:outline-none text-sm"
                    data-testid="input-name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#141210] dark:text-[#F4EFE6]">
                    {t.booking.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.booking.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] focus:border-[#C9A96E] focus:outline-none text-sm font-mono"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              {/* Pickup & Drop Locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#141210] dark:text-[#F4EFE6]">
                    {t.booking.pickupLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder={t.booking.pickupPlaceholder}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] focus:border-[#C9A96E] focus:outline-none text-sm"
                    data-testid="input-pickup"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#141210] dark:text-[#F4EFE6]">
                    {t.booking.dropLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder={t.booking.dropPlaceholder}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] focus:border-[#C9A96E] focus:outline-none text-sm"
                    data-testid="input-drop"
                  />
                </div>
              </div>

              {/* Type of Goods & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#141210] dark:text-[#F4EFE6]">
                    {t.booking.goodsLabel}
                  </label>
                  <input
                    type="text"
                    value={goods}
                    onChange={(e) => setGoods(e.target.value)}
                    placeholder={t.booking.goodsPlaceholder}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] focus:border-[#C9A96E] focus:outline-none text-sm"
                    data-testid="input-goods"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#141210] dark:text-[#F4EFE6]">
                    {t.booking.weightLabel}
                  </label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={t.booking.weightPlaceholder}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] focus:border-[#C9A96E] focus:outline-none text-sm"
                    data-testid="input-weight"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#141210] dark:text-[#F4EFE6]">
                  {t.booking.dateLabel}
                </label>
                <input
                  type="text"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  placeholder="e.g. Tomorrow 9:00 AM"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] focus:border-[#C9A96E] focus:outline-none text-sm"
                  data-testid="input-datetime"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#141210] dark:text-[#F4EFE6]">
                  {t.booking.notesLabel}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.booking.notesPlaceholder}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] focus:border-[#C9A96E] focus:outline-none text-sm resize-none"
                  data-testid="input-notes"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
                  data-testid="submit-whatsapp-booking"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.booking.submitBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCallbackRequest}
                  className="w-full sm:w-auto py-4 px-6 rounded-full border border-[#141210] dark:border-[#F4EFE6] hover:border-[#C9A96E] text-[#141210] dark:text-[#F4EFE6] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  data-testid="request-callback-btn"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t.booking.callbackBtn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
