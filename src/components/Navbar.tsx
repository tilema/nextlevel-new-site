import React, { useState, useEffect } from 'react';
import type { Language } from '../types';
import { useT, useContent } from '../content/ContentContext';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenTrialModal: () => void;
  onOpenTestModal: () => void;
}

const LANGS: { code: Language; label: string }[] = [
  { code: 'hy', label: 'Հայերեն' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenTrialModal,
  onOpenTestModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const t = useT(currentLang);
  const { content, img } = useContent();
  const CONTACT = content.contact;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#courses', label: t.nav.courses },
    { href: '#why-us', label: t.nav.whyUs },
    { href: '#teachers', label: t.nav.teachers },
    { href: '#calculator', label: t.nav.calculator },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#fff]/90 backdrop-blur-md ${
        isScrolled ? 'shadow-md shadow-slate-900/10 py-2' : 'py-3 border-b border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="shrink-0">
          <img src={img('logo')} alt="Next Level Language School" className="h-12 sm:h-14 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-slate-300 hover:text-indigo-600 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${CONTACT.phone1Link}`}
            className="hidden lg:flex items-center gap-2 text-sm font-bold text-slate-100 hover:text-indigo-600"
          >
            <Phone className="w-4 h-4 text-cyan-500" />
            {CONTACT.phone1}
          </a>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold rounded-xl bg-slate-950 border border-slate-800 text-slate-100 hover:border-indigo-400 cursor-pointer"
            >
              {currentLang.toUpperCase()}
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#fff] border border-slate-800 shadow-xl shadow-slate-900/10 py-1">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                      currentLang === l.code
                        ? 'text-indigo-600 font-bold bg-indigo-950'
                        : 'text-slate-200 hover:bg-slate-950'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenTrialModal}
            className="px-5 py-2.5 text-sm font-bold text-[#fff] bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/25 transition-all active:scale-95 cursor-pointer"
          >
            {t.nav.bookTrial}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => {
              const order: Language[] = ['hy', 'ru', 'en'];
              onLanguageChange(order[(order.indexOf(currentLang) + 1) % 3]);
            }}
            className="px-3 py-2 text-xs font-bold rounded-lg bg-slate-950 border border-slate-800 text-slate-100"
          >
            {currentLang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fff] border-t border-slate-800 px-4 py-4 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-950"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestModal();
              }}
              className="w-full py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 text-sm font-bold cursor-pointer"
            >
              {t.hero.ctaPrimary}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrialModal();
              }}
              className="w-full py-3 rounded-xl bg-indigo-600 text-[#fff] text-sm font-bold cursor-pointer"
            >
              {t.nav.bookTrial}
            </button>
            <a href={`tel:${CONTACT.phone1Link}`} className="block text-center text-sm text-slate-400 pt-1">
              {CONTACT.phone1}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
