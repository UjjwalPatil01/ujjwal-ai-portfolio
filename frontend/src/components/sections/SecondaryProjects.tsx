import React from 'react';
import { Code2, ExternalLink, FolderGit2 } from 'lucide-react';
import { secondaryProjects } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';
import { Reveal } from '../animations/Reveal';
import { Badge } from '../ui/Badge';

interface SecondaryProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const SecondaryProjects: React.FC<SecondaryProjectsProps> = ({
  onSelectProject,
}) => {
  return (
    <section className="pb-20 sm:pb-24" aria-label="Additional Engineering Projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-slate-800/80 pt-14">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4" />
                Additional Engineering Projects
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                Supporting Full-Stack &amp; Web Applications
              </h3>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Complementary applications demonstrating CRUD API design, LLM task classification, interactive catalogs, and relational database modeling.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.05}>
              <article className="h-full rounded-2xl glass-panel-interactive p-6 flex flex-col justify-between border border-slate-800/90">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{project.title}</h4>
                  <p className="text-xs font-medium text-slate-400 mb-3">{project.subtitle}</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.verifiedStack.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        GitHub
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    Details →
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
