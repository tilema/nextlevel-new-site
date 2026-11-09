import React, { useState } from 'react';
import type { Language, Course } from '../types';
import { useT, useContent } from '../content/ContentContext';
import { formatAMD } from '../config';
import { Clock, Users, Calendar, Check, ArrowRight, Sparkles } from 'lucide-react';

interface CoursesProps {
  currentLang: Language;
  onSelectCourse: (courseTitle: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ currentLang, onSelectCourse }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ielts' | 'general' | 'speaking' | 'business'>('all');
  const t = useT(currentLang);
  const { content, img } = useContent();
  const coursesData = content.courses;
  const unitMonth = { en: 'month', hy: 'ամիս', ru: 'мес.' }[currentLang];
  const unitPackage = { en: '8 lessons', hy: '8 դաս', ru: '8 уроков' }[currentLang];

  const filteredCourses = coursesData.filter((course) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ielts') return course.id.includes('ielts') || course.id.includes('toefl');
    if (activeFilter === 'general') return course.id.includes('general') || course.id.includes('individual');
    if (activeFilter === 'speaking') return course.id.includes('speaking');
    if (activeFilter === 'business') return course.id.includes('business');
    return true;
  });

  const filterTabs = [
    { id: 'all', label: t.coursesSection.allCategories },
    { id: 'ielts', label: 'IELTS / TOEFL' },
    { id: 'general', label: currentLang === 'en' ? 'General English' : currentLang === 'hy' ? 'Ընդհանուր' : 'Общий курс' },
    { id: 'speaking', label: currentLang === 'en' ? 'Speaking & Fluency' : currentLang === 'hy' ? 'Խոսակցական' : 'Разговорный' },
    { id: 'business', label: currentLang === 'en' ? 'Business & IT' : currentLang === 'hy' ? 'Բիզնես / IT' : 'Деловой / IT' },
  ];

  return (
    <section id="courses" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.coursesSection.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.coursesSection.title}
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            {t.coursesSection.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-[#fff] shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map((course: Course) => (
            <div
              key={course.id}
              className={`relative rounded-2xl bg-slate-900 border flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/10 ${
                course.popular
                  ? 'border-indigo-500 shadow-xl shadow-indigo-600/10 ring-2 ring-indigo-500/30'
                  : 'border-slate-800 shadow-sm'
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={img(`course:${course.id}`)} alt={course.title[currentLang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f2147]/60 via-transparent to-transparent" />
                <span
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide ${
                    course.popular ? 'bg-cyan-500 text-[#fff]' : 'bg-[#fff] text-indigo-600'
                  }`}
                >
                  {course.badge[currentLang]}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-[#fff] font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.duration[currentLang]}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-100 mb-2.5">{course.title[currentLang]}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{course.description[currentLang]}</p>

                  <div className="space-y-2 py-3 border-y border-slate-800 mb-5 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>{course.intensity[currentLang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{course.groupSize[currentLang]}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-6">
                    {course.features[currentLang].map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 mt-auto">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold uppercase tracking-wide">{t.common.tuition}</span>
                      <span className="text-2xl font-extrabold text-slate-100">{formatAMD(course.price)}</span>
                      <span className="text-xs text-slate-400 font-semibold"> / {course.priceUnit === 'package' ? unitPackage : unitMonth}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      {t.common.freeMaterials}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(course.title[currentLang])}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      course.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-[#fff] shadow-md shadow-indigo-600/25'
                        : 'bg-slate-800 hover:bg-indigo-600 hover:text-[#fff] text-slate-100'
                    }`}
                  >
                    <span>{t.coursesSection.enrollBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
