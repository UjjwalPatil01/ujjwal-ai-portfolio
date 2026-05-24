"use client";

import React, { useState } from "react";
import { Mail, Send, Terminal, FileText } from "lucide-react";
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

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  const socialLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      val: "ujjwalpatil163@gmail.com",
      href: "mailto:ujjwalpatil163@gmail.com",
    },
    {
      icon: <GithubIcon className="w-5 h-5" />,
      label: "GitHub",
      val: "github.com/UjjwalPatil01",
      href: "https://github.com/UjjwalPatil01",
    },
    {
      icon: <LinkedinIcon className="w-5 h-5" />,
      label: "LinkedIn",
      val: "linkedin.com/in/ujjwalpatil-ai",
      href: "https://www.linkedin.com/in/ujjwalpatil-ai",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Curriculum Vitae",
      val: "Download PDF Resume",
      href: "https://drive.google.com/file/d/11hJ7wt0IzkWJmVQF0_fzNMjiZ55uw6cN/view?usp=drive_link",
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 max-w-7xl mx-auto">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-40 z-0" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Side Connect */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal delay={0.1}>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              {"// Collaboration"}
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient">
              Initiate Contact
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
              Ready to discuss machine learning applications, backend integrations, or NLP opportunities? Reach out directly via email, check my developer profiles, or download my resume.
            </p>
          </Reveal>

          <div className="space-y-4 pt-4">
            {socialLinks.map((link, idx) => (
              <Reveal key={idx} delay={0.4 + idx * 0.1}>
                <a href={link.href} target="_blank" rel="noreferrer" className="block group">
                  <GlassCard className="p-4 flex items-center gap-4 hover:border-indigo-500/20" interactive={true}>
                    <div className="p-2 rounded bg-white/5 border border-white/10 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200">
                      {link.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-gray-500">{link.label}</div>
                      <div className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors duration-200">{link.val}</div>
                    </div>
                  </GlassCard>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.3}>
            <GlassCard className="p-6 md:p-8" interactive={false}>
              <div className="flex items-center gap-2 mb-6 text-xs font-mono text-gray-500 border-b border-white/5 pb-4">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>establish_socket_connection()</span>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Sender Identification (Email)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Payload (Message)</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, stack, and scheduling..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <span>Encrypting & Sending...</span>
                  ) : status === "sent" ? (
                    <span>Payload Delivered Successfully!</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
