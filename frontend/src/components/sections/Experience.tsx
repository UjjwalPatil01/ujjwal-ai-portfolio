import React from 'react';
import { Briefcase, Calendar, ExternalLink, GitCommit, MapPin } from 'lucide-react';
import { experienceItems } from '../../data/portfolioData';
import { Reveal } from '../animations/Reveal';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-20 sm:py-24 border-t border-slate-800/80 bg-[#080d1a]/60"
      aria-label="Professional Experience and Internship"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Hands-On Software & Web Development Internship"
            description="Practical experience building modular web interfaces, integrating RESTful backend endpoints, and maintaining disciplined Git workflows."
          />
        </Reveal>

        <div className="space-y-6">
          {experienceItems.map((exp) => (
            <Reveal key={exp.id}>
              <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800/90 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300 mb-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.type}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {exp.role}{' '}
                      <span className="text-cyan-400 font-semibold">@ {exp.company}</span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {exp.summary}
                </p>

                <div className="mt-5 space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Key Contributions &amp; Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm sm:text-base text-slate-200 flex items-start gap-2.5"
                      >
                        <GitCommit className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="cyan">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <a
                    href={exp.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors"
                  >
                    <span>Verify Internship Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
