"use client";

import React from "react";
import { BookOpen, Calendar, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export const Publications = () => {
  const papers = [
    {
      title: "AI-Driven Mental Health Detection from Social Media Posts in a Regional Language",
      publisher: "International Journal of Sciences and Innovation Engineering (IJSCI)",
      date: "May 2026",
      desc: "Engineered deep learning sequence classifiers to evaluate mental health indicators from regional Marathi and code-mixed social media posts, leveraging customized transformer weights to capture socio-linguistic context.",
      link: "https://drive.google.com/file/d/1hX0dcJkMd7CI_QyJfUpW8BgBwQZRIHHd/view?usp=drive_link",
    },
    {
      title: "Research Publication & Acceptance Certificate",
      publisher: "IJSCI Board of Trustees",
      date: "May 2026",
      desc: "Official credential certifying the peer review, acceptance, and indexing of the mental health sentiment detection research paper.",
      link: "https://drive.google.com/file/d/1V25lZgWuzQ9XgS2WdeKIrZgnNjod9rPR/view?usp=drive_link",
    },
    {
      title: "NPTEL C Programming Certification",
      publisher: "NPTEL / IIT Madras",
      date: "Credential",
      desc: "Academic certification covering data structures, algorithmic design, pointer manipulation, and memory management in low-level C programming.",
      link: "https://drive.google.com/file/d/1ark-RtysU2d-_7kfhEZSb8HR_HL9igB3/view?usp=drive_link",
    },
    {
      title: "CodSoft Web Development Internship",
      publisher: "CodSoft",
      date: "Internship",
      desc: "Practical engineering experience building responsive layouts, handling Git version control workflows, and implementing interactive client scripts.",
      link: "https://drive.google.com/file/d/1blfNW8PD6S-_RWSNdXNeWK6UD_bLfU_d/view?usp=drive_link",
    },
  ];

  return (
    <section id="publications" className="relative py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side Info */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-8">
          <Reveal delay={0.1}>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              {"// Research & Credentials"}
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
              Publications & Certifications
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
              Peer-reviewed research and verified academic achievements demonstrating capabilities in applied NLP, machine learning, and standard full-stack programming.
            </p>
          </Reveal>
        </div>

        {/* Right Side Cards */}
        <div className="lg:col-span-8 space-y-6">
          {papers.map((p, idx) => (
            <Reveal key={idx} delay={0.3 + idx * 0.1}>
              <a href={p.link} target="_blank" rel="noreferrer" className="block group">
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
