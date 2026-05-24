"use client";

import React from "react";
import { Cpu, Layers, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export const About = () => {
  const principles = [
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: "NLP & Model Fine-Tuning",
      desc: "Fine-tuning transformers (like XLM-RoBERTa) with techniques like Selective Layer Freezing (SLF) to target regional and code-mixed sentiment datasets.",
    },
    {
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      title: "Async API Engineering",
      desc: "Designing high-performance, asynchronous endpoints using FastAPI and Anyio to manage concurrent transformer inference pipelines.",
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: "Full-Stack AI Integration",
      desc: "Architecting secure PostgreSQL schemas with Supabase Row-Level Security (RLS) and integrating model telemetry into React & TypeScript dashboards.",
    },
  ];

  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Text */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={0.1}>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              {"// Core Philosophy"}
            </span>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient">
              Engineering Practical and Robust AI Solutions
            </h2>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-gray-400 leading-relaxed font-light text-base md:text-lg">
              I focus on taking advanced language models and transforming them into functional, reliable, and production-ready applications. By bridging backend system design with machine learning pipelines, I build software products that are stable, containerized, and optimized for speed.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-gray-400 leading-relaxed font-light text-base md:text-lg">
              My engineering philosophy centers on clean architecture, secure data policies, and consistent deployments. Whether fine-tuning transformer models on specialized local datasets, designing asynchronous REST APIs with FastAPI, or architecting interactive interfaces with React and TypeScript, I build with performance and maintainability in mind.
            </p>
          </Reveal>
        </div>

        {/* Right column: Highlights and Metrics */}
        <div className="lg:col-span-5 space-y-6 lg:mt-12">
          {principles.map((p, idx) => (
            <Reveal key={idx} delay={0.3 + idx * 0.1}>
              <GlassCard className="p-6 flex gap-4 items-start hover:border-indigo-500/10">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 shrink-0">
                  {p.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-white text-base">{p.title}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{p.desc}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
