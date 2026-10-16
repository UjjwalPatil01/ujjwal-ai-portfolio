import React, { useState } from 'react';
import { Cpu, Database, Layers, Sparkles, Terminal } from 'lucide-react';

interface PipelineStage {
  id: string;
  label: string;
  sublabel: string;
  tech: string;
  status: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'ingest',
    label: '01. Input & Ingestion Layer',
    sublabel: 'Multilingual Text • PDF Chunks • Source Code',
    tech: 'PyPDFLoader • RecursiveSplitter • Monaco Input',
    status: 'READY',
  },
  {
    id: 'gateway',
    label: '02. Python API & Auth Gateway',
    sublabel: 'Async Routing • Schema Validation • Rate Limiting',
    tech: 'FastAPI • Flask • Pydantic • Supabase JWT',
    status: 'ACTIVE',
  },
  {
    id: 'inference',
    label: '03. Model & Vector Inference Engine',
    sublabel: 'Transformer Classification • Top-K RAG Retrieval',
    tech: 'XLM-RoBERTa • LangChain • FAISS • Gemini LLM',
    status: 'INFERENCING',
  },
  {
    id: 'output',
    label: '04. Grounded Output & Persistence',
    sublabel: 'Page Citations • Sentiment Telemetry • Structured JSON',
    tech: 'PostgreSQL • SQLite • Recharts • Streamlit',
    status: 'VERIFIED',
  },
];

export const HeroNeuralVisual: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number>(2);

  return (
    <div
      className="relative rounded-2xl glass-panel p-5 sm:p-6 border border-slate-800/90 shadow-glow overflow-hidden"
      aria-label="Interactive AI Systems and Python Backend Architecture Visual"
    >
      {/* Ambient top glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl"
        aria-hidden="true"
      />

      {/* Top console header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/90">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            ujjwal.ai // inference-architecture.py
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEMS VERIFIED
        </span>
      </div>

      {/* Animated SVG Neural & Dataflow Graph */}
      <div className="relative bg-slate-950/80 rounded-xl border border-slate-800/80 p-3 mb-4">
        <svg
          viewBox="0 0 520 155"
          className="w-full h-auto"
          role="img"
          aria-label="Connected AI inference graph linking ingestion, FastAPI backend, XLM-RoBERTa and FAISS RAG, and SQL persistence"
        >
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.85" />
            </linearGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle background grid lines */}
          <g stroke="rgba(148,163,184,0.08)" strokeWidth="1">
            <line x1="0" y1="35" x2="520" y2="35" />
            <line x1="0" y1="77" x2="520" y2="77" />
            <line x1="0" y1="120" x2="520" y2="120" />
            <line x1="110" y1="0" x2="110" y2="155" />
            <line x1="260" y1="0" x2="260" y2="155" />
            <line x1="410" y1="0" x2="410" y2="155" />
          </g>

          {/* Dataflow paths */}
          <path
            d="M 65 40 C 125 40, 135 77, 195 77"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <path
            d="M 65 115 C 125 115, 135 77, 195 77"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <path
            d="M 235 77 L 315 42"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="2.2"
          />
          <path
            d="M 235 77 L 315 112"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="2.2"
          />
          <path
            d="M 355 42 C 395 42, 405 77, 450 77"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="2"
          />
          <path
            d="M 355 112 C 395 112, 405 77, 450 77"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="2"
          />

          {/* Input Nodes */}
          <g transform="translate(45, 40)">
            <circle r="18" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.8" />
            <text x="0" y="3" textAnchor="middle" fill="#e2e8f0" fontSize="8.5" fontFamily="monospace">
              PDF/Doc
            </text>
            <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
              PyPDFLoader
            </text>
          </g>
          <g transform="translate(45, 115)">
            <circle r="18" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.8" />
            <text x="0" y="3" textAnchor="middle" fill="#e2e8f0" fontSize="8.5" fontFamily="monospace">
              NLP/Code
            </text>
            <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
              MR / HI / EN
            </text>
          </g>

          {/* Central API Router Node */}
          <g transform="translate(215, 77)">
            <circle r="34" fill="url(#nodeGlow)" />
            <rect
              x="-26"
              y="-22"
              width="52"
              height="44"
              rx="10"
              fill="#0b1120"
              stroke="#22d3ee"
              strokeWidth="2"
            />
            <text x="0" y="-3" textAnchor="middle" fill="#22d3ee" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
              FastAPI
            </text>
            <text x="0" y="10" textAnchor="middle" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace">
              Pydantic
            </text>
          </g>

          {/* AI / Model Nodes */}
          <g transform="translate(335, 42)">
            <rect
              x="-32"
              y="-18"
              width="64"
              height="36"
              rx="8"
              fill="#0f172a"
              stroke="#3b82f6"
              strokeWidth="1.8"
            />
            <text x="0" y="-2" textAnchor="middle" fill="#93c5fd" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              XLM-RoBERTa
            </text>
            <text x="0" y="10" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
              PyTorch NLP
            </text>
          </g>

          <g transform="translate(335, 112)">
            <rect
              x="-32"
              y="-18"
              width="64"
              height="36"
              rx="8"
              fill="#0f172a"
              stroke="#8b5cf6"
              strokeWidth="1.8"
            />
            <text x="0" y="-2" textAnchor="middle" fill="#c4b5fd" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              FAISS + RAG
            </text>
            <text x="0" y="10" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
              LangChain
            </text>
          </g>

          {/* Output / Persistence Node */}
          <g transform="translate(470, 77)">
            <circle r="22" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="0" y="-2" textAnchor="middle" fill="#6ee7b7" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              SQL/UI
            </text>
            <text x="0" y="9" textAnchor="middle" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace">
              Grounded
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Pipeline Stage Selector */}
      <div className="space-y-2" role="tablist" aria-label="AI Engineering Pipeline Layers">
        {PIPELINE_STAGES.map((stage, index) => {
          const isSelected = selectedStage === index;
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedStage(index)}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'bg-cyan-950/35 border-cyan-500/50 shadow-sm'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-cyan-400' : 'bg-slate-600'
                    }`}
                  />
                  {stage.label}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {stage.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400 pl-4">{stage.sublabel}</p>
              {isSelected && (
                <div className="mt-2 pl-4 flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span>Verified Stack: {stage.tech}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Engineering Proof Footnote */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/70">
          <div className="text-xs font-mono text-cyan-300 flex items-center justify-center gap-1">
            <Layers className="w-3.5 h-3.5" /> RAG + NLP
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">LangChain & XLM-R</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/70">
          <div className="text-xs font-mono text-blue-300 flex items-center justify-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> FastAPI / Flask
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Pydantic Schemas</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/70">
          <div className="text-xs font-mono text-violet-300 flex items-center justify-center gap-1">
            <Database className="w-3.5 h-3.5" /> SQL & Auth
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Supabase & SQLite</div>
        </div>
      </div>
    </div>
  );
};
