"""Environment-based configuration for the FastAPI backend."""
import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application settings loaded from environment variables with safe defaults."""

    def __init__(self) -> None:
        self.APP_NAME: str = os.getenv("APP_NAME", "Ujjwal Patil AI/ML Portfolio API")
        self.APP_ENV: str = os.getenv("APP_ENV", "development")
        self.APP_VERSION: str = os.getenv("APP_VERSION", "1.0.0")
        self.DEBUG: bool = os.getenv("DEBUG", "false").lower() in ("true", "1", "yes")

        self.HOST: str = os.getenv("HOST", "0.0.0.0")
        self.PORT: int = int(os.getenv("PORT", "8000"))

        default_db_path = Path(__file__).resolve().parents[2] / "data" / "portfolio.db"
        self.SQLITE_DB_PATH: str = os.getenv("SQLITE_DB_PATH", str(default_db_path))
        self.DATABASE_URL: str = os.getenv("DATABASE_URL", "").strip()

        raw_origins = os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://localhost:3000",
        )
        self.CORS_ORIGINS: List[str] = [
            origin.strip() for origin in raw_origins.split(",") if origin.strip()
        ]

        self.RATE_LIMIT_MAX_REQUESTS: int = int(os.getenv("RATE_LIMIT_MAX_REQUESTS", "5"))
        self.RATE_LIMIT_WINDOW_SECONDS: int = int(
            os.getenv("RATE_LIMIT_WINDOW_SECONDS", "600")
        )

        # Optional SMTP settings
        self.SMTP_ENABLED: bool = os.getenv("SMTP_ENABLED", "false").lower() in (
            "true",
            "1",
            "yes",
        )
        self.SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
        self.SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
        self.SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "")
        self.SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
        self.SMTP_FROM_EMAIL: str = os.getenv("SMTP_FROM_EMAIL", "")
        self.SMTP_TO_EMAIL: str = os.getenv("SMTP_TO_EMAIL", "ujjwalpatil163@gmail.com")

    @property
    def effective_database_url(self) -> str:
        """Return explicit DATABASE_URL or construct SQLite URL from SQLITE_DB_PATH."""
        if self.DATABASE_URL:
            if self.DATABASE_URL.startswith("postgres://"):
                return self.DATABASE_URL.replace("postgres://", "postgresql://", 1)
            return self.DATABASE_URL
        db_path = Path(self.SQLITE_DB_PATH).resolve()
        db_path.parent.mkdir(parents=True, exist_ok=True)
        return f"sqlite:///{db_path}"


def get_settings() -> Settings:
    """Create a fresh settings instance respecting current environment variables."""
    return Settings()


settings = get_settings()
