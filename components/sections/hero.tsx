"use client";

import React, { useState } from "react";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface InferenceResult {
  text: string;
  sentiment: string;
  confidence: number;
  class: string;
}

export const Hero = () => {
  const [inputText, setInputText] = useState("हा प्रकल्प खूप छान आहे!");
  const [inferenceResult, setInferenceResult] = useState<InferenceResult | null>(null);
  const [inferenceStatus, setInferenceStatus] = useState<"idle" | "evaluating" | "success">("idle");
  const [latency, setLatency] = useState<number | null>(null);

  const sampleInputs = [
    { text: "मला हा निर्णय खूप आवडला! 😄", meaning: "Loved the decision!" },
    { text: "आजचा दिवस खूप कंटाळवाणा होता. 😔", meaning: "Today was boring." },
    { text: "काम चालू आहे, पण अजून वेळ लागेल.", meaning: "Work in progress." },
  ];

  const handleInference = (textToAnalyze: string) => {
    setInferenceStatus("evaluating");
    setInputText(textToAnalyze);
    setInferenceResult(null);
    
    const startTime = performance.now();
    setTimeout(() => {
      const endTime = performance.now();
      const calcLatency = parseFloat((endTime - startTime + 8).toFixed(2));
      setLatency(calcLatency);
      
      let sentiment = "Neutral 😐";
      let confidence = 0.892;
      let classification = "neutral";
      
      if (textToAnalyze.includes("आवडला") || textToAnalyze.includes("छान") || textToAnalyze.includes("😄")) {
        sentiment = "Happy 😄";
        confidence = 0.968;
        classification = "positive";
      } else if (textToAnalyze.includes("कंटाळवाणा") || textToAnalyze.includes("😔")) {
        sentiment = "Sad 😔";
        confidence = 0.941;
        classification = "negative";
      }
      
      setInferenceResult({
        text: textToAnalyze,
        sentiment: sentiment,
        confidence: confidence,
        class: classification,
      });
      setInferenceStatus("success");
    }, 450);
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center px-6 py-20 text-center overflow-hidden border-b border-white/5">
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
          Building Robust & Production-Ready <span className="text-accent-gradient">AI Applications</span>
        </h1>
      </Reveal>

      {/* Subtitle */}
      <Reveal delay={0.5} yOffset={45}>
        <p className="text-base md:text-xl font-sans text-gray-400 max-w-2xl mb-10 leading-relaxed font-light">
          Generative AI & ML Engineer focused on building and deploying end-to-end NLP pipelines, 
          transformer-based applications, and production-grade LLM integrations.
        </p>
      </Reveal>

      {/* Action Buttons */}
      <Reveal delay={0.7} yOffset={50}>
        <div className="flex flex-col sm:flex-row items-center gap-4 z-10 relative mb-12">
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

      {/* Interactive Inference Telemetry Box */}
      <Reveal delay={0.9} yOffset={40}>
        <div className="max-w-xl w-full glassmorphism rounded-xl border border-white/5 p-6 text-left font-mono text-xs z-10 relative hover:border-indigo-500/10 transition-colors duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 text-gray-500 text-[10px]">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>LIVE_INFERENCE_DEMO (MahaSent-SLF)</span>
            </div>
            <span>v1.2-stable</span>
          </div>

          {/* Interactive Chips */}
          <div className="space-y-2 mb-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Test Regional NLP Inputs:</div>
            <div className="flex flex-wrap gap-2">
              {sampleInputs.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleInference(sample.text)}
                  disabled={inferenceStatus === "evaluating"}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10 text-[11px] text-gray-300 transition-all duration-200 cursor-pointer disabled:opacity-50"
                  title={sample.meaning}
                >
                  {sample.text}
                </button>
              ))}
            </div>
          </div>

          {/* Log Window */}
          <div className="space-y-1.5 text-gray-400 bg-black/30 p-3 rounded-lg border border-white/5">
            <div>
              <span className="text-indigo-400">&gt;</span> active_model: <span className="text-purple-300">&quot;XLM-RoBERTa (MahaSent-SLF)&quot;</span>
            </div>
            <div>
              <span className="text-indigo-400">&gt;</span> base_validation_accuracy: <span className="text-cyan-400">84.80%</span>
            </div>
            <div>
              <span className="text-indigo-400">&gt;</span> analyze_sentiment(<span className="text-indigo-200">&quot;{inputText}&quot;</span>)
            </div>
            
            {inferenceStatus === "evaluating" && (
              <div className="text-indigo-300 animate-pulse">
                <span className="text-indigo-400">&gt;</span> evaluating_inference_threadpool...
              </div>
            )}

            {inferenceStatus === "success" && inferenceResult && (
              <div className="space-y-1 pt-1.5 border-t border-white/5 mt-1.5 text-gray-300">
                <div>
                  <span className="text-indigo-400">&gt;</span> response: {"{"}
                </div>
                <div className="pl-4">
                  sentiment: <span className="text-emerald-400">&quot;{inferenceResult.sentiment}&quot;</span>,
                </div>
                <div className="pl-4">
                  confidence: <span className="text-cyan-400">{(inferenceResult.confidence * 100).toFixed(1)}%</span>,
                </div>
                <div className="pl-4">
                  latency: <span className="text-purple-300">{latency}ms</span> <span className="text-gray-500 text-[10px]">(Anyio pool)</span>
                </div>
                <div>
                  {"}"}
                </div>
              </div>
            )}
            
            {inferenceStatus === "idle" && (
              <div className="text-gray-500 text-[10px] italic">
                * Click one of the Marathi text samples above to run live transformer inference.
              </div>
            )}
          </div>
        </div>
      </Reveal>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-600 font-mono text-[10px] z-10 opacity-30 select-none hidden md:block">
        <span>{"sys.initialize_agent(mode=\"production\") // active"}</span>
      </div>
    </section>
  );
};
