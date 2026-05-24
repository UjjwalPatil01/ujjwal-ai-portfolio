"use client";

import React from "react";
import { Cpu, Layers, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export const About = () => {
  const principles = [
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: "Model Optimization",
      desc: "Specialized in running models efficiently through custom fine-tuning, quantization, and specialized inference runtimes.",
    },
    {
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      title: "Agentic Architectures",
      desc: "Designing robust, multi-agent pipelines with structured reasoning loops, self-correction, and tool integration.",
    },
    {
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      title: "Production Infrastructure",
      desc: "Deploying high-throughput, low-latency APIs capable of supporting millions of tokens with modern caching and routing layers.",
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
              Bridging Research with Robust Production Systems
            </h2>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-gray-400 leading-relaxed font-light text-base md:text-lg">
              I specialize in taking cutting-edge generative models and architecting them into mature, production-grade applications. 
              By focusing heavily on the system layer—efficient context retrieval, structured output constraints, latency reduction, and reliability metrics—I build platforms that scale beyond simple playground demonstrations.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-gray-400 leading-relaxed font-light text-base md:text-lg">
              My engineering approach prioritizes determinism, modularity, and comprehensive monitoring. Whether building 
              high-performance rag retrieval engines, custom transformer fine-tunes, or autonomous multi-agent pipelines, 
              I design for predictability and scale.
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
