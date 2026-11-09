import { useState, useEffect } from 'react';
import type { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TestBanner } from './components/TestBanner';
import { Courses } from './components/Courses';
import { WhyUs } from './components/WhyUs';
import { PricingCalculator } from './components/PricingCalculator';
import { Teachers } from './components/Teachers';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { LevelTestModal } from './components/LevelTestModal';
import { TrialLessonModal } from './components/TrialLessonModal';
import { AdminPanel } from './components/AdminPanel';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('hy');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(
    () => window.location.hash === '#admin' || window.location.hash === '#admin-open',
  );
  const [selectedCourseForTrial, setSelectedCourseForTrial] = useState<string>('');

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenTrialModal = (preselected?: string) => {
    if (preselected) {
      setSelectedCourseForTrial(preselected);
    }
    setIsTrialModalOpen(true);
  };

  const handleOpenTestModal = () => {
    setIsTestModalOpen(true);
  };

  const handleSelectCourseForTrialFromTest = (courseTitle: string) => {
    setSelectedCourseForTrial(courseTitle);
    setIsTrialModalOpen(true);
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenTrialModal={() => handleOpenTrialModal()}
        onOpenTestModal={handleOpenTestModal}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenTrialModal={() => handleOpenTrialModal()}
          onOpenTestModal={handleOpenTestModal}
        />

        {/* 2-Min Diagnostic Test Banner */}
        <TestBanner
          currentLang={currentLang}
          onOpenTestModal={handleOpenTestModal}
        />

        {/* Courses Catalog */}
        <Courses
          currentLang={currentLang}
          onSelectCourse={(courseTitle) => handleOpenTrialModal(courseTitle)}
        />

        {/* Why Next Level (Methodology & Campus) */}
        <WhyUs currentLang={currentLang} />

        {/* Interactive Pricing Calculator */}
        <PricingCalculator
          currentLang={currentLang}
          onSelectPlan={(planDetails) => handleOpenTrialModal(planDetails)}
        />

        {/* Certified Faculty */}
        <Teachers
          currentLang={currentLang}
          onBookWithTeacher={(teacherInfo) => handleOpenTrialModal(teacherInfo)}
        />

        {/* Student Outcomes & Testimonials */}
        <Testimonials currentLang={currentLang} />

        {/* FAQ Accordion */}
        <Faq currentLang={currentLang} />

        {/* Location & Contacts */}
        <ContactSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenTrialModal={() => handleOpenTrialModal()}
        onOpenTestModal={handleOpenTestModal}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Speed Dial & Back to Top */}
      <FloatingWidgets
        currentLang={currentLang}
        onOpenTestModal={handleOpenTestModal}
      />

      {/* Modals */}
      <LevelTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        currentLang={currentLang}
        onSelectCourseForTrial={handleSelectCourseForTrialFromTest}
      />

      <TrialLessonModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        currentLang={currentLang}
        preselectedCourse={selectedCourseForTrial}
      />

      {/* Built-in CMS Admin Panel */}
      <AdminPanel isOpen={isAdminOpen} onClose={handleCloseAdmin} />
    </div>
  );
}

export default App;
