"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export const Skills = () => {
  const skillCategories = [
    {
      title: "AI/ML & NLP",
      skills: [
        "Hugging Face Transformers",
        "PyTorch",
        "XLM-RoBERTa",
        "Model Fine-Tuning",
        "Text Classification",
        "Structured Outputs (Pydantic)",
        "LLM API Integration",
        "AI Model Evaluation"
      ],
    },
    {
      title: "Core Languages",
      skills: ["Python", "TypeScript", "JavaScript", "Java", "C"],
    },
    {
      title: "Backend & DevOps",
      skills: [
        "FastAPI",
        "Flask",
        "REST API Design",
        "Async Programming (Anyio)",
        "Docker Containerization",
        "Git & GitHub Versioning",
        "Render / Netlify"
      ],
    },
    {
      title: "Frontend & Databases",
      skills: [
        "React",
        "Tailwind CSS",
        "ShadCN UI",
        "Framer Motion",
        "PostgreSQL",
        "Supabase Row-Level Security",
        "MongoDB"
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-40 z-0" />
      
      {/* Title Header */}
      <div className="space-y-4 mb-16 text-center relative z-10">
        <Reveal delay={0.1}>
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            {"// Architecture & Stack"}
          </span>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient">
            Technical Proficiency
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-base md:text-lg">
            Operational experience across computational runtimes, modern full-stack web environments, and storage backends.
          </p>
        </Reveal>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {skillCategories.map((cat, idx) => (
          <Reveal key={idx} delay={0.3 + idx * 0.1}>
            <GlassCard className="p-6 h-full hover:border-indigo-500/10" interactive={true}>
              <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-3 mb-4 font-mono">
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2 text-sm text-gray-400 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
