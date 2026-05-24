"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Terminal, Database, Cpu } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Projects = () => {
  const projects = [
    {
      title: "MoodMate",
      subtitle: "Flagship NLP Sentiment Platform",
      desc: "Fine-tuned an XLM-RoBERTa model on MahaSent using Selective Layer Freezing (SLF) to achieve 84.80% validation accuracy for regional Marathi/code-mixed text. Designed a low-latency asynchronous FastAPI inference service using Anyio threadpools alongside Supabase PostgreSQL multi-tenancy and a React/TypeScript web dashboard.",
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
      tags: ["FastAPI", "XLM-RoBERTa", "Supabase", "React", "TypeScript", "Python"],
      github: "https://github.com/MoodMate-WebApp/MoodMate-WebApp",
      demo: "https://mood-mate-web-app.vercel.app/",
      image: "/moodmate_mockup.png",
    },
    {
      title: "Codenova",
      subtitle: "AI-Powered Code Reviewer",
      desc: "Architected and containerized a fastapi code validation service wrapping GPT-4 APIs, utilizing Pydantic to strictly parse and guarantee structured JSON analysis outputs. Created a comprehensive multi-language code testing harness and fully orchestrated Render deployments via zero-config Docker setups.",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      tags: ["FastAPI", "GPT-4 API", "Pydantic", "Docker", "Render", "Python"],
      github: "https://github.com/UjjwalPatil01/ai-code-reviewer",
      demo: "https://codenova-ui.onrender.com/",
      image: "/codenova_mockup.png",
    },
    {
      title: "3D Virtual Herbal Garden",
      subtitle: "Interactive 3D Simulation Platform",
      desc: "Co-engineered a virtual WebGL-based visual interactive model space, configuring optimized custom rendering loops to sustain stable 60 FPS graphical performance. Maintained robust collaborative git standards and managed standard automated deployments through Netlify CI/CD lines.",
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      tags: ["JavaScript", "WebGL", "Netlify", "CI/CD", "HTML/CSS"],
      github: "https://github.com/Virtual-Herbal-Garden/virtual-herbal-garden",
      demo: "https://virtual-herbal-garden-hub.netlify.app/",
      image: "/garden_mockup.png",
    },
  ];

  return (
    <section id="projects" className="relative py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-50 z-0" />
      
      {/* Title Header */}
      <div className="space-y-4 mb-16 relative z-10">
        <Reveal delay={0.1}>
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            {"// Featured Engineering"}
          </span>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient">
            Featured Projects & Models
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-gray-400 max-w-2xl font-light text-base md:text-lg">
            A selective showcase of functional applications, specialized language models, and interactive platforms built with Python, TypeScript, and Docker.
          </p>
        </Reveal>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {projects.map((p, idx) => (
          <Reveal key={idx} delay={0.3 + idx * 0.1}>
            <GlassCard className="h-full flex flex-col hover:border-indigo-500/20 group overflow-hidden" interactive={true}>
              {/* Visual Preview */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 bg-neutral-900/40">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Icon and Links */}
                <div className="flex justify-between items-center mb-6">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-indigo-400">
                    {p.icon}
                  </div>
                  <div className="flex gap-3 text-gray-400">
                    <a href={p.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                      <GithubIcon className="w-5 h-5" />
                    </a>
                    <a href={p.demo} target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Title & Info */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">{p.title}</h3>
                  <h4 className="text-xs font-mono text-indigo-300 uppercase tracking-wider">{p.subtitle}</h4>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  {p.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mt-auto">
                  {p.tags.map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
