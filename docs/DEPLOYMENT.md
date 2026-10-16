# Local Setup & Cloud Deployment Guide (`docs/DEPLOYMENT.md`)

## 1. Local Development on Windows (PowerShell)

### Prerequisites
- **Node.js**: v18+ or v20+ LTS (`node -v` and `npm -v`)
- **Python**: v3.10+ or v3.11+ (`python --version`)

### Step 1 — Start the FastAPI Backend (PowerShell)
Open a PowerShell terminal in the project root (`ujjwal-ai-portfolio`):

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

- Health check URL: `http://127.0.0.1:8000/api/health`
- Interactive Swagger docs (development mode): `http://127.0.0.1:8000/api/docs`

### Step 2 — Run Backend Automated Tests (PowerShell)
```powershell
cd backend
.\.venv\Scripts\Activate.ps1
pytest
# Or using Python's built-in unittest runner:
python -m unittest discover -s tests -p "test_*.py" -v
```

### Step 3 — Start the React + Vite Frontend (PowerShell)
Open a second PowerShell terminal in the project root (`ujjwal-ai-portfolio`):

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

- Open `http://localhost:5173` in your browser.
- Test the **Download Resume** button (`/resume.pdf`) and submit a test message in the **Contact** section.

---

## 2. Local Development on macOS / Linux (Bash / Zsh)

```bash
# Terminal 1: FastAPI Backend
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Terminal 2: React Frontend
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## 3. Running with Docker & Docker Compose

From the repository root:

```bash
docker compose up --build -d
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000/api/health`
- **SQLite Persistence**: Managed via the named Docker volume `portfolio_sqlite_data` mounted at `/app/data`.

---

## 4. Production Cloud Deployment

### A. Deploying the Frontend to Vercel
1. Push the repository to GitHub.
2. In Vercel, click **Add New Project** and import `ujjwal-ai-portfolio`.
3. Set the **Root Directory** to `frontend`.
4. Framework Preset: **Vite** (`npm run build`, output directory `dist`).
5. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://<your-render-backend-service>.onrender.com`
6. Deploy. The included `frontend/vercel.json` automatically configures SPA client-side routing for `/projects/*` while preserving `/resume.pdf` and security headers.

### B. Deploying the FastAPI Backend to Render
1. In Render, create a new **Web Service** connected to your GitHub repo (or use the included `render.yaml` Blueprint).
2. Set **Root Directory** to `backend`.
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Configure Environment Variables:
   - `APP_ENV` = `production`
   - `CORS_ORIGINS` = `https://<your-vercel-domain>.vercel.app`
   - `SQLITE_DB_PATH` = `/var/data/portfolio.db` (if using a Render Persistent Disk mounted at `/var/data`)

### C. Important Note on SQLite Durability & Migrating to PostgreSQL
- **Ephemeral Filesystem Caveat**: Cloud hosts on free tiers (such as Render Free Web Services) use ephemeral container filesystems that reset when a service redeploys or sleeps. A local SQLite file will not persist across container restarts unless backed by a mounted Persistent Disk volume.
- **Persistent Disk Option**: On Render Paid tiers or Docker hosts, mount a persistent volume (e.g., `/var/data` or `/app/data`) and set `SQLITE_DB_PATH=/var/data/portfolio.db`.
- **PostgreSQL Upgrade Option**: The backend's `DatabaseManager` (`backend/app/db/session.py`) and `Settings.effective_database_url` (`backend/app/core/config.py`) natively support SQLAlchemy `DATABASE_URL`. To switch to PostgreSQL (e.g., Supabase, Neon, or Render PostgreSQL) without rewriting application routes:
  1. Add `psycopg2-binary>=2.9.9` to `backend/requirements.txt`.
  2. Set `DATABASE_URL=postgresql://user:password@host:5432/dbname` in your backend environment variables.
