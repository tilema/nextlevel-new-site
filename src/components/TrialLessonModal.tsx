import React, { useState, useEffect } from 'react';
import type { Language } from '../types';
import { useT, useContent } from '../content/ContentContext';
import { X, CheckCircle2, Send, MapPin, Monitor, Phone, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrialLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  preselectedCourse?: string;
}

export const TrialLessonModal: React.FC<TrialLessonModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  preselectedCourse,
}) => {
  const t = useT(currentLang);
  const { content } = useContent();
  const coursesData = content.courses;
  const CONTACT = content.contact;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [format, setFormat] = useState<'offline' | 'online'>('offline');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (preselectedCourse) {
      setCourse(preselectedCourse);
    } else if (coursesData.length > 0) {
      setCourse(coursesData[0].title[currentLang]);
    }
  }, [preselectedCourse, currentLang, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 500);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setIsSubmitted(false);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Next Level! I would like to book a free trial lesson.\nName: ${name}\nPhone: ${phone}\nCourse: ${course}\nFormat: ${format === 'offline' ? 'In-person (Abovyan 16/3)' : 'Online Zoom'}`
  );

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleReset();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                100% Free • No Obligation
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2">
                {t.trialModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t.trialModal.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.trialModal.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.trialModal.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.trialModal.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.trialModal.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.trialModal.courseLabel}
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
                >
                  {coursesData.map((c) => (
                    <option key={c.id} value={c.title[currentLang]} className="bg-slate-900 text-white">
                      {c.title[currentLang]}
                    </option>
                  ))}
                  <option value="Not sure / Need assessment" className="bg-slate-900 text-white">
                    {currentLang === 'en' ? '❓ Need advice / Level audit' : currentLang === 'hy' ? '❓ Խորհրդատվություն / Թեստ' : '❓ Нужна консультация / Тест уровня'}
                  </option>
                </select>
              </div>

              {/* Format Selection (Offline / Online) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {t.trialModal.formatLabel}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormat('offline')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      format === 'offline'
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    <span>{t.trialModal.formatOffline}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormat('online')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      format === 'online'
                        ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Monitor className="w-4 h-4 text-cyan-400" />
                    <span>{t.trialModal.formatOnline}</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-[#fff] shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Processing...' : t.trialModal.submitBtn}</span>
              </button>

              <p className="text-[11px] text-center text-slate-500 pt-1">
                🔒 We respect your privacy. No spam. You will only receive a message regarding your trial lesson.
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {t.trialModal.successTitle}
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed mb-6">
              {t.trialModal.successText}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-300 space-y-1.5 max-w-sm mx-auto mb-6">
              <div><strong className="text-slate-400">Name:</strong> {name}</div>
              <div><strong className="text-slate-400">Contact:</strong> {phone}</div>
              <div><strong className="text-slate-400">Course:</strong> {course}</div>
              <div><strong className="text-slate-400">Format:</strong> {format === 'offline' ? 'In-Person (Abovyan 16/3)' : 'Online Zoom'}</div>
            </div>

            {/* Direct Instant Confirmation Buttons */}
            <div className="space-y-2.5 max-w-sm mx-auto mb-6">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#fff] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.common.openWhatsAppNow}</span>
              </a>

              <a
                href={`tel:${CONTACT.phone1Link}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.common.callCoordinator}: {CONTACT.phone1}</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              className="py-2.5 px-8 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            >
              {t.trialModal.closeBtn}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
