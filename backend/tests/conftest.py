"""Shared test fixtures compatible with both pytest and unittest."""
import os
import tempfile
from pathlib import Path
from fastapi.testclient import TestClient

from app.core.rate_limit import rate_limiter
from app.db.session import db_manager
from app.main import create_app


def create_isolated_test_client(max_requests: int = 5):
    """Create an isolated TestClient backed by a temporary SQLite file."""
    tmp_dir = tempfile.mkdtemp(prefix="portfolio_test_")
    db_file = Path(tmp_dir) / "test_portfolio.db"
    os.environ["SQLITE_DB_PATH"] = str(db_file)
    os.environ["RATE_LIMIT_MAX_REQUESTS"] = str(max_requests)
    os.environ["RATE_LIMIT_WINDOW_SECONDS"] = "600"
    os.environ["CORS_ORIGINS"] = "http://localhost:5173,https://ujjwal-ai-portfolio.vercel.app"

    rate_limiter.reset()
    db_manager.init_db()
    test_app = create_app()
    client = TestClient(test_app)
    return client, db_file
