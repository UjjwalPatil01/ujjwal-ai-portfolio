import React from 'react';
import { Award, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { educationItems } from '../../data/portfolioData';
import { Reveal } from '../animations/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="py-20 sm:py-24 border-t border-slate-800/80"
      aria-label="Academic Education"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Academic Background"
            title="Bachelor of Engineering in Computer Engineering"
            description="Strong foundational training in computer science, algorithms, database management systems, and machine learning."
          />
        </Reveal>

        {educationItems.map((edu) => (
          <Reveal key={edu.id}>
            <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800/90">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shrink-0">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-base text-cyan-300 font-medium mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {edu.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-semibold">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    CGPA: {edu.cgpa}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    {edu.location}
                  </span>
                </div>
              </div>

              <ul className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {edu.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-sm text-slate-300 leading-relaxed"
                  >
                    <span className="text-xs font-mono text-cyan-400 block mb-1">
                      0{idx + 1} // MILESTONE
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
