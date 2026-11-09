import React from 'react';
import type { Language } from '../types';
import { useT, useContent } from '../content/ContentContext';
import { ClipboardCheck, ArrowRight, ShieldCheck } from 'lucide-react';

interface TestBannerProps {
  currentLang: Language;
  onOpenTestModal: () => void;
}

export const TestBanner: React.FC<TestBannerProps> = ({ currentLang, onOpenTestModal }) => {
  const t = useT(currentLang);
  const { img } = useContent();

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#1f2147] overflow-hidden grid lg:grid-cols-2 items-stretch shadow-2xl shadow-indigo-900/20">
          <div className="relative z-10 p-8 sm:p-12 space-y-4 text-center lg:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-[#ff6b47] text-[#fff] text-xs font-extrabold tracking-wide">
              CEFR · A1 – C1
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#fff] tracking-tight">{t.testBanner.title}</h3>
            <p className="text-[#c9d0f5] leading-relaxed">{t.testBanner.subtitle}</p>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-[#9fe8c8] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              {t.testBanner.timeEstimate}
            </div>
            <button
              onClick={onOpenTestModal}
              className="mt-2 inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold text-[#1f2147] bg-[#fff] hover:bg-[#eaeeff] shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <ClipboardCheck className="w-5 h-5 text-[#2540e0]" />
              {t.testBanner.button}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative hidden lg:block min-h-[280px]">
            <img src={img('testBanner')} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1f2147] via-[#1f2147]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
