import React from 'react';
import {
  ArrowRight,
  Code2,
  Download,
  ExternalLink,
  Eye,
  MapPin,
  Mail,
  Sparkles,
} from 'lucide-react';
import { profileIdentity } from '../../data/portfolioData';
import { HeroNeuralVisual } from '../animations/HeroNeuralVisual';
import { Reveal } from '../animations/Reveal';
import { useResumeModal } from '../../context/ResumeModalContext';

export const Hero: React.FC = () => {
  const { openResumeModal } = useResumeModal();
  return (
    <section
      id="hero"
      className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden bg-tech-grid"
      aria-label="Introduction and Professional Positioning"
    >
      {/* Subtle Ambient Background Lighting */}
      <div
        className="pointer-events-none absolute top-8 left-1/4 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-cyan-500/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-[26rem] h-[26rem] rounded-full bg-blue-600/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Identity, Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profileIdentity.title}</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="space-y-3">
                <p className="text-sm sm:text-base font-mono text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-slate-100 font-semibold">{profileIdentity.name}</span>
                  <span aria-hidden="true">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {profileIdentity.location}
                  </span>
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight text-white leading-[1.12]">
                  Building practical{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400">
                    AI systems
                  </span>
                  , intelligent applications, and scalable{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    Python backends.
                  </span>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {profileIdentity.heroSummary}
              </p>
            </Reveal>

            {/* Primary Calls to Action */}
            <Reveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-glow transition-all"
                >
                  <span>Explore My Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={openResumeModal}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-medium bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-colors shadow-glow-sm"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>Preview Resume</span>
                </button>

                <a
                  href={profileIdentity.resumePath}
                  download="Ujjwal_Pradip_Patil_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-cyan-500/40 transition-colors"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download Resume</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-medium bg-transparent hover:bg-cyan-500/10 text-cyan-300 border border-cyan-500/35 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>
              </div>
            </Reveal>

            {/* Direct Profile Links */}
            <Reveal delay={0.2}>
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-slate-400">
                <a
                  href={profileIdentity.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-cyan-500/30 transition-colors"
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>GitHub (@UjjwalPatil01)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={profileIdentity.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-blue-500/30 transition-colors"
                >
                  <span>LinkedIn (ujjwalpatil-ai)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={profileIdentity.huggingfaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-violet-500/30 transition-colors"
                >
                  <span>Hugging Face (@ujjwalpatil)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Neural / Inference Pipeline Visual */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <HeroNeuralVisual />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
