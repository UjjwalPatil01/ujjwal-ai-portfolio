import React from 'react';
import { featuredProjects } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';
import { Reveal } from '../animations/Reveal';
import { ProjectCard } from '../projects/ProjectCard';
import { SectionHeading } from '../ui/SectionHeading';

interface FeaturedProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProject,
}) => {
  return (
    <section id="projects" className="py-20 sm:py-24 relative" aria-label="Featured AI and Backend Projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Engineering Work"
            title="Applied AI Systems, RAG Pipelines & Backend Services"
            description="Each project below is grounded in verifiable source code and live deployments, detailing the problem addressed, system architecture, and my personal engineering contributions."
          />
        </Reveal>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} onOpenCaseStudy={onSelectProject} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
