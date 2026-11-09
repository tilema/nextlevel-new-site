import { useState, useEffect } from 'react';
import type { Language } from '../types';
import { useT, useContent } from '../content/ContentContext';
import { ArrowUp, MessageCircle, ClipboardCheck } from 'lucide-react';

interface FloatingWidgetsProps {
  currentLang: Language;
  onOpenTestModal: () => void;
}

export const FloatingWidgets = ({
  currentLang,
  onOpenTestModal,
}: FloatingWidgetsProps) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const t = useT(currentLang);
  const CONTACT = useContent().content.contact;

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Quick Test Pill */}
      <button
        onClick={onOpenTestModal}
        className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-bold shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ClipboardCheck className="w-4 h-4 text-cyan-400" />
        <span>{t.hero.ctaPrimary}</span>
      </button>

      <div className="flex items-center gap-2">
        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            title={t.common.backToTop}
            className="w-11 h-11 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Live Button */}
        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp Next Level"
          className="relative group w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-[#fff] shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>
    </div>
  );
};
