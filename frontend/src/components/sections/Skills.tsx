import React from 'react';
import { BrainCircuit, Cpu, Database, Server, Wrench } from 'lucide-react';
import { skillGroups } from '../../data/portfolioData';
import { Reveal } from '../animations/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const ICON_MAP: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-5 h-5 text-cyan-400" />,
  Server: <Server className="w-5 h-5 text-blue-400" />,
  Cpu: <Cpu className="w-5 h-5 text-violet-400" />,
  Database: <Database className="w-5 h-5 text-emerald-400" />,
  Wrench: <Wrench className="w-5 h-5 text-amber-400" />,
};

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="py-20 sm:py-24 border-t border-slate-800/80"
      aria-label="Skills and Technology Stack"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Skills & Technology Stack"
            title="Verified Engineering Capabilities by Domain"
            description="Every technology listed below is backed by coursework, public repositories, or technical assessments—presented with its practical usage context rather than arbitrary percentage bars."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => (
            <Reveal
              key={group.id}
              delay={idx * 0.05}
              className={idx === 0 ? 'lg:col-span-2' : ''}
            >
              <div className="h-full rounded-2xl glass-panel p-6 sm:p-7 border border-slate-800/90 hover:border-cyan-500/35 transition-colors">
                <div className="flex items-start gap-3.5 mb-5">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                    {ICON_MAP[group.iconName] || <Cpu className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{group.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{group.subtitle}</p>
                  </div>
                </div>

                <div
                  className={`grid gap-3 ${
                    idx === 0 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-slate-900/65 border border-slate-800/80 hover:border-slate-700 transition-colors"
                    >
                      <div className="text-sm font-semibold text-slate-100 font-mono">
                        {skill.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{skill.context}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
