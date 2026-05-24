"use client";

import React from "react";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 py-20 text-center overflow-hidden border-b border-white/5">
      {/* Absolute Ambient Background Lights */}
      <div className="absolute inset-0 radial-glow pointer-events-none z-0" />
      
      {/* Top Floating Badge */}
      <Reveal delay={0.1}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glassmorphism text-xs font-mono text-indigo-200 tracking-wider uppercase mb-8 hover:border-indigo-500/20 transition-all duration-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Available for Production-Grade AI Engineering Roles</span>
        </div>
      </Reveal>

      {/* Main Headline */}
      <Reveal delay={0.3} yOffset={40}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight mb-6 max-w-4xl text-gradient">
          Engineering the Next Generation of <span className="text-accent-gradient">Cognitive Systems</span>
        </h1>
      </Reveal>

      {/* Subtitle */}
      <Reveal delay={0.5} yOffset={45}>
        <p className="text-base md:text-xl font-sans text-gray-400 max-w-2xl mb-10 leading-relaxed font-light">
          Generative AI & ML Systems Engineer specializing in high-performance NLP systems, 
          transformer-based architectures, and production-grade agentic workflows.
        </p>
      </Reveal>

      {/* Action Buttons */}
      <Reveal delay={0.7} yOffset={50}>
        <div className="flex flex-col sm:flex-row items-center gap-4 z-10 relative">
          <a
            href="#projects"
            className="group px-6 py-3 rounded-lg bg-white text-black font-medium text-sm flex items-center gap-2 hover:bg-neutral-200 transition-all duration-300 shadow-lg shadow-white/5"
          >
            Explore Systems
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg glassmorphism text-white font-medium text-sm flex items-center gap-2 hover:bg-white/5 transition-all duration-300"
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            Get In Touch
          </a>
        </div>
      </Reveal>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-600 font-mono text-xs z-10 opacity-40 select-none">
        <span>{"sys.initialize_agent(mode=\"production\") // active"}</span>
      </div>
    </section>
  );
};
