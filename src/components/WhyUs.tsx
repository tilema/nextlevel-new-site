import React from 'react';
import type { Language } from '../types';
import { useT } from '../content/ContentContext';
import {
  Award,
  Users2,
  Coffee,
  ShieldCheck,
  Building2,
  LineChart,
  Sparkles,
} from 'lucide-react';

interface WhyUsProps {
  currentLang: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ currentLang }) => {
  const t = useT(currentLang);

  const icons = [
    <Award className="w-6 h-6 text-indigo-400" />,
    <Users2 className="w-6 h-6 text-cyan-400" />,
    <Coffee className="w-6 h-6 text-amber-400" />,
    <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    <Building2 className="w-6 h-6 text-purple-400" />,
    <LineChart className="w-6 h-6 text-sky-400" />,
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.whyUs.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.whyUs.title}
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* 6 Advantage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.whyUs.points.map((point, idx) => (
            <div
              key={idx}
              className="group p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/40 transition-all">
                {icons[idx]}
              </div>

              <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
                {point.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
