import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { techProofItems } from '../../data/portfolioData';

export const TechProofStrip: React.FC = () => {
  return (
    <section
      aria-label="Verified Technical Focus Areas"
      className="border-y border-slate-800/80 bg-[#080d1a]/90 py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="shrink-0">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block">
              Verified Stack &amp; Focus
            </span>
            <span className="text-xs text-slate-400">
              Grounded in public repositories &amp; published research
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 flex-1">
            {techProofItems.map((item) => (
              <div
                key={item.name}
                className="px-3 py-2 rounded-xl bg-slate-900/75 border border-slate-800/90 hover:border-cyan-500/35 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
