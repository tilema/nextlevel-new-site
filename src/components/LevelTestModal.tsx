import React, { useState, useEffect } from 'react';
import type { Language } from '../types';
import { useT, useContent } from '../content/ContentContext';
import confetti from 'canvas-confetti';
import { X, CheckCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';

interface LevelTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSelectCourseForTrial: (courseTitle: string) => void;
}

export const LevelTestModal: React.FC<LevelTestModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectCourseForTrial,
}) => {
  const t = useT(currentLang);
  const diagnosticTestQuestions = useContent().content.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const question = diagnosticTestQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (selectedOptionIndex === null) return;

    const points = question.options[selectedOptionIndex].points;
    const newTotal = totalScore + points;
    setTotalScore(newTotal);

    if (currentQuestionIndex + 1 < diagnosticTestQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setTotalScore(0);
    setIsFinished(false);
  };

  // Determine Level and Recommended Course
  const maxScore = diagnosticTestQuestions.reduce((sum, q) => sum + Math.max(0, ...q.options.map((o) => o.points)), 0);
  const getLevelInfo = (score: number) => {
    const ratio = maxScore ? score / maxScore : 0;
    if (ratio < 0.3) {
      return {
        code: 'A1 - A2',
        title: currentLang === 'en' ? 'Elementary / Pre-Intermediate' : currentLang === 'hy' ? 'Սկսնակ / Նախամիջին' : 'Базовый / Начальный',
        recommended: currentLang === 'en' ? 'General English (A1/A2)' : currentLang === 'hy' ? 'Ընդհանուր Անգլերեն (A1/A2)' : 'Общий курс английского (A1/A2)',
        desc: currentLang === 'en' 
          ? 'You have basic understanding, but need systematic practice to construct natural sentences without hesitation.'
          : currentLang === 'hy'
          ? 'Ունեք բազային գիտելիքներ, բայց անհրաժեշտ է համակարգված պրակտիկա՝ ազատ խոսելու համար:'
          : 'У вас есть базовая база, но не хватает системной разговорной практики и грамматического фундамента.',
      };
    } else if (ratio < 0.6) {
      return {
        code: 'B1',
        title: currentLang === 'en' ? 'Intermediate' : currentLang === 'hy' ? 'Միջին (Intermediate)' : 'Средний (Intermediate)',
        recommended: currentLang === 'en' ? 'General English (B1) & Fluency Club' : currentLang === 'hy' ? 'Ընդհանուր B1 և Խոսակցական ակումբ' : 'Общий курс B1 + Разговорный интенсив',
        desc: currentLang === 'en'
          ? 'You can express ideas on familiar topics. Now it is time to expand vocabulary, idioms, and speak spontaneously.'
          : currentLang === 'hy'
          ? 'Կարողանում եք արտահայտել միտքը, սակայն պետք է հարստացնել բառապաշարը և խոսել առանց երկար մտածելու:'
          : 'Вы можете выразить мысли, но тратите время на мысленный перевод. Пора прокачивать беглость и активную лексику.',
      };
    } else if (ratio < 0.86) {
      return {
        code: 'B2',
        title: currentLang === 'en' ? 'Upper-Intermediate' : currentLang === 'hy' ? 'Բարձր Միջին (Upper-Int)' : 'Выше среднего (Upper-Intermediate)',
        recommended: currentLang === 'en' ? 'IELTS Academic Prep / Business English' : currentLang === 'hy' ? 'IELTS Նախապատրաստում / Բիզնես' : 'Подготовка к IELTS (Target 7.0+) / Деловые коммуникации',
        desc: currentLang === 'en'
          ? 'Great score! You understand complex ideas. You are ready to train for IELTS 7.0–8.0 or international work environments.'
          : currentLang === 'hy'
          ? 'Հիանալի արդյունք: Դուք պատրաստ եք IELTS 7.0+ նախապատրաստմանը կամ միջազգային աշխատանքին:'
          : 'Отличный уровень! Вы готовы к штурму IELTS 7.0–8.0, сдаче TOEFL или переходу на работу в зарубежную компанию.',
      };
    } else {
      return {
        code: 'C1',
        title: currentLang === 'en' ? 'Advanced' : currentLang === 'hy' ? 'Առաջադեմ (Advanced)' : 'Продвинутый (Advanced)',
        recommended: currentLang === 'en' ? 'IELTS Band 8.5 Mastery & Native Debates' : currentLang === 'hy' ? 'IELTS 8.5+ և Խորացված բանավեճեր' : 'IELTS 8.5+ Mastery & Дебаты с носителями',
        desc: currentLang === 'en'
          ? 'Outstanding mastery of English grammar and nuanced idioms. Polish your academic writing and reach native-level nuance.'
          : currentLang === 'hy'
          ? 'Բացառիկ գիտելիքներ: Հղկեք ակադեմիական գրավոր խոսքը և հասեք բնիկ լեզվակրի մակարդակի:'
          : 'Великолепное владение языком и сложными идиомами! Отточите академическое письмо и интонационные нюансы речи.',
      };
    }
  };

  const levelInfo = getLevelInfo(totalScore);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {t.levelTestModal.questionOf} {currentQuestionIndex + 1} / {diagnosticTestQuestions.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-2 text-white">
                {t.levelTestModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t.levelTestModal.subtitle}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / diagnosticTestQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6">
              <p className="text-base sm:text-lg font-medium text-slate-100">
                {question.question[currentLang]}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOptionIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-center justify-between border cursor-pointer ${
                    selectedOptionIndex === idx
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{opt.text[currentLang]}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedOptionIndex === idx
                        ? 'border-indigo-400 bg-indigo-600 text-[#fff]'
                        : 'border-slate-700'
                    }`}
                  >
                    {selectedOptionIndex === idx && <div className="w-2 h-2 rounded-full bg-[#fff]" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={selectedOptionIndex === null}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedOptionIndex !== null
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-[#fff] shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>
                {currentQuestionIndex + 1 === diagnosticTestQuestions.length
                  ? t.levelTestModal.seeResultBtn
                  : t.levelTestModal.nextBtn}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Result View */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-500/30">
              <Award className="w-8 h-8 text-white" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
              Diagnostic Complete
            </div>

            <h3 className="text-2xl font-extrabold text-white">
              {t.levelTestModal.yourLevel}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                {levelInfo.code}
              </span>
            </h3>
            <p className="text-sm font-semibold text-indigo-300 mt-1">{levelInfo.title}</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-3 max-w-md mx-auto leading-relaxed">
              {levelInfo.desc}
            </p>

            {/* Recommended Course Box */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-indigo-900/50 text-left">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                {t.levelTestModal.recommendedCourse}
              </span>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{levelInfo.recommended}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  onSelectCourseForTrial(levelInfo.recommended);
                  onClose();
                }}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-[#fff] shadow-xl shadow-indigo-500/25 transition-all cursor-pointer"
              >
                {t.levelTestModal.bookForThisLevel}
              </button>

              <button
                onClick={handleRestart}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.levelTestModal.retake}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
