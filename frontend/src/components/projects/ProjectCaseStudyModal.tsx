import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Info,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Badge } from '../ui/Badge';

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b1120] border border-cyan-500/35 shadow-2xl p-6 sm:p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              Engineering Case Study // {project.category}
            </div>
            <h2 id="case-study-modal-title" className="text-2xl sm:text-3xl font-bold text-white">
              {project.title} — {project.subtitle}
            </h2>
            <p className="mt-1 text-xs font-mono text-slate-400">{project.roleLabel}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study dialog"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 mt-6">
          {/* Overview & Problem Statement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">
                Problem Statement
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.problemStatement}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">
                What the Application Does
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.whatItDoes}</p>
            </div>
          </div>

          {/* Architecture Visual */}
          {project.diagramType && (
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                System Architecture & Processing Pipeline
              </h3>
              <ArchitectureDiagram type={project.diagramType} />
            </div>
          )}

          {/* Step-by-Step Inference / Processing Workflow */}
          {project.workflowSteps.length > 0 && (
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Processing & Inference Workflow
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.workflowSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        STEP {step.step}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{step.tech}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-100 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Actual Contributions & Key Engineering Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/25">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                My Actual Contributions
              </h3>
              <ul className="space-y-2">
                {project.myContribution.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-blue-300 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Verified Technical Decisions
              </h3>
              <ul className="space-y-2">
                {project.engineeringDecisions.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-blue-400 font-mono">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Architecture / Discrepancy Note if present */}
          {project.architectureNote && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {project.architectureNote}
              </p>
            </div>
          )}

          {/* Verified Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Verified Dependencies & Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.verifiedStack.map((tech) => (
                <Badge key={tech} variant={project.accentColor}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
              >
                <ExternalLink className="w-4 h-4" />
                Open Live Application
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                View Source on GitHub
              </a>
            )}
            <Link
              to={`/projects/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-cyan-300 bg-slate-900 border border-slate-800"
            >
              Open Dedicated Route (/projects/{project.slug})
            </Link>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
