import React from 'react';
import type { Language } from '../types';
import { useT, useContent } from '../content/ContentContext';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = useT(currentLang);
  const { content, img } = useContent();
  const CONTACT = content.contact;

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.contact.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Cards & Direct Buttons */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="relative rounded-2xl overflow-hidden h-48 shadow-lg shadow-slate-900/10">
              <img src={img('building')} alt="Abovyan 16/3, Yerevan" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f2147]/70 to-transparent" />
              <div className="absolute bottom-3 left-4 text-[#fff] font-extrabold text-lg">Abovyan 16/3 · 5th floor</div>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {t.contact.addressTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.contact.address}
                </p>
                <span className="text-[11px] text-cyan-400 font-semibold block mt-1">
                  Near Charles Aznavour Square
                </span>
              </div>
            </div>

            {/* Phones Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {t.contact.phonesTitle}
                </h4>
                <div className="space-y-1">
                  <a
                    href={`tel:${CONTACT.phone1Link}`}
                    className="block text-sm font-semibold text-slate-200 hover:text-indigo-400 transition-colors"
                  >
                    {CONTACT.phone1}
                  </a>
                  <a
                    href={`tel:${CONTACT.phone2Link}`}
                    className="block text-sm font-semibold text-slate-200 hover:text-indigo-400 transition-colors"
                  >
                    {CONTACT.phone2}
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {t.contact.hoursTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                  {t.contact.hours}
                </p>
              </div>
            </div>

            {/* Instant Messenger CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#fff] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.contact.whatsappBtn}</span>
              </a>

              <a
                href={`https://t.me/${CONTACT.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-[#fff] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-600/20"
              >
                <Send className="w-4 h-4" />
                <span>{t.contact.telegramBtn}</span>
              </a>
            </div>

          </div>

          {/* Right: Interactive Map Visual & Yerevan Directions */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="rounded-xl overflow-hidden h-[380px] w-full relative bg-slate-950 border border-slate-800">
              {/* Embedded Interactive OpenStreetMap iframe centered on Abovyan 16/3 Yerevan */}
              <iframe
                title="Next Level Language School Location"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://www.openstreetmap.org/export/embed.html?bbox=44.5120%2C40.1780%2C44.5220%2C40.1840&amp;layer=mapnik&amp;marker=40.1812%2C44.5168"
                className=""
              />

              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto p-3.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-xl flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-white">Next Level Language School</div>
                  <div className="text-[11px] text-slate-400">Abovyan 16/3, Kentron, Yerevan</div>
                </div>
                <a
                  href={CONTACT.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[#fff] text-[11px] font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Open Route</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
