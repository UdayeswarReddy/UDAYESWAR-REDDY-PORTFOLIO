import React from 'react';
import { GraduationCap, Award, BookOpen, Users, Calendar, CheckCircle2 } from 'lucide-react';
import { Education, Extracurricular } from '../types/portfolio';

interface EducationSectionProps {
  education: Education;
  extracurricular: Extracurricular[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  extracurricular,
}) => {
  return (
    <section id="education" className="py-20 md:py-24 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2 font-mono">
            Academic Background
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
            Education & Campus Leadership
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Pursuing Computer Science with strong foundations in Data Structures, Object-Oriented Design, and Relational Databases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main University Card */}
          <div className="lg:col-span-7 bg-[#131b2e]/75 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-md shadow-xl shadow-blue-950/20">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono text-blue-400 font-medium">
                  Undergraduate Degree
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                  {education.institution}
                </h3>
                <p className="text-sm font-medium text-slate-300 mt-1">
                  {education.degree}
                </p>
              </div>

              <div className="flex flex-col items-end">
                <span className="px-3 py-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded">
                  CGPA: {education.cgpa}
                </span>
                <span className="text-xs text-slate-400 mt-1 font-mono">
                  {education.period}
                </span>
              </div>
            </div>

            {/* Coursework Area (Clean unboxed tags) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Core Computer Science Coursework</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
                {education.coursework.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-black/30 border border-white/5 rounded-lg px-3 py-2 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities & Academic Engagement */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Academic Activities & Practical Work</span>
              </div>
              <div className="space-y-2">
                {education.activities.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Extracurricular & Leadership Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase tracking-wider font-mono text-slate-400 font-semibold mb-2">
              Extracurricular & Organizations
            </div>

            {extracurricular.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#131b2e]/75 border border-slate-700/50 rounded-2xl p-6 space-y-3 hover:border-blue-500/40 transition-colors backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                  <Users className="w-3.5 h-3.5" />
                  <span>{item.title}</span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {item.organization}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Campus Timeline Highlights */}
            <div className="bg-gradient-to-br from-blue-950/20 to-slate-900/40 border border-blue-500/20 rounded-2xl p-5 text-xs space-y-2">
              <span className="font-mono text-blue-400 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Current Status & Availability</span>
              </span>
              <p className="text-slate-300">
                Currently in B.Tech Computer Science (RGMCET). Actively seeking Software Engineer Intern opportunities to apply core algorithms, Java development, and cloud fundamentals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
