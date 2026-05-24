"use client";

import React from "react";
import { Terminal, Cpu, Database, BookOpen, Layers, Mail } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Publications } from "@/components/sections/publications";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  const navItems = [
    { label: "About", href: "#about", icon: <Layers className="w-3.5 h-3.5" /> },
    { label: "Systems", href: "#projects", icon: <Cpu className="w-3.5 h-3.5" /> },
    { label: "Insights", href: "#publications", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: "Stack", href: "#skills", icon: <Database className="w-3.5 h-3.5" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] text-gray-100 font-sans selection:bg-indigo-500/30 selection:text-white ambient-grid">
      
      {/* Premium Floating Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030303]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Title */}
          <a href="#" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-white hover:text-indigo-400 transition-colors duration-200">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>ujjwal.ai</span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white tracking-wide uppercase transition-colors duration-200"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Call-to-action button */}
          <div>
            <a
              href="#contact"
              className="px-4 py-1.5 rounded bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10 text-xs font-mono text-white transition-all duration-300"
            >
              initialize()
            </a>
          </div>
        </div>
      </header>

      {/* Scaffolded Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Publications />
        <Skills />
        <Contact />
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-white/5 bg-[#030303] py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
            <span>© {new Date().getFullYear()} Ujjwal Patil. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/UjjwalPatil01" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">GitHub</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/ujjwalpatil-ai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">LinkedIn</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
