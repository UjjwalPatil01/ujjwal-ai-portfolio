import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ArchitectureDiagram } from '../components/projects/ArchitectureDiagram';
import { Badge } from '../components/ui/Badge';
import { featuredProjects, secondaryProjects } from '../data/portfolioData';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const allProjects = [...featuredProjects, ...secondaryProjects];
  const project = allProjects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-3">Project Not Found</h1>
        <p className="text-slate-400 mb-6">
          The requested project case study could not be found.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300 hover:text-cyan-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Projects
        </Link>
      </div>

      <article className="rounded-2xl glass-panel p-6 sm:p-10 border border-slate-800 space-y-8">
        <div className="border-b border-slate-800 pb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            {project.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {project.title} — {project.subtitle}
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-mono text-slate-400">
            {project.roleLabel}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">
              Problem Statement
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">
              What the Application Does
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.whatItDoes}
            </p>
          </div>
        </div>

        {project.diagramType && (
          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Verified System Architecture
            </h2>
            <ArchitectureDiagram type={project.diagramType} />
          </div>
        )}

        {project.workflowSteps.length > 0 && (
          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Processing &amp; Inference Pipeline
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.workflowSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      STEP {step.step}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{step.tech}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/25">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              My Actual Engineering Contributions
            </h2>
            <ul className="space-y-2">
              {project.myContribution.map((item, i) => (
                <li key={i} className="text-sm text-slate-200 flex items-start gap-2">
                  <span className="text-cyan-400 font-mono">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-300 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Engineering Decisions
            </h2>
            <ul className="space-y-2">
              {project.engineeringDecisions.map((item, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-blue-400 font-mono">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.architectureNote && (
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              {project.architectureNote}
            </p>
          </div>
        )}

        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
            Verified Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.verifiedStack.map((tech) => (
              <Badge key={tech} variant={project.accentColor}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              View GitHub Repository
            </a>
          )}
        </div>
      </article>
    </main>
  );
};
