import React from 'react';
import type { Language } from '../types';
import { useT, useContent } from '../content/ContentContext';
import { ArrowRight, CheckCircle2, MapPin, Star, Users, Award } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onOpenTrialModal: () => void;
  onOpenTestModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenTrialModal, onOpenTestModal }) => {
  const t = useT(currentLang);
  const { img } = useContent();

  const extra = { trust: t.hero.trust, rating: t.hero.ratingLabel, group: t.hero.groupLabel, address: t.hero.addressLabel };
  const statLabels = t.hero.statLabels;
  const stats = t.hero.statValues.map((value, i) => ({ value, label: statLabels[i] }));

  return (
    <section className="relative pt-28 md:pt-36 pb-16 overflow-hidden bg-gradient-to-b from-indigo-950 via-[#fff] to-[#fff]">
      {/* soft decorative blobs */}
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-32 w-[380px] h-[380px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff] border border-slate-800 text-slate-200 text-xs sm:text-sm font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.hero.badge.replace('🎓 ', '')}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-slate-100 leading-[1.12]">
              {t.hero.titleStart}{' '}
              <span className="text-indigo-600">{t.hero.titleHighlight}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={onOpenTrialModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-bold text-[#fff] bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xl shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
              >
                {t.hero.trialCta}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenTestModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-bold text-indigo-600 bg-[#fff] border-2 border-indigo-600 hover:bg-indigo-950 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                {t.hero.ctaPrimary}
              </button>
            </div>

            <ul className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-300 font-medium">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" />{extra.trust[0]}</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" />{extra.trust[1]}</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan-500" />{extra.trust[2]}</li>
            </ul>
          </div>

          {/* Photo collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-indigo-600/20 to-cyan-500/20 blur-2xl" />
              <img
                src={img('hero')}
                alt="Students studying together"
                className="relative w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl shadow-indigo-900/20"
              />

              {/* floating: rating */}
              <div className="absolute -bottom-5 -left-3 sm:-left-8 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#fff] shadow-xl shadow-slate-900/15 border border-slate-800 animate-floaty">
                <div className="w-11 h-11 rounded-xl bg-amber-400/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-100 leading-none">4.9 / 5</div>
                  <div className="text-xs text-slate-400 mt-1">{extra.rating}</div>
                </div>
              </div>

              {/* floating: IELTS */}
              <div className="absolute -top-4 -right-2 sm:-right-6 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#fff] shadow-xl shadow-slate-900/15 border border-slate-800">
                <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#fff]" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-100 leading-none">IELTS 8.0+</div>
                  <div className="text-xs text-slate-400 mt-1">{statLabels[2]}</div>
                </div>
              </div>

              {/* floating: building */}
              <div className="hidden sm:flex absolute -bottom-6 -right-4 sm:-right-8 items-center gap-3 p-2 pr-4 rounded-2xl bg-[#fff] shadow-xl shadow-slate-900/15 border border-slate-800">
                <img src={img('building')} alt="Abovyan 16/3" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <div className="text-sm font-extrabold text-slate-100 leading-tight">Abovyan 16/3</div>
                  <div className="text-xs text-slate-400">{extra.address}</div>
                </div>
              </div>

              {/* floating: group */}
              <div className="hidden md:flex absolute top-1/2 -left-8 -translate-y-1/2 items-center gap-2 px-3 py-2 rounded-xl bg-[#fff] shadow-lg shadow-slate-900/10 border border-slate-800">
                <Users className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-200">{extra.group}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-[#fff] border border-slate-800 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-indigo-600">{s.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
