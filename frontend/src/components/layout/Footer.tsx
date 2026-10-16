import React from 'react';
import { Code2, Download, ExternalLink, Eye, Mail, Sparkles } from 'lucide-react';
import { navItems, profileIdentity } from '../../data/portfolioData';
import { useResumeModal } from '../../context/ResumeModalContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { openResumeModal } = useResumeModal();

  return (
    <footer className="border-t border-slate-800/90 bg-[#050811] py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand & Positioning */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
                {profileIdentity.monogram}
              </span>
              <span className="text-lg font-bold text-white flex items-center gap-1.5">
                ujjwal<span className="text-cyan-400">.ai</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium">{profileIdentity.name}</p>
            <p className="text-xs font-mono text-cyan-300">{profileIdentity.title}</p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {profileIdentity.location} • B.E. in Computer Engineering (2022–2026).
            </p>
          </div>

          {/* Section Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200">
              Navigation
            </div>
            <ul className="grid grid-cols-2 gap-1.5 text-xs">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="hover:text-cyan-300 transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External & Verification Links */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200">
              Profiles &amp; Resume
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={profileIdentity.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={profileIdentity.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
              >
                LinkedIn
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={profileIdentity.huggingfaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
              >
                Hugging Face
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`mailto:${profileIdentity.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                Email
              </a>
              <button
                type="button"
                onClick={openResumeModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Preview Resume
              </button>
              <a
                href={profileIdentity.resumePath}
                download="Ujjwal_Pradip_Patil_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            © {currentYear} {profileIdentity.name}. Built with React, TypeScript, Tailwind CSS &amp; FastAPI.
          </p>
          <div className="inline-flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>Pune, India • Open to Entry-Level AI/ML &amp; Python Backend Roles</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
