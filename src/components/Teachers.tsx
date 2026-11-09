import React from 'react';
import type { Language, Teacher } from '../types';
import { useT, useContent } from '../content/ContentContext';
import { Sparkles } from 'lucide-react';

interface TeachersProps {
  currentLang: Language;
  onBookWithTeacher: (teacherName: string) => void;
}

export const Teachers: React.FC<TeachersProps> = ({ currentLang, onBookWithTeacher }) => {
  const t = useT(currentLang);
  const { content, img } = useContent();
  const teachersData = content.teachers;

  return (
    <section id="teachers" className="py-20 md:py-28 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.teachers.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.teachers.title}
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            {t.teachers.subtitle}
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachersData.map((teacher: Teacher) => (
            <div
              key={teacher.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-64 overflow-hidden bg-slate-800">
                  <img
                    src={img(`teacher:${teacher.id}`)}
                    alt={teacher.name[currentLang]}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  
                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-cyan-300">
                    ⭐ {teacher.experience[currentLang]} {t.teachers.experience}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
                    {teacher.name[currentLang]}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-400 mt-0.5 mb-3">
                    {teacher.role[currentLang]}
                  </p>

                  {/* Credentials Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {teacher.credentials.map((cred, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {teacher.bio[currentLang]}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onBookWithTeacher(`Lesson with ${teacher.name[currentLang]}`)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer border border-slate-700"
                >
                  {t.common.bookWithTeacher} {teacher.name[currentLang].split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
