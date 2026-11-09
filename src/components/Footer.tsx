import React from 'react';
import type { Language } from '../types';
import { useT, useContent } from '../content/ContentContext';
import { Phone, MapPin, Mail, Send } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenTrialModal: () => void;
  onOpenTestModal: () => void;
  onOpenAdmin?: () => void;
}

const Social = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-xl bg-[#fff]/10 hover:bg-[#fff]/20 flex items-center justify-center text-[#fff] transition-colors"
  >
    {children}
  </a>
);

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenTrialModal, onOpenTestModal, onOpenAdmin }) => {
  const t = useT(currentLang);
  const { content, img } = useContent();
  const CONTACT = content.contact;
  const link = 'text-[#c9d0f5] hover:text-[#fff] transition-colors';

  return (
    <footer className="bg-[#1f2147] text-[#c9d0f5] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#fff]/10">
          <div className="lg:col-span-2 space-y-5">
            <img src={img('logoWhite')} alt="Next Level Language School" className="h-20 w-auto" />
            <p className="text-sm leading-relaxed max-w-sm">{t.footer.description}</p>
            <div className="flex items-center gap-3">
              <Social href={CONTACT.instagram}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </Social>
              <Social href={CONTACT.facebook}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/></svg>
              </Social>
              <Social href={`https://t.me/${CONTACT.telegram}`}>
                <Send className="w-5 h-5" />
              </Social>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-[#fff] uppercase tracking-wider mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#courses" className={link}>{t.nav.courses}</a></li>
              <li><a href="#why-us" className={link}>{t.nav.whyUs}</a></li>
              <li><button onClick={onOpenTestModal} className={`${link} cursor-pointer`}>{t.nav.test}</button></li>
              <li><a href="#teachers" className={link}>{t.nav.teachers}</a></li>
              <li><a href="#calculator" className={link}>{t.nav.calculator}</a></li>
              <li><a href="#reviews" className={link}>{t.nav.reviews}</a></li>
              <li><a href="#faq" className={link}>{t.nav.faq}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-[#fff] uppercase tracking-wider mb-4">{t.footer.programs}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#courses" className={link}>IELTS Academic</a></li>
              <li><a href="#courses" className={link}>TOEFL iBT</a></li>
              <li><a href="#courses" className={link}>General English</a></li>
              <li><a href="#courses" className={link}>Speaking Club</a></li>
              <li><a href="#courses" className={link}>Business & IT English</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-[#fff] uppercase tracking-wider mb-4">{t.nav.contact}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-[#ff8a6b] shrink-0 mt-0.5" /><span>{t.contact.address}</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#ff8a6b] shrink-0" /><a href={`tel:${CONTACT.phone1Link}`} className={link}>{CONTACT.phone1}</a></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#ff8a6b] shrink-0" /><a href={`tel:${CONTACT.phone2Link}`} className={link}>{CONTACT.phone2}</a></div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#ff8a6b] shrink-0" /><a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a></div>
              <button onClick={onOpenTrialModal} className="mt-2 w-full py-3 rounded-xl text-sm font-bold text-[#fff] bg-[#ff6b47] hover:bg-[#e5502b] transition-colors cursor-pointer">
                {t.nav.bookTrial}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9aa3d6]">
          <div>© {new Date().getFullYear()} Next Level Language School. {t.footer.rights}</div>
          <div className="flex items-center gap-4">
            <span>nextlevel.am · Yerevan, Armenia</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 rounded-lg bg-[#fff]/10 hover:bg-[#fff]/20 text-[#c9d0f5] hover:text-[#fff] font-bold transition-colors cursor-pointer"
                title="Открыть панель управления сайтом (CMS)"
              >
                ⚙️ Админ-панель
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
