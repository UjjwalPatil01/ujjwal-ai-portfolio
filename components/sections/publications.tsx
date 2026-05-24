"use client";

import React from "react";
import { BookOpen, Calendar, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export const Publications = () => {
  const papers = [
    {
      title: "Optimizing Context Compression in Multi-Stage RAG Architectures",
      publisher: "Self-Published Technical Briefing",
      date: "Q1 2026",
      desc: "An exploration into minimizing token density inside dense vector context prompts, analyzing trade-offs between recall rates and computation latency using customized sequence compression models.",
      link: "#",
    },
    {
      title: "Scaling Deterministic Reasoning in Transformer-Based Agents",
      publisher: "AI Systems Engineering Journal",
      date: "Q3 2025",
      desc: "Investigated formatting constraints (JSON mode, Regex paths) inside open-source models, highlighting techniques to improve execution accuracy to 99.4% in pipeline automation.",
      link: "#",
    },
  ];

  return (
    <section id="publications" className="relative py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side Info */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-8">
          <Reveal delay={0.1}>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              {"// Research & Insights"}
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
              Publications & Systems Briefs
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
              A record of analytical deep-dives, whitepapers, and operational blueprints addressing real-world integration bottlenecks in artificial intelligence.
            </p>
          </Reveal>
        </div>

        {/* Right Side Cards */}
        <div className="lg:col-span-8 space-y-6">
          {papers.map((p, idx) => (
            <Reveal key={idx} delay={0.3 + idx * 0.1}>
              <a href={p.link} className="block group">
                <GlassCard className="p-6 md:p-8 hover:border-indigo-500/20 transition-all duration-300">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{p.publisher}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-200">
                        {p.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs font-mono whitespace-nowrap shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{p.date}</span>
                      <ArrowUpRight className="w-4 h-4 ml-1 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </GlassCard>
              </a>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
