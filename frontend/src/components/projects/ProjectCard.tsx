import React from 'react';
import { ArrowUpRight, BookOpen, Code2, ExternalLink, Layers, Users, UserCheck } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';
import { Badge } from '../ui/Badge';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenCaseStudy: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  const accentBorder =
    project.accentColor === 'cyan'
      ? 'hover:border-cyan-500/50'
      : project.accentColor === 'blue'
        ? 'hover:border-blue-500/50'
        : 'hover:border-violet-500/50';

  const badgeVariant = project.accentColor;

  return (
    <article
      className={`rounded-2xl glass-panel-interactive p-6 sm:p-8 border border-slate-800/90 ${accentBorder} flex flex-col justify-between`}
    >
      <div>
        {/* Top Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700/80">
            {project.isTeamProject ? (
              <Users className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            )}
            {project.roleLabel}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-5">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-medium mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Project-Specific Architecture Visual */}
        {project.diagramType && (
          <div className="mb-6">
            <ArchitectureDiagram type={project.diagramType} compact />
          </div>
        )}

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Problem Addressed
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Technical Approach
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.technicalApproach}
            </p>
          </div>
        </div>

        {/* My Contribution */}
        <div className="mb-6 p-4 rounded-xl bg-cyan-950/15 border border-cyan-500/20">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            {project.isTeamProject ? 'My Individual Engineering Contribution' : 'Key Engineering Implementation'}
          </h4>
          <ul className="space-y-1.5">
            {project.myContribution.map((item, idx) => (
              <li key={idx} className="text-sm text-slate-200 flex items-start gap-2">
                <span className="text-cyan-400 font-mono mt-0.5" aria-hidden="true">
                  ▸
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Verified Stack Badges */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Verified Technology Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {project.verifiedStack.map((tech) => (
              <Badge key={tech} variant={badgeVariant}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 transition-all shadow-glow"
            >
              <ExternalLink className="w-4 h-4" />
              Live Application
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900 text-slate-400 border border-slate-800">
              No Cloud Demo (Local / Repo Workflow)
            </span>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              GitHub Repository
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Engineering Case Study
        </button>
      </div>
    </article>
  );
};
