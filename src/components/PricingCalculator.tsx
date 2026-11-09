import React, { useState } from 'react';
import type { Language } from '../types';
import { useT, useContent } from '../content/ContentContext';
import { formatAMD } from '../config';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingCalculatorProps {
  currentLang: Language;
  onSelectPlan: (planDetails: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  currentLang,
  onSelectPlan,
}) => {
  const t = useT(currentLang);

  const [format, setFormat] = useState<'group' | 'individual' | 'intensive'>('group');
  const [duration, setDuration] = useState<1 | 3 | 6>(3);

  const PRICES = useContent().content.prices;
  const baseMonthlyPrices = PRICES.calculator;
  const descs = {
    en: { group: '3× weekly • 1.5h • max 8 students', intensive: 'Daily sessions • accelerated progress', individual: 'Personal schedule • 1-on-1' },
    hy: { group: 'Շաբաթական 3× • 1.5 ժ • մինչև 8 ուսանող', intensive: 'Ամենօրյա դասեր • արագացված առաջընթաց', individual: 'Անհատական գրաֆիկ • 1-on-1' },
    ru: { group: '3 раза в неделю • 1.5 ч • до 8 человек', intensive: 'Ежедневные занятия • ускоренный прогресс', individual: 'Личный график • 1-на-1' },
  }[currentLang];

  const monthlyPrice = Math.round(baseMonthlyPrices[format] * (1 - (PRICES.discounts[duration] ?? 0)));
  const totalPrice = monthlyPrice * duration;

  const getFormatName = () => {
    if (format === 'group') return t.calculator.group;
    if (format === 'individual') return t.calculator.individual;
    return t.calculator.intensive;
  };

  return (
    <section id="calculator" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.calculator.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Format selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  {t.calculator.formatLabel}
                </label>
                <div className="space-y-2.5">
                  {[
                    { id: 'group', title: t.calculator.group, desc: descs.group },
                    { id: 'intensive', title: t.calculator.intensive, desc: descs.intensive },
                    { id: 'individual', title: t.calculator.individual, desc: descs.individual },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFormat(item.id as any)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        format === item.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Term Duration selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  {t.calculator.durationLabel}
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { val: 1, label: t.calculator.month1 },
                    { val: 3, label: t.calculator.months3 },
                    { val: 6, label: t.calculator.months6 },
                  ].map((dur) => (
                    <button
                      key={dur.val}
                      onClick={() => setDuration(dur.val as any)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        duration === dur.val
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-[#fff] border-transparent shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-indigo-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{t.common.estimate}</span>
                  {duration > 1 && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {t.common.saveDiscount} {duration === 3 ? '10%' : '20%'}
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">
                    {formatAMD(monthlyPrice)}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">/ {t.calculator.perMonth}</span>
                </div>

                {duration > 1 && (
                  <div className="text-xs text-slate-400 mb-6">
                    {t.common.totalFor} {duration} {t.common.months}:{' '}
                    <span className="text-slate-200 font-semibold">{formatAMD(totalPrice)}</span>
                  </div>
                )}

                {/* What's included checklist */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 mb-6">
                  <span className="text-xs font-bold text-slate-300 block mb-2">
                    {t.calculator.includes}
                  </span>
                  {t.calculator.featuresList.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() =>
                  onSelectPlan(`${getFormatName()} (${duration} mo) - ${formatAMD(monthlyPrice)}/mo`)
                }
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-[#fff] shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.calculator.selectPlan}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
