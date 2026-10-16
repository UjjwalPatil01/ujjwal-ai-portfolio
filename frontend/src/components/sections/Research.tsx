import React from 'react';
import { BookOpen, CheckCircle2, ExternalLink, FileCheck2, FileText, Sparkles } from 'lucide-react';
import { researchPublication } from '../../data/portfolioData';
import { Reveal } from '../animations/Reveal';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';

export const Research: React.FC = () => {
  return (
    <section
      id="research"
      className="py-20 sm:py-24 border-t border-slate-800/80 bg-[#080d1a]/70"
      aria-label="Published Research Paper"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Research & Publication"
            title="Peer-Reviewed Research in Multilingual NLP & Mental Health Detection"
            description="Investigating transformer adaptation and Selective Layer Freezing (SLF) for regional Indian language social media analysis."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <article className="rounded-2xl glass-panel p-6 sm:p-10 border border-cyan-500/30 shadow-glow relative overflow-hidden">
            {/* Scholarly Top Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Published Research Paper • {researchPublication.publicationDate}</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                {researchPublication.volumeIssue} | {researchPublication.pages} | {researchPublication.eissn}
              </div>
            </div>

            {/* Paper Title & Venue */}
            <div className="mt-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                &ldquo;{researchPublication.title}&rdquo;
              </h3>
              <p className="mt-2 text-sm sm:text-base text-cyan-300 font-medium">
                Published in: {researchPublication.venue}
              </p>
              <p className="mt-1 text-xs font-mono text-slate-400">
                Authors: {researchPublication.authors} ({researchPublication.correspondingAuthor})
              </p>
            </div>

            {/* Abstract & Methodology Grid */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 p-5 rounded-xl bg-slate-900/75 border border-slate-800/90">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Research Overview &amp; Relevance to Multilingual AI
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {researchPublication.abstractSummary}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Research Keywords
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {researchPublication.keywords.map((kw) => (
                      <Badge key={kw} variant="blue">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/75 border border-slate-800/90 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-blue-300 mb-3">
                    Key Technical Contributions (From Paper)
                  </h4>
                  <ul className="space-y-2.5">
                    {researchPublication.methodologyHighlights.map((point, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verified Document Links */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
                  <a
                    href={researchPublication.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-glow transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Read Research Paper</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={researchPublication.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors"
                  >
                    <FileCheck2 className="w-4 h-4 text-cyan-400" />
                    <span>Publication Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
};
