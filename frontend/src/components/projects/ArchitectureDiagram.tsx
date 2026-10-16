import React from 'react';
import { DiagramType } from '../../types/portfolio';

interface ArchitectureDiagramProps {
  type: DiagramType;
  compact?: boolean;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  type,
  compact = false,
}) => {
  if (type === 'moodmate') {
    return (
      <div className="w-full rounded-xl bg-slate-950/90 border border-cyan-500/25 p-3 sm:p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">
            MoodMate • Multilingual Sentiment Inference Pipeline
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            React 19 → FastAPI → XLM-RoBERTa → Supabase
          </span>
        </div>
        <svg
          viewBox="0 0 680 165"
          className="w-full h-auto"
          role="img"
          aria-label="MoodMate architecture diagram showing React UI, FastAPI gateway with SlowAPI and Pydantic, XLM-RoBERTa transformer model, and Supabase PostgreSQL with RLS"
        >
          <defs>
            <linearGradient id="mmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#22d3ee" />
            </marker>
          </defs>

          {/* Node 1: Multilingual Input */}
          <rect x="12" y="28" width="138" height="108" rx="10" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.6" />
          <text x="81" y="53" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold" fontFamily="monospace">
            1. React 19 Client
          </text>
          <text x="81" y="73" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontFamily="sans-serif">
            Marathi / Hindi / EN
          </text>
          <text x="81" y="91" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            Supabase JWT Auth
          </text>
          <text x="81" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            Recharts Dashboard
          </text>

          <line x1="150" y1="82" x2="182" y2="82" stroke="url(#mmGrad)" strokeWidth="2" markerEnd="url(#arrowCyan)" />

          {/* Node 2: FastAPI Backend */}
          <rect x="186" y="28" width="148" height="108" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.6" />
          <text x="260" y="53" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">
            2. FastAPI Service
          </text>
          <text x="260" y="73" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontFamily="sans-serif">
            Async API Routing
          </text>
          <text x="260" y="91" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            Pydantic v2 Schemas
          </text>
          <text x="260" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            SlowAPI Rate Limit
          </text>

          <line x1="334" y1="82" x2="366" y2="82" stroke="url(#mmGrad)" strokeWidth="2" markerEnd="url(#arrowCyan)" />

          {/* Node 3: XLM-RoBERTa Inference */}
          <rect x="370" y="28" width="144" height="108" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.6" />
          <text x="442" y="53" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold" fontFamily="monospace">
            3. XLM-RoBERTa
          </text>
          <text x="442" y="73" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontFamily="sans-serif">
            Transformer Inference
          </text>
          <text x="442" y="91" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            PyTorch + HF Hub
          </text>
          <text x="442" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            Polarity & Emotion
          </text>

          <line x1="514" y1="82" x2="546" y2="82" stroke="url(#mmGrad)" strokeWidth="2" markerEnd="url(#arrowCyan)" />

          {/* Node 4: Supabase PostgreSQL */}
          <rect x="550" y="28" width="118" height="108" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.6" />
          <text x="609" y="53" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold" fontFamily="monospace">
            4. Supabase DB
          </text>
          <text x="609" y="73" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontFamily="sans-serif">
            PostgreSQL SQL
          </text>
          <text x="609" y="91" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            Row-Level Security
          </text>
          <text x="609" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            User Mood Logs
          </text>
        </svg>
        {!compact && (
          <p className="mt-2 text-xs text-slate-400">
            <strong className="text-slate-200">Ujjwal&apos;s Focus:</strong> Engineered the asynchronous FastAPI backend routes (Node 2), integrated the team&apos;s trained XLM-RoBERTa transformer into the inference pipeline (Node 3), and connected Supabase PostgreSQL & Auth (Node 4).
          </p>
        )}
      </div>
    );
  }

  if (type === 'docuchat') {
    return (
      <div className="w-full rounded-xl bg-slate-950/90 border border-blue-500/25 p-3 sm:p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300">
            DocuChat • Retrieval-Augmented Generation (RAG) Workflow
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            PyPDFLoader → MiniLM Embeddings → FAISS → HF LLM
          </span>
        </div>
        <svg
          viewBox="0 0 680 165"
          className="w-full h-auto"
          role="img"
          aria-label="DocuChat RAG architecture diagram showing PDF ingestion via PyPDFLoader, RecursiveCharacterTextSplitter chunking, MiniLM embeddings with FAISS vector index, and grounded LLM generation with source page citations"
        >
          <defs>
            <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#60a5fa" />
            </marker>
          </defs>

          {/* Step 1: PDF Ingestion */}
          <rect x="10" y="28" width="122" height="108" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.6" />
          <text x="71" y="52" textAnchor="middle" fill="#60a5fa" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
            1. PDF Ingestion
          </text>
          <text x="71" y="72" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">
            PyPDFLoader
          </text>
          <text x="71" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            Text Extraction
          </text>
          <text x="71" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            + Page Metadata
          </text>

          <line x1="132" y1="82" x2="156" y2="82" stroke="#60a5fa" strokeWidth="1.8" markerEnd="url(#arrowBlue)" />

          {/* Step 2: Text Chunking */}
          <rect x="160" y="28" width="128" height="108" rx="10" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.6" />
          <text x="224" y="52" textAnchor="middle" fill="#22d3ee" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
            2. Text Splitting
          </text>
          <text x="224" y="72" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">
            RecursiveSplitter
          </text>
          <text x="224" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            Overlapping Chunks
          </text>
          <text x="224" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            Page IDs Preserved
          </text>

          <line x1="288" y1="82" x2="312" y2="82" stroke="#60a5fa" strokeWidth="1.8" markerEnd="url(#arrowBlue)" />

          {/* Step 3: Embeddings & FAISS */}
          <rect x="316" y="28" width="140" height="108" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.6" />
          <text x="386" y="52" textAnchor="middle" fill="#c4b5fd" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
            3. Vector Index
          </text>
          <text x="386" y="72" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">
            all-MiniLM-L6-v2
          </text>
          <text x="386" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            FAISS (faiss-cpu)
          </text>
          <text x="386" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            Top-K Similarity
          </text>

          <line x1="456" y1="82" x2="480" y2="82" stroke="#60a5fa" strokeWidth="1.8" markerEnd="url(#arrowBlue)" />

          {/* Step 4: Grounded Generation */}
          <rect x="484" y="28" width="184" height="108" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.6" />
          <text x="576" y="52" textAnchor="middle" fill="#6ee7b7" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
            4. Grounded Q&A UI
          </text>
          <text x="576" y="72" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">
            HuggingFaceEndpoint LLM
          </text>
          <text x="576" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            Context-Bound Prompting
          </text>
          <text x="576" y="108" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontFamily="monospace">
             Streamlit + Page Citations
          </text>
        </svg>
        {!compact && (
          <p className="mt-2 text-xs text-slate-400">
            <strong className="text-slate-200">RAG Grounding Guarantee:</strong> Every retrieved chunk carries its originating PDF page number into the LangChain prompt template, preventing ungrounded synthesis and displaying exact page references in Streamlit.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl bg-slate-950/90 border border-violet-500/25 p-3 sm:p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-violet-300">
          CodeNova • Automated LLM Code Review Architecture
        </span>
        <span className="text-[10px] font-mono text-slate-400">
          Monaco Editor → Python API → LLM Review → Pydantic Schema
        </span>
      </div>
      <svg
        viewBox="0 0 680 165"
        className="w-full h-auto"
        role="img"
        aria-label="CodeNova architecture diagram showing React and Monaco Editor frontend, Python backend API, LLM static and security code analysis, and Pydantic schema validation"
      >
        <defs>
          <marker id="arrowViolet" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" />
          </marker>
        </defs>

        {/* Step 1: Monaco Editor */}
        <rect x="12" y="28" width="138" height="108" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.6" />
        <text x="81" y="53" textAnchor="middle" fill="#c4b5fd" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
          1. Code Workspace
        </text>
        <text x="81" y="73" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontFamily="sans-serif">
          React + Vite UI
        </text>
        <text x="81" y="91" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
          Monaco Code Editor
        </text>
        <text x="81" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
          Language Selector
        </text>

        <line x1="150" y1="82" x2="182" y2="82" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowViolet)" />

        {/* Step 2: Python Backend API */}
        <rect x="186" y="28" width="144" height="108" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.6" />
        <text x="258" y="53" textAnchor="middle" fill="#60a5fa" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
          2. Python REST API
        </text>
        <text x="258" y="73" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontFamily="sans-serif">
          Payload Sanitization
        </text>
        <text x="258" y="91" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
          JWT Auth & Routing
        </text>
        <text x="258" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
          Docker / Render Host
        </text>

        <line x1="330" y1="82" x2="362" y2="82" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowViolet)" />

        {/* Step 3: LLM Code Analysis */}
        <rect x="366" y="28" width="146" height="108" rx="10" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.6" />
        <text x="439" y="53" textAnchor="middle" fill="#22d3ee" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
          3. LLM Code Review
        </text>
        <text x="439" y="73" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontFamily="sans-serif">
          Structured Prompting
        </text>
        <text x="439" y="91" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
          Bug & Security Scan
        </text>
        <text x="439" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
          Complexity & Refactor
        </text>

        <line x1="512" y1="82" x2="544" y2="82" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowViolet)" />

        {/* Step 4: Validated Output */}
        <rect x="548" y="28" width="120" height="108" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.6" />
        <text x="608" y="53" textAnchor="middle" fill="#6ee7b7" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
          4. AI Insights
        </text>
        <text x="608" y="73" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontFamily="sans-serif">
          Pydantic Validation
        </text>
        <text x="608" y="91" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
          Structured JSON
        </text>
        <text x="608" y="109" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
          Side-Panel Report
        </text>
      </svg>
      {!compact && (
        <p className="mt-2 text-xs text-slate-400">
          <strong className="text-slate-200">Verified Implementation:</strong> Combines a Monaco Editor React frontend with a Python backend service and Pydantic response validation deployed on Render.
        </p>
      )}
    </div>
  );
};
