import React from 'react';
import { BookOpen, Code, Cpu, GraduationCap, MapPin } from 'lucide-react';
import { profileIdentity } from '../../data/portfolioData';
import { Reveal } from '../animations/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-24 border-t border-slate-800/80 bg-[#080d1a]/60"
      aria-label="About Ujjwal Pradip Patil"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="About Me"
            title="Engineering Practical Connections Between AI Models & Backend Systems"
            description="Focused on turning transformer models, retrieval pipelines, and structured APIs into reliable, usable software."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Technical Identity Card (Monogram-Based — No Fabricated Photo) */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800/90 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-violet-600/25 border border-cyan-400/40 flex items-center justify-center font-mono text-2xl font-bold text-cyan-300 shadow-glow shrink-0"
                    aria-hidden="true"
                  >
                    {profileIdentity.monogram}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{profileIdentity.name}</h3>
                    <p className="text-xs font-mono text-cyan-300 mt-0.5">
                      B.E. Computer Engineering (2022–2026)
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {profileIdentity.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  {profileIdentity.aboutHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80"
                    >
                      <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                        {item.label}
                      </div>
                      <div className="text-sm font-semibold text-slate-100 mt-0.5">
                        {item.value}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Concise Engineering Narrative & Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.05}>
              <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800/90 space-y-4">
                {profileIdentity.aboutParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-base text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <Cpu className="w-5 h-5 text-cyan-400 mb-2" />
                    <h4 className="text-sm font-semibold text-white">Applied AI &amp; RAG</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Document ingestion, FAISS similarity search, and source-grounded LLM responses.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <Code className="w-5 h-5 text-blue-400 mb-2" />
                    <h4 className="text-sm font-semibold text-white">Python Backends</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      FastAPI &amp; Flask services, Pydantic validation, SQL persistence, and REST integration.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <BookOpen className="w-5 h-5 text-violet-400 mb-2" />
                    <h4 className="text-sm font-semibold text-white">Multilingual NLP</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      XLM-RoBERTa transformer fine-tuning and inference for regional Indian languages.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl p-5 bg-gradient-to-r from-cyan-950/30 via-blue-950/30 to-slate-900/60 border border-cyan-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Open to Entry-Level Engineering Opportunities
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      AI/ML Engineer • Generative AI Engineer • Python Developer • AI Backend Developer
                    </p>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shrink-0"
                >
                  Get in Touch
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
