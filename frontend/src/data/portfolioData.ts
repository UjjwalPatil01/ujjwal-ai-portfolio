import {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  NavItem,
  ProfileIdentity,
  ProjectItem,
  ResearchPublication,
  SkillGroup,
  TechProofItem,
} from '../types/portfolio';

export const navItems: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'research', label: 'Research', href: '#research' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const profileIdentity: ProfileIdentity = {
  name: 'Ujjwal Pradip Patil',
  monogram: 'UP',
  brand: 'ujjwal.ai',
  title: 'AI/ML Engineer | Generative AI | Python Backend Developer',
  headline: 'Building practical AI systems, intelligent applications, and scalable Python backends.',
  heroSummary:
    '2026 Computer Engineering graduate focused on Applied AI, Retrieval-Augmented Generation (RAG), multilingual NLP with Hugging Face Transformers, and asynchronous Python backends using FastAPI and Flask. Seeking an entry-level AI/ML, Generative AI, or Python Backend Engineering role.',
  location: 'Pune, Maharashtra, India',
  email: 'ujjwalpatil163@gmail.com',
  phone: '+91 8329426463',
  linkedinUrl: 'https://www.linkedin.com/in/ujjwalpatil-ai',
  githubUrl: 'https://github.com/UjjwalPatil01',
  huggingfaceUrl: 'https://huggingface.co/ujjwalpatil',
  resumePath: '/resume.pdf',
  careerObjective:
    'Recent Computer Engineering graduate (2022–2026) looking for an entry-level AI/ML Engineer, Generative AI Engineer, Python Developer, or AI-focused Backend Developer opportunity to build reliable AI products alongside experienced engineering teams.',
  aboutParagraphs: [
    'I am a 2026 Bachelor of Engineering graduate in Computer Engineering from S.S.B.T.\'s College of Engineering & Technology (CGPA: 7.69), based in Pune, Maharashtra. My technical work centers on bridging machine learning models and language models with structured, deployable Python backends.',
    'Across my individual and collaborative engineering projects, I have built end-to-end Retrieval-Augmented Generation (RAG) workflows using LangChain, sentence-transformers, and FAISS; integrated fine-tuned XLM-RoBERTa transformer models into asynchronous FastAPI services with Supabase/PostgreSQL persistence; and engineered LLM-assisted developer and productivity tools.',
    'I value clean API contracts, schema validation with Pydantic, reproducible Docker environments, and transparent source grounding. I am looking to grow as an entry-level engineer by contributing to real-world software and AI systems.',
  ],
  aboutHighlights: [
    {
      label: 'Degree & Graduation',
      value: 'B.E. Computer Engineering (2026)',
      detail: 'S.S.B.T.\'s College of Engineering & Technology | CGPA: 7.69',
    },
    {
      label: 'Core Engineering Focus',
      value: 'Applied AI, RAG & Python Backends',
      detail: 'FastAPI, Flask, LangChain, Hugging Face, XLM-RoBERTa, SQL',
    },
    {
      label: 'Published Research',
      value: 'First & Corresponding Author (May 2026)',
      detail: 'Regional-language mental health NLP using XLM-RoBERTa in IJSCI',
    },
    {
      label: 'Verified Assessment',
      value: '93.99% in Python (TCS iON NQT-IT)',
      detail: '74.05% Overall NQT-IT Score | Issued September 2026',
    },
  ],
};

export const techProofItems: TechProofItem[] = [
  { name: 'Python', category: 'Core Language', tag: 'Backend & AI' },
  { name: 'FastAPI', category: 'Async Framework', tag: 'REST APIs' },
  { name: 'Generative AI', category: 'LLM Integration', tag: 'Structured Output' },
  { name: 'RAG Pipelines', category: 'LangChain + FAISS', tag: 'Context Grounding' },
  { name: 'Multilingual NLP', category: 'XLM-RoBERTa', tag: 'Transformer Inference' },
  { name: 'Hugging Face', category: 'Transformers & Hub', tag: 'Embeddings & LLMs' },
  { name: 'SQL & Supabase', category: 'Persistence & Auth', tag: 'PostgreSQL / RLS' },
  { name: 'Docker', category: 'Containerization', tag: 'Cloud Deployment' },
];

export const featuredProjects: ProjectItem[] = [
  {
    id: 'moodmate',
    slug: 'moodmate',
    title: 'MoodMate',
    subtitle: 'Multilingual NLP Sentiment Analysis & Well-Being Platform',
    category: 'Multilingual NLP • FastAPI • Transformer Inference',
    featured: true,
    isTeamProject: true,
    roleLabel: 'Team Project — Backend, Model Inference & Database Integration',
    accentColor: 'cyan',
    diagramType: 'moodmate',
    summary:
      'A multilingual mental well-being and sentiment analysis application supporting Marathi, Hindi, and English input using a fine-tuned XLM-RoBERTa transformer model, served via an asynchronous FastAPI backend with Supabase PostgreSQL persistence and authentication.',
    problemStatement:
      'Conventional sentiment analysis pipelines are overwhelmingly optimized for English text, struggling to interpret regional Indian languages such as Marathi and Hindi or code-mixed expressions where subtle morphological markers convey emotional distress or well-being.',
    whatItDoes:
      'Allows users to submit reflections in Marathi, Hindi, or English for real-time emotion and sentiment classification, visualizes longitudinal mood distributions on an interactive Recharts dashboard, and provides a calming "Zen Garden" well-being space backed by authenticated user sessions.',
    technicalApproach:
      'Implements a decoupled client-server architecture: a React 19 + TypeScript + Tailwind CSS + Framer Motion frontend communicates with an asynchronous Python 3.11+ FastAPI backend. The backend integrates the team\'s fine-tuned XLM-RoBERTa model (PyTorch + Hugging Face Transformers), validates payloads via Pydantic, enforces SlowAPI rate limits, and connects to Supabase PostgreSQL with JWT authentication and Row-Level Security (RLS).',
    myContribution: [
      'Developed the asynchronous FastAPI backend service to handle incoming multilingual sentiment analysis requests and route data cleanly across application layers.',
      'Integrated the team\'s trained XLM-RoBERTa transformer model into the backend inference pipeline for real-time sentiment classification.',
      'Implemented SQL database connectivity and Supabase authentication (JWT + Row-Level Security) to securely manage sentiment logs, user records, and application workflows.',
    ],
    engineeringDecisions: [
      'Separated transformer inference execution and API routing within FastAPI to maintain predictable request handling and structured Pydantic response validation.',
      'Used Supabase PostgreSQL with Row-Level Security (RLS) policies and JWT verification so each user\'s sentiment history remains isolated at the database layer.',
      'Added SlowAPI endpoint rate limiting to protect compute-intensive PyTorch / XLM-RoBERTa inference routes from request bursts.',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Multilingual User Input & Auth',
        description:
          'User submits Marathi, Hindi, or English text from the React + TypeScript UI along with a Supabase JWT session token.',
        tech: 'React 19 • TypeScript • Supabase Auth',
      },
      {
        step: '02',
        title: 'FastAPI Gateway & Validation',
        description:
          'Asynchronous FastAPI route verifies rate limits via SlowAPI and validates request schemas using Pydantic.',
        tech: 'FastAPI • Pydantic • SlowAPI',
      },
      {
        step: '03',
        title: 'XLM-RoBERTa Inference Pipeline',
        description:
          'Tokenizes regional or code-mixed text and runs forward inference through the fine-tuned XLM-RoBERTa model in PyTorch.',
        tech: 'XLM-RoBERTa • Hugging Face • PyTorch',
      },
      {
        step: '04',
        title: 'SQL Persistence & Analytics Response',
        description:
          'Stores sentiment scores and metadata in Supabase PostgreSQL and returns structured JSON for Recharts visualization.',
        tech: 'PostgreSQL • Supabase • Recharts',
      },
    ],
    verifiedStack: [
      'Python',
      'FastAPI',
      'XLM-RoBERTa',
      'PyTorch',
      'Hugging Face Transformers',
      'SQL / PostgreSQL',
      'Supabase Auth & RLS',
      'Pydantic',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vercel',
    ],
    liveUrl: 'https://mood-mate-web-app.vercel.app/',
    githubUrl: 'https://github.com/MoodMate-WebApp/MoodMate-WebApp',
  },
  {
    id: 'docuchat',
    slug: 'docuchat',
    title: 'DocuChat',
    subtitle: 'Retrieval-Augmented Generation (RAG) Document Q&A Assistant',
    category: 'RAG Pipeline • LangChain • FAISS • Hugging Face',
    featured: true,
    isTeamProject: false,
    roleLabel: 'Individual Project — End-to-End RAG Architecture & Implementation',
    accentColor: 'blue',
    diagramType: 'docuchat',
    summary:
      'A Retrieval-Augmented Generation (RAG) application in Python that ingests uploaded PDF documents, indexes semantic embeddings in FAISS, and generates context-grounded answers with explicit source-page citations through a Streamlit interface.',
    problemStatement:
      'Extracting specific answers from long technical or academic PDFs manually is time-consuming, while querying general-purpose LLMs without document grounding frequently produces hallucinated responses with no verifiable page attribution.',
    whatItDoes:
      'Enables users to upload arbitrary PDF documents, automatically extracts and chunks text while preserving page metadata, performs semantic similarity search over vector embeddings, and answers natural-language questions strictly grounded in the retrieved document passages with page citations.',
    technicalApproach:
      'Built in Python with LangChain (`langchain`, `langchain-community`, `langchain-huggingface`, `langchain-text-splitters`). Uses `PyPDFLoader` for page-aware PDF parsing, `RecursiveCharacterTextSplitter` for overlapping text chunks, `sentence-transformers/all-MiniLM-L6-v2` for dense vector embeddings, `faiss-cpu` for in-memory top-k similarity retrieval, and Hugging Face instruction-tuned models (`HuggingFaceEndpoint`) wrapped in grounded prompt templates.',
    myContribution: [
      'Designed and built the complete Retrieval-Augmented Generation (RAG) pipeline in Python using LangChain to query and extract answers from uploaded PDF documents.',
      'Implemented the document processing workflow covering PDF extraction (`PyPDFLoader`), overlapping text chunking (`RecursiveCharacterTextSplitter`), dense embedding generation (`all-MiniLM-L6-v2`), and `FAISS` vector similarity search.',
      'Integrated Hugging Face language models (`HuggingFaceEndpoint`) and anti-hallucination prompt templates with a Streamlit interface to deliver context-grounded answers and source page references.',
    ],
    engineeringDecisions: [
      'Used `RecursiveCharacterTextSplitter` with chunk overlap so semantic context spanning paragraph or sentence boundaries is preserved during retrieval.',
      'Paired local `sentence-transformers/all-MiniLM-L6-v2` embeddings with an in-memory `FAISS` index (`faiss-cpu`) for fast, low-latency vector similarity search without external vector-DB overhead.',
      'Retained page number metadata on every document chunk so each generated answer cites the exact PDF page numbers retrieved.',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'PDF Ingestion & Page Extraction',
        description:
          'Loads user-uploaded PDF files via PyPDFLoader, extracting raw text alongside page-number metadata.',
        tech: 'PyPDFLoader • pypdf',
      },
      {
        step: '02',
        title: 'Recursive Chunking & Metadata Preservation',
        description:
          'Splits pages into overlapping text chunks using RecursiveCharacterTextSplitter while keeping source page indices attached.',
        tech: 'LangChain Text Splitters',
      },
      {
        step: '03',
        title: 'Dense Embedding & FAISS Indexing',
        description:
          'Encodes text chunks into dense vectors using sentence-transformers/all-MiniLM-L6-v2 and indexes them in FAISS.',
        tech: 'Sentence-Transformers • FAISS',
      },
      {
        step: '04',
        title: 'Top-K Retrieval & Grounded Generation',
        description:
          'Retrieves top-k relevant chunks for a user query and prompts a Hugging Face LLM to synthesize an answer with page citations.',
        tech: 'HuggingFaceEndpoint • Streamlit',
      },
    ],
    verifiedStack: [
      'Python',
      'LangChain',
      'Hugging Face',
      'Sentence-Transformers',
      'FAISS (faiss-cpu)',
      'PyPDFLoader (pypdf)',
      'Streamlit',
      'Prompt Engineering',
    ],
    liveUrl: null,
    liveStatusNote:
      'Repository-only engineering project (no public cloud demo deployed); full source code and local Streamlit setup instructions are available on GitHub.',
    githubUrl: 'https://github.com/UjjwalPatil01/docuchat',
  },
  {
    id: 'codenova',
    slug: 'codenova',
    title: 'CodeNova',
    subtitle: 'AI-Powered Source Code Reviewer & Static Analysis Assistant',
    category: 'LLM Applications • Code Analysis API • Structured Feedback',
    featured: true,
    isTeamProject: false,
    roleLabel: 'Individual Project — Full-Stack AI Code Review Platform',
    accentColor: 'violet',
    diagramType: 'codenova',
    summary:
      'An interactive LLM-powered code review application featuring a browser-based Monaco Code Editor and a Python backend that analyzes submitted source code to return structured feedback on bugs, security risks, code quality, and optimizations.',
    problemStatement:
      'Developers iterating quickly on code often need immediate, structured feedback on potential bugs, security vulnerabilities, and refactoring opportunities before opening formal pull requests.',
    whatItDoes:
      'Provides a full-stack web workspace with a Monaco Code Editor, language selection, and an "AI Insights" panel that evaluates submitted code and presents structured review findings, severity observations, and optimization suggestions.',
    technicalApproach:
      'Combines a React + Vite + Tailwind CSS frontend embedding the Monaco Editor with a Python backend service deployed on Render. Uses engineered system prompts and Pydantic validation schemas to transform raw LLM completions into consistent, structured review outputs.',
    myContribution: [
      'Built the backend code analysis API in Python to accept source code submissions, orchestrate LLM review prompts, and return structured review feedback.',
      'Implemented Pydantic validation schemas to structure and verify LLM-generated outputs for consistent frontend rendering.',
      'Developed the interactive React + Vite + Monaco Editor frontend, containerized the service workflow, and deployed the live application to Render.',
    ],
    engineeringDecisions: [
      'Enforced structured JSON output schemas validated with Pydantic so the UI reliably renders distinct review sections rather than unparsed markdown blobs.',
      'Embedded the Monaco Editor directly in the React frontend to give developers syntax highlighting and familiar code-editing ergonomics.',
      'Configured asynchronous task support and cloud deployment on Render to separate UI delivery from backend LLM API execution.',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Monaco Code Editor Input',
        description:
          'User writes or pastes source code in the React + Monaco Editor workspace and triggers "Analyze Code".',
        tech: 'React • Vite • Monaco Editor',
      },
      {
        step: '02',
        title: 'Python API & Request Validation',
        description:
          'Backend API receives the source code payload, validates input parameters, and prepares the review context.',
        tech: 'Python • REST API • Pydantic',
      },
      {
        step: '03',
        title: 'Engineered LLM Code Analysis',
        description:
          'Executes a structured code-review prompt evaluating security issues, bugs, complexity, and optimization opportunities.',
        tech: 'LLM API (Google Gemini) • Prompt Engineering',
      },
      {
        step: '04',
        title: 'Schema Validation & AI Insights UI',
        description:
          'Validates the structured review response and renders actionable suggestions in the CodeNova AI Insights panel.',
        tech: 'Pydantic • Tailwind CSS • Render',
      },
    ],
    verifiedStack: [
      'Python',
      'Flask / FastAPI',
      'Google Gemini API',
      'Pydantic',
      'React',
      'Vite',
      'Monaco Editor',
      'Tailwind CSS',
      'Docker',
      'Render',
    ],
    liveUrl: 'https://codenova-ui.onrender.com/',
    githubUrl: 'https://github.com/UjjwalPatil01/ai-code-reviewer',
    architectureNote:
      'Technical Verification Note: While an earlier iteration documented on the resume referenced FastAPI and OpenAI API, the current public GitHub repository (`UjjwalPatil01/ai-code-reviewer`) and live Render deployment use a Python Flask backend integrated with the Google Gemini API (`google-generativeai`), Pydantic validation, Celery/Redis workers, and a React + Vite + Monaco Editor frontend.',
  },
];

export const secondaryProjects: ProjectItem[] = [
  {
    id: 'smart-task-manager',
    slug: 'smart-task-manager',
    title: 'Smart Task Manager',
    subtitle: 'AI-Assisted Task Priority & Productivity Web App',
    category: 'Python • Flask • Google Gemini API',
    featured: false,
    isTeamProject: false,
    roleLabel: 'Individual Project',
    accentColor: 'cyan',
    summary:
      'A Python and Flask task management web application featuring full CRUD workflows, completion analytics, category filtering, and automatic AI-assisted task priority classification (High / Medium / Low) powered by Google Gemini with JSON persistence.',
    problemStatement:
      'Standard to-do lists require manual priority triage and lack intelligent categorization when managing competing daily tasks.',
    whatItDoes:
      'Provides task creation, inline editing, completion toggling, filtering, and automated AI priority evaluation via Google Gemini, storing task state in structured local JSON storage (`tasks.json`).',
    technicalApproach:
      'Built with a lightweight Python Flask backend integrated with `google-generativeai` (Google Gemini) and responsive HTML5/CSS3 templates deployed on Render.',
    myContribution: [
      'Implemented full CRUD task routes in Flask with JSON persistence and real-time dashboard metrics (Total, Done, Pending).',
      'Integrated Google Gemini API to classify task priority automatically based on task descriptions and deadlines.',
    ],
    engineeringDecisions: [
      'Kept persistence lightweight with structured JSON storage for rapid prototyping and zero-dependency local execution.',
    ],
    workflowSteps: [],
    verifiedStack: ['Python', 'Flask', 'Google Gemini API', 'JSON Storage', 'HTML5 / CSS3', 'Render'],
    liveUrl: 'https://smart-task-manager-ri8k.onrender.com/',
    githubUrl: 'https://github.com/UjjwalPatil01/smart-task-manager',
  },
  {
    id: 'virtual-herbal-garden',
    slug: 'virtual-herbal-garden',
    title: '3D Virtual Herbal Garden Hub',
    subtitle: 'Interactive Medicinal & Botanical Exploration Web Platform',
    category: 'Interactive Web UI • Botanical Catalog • Assistant Widget',
    featured: false,
    isTeamProject: false,
    roleLabel: 'Web Application Project',
    accentColor: 'blue',
    summary:
      'An interactive web application hosted on Netlify presenting a curated catalog of medicinal, culinary, and aromatic herbs across 9 specialized botanical categories with an embedded interactive assistant widget.',
    problemStatement:
      'Traditional herbal and botanical knowledge is often scattered across static text references that are difficult for students and enthusiasts to browse interactively.',
    whatItDoes:
      'Organizes plants and remedies into 9 browsable categories (Medicinal Herbs, Culinary Herbs, Aromatic Herbs, Tea & Infusions, DIY Remedies, Decorative Plants, Organic Farming, Herbal Recipes, and Herbal Workshops) with interactive navigation and an assistant widget.',
    technicalApproach:
      'Constructed with semantic HTML5, modern responsive CSS3 layouts, and interactive client-side JavaScript deployed on Netlify.',
    myContribution: [
      'Built the responsive multi-category botanical catalog interface, navigation flows, and interactive assistant integration.',
    ],
    engineeringDecisions: [
      'Structured the catalog into nine clear domain categories for fast discovery and clean responsive rendering across devices.',
    ],
    workflowSteps: [],
    verifiedStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Netlify'],
    liveUrl: 'https://virtual-herbal-garden-hub.netlify.app/',
    githubUrl: null,
  },
  {
    id: 'student-admission-portal',
    slug: 'student-admission-portal',
    title: 'Student Admission Management System',
    subtitle: 'Full-Stack Higher-Education Admission & Analytics Portal',
    category: 'ASP.NET Core 9 • EF Core • SQL Server • React',
    featured: false,
    isTeamProject: false,
    roleLabel: 'Supporting Full-Stack Engineering Project',
    accentColor: 'violet',
    summary:
      'A supporting full-stack admission management system built with ASP.NET Core 9 MVC, Web API, Entity Framework Core (Code-First), Microsoft SQL Server, and React components for candidate tracking and branch-level enrollment analytics.',
    problemStatement:
      'Managing student admission applications, fee verification, and branch allocation manually across spreadsheets introduces data inconsistencies.',
    whatItDoes:
      'Supports candidate application submission, engineering branch filtering, student profile tracking, fee status verification, and an enrollment analytics dashboard.',
    technicalApproach:
      'Uses ASP.NET Core 9 MVC and RESTful Web API endpoints backed by Entity Framework Core Code-First migrations on SQL Server, paired with a React.js frontend component.',
    myContribution: [
      'Implemented relational database models with Entity Framework Core Code-First migrations, REST API controllers, and candidate filtering workflows.',
    ],
    engineeringDecisions: [
      'Used Code-First EF Core migrations with SQL Server to enforce relational integrity across student profiles, branches, and fee records.',
    ],
    workflowSteps: [],
    verifiedStack: ['ASP.NET Core 9 MVC', 'Web API', 'Entity Framework Core', 'Microsoft SQL Server', 'React.js'],
    liveUrl: null,
    githubUrl: 'https://github.com/UjjwalPatil01/student-admission-portal',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai-genai',
    title: 'AI & Generative AI',
    subtitle: 'RAG pipelines, transformer inference, and grounded LLM applications',
    iconName: 'BrainCircuit',
    skills: [
      { name: 'Retrieval-Augmented Generation (RAG)', context: 'Applied in DocuChat PDF Q&A pipeline' },
      { name: 'LangChain', context: 'Document loaders, recursive splitters & retrieval chains' },
      { name: 'Hugging Face Transformers', context: 'Model inference, endpoints & embeddings' },
      { name: 'LLM Applications', context: 'CodeNova code review & Gemini task prioritization' },
      { name: 'Prompt Engineering', context: 'AWS certified; grounded & structured JSON prompting' },
      { name: 'Natural Language Processing (NLP)', context: 'Multilingual sentiment & regional text analysis' },
      { name: 'XLM-RoBERTa', context: 'Marathi/Hindi/English inference in MoodMate & IJSCI research' },
    ],
  },
  {
    id: 'programming-backend',
    title: 'Programming & Backend Engineering',
    subtitle: 'Asynchronous Python APIs, schema validation, and service architecture',
    iconName: 'Server',
    skills: [
      { name: 'Python', context: '93.99% TCS iON NQT-IT score; primary backend & AI language' },
      { name: 'FastAPI', context: 'Asynchronous REST services & model inference endpoints' },
      { name: 'Flask', context: 'REST backends for CodeNova & Smart Task Manager' },
      { name: 'REST APIs', context: 'Request/response validation with Pydantic & JSON schemas' },
      { name: 'Asynchronous Programming', context: 'Non-blocking API routing & concurrent I/O workflows' },
      { name: 'SQL', context: 'Relational schema design, queries & ORM integration' },
    ],
  },
  {
    id: 'ml-data',
    title: 'Machine Learning & Data Processing',
    subtitle: 'Deep learning runtimes, vector search, and tabular data preparation',
    iconName: 'Cpu',
    skills: [
      { name: 'PyTorch', context: 'Transformer model loading,Selective Layer Freezing & inference' },
      { name: 'FAISS & Sentence-Transformers', context: 'Dense vector indexing & top-k similarity search' },
      { name: 'Pandas', context: 'Dataset inspection, preprocessing & structured manipulation' },
      { name: 'NumPy', context: 'Numerical computing & tensor/array transformations' },
      { name: 'Data Cleaning & Transformation', context: 'Text normalization & multilingual corpus preparation' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Persistence',
    subtitle: 'Relational database systems, cloud auth integration, and ORMs',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL (Supabase)', context: 'MoodMate persistence, JWT auth & Row-Level Security' },
      { name: 'MySQL', context: 'Relational schema modeling & structured querying' },
      { name: 'Microsoft SQL Server', context: 'Used with Entity Framework Core in Admission Portal' },
      { name: 'Relational Database Design', context: 'Normalized schemas, indexing & SQLAlchemy / EF Core' },
    ],
  },
  {
    id: 'tools-platforms',
    title: 'Developer Tools, Frontend & Cloud',
    subtitle: 'Containerization, version control, interactive UIs, and cloud hosting',
    iconName: 'Wrench',
    skills: [
      { name: 'Docker', context: 'Containerized API services & reproducible builds' },
      { name: 'Git & GitHub', context: '50+ internship commits, branch workflows & code reviews' },
      { name: 'React & TypeScript', context: 'Interactive frontends, Tailwind CSS & Vite tooling' },
      { name: 'Streamlit', context: 'Rapid interactive AI interfaces for DocuChat' },
      { name: 'Postman', context: 'REST endpoint testing, payload validation & debugging' },
      { name: 'Render & Vercel', context: 'Cloud deployment for full-stack web & AI services' },
      { name: 'VS Code', context: 'Primary development, debugging & linting environment' },
    ],
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: 'codsoft-intern',
    role: 'Web Development Intern',
    company: 'CodSoft',
    location: 'Remote',
    period: 'June 2025 (01/06/2025 – 30/06/2025)',
    type: 'Internship',
    certificateUrl: 'https://drive.google.com/file/d/1lTALvPOyoUkAUFBKGIt5xG4LVyw_gurJ/view?usp=drive_link',
    summary:
      'Completed a structured one-month remote Web Development Internship focused on building modular, responsive client-side components, integrating frontend views with RESTful backend services, and maintaining disciplined Git version control.',
    achievements: [
      'Developed modular, responsive web components and integrated client-side interfaces with backend REST services.',
      'Maintained disciplined Git and GitHub version control workflows across 50+ commits, adhering to structured code reviews.',
      'Optimized frontend assets and resolved integration issues to enhance cross-browser compatibility and UI stability.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'REST API Integration', 'Responsive Web Design', 'Git & GitHub'],
  },
];

export const educationItems: EducationItem[] = [
  {
    id: 'be-computer-engineering',
    degree: 'Bachelor of Engineering in Computer Engineering',
    institution: "S.S.B.T.'s College of Engineering & Technology",
    location: 'Jalgaon, Maharashtra, India',
    period: '2022 – 2026',
    cgpa: '7.69 / 10.0',
    highlights: [
      'Core coursework in Data Structures & Algorithms, Database Management Systems, Operating Systems, Artificial Intelligence, and Machine Learning.',
      'Published peer-reviewed undergraduate research in May 2026 on regional-language mental health detection using XLM-RoBERTa.',
      'Built practical academic and capstone engineering systems spanning multilingual NLP (MoodMate) and RAG document analysis (DocuChat).',
    ],
  },
];

export const certificationItems: CertificationItem[] = [
  {
    id: 'tcs-ion-nqt',
    name: 'TCS iON NQT–IT (National Qualifier Test)',
    issuer: 'TCS iON',
    date: 'Issued September 2026 (Exam: August 2026)',
    badgeText: 'Python Score: 93.99%',
    description:
      'National standardized assessment evaluating Foundation aptitude (Numerical, Verbal, Reasoning: 73.12%), Advanced Quantitative/Reasoning, and Hands-On Python Programming.',
    metrics: [
      'Hands-On Python Programming Score: 93.99% (563.96 / 600)',
      'Overall NQT-IT Score: 74.05% (2221.36 / 3000)',
    ],
    credentialUrl: 'https://drive.google.com/file/d/1MZQkSTr_mH8i-ZTkD7gEzNJ6g85P0qMB/view?usp=drive_link',
    actionLabel: 'View Scorecard',
  },
  {
    id: 'aws-prompt-engineering',
    name: 'Foundations of Prompt Engineering',
    issuer: 'AWS Training & Certification',
    date: 'September 2026 (Completed Sep 12, 2026)',
    badgeText: 'Generative AI',
    description:
      'Covers prompt design principles, zero-shot and few-shot prompting, context grounding, and mitigation of hallucinations in large language model workflows.',
    credentialUrl: 'https://drive.google.com/file/d/1_7bYRKiegAxr77kyjaRfu9_iR-dtLF0S/view?usp=drive_link',
    actionLabel: 'View Certificate',
  },
  {
    id: 'codsoft-certificate',
    name: 'Web Development Internship Certificate',
    issuer: 'CodSoft',
    date: 'Issued July 3, 2025 (June 2025 Cohort)',
    badgeText: 'Internship Credential',
    description:
      'Awarded upon successful completion of the June 2025 Web Development Internship covering responsive component engineering and REST integration.',
    credentialUrl: 'https://drive.google.com/file/d/1lTALvPOyoUkAUFBKGIt5xG4LVyw_gurJ/view?usp=drive_link',
    actionLabel: 'View Certificate',
  },
  {
    id: 'freecodecamp-rwd',
    name: 'Responsive Web Design Developer Certification',
    issuer: 'freeCodeCamp',
    date: 'October 25, 2023',
    badgeText: '~300 Hours Coursework',
    description:
      'Verified developer certification covering semantic HTML5, modern CSS Grid and Flexbox layouts, accessibility practices, and responsive design patterns.',
    credentialUrl: 'https://drive.google.com/file/d/1-psZoAkYIDwFPMrPV3lNDpLMf8rwFaHB/view?usp=drive_link',
    actionLabel: 'View Certificate',
  },
  {
    id: 'nptel-c-programming',
    name: 'Introduction to Programming in C (Elite)',
    issuer: 'NPTEL — IIT Kanpur (Funded by MoE, Govt. of India)',
    date: 'Jan – Mar 2023 (8-Week Course)',
    badgeText: 'Elite Certification (63%)',
    description:
      'Proctored IIT Kanpur certification covering procedural programming, pointers, memory management, arrays, structures, and algorithmic problem solving in C.',
    credentialUrl: 'https://drive.google.com/file/d/199TlJQY69D1VRpCDb96kwq1GwfGGsUpc/view?usp=drive_link',
    actionLabel: 'View Certificate',
  },
];

export const researchPublication: ResearchPublication = {
  title: 'AI-Driven Mental Health Detection from Social Media Posts in a Regional Language',
  venue: 'International Journal of Scientific Research in Computer Science & Engineering (IJSCI)',
  venueDocumentedHeader: 'International Journal of Sciences and Innovation Engineering (IJSCI)',
  publicationDate: 'May 15, 2026',
  volumeIssue: 'Volume 3, Issue 5 (May 2026)',
  pages: 'pp. 632–640',
  eissn: 'E-ISSN: 3049-0251',
  doiPrefix: 'https://doi.org/10.70849/ijsci',
  authors:
    'Ujjwal Patil, Rohan Baviskar, Aayushi Chaudhari, Harshada Bodavde, Dr. Akash D. Waghmare',
  correspondingAuthor: 'Ujjwal Pradip Patil (First & Corresponding Author)',
  paperUrl: 'https://drive.google.com/file/d/1m1seH4rRbHPOUZwkV8OzETIHUjNTpPrJ/view?usp=drive_link',
  certificateUrl: 'https://drive.google.com/file/d/1VgQm0vmIqzLZol7o3Z0mS64PRc29boZT/view?usp=drive_link',
  abstractSummary:
    'Investigates an end-to-end multilingual NLP framework for identifying psychological distress and mental well-being indicators in Marathi social media posts. By adapting the XLM-RoBERTa-Large architecture through Selective Layer Freezing (SLF), the study reduces computational overhead while preserving sensitivity to agglutinative Marathi morphology and English-Marathi code-mixing.',
  methodologyHighlights: [
    'Adapted XLM-RoBERTa-Large using Selective Layer Freezing (SLF) to optimize the 560M-parameter transformer for practical deployment on commodity hardware.',
    'Evaluated on the Marathi sentiment benchmark (MahaSent dataset), achieving a reported validation accuracy of 84.80% (±0.18) in the published study.',
    'Conducted qualitative ablation and error analysis examining sarcasm, double negations, and English-Marathi linguistic code-mixing in digital discourse.',
  ],
  keywords: [
    'Mental Health Detection',
    'Multilingual NLP',
    'XLM-RoBERTa',
    'Selective Layer Freezing (SLF)',
    'Marathi / Low-Resource Languages',
    'Social Media Analytics',
  ],
};
