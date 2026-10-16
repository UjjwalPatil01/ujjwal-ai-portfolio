# System Architecture (`docs/ARCHITECTURE.md`)

## 1. High-Level Overview

The **Ujjwal Pradip Patil AI/ML Engineer Portfolio** (`ujjwal.ai`) is a full-stack web application designed with a clean separation between a static-deployable **React + TypeScript + Vite** frontend and a modular **Python FastAPI + SQLite/SQLAlchemy** backend service.

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                    React 18 + TypeScript + Vite Frontend                │
│  ┌──────────────┐  ┌───────────────────────┐  ┌──────────────────────┐  │
│  │ Sticky Nav & │  │ Interactive SVG Arch  │  │ Contact Form +       │  │
│  │ Hero Visual  │  │ Diagrams & Case Modal │  │ Mailto Fallback      │  │
│  └──────────────┘  └───────────────────────┘  └──────────┬───────────┘  │
└──────────────────────────────────────────────────────────┼──────────────┘
                                                           │ HTTPS / JSON
                                                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Python FastAPI Backend API                       │
│  ┌──────────────────────┐  ┌────────────────────┐  ┌─────────────────┐  │
│  │ CORS & Security      │  │ Sliding-Window IP  │  │ Pydantic Schema │  │
│  │ Headers Middleware   │  │ Rate Limiter       │  │ & Spam Filter   │  │
│  └──────────────────────┘  └────────────────────┘  └────────┬────────┘  │
│                                                             │           │
│                                                             ▼           │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Persistence Layer (SQLAlchemy 2.0 ORM / SQLite3 Unified Adapter)  │  │
│  │ Table: contact_messages (id, name, email, subject, message, ts)   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

## 2. Frontend Architecture (`frontend/`)

- **Framework & Tooling**: React 18, Vite 5, TypeScript (Strict Mode), Tailwind CSS, Framer Motion, React Router v6, and Lucide React icons.
- **Content-Code Separation**: All profile identity strings, featured/secondary project descriptions, workflow steps, skill groups, internship history, education, certifications, and research publication metadata live in `frontend/src/data/portfolioData.ts` typed by `frontend/src/types/portfolio.ts`.
- **Custom Architecture Diagrams (`ArchitectureDiagram.tsx`)**:
  - **MoodMate**: Illustrates the 4-stage pipeline from React 19 multilingual input (Marathi/Hindi/English + Supabase JWT) -> FastAPI + SlowAPI + Pydantic -> Fine-tuned `XLM-RoBERTa` (PyTorch) -> Supabase PostgreSQL with Row-Level Security.
  - **DocuChat**: Illustrates the RAG pipeline from PDF upload (`PyPDFLoader`) -> `RecursiveCharacterTextSplitter` -> `sentence-transformers/all-MiniLM-L6-v2` -> `FAISS` top-k retrieval -> `HuggingFaceEndpoint` grounded prompt -> Streamlit answer with page citations.
  - **CodeNova**: Illustrates Monaco Code Editor input -> Python REST API -> Engineered LLM code review prompt -> Pydantic schema validation -> AI Insights UI.
- **Accessibility & Motion Design**:
  - Respects `prefers-reduced-motion` via CSS media queries and the `useReducedMotion` hook in `Reveal.tsx`.
  - Keyboard-accessible case-study modal (`Escape` key listener, backdrop click close, `aria-modal="true"`, semantic headings) plus dedicated `/projects/:slug` routes.

## 3. Backend Architecture (`backend/`)

- **Modular Package Layout**:
  - `app/main.py`: FastAPI application factory, CORS middleware, security headers middleware (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`), startup database initialization, and redacted exception handlers.
  - `app/core/config.py`: Environment variable loader supporting `SQLITE_DB_PATH`, `DATABASE_URL`, `CORS_ORIGINS`, `RATE_LIMIT_MAX_REQUESTS`, `RATE_LIMIT_WINDOW_SECONDS`, and optional `SMTP_*` settings.
  - `app/core/rate_limit.py`: Thread-safe sliding-window rate limiter using SHA-256 hashed client IPs (never storing raw visitor IP addresses in plain text) and returning HTTP `429 Too Many Requests` with a `Retry-After` header.
  - `app/schemas/contact.py`: Pydantic validation enforcing field lengths, email syntax, control-character sanitization, URL-flooding spam checks, and a hidden `website` honeypot field.
  - `app/db/session.py` & `app/models/contact.py`: Unified persistence manager that uses SQLAlchemy 2.0 ORM when installed and transparently falls back to Python's standard `sqlite3` library with the exact same `contact_messages` table DDL.
- **Endpoints**:
  - `GET /api/health`: Returns service health status and verifies database connectivity (`SELECT 1`).
  - `POST /api/contact`: Validates, rate-limits, and persists contact submissions into `contact_messages`.
  - **Security by Design**: No public `GET /api/contact` or admin listing endpoint is exposed.
