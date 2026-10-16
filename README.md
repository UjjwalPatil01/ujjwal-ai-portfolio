# Ujjwal Pradip Patil — AI/ML Engineer & Python Backend Portfolio (ujjwal.ai)

> **AI/ML Engineer | Generative AI | LLM Applications | Python Backend Developer**  
> Computer Engineering Graduate (2022–2026) | Pune, Maharashtra, India  
> **Live Portfolio:** [https://ujjwal-ai-portfolio.vercel.app/](https://ujjwal-ai-portfolio.vercel.app/)  
> **Contact & Profiles:** [LinkedIn](https://www.linkedin.com/in/ujjwalpatil-ai) • [GitHub](https://github.com/UjjwalPatil01) • [Hugging Face](https://huggingface.co/ujjwalpatil) • [ujjwalpatil163@gmail.com](mailto:ujjwalpatil163@gmail.com) • +91 8329426463

---

## ⚡ Executive Summary

A full-stack, production-grade engineering portfolio designed to showcase applied machine learning systems, Retrieval-Augmented Generation (RAG) architectures, fine-tuned Hugging Face transformer models, and high-throughput asynchronous Python backends.

Built with a **React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion** client and an enterprise-styled **FastAPI + Pydantic + SQLAlchemy / SQLite** backend, featuring an articulated skeletal SVG companion mascot and a 60fps 3D perspective gyroscope cursor.

---

## 🚀 Featured AI/ML Engineering Case Studies

| Project | Live App | Source Code | Technical Architecture & Key Impact |
| :--- | :---: | :---: | :--- |
| **MoodMate** | [Live App](https://mood-mate-web-app.vercel.app/) | [GitHub](https://github.com/MoodMate-WebApp/MoodMate-WebApp) | **Multilingual NLP Sentiment Analysis (Marathi, Hindi, English)**<br>• Fine-tuned `XLM-RoBERTa` transformer architecture running on PyTorch.<br>• Asynchronous `FastAPI` service with Pydantic contract validation.<br>• `Supabase PostgreSQL` persistence with JWT authentication & Row-Level Security (RLS). |
| **DocuChat** | *Local / Demo* | [GitHub](https://github.com/UjjwalPatil01/docuchat) | **Retrieval-Augmented Generation (RAG) Document Q&A Assistant**<br>• Built with `Python`, `LangChain`, `PyPDFLoader`, and `RecursiveCharacterTextSplitter`.<br>• Dense vector search using `sentence-transformers/all-MiniLM-L6-v2` & `FAISS`.<br>• Zero-hallucination source attribution with exact PDF page-number citations. |
| **CodeNova** | [Live App](https://codenova-ui.onrender.com/) | [GitHub](https://github.com/UjjwalPatil01/ai-code-reviewer) | **AI Code Reviewer & Static Security Analyzer**<br>• Real-time syntax and logic analysis via Google Gemini API & AST parsing.<br>• High-performance `Monaco Editor` frontend in React with instant diagnostic markers.<br>• Dockerized Python API deployed on Render with structured Pydantic response schemas. |

### Additional Engineering Work & Accreditations
- **Published Research Paper (May 2026)**: *"AI-Driven Mental Health Detection from Social Media Posts in a Regional Language"* in *International Journal of Scientific Research in Computer Science, Engineering and Information Technology (IJSCI)* — **84.80% Marathi NLP accuracy** ([Paper PDF](https://drive.google.com/file/d/1hX0dcJkMd7CI_QyJfUpW8BgBwQZRIHHd/view?usp=drive_link) | [Certificate](https://drive.google.com/file/d/1V25lZgWuzQ9XgS2WdeKIrZgnNjod9rPR/view?usp=drive_link)).
- **TCS iON NQT–IT Certified**: Python Programming Score: **93.99%** | Overall NQT Score: **74.05%** (Sep 2026).
- **AWS Certified**: *Foundations of Prompt Engineering* (Sep 2026).
- **CodSoft Web Development Internship**: 50+ Git commits, multi-page web applications & REST API integrations (Jun 2025).

---

## 🎨 Interactive Architecture & UX Highlights

1. **Interactive AI Inference Pipeline Console**:
   Live multi-stage neural visualizer demonstrating data ingestion, tokenization, transformer embedding generation, and latency monitoring.
2. **In-App Resume Viewer Modal + Automatic Root Sync**:
   Inspect the full resume directly within an accessible in-app modal (`aria-modal="true"`, `Escape` to close, new-tab/download options). Powered by an automated Vite sync plugin that pulls directly from the top-level `RESUME_PUT_HERE/` folder.
3. **60fps Rigged Developer Pikachu Companion (`RoamingPikachu.tsx`)**:
   Skeletal limb walk cycle, autonomous viewport roaming with boundary bonk recovery, eye pupil tracking following user cursor, drag-and-drop gravity physics, inactivity sleep state, and context-aware dialogue matching current page sections.
4. **60fps 3D Perspective Gyroscope Cursor (`CustomCursor.tsx`)**:
   Full-viewport HTML5 Canvas particle system emitting subtle glowing micro-sparks along motion vectors, instant 16-particle shatter burst on click, and an orbital 3D gyroscope reticle locking onto interactive elements with contextual HUD badges (`PET PIKA ⚡`, `RESUME PDF`, `OPEN ↗`).
5. **Hardened FastAPI Backend**:
   - `GET /api/health` — Proactive uptime & SQLite database connectivity probe.
   - `POST /api/contact` — In-memory client rate limiting, honeypot spam detection, Pydantic length/character sanitization, and automatic `mailto:` client fallback.

---

## 📂 Repository Structure

```text
ujjwal-ai-portfolio/
├── RESUME_PUT_HERE/           # Drop latest resume PDF here for automatic build sync
│   └── Ujjwal_Pradip_Patil_Resume.pdf
├── frontend/                  # React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
│   ├── public/
│   │   ├── resume.pdf         # Synced by Vite plugin from RESUME_PUT_HERE/
│   │   ├── favicon.svg        # Custom ujjwal.ai monogram brand SVG
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── animations/    # Rigged RoamingPikachu, 3D CustomCursor, HeroNeuralVisual, Reveal
│   │   │   ├── layout/        # Responsive Navbar (Resume preview/download) & Footer
│   │   │   ├── projects/      # ProjectCard, ArchitectureDiagram & CaseStudyModal
│   │   │   ├── sections/      # Hero, TechProofStrip, Projects, About, Skills, Experience, Contact
│   │   │   └── ui/            # ResumeViewerModal, ScrollProgressBar, SectionHeading, Badge
│   │   ├── context/           # ResumeModalContext (Global in-app preview state)
│   │   ├── data/              # portfolioData.ts (Single source of truth)
│   │   ├── hooks/             # useActiveSection, useReducedMotion
│   │   ├── lib/               # FastAPI client & contact form validation
│   │   ├── pages/             # HomePage & ProjectDetailPage (/projects/:slug)
│   │   ├── styles/            # Tailwind CSS design system & glassmorphism tokens
│   │   ├── types/             # Strict TypeScript definitions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json
│   └── vite.config.ts         # Includes syncResumePlugin
├── backend/                   # Python FastAPI + Pydantic + SQLAlchemy/SQLite API
│   ├── app/
│   │   ├── api/routes/        # GET /api/health & POST /api/contact
│   │   ├── core/              # Config, JSON logging & IP rate limiter
│   │   ├── db/                # SQLite / SQLAlchemy database session manager
│   │   ├── models/            # ContactMessage ORM model
│   │   ├── schemas/           # Pydantic validation & spam-filter schemas
│   │   ├── services/          # Contact persistence & optional SMTP notification
│   │   └── main.py            # FastAPI app factory & security headers middleware
│   ├── tests/                 # Automated Pytest suite (14/14 tests passing)
│   ├── data/
│   │   └── .gitkeep           # Ignored SQLite runtime database volume
│   ├── Dockerfile
│   ├── pytest.ini
│   └── requirements.txt
├── docs/                      # Architectural & Engineering Audit Documentation
│   ├── ARCHITECTURE.md        # Deep-dive system & component architecture specification
│   ├── DEPLOYMENT.md          # Multi-cloud deployment guide (Vercel, Render, Docker)
│   ├── LINK_AUDIT.md          # 100% verified status audit of all project links
│   └── BUILD_REPORT.md        # Comprehensive quality verification & test report
├── .github/workflows/
│   └── ci.yml                 # Automated GitHub Actions CI pipeline
├── docker-compose.yml         # Full-stack containerized local environment
├── render.yaml                # Render cloud deployment blueprint
├── HOW_TO_UPDATE_RESUME.md    # 1-step resume update instructions
├── README.md                  # Root executive engineering documentation
└── .gitignore                 # Excludes .env, node_modules/, .venv/, dist/, *.db
```

---

## 🛠️ Local Development & Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **Python**: 3.10+ (tested on Python 3.11 & 3.13)
- **Git**

---

### 2. Start the Backend API (FastAPI)

```powershell
# Windows PowerShell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

```bash
# macOS / Linux / Bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
- **Health Check:** `http://127.0.0.1:8000/api/health`
- **Interactive Swagger Docs:** `http://127.0.0.1:8000/api/docs`

---

### 3. Start the Frontend Client (React + Vite)

Open a new terminal window:

```powershell
# Windows PowerShell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

```bash
# macOS / Linux / Bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.  
Vite automatically proxies `/api/*` requests to the running FastAPI server at `http://127.0.0.1:8000`.

---

### 4. Run Automated Test Suites

```powershell
# Frontend TypeScript & Production Build Check
cd frontend
npm run typecheck
npm run build

# Backend Pytest Suite
cd ../backend
.\.venv\Scripts\Activate.ps1
pytest
```

---

## 📄 License & Attribution

Designed and engineered by **Ujjwal Pradip Patil**.  
Open for entry-level **AI/ML Engineer**, **Generative AI Engineer**, and **Python Backend Developer** roles.
