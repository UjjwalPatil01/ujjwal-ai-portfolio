import React, { useState } from 'react';
import { ProjectCaseStudyModal } from '../components/projects/ProjectCaseStudyModal';
import { About } from '../components/sections/About';
import { Certifications } from '../components/sections/Certifications';
import { Contact } from '../components/sections/Contact';
import { Education } from '../components/sections/Education';
import { Experience } from '../components/sections/Experience';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { Hero } from '../components/sections/Hero';
import { Research } from '../components/sections/Research';
import { SecondaryProjects } from '../components/sections/SecondaryProjects';
import { Skills } from '../components/sections/Skills';
import { TechProofStrip } from '../components/sections/TechProofStrip';
import { ProjectItem } from '../types/portfolio';

export const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <>
      <main>
        <Hero />
        <TechProofStrip />
        <FeaturedProjects onSelectProject={setSelectedProject} />
        <SecondaryProjects onSelectProject={setSelectedProject} />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Research />
        <Certifications />
        <Contact />
      </main>
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
