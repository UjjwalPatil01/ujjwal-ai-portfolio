import React from 'react';
import { Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { certificationItems } from '../../data/portfolioData';
import { Reveal } from '../animations/Reveal';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';

export const Certifications: React.FC = () => {
  return (
    <section
      id="certifications"
      className="py-20 sm:py-24 border-t border-slate-800/80"
      aria-label="Certifications and Verified Scorecards"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Certifications & Assessments"
            title="Verified Technical Credentials & Scorecards"
            description="Direct verification links to official scorecards and completion certificates across Python programming, prompt engineering, web development, and C programming."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationItems.map((cert, index) => {
            const isFeaturedScorecard = cert.id === 'tcs-ion-nqt';
            return (
              <Reveal
                key={cert.id}
                delay={index * 0.05}
                className={isFeaturedScorecard ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <article
                  className={`h-full rounded-2xl glass-panel-interactive p-6 flex flex-col justify-between border ${
                    isFeaturedScorecard
                      ? 'border-cyan-500/40 bg-gradient-to-br from-cyan-950/25 via-slate-900/90 to-slate-950/90'
                      : 'border-slate-800/90'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                        <Award className="w-4 h-4 text-cyan-400" />
                        {cert.issuer}
                      </span>
                      <Badge variant={isFeaturedScorecard ? 'emerald' : 'cyan'}>
                        {cert.badgeText}
                      </Badge>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{cert.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mb-3">{cert.date}</p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {cert.description}
                    </p>

                    {cert.metrics && cert.metrics.length > 0 && (
                      <div className="mb-4 p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/25 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cert.metrics.map((metric) => (
                          <div
                            key={metric}
                            className="flex items-center gap-2 text-xs sm:text-sm font-mono text-emerald-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      Google Drive Verification
                    </span>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-colors"
                    >
                      <span>{cert.actionLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
