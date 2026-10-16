"""Database session and persistence management.

Uses SQLAlchemy Engine & SessionLocal when SQLAlchemy is installed, and falls back
transparently to Python's built-in sqlite3 module with the exact same table DDL
so the application works cleanly in any environment.
"""
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Generator, Optional

from app.core.config import get_settings
from app.models.contact import ContactMessage, SQLALCHEMY_AVAILABLE, Base

if SQLALCHEMY_AVAILABLE:
    from sqlalchemy import create_engine, text
    from sqlalchemy.orm import sessionmaker


CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL,
    subject VARCHAR(150),
    message TEXT NOT NULL,
    client_hash VARCHAR(64),
    created_at TIMESTAMP NOT NULL
);
"""


def _resolve_sqlite_file_path() -> Path:
    """Resolve and create parent directory for the configured SQLite database file."""
    cfg = get_settings()
    db_path = Path(cfg.SQLITE_DB_PATH).resolve()
    db_path.parent.mkdir(parents=True, exist_ok=True)
    return db_path


class DatabaseManager:
    """Unified persistence manager supporting SQLAlchemy (PostgreSQL/SQLite) & sqlite3."""

    def __init__(self) -> None:
        self._engine = None
        self._session_factory = None
        self._active_url: Optional[str] = None

    def _ensure_sqlalchemy_engine(self) -> None:
        cfg = get_settings()
        target_url = cfg.effective_database_url
        if self._engine is None or self._active_url != target_url:
            connect_args = (
                {"check_same_thread": False} if target_url.startswith("sqlite") else {}
            )
            self._engine = create_engine(
                target_url,
                connect_args=connect_args,
                pool_pre_ping=True,
            )
            self._session_factory = sessionmaker(
                autocommit=False, autoflush=False, bind=self._engine
            )
            self._active_url = target_url

    def init_db(self) -> None:
        """Create required database directory and tables idempotently."""
        if SQLALCHEMY_AVAILABLE:
            self._ensure_sqlalchemy_engine()
            Base.metadata.create_all(bind=self._engine)
        else:
            db_file = _resolve_sqlite_file_path()
            with sqlite3.connect(str(db_file)) as conn:
                conn.execute(CREATE_TABLE_SQL)
                conn.commit()

    def check_health(self) -> bool:
        """Execute a lightweight query to verify database connectivity."""
        try:
            if SQLALCHEMY_AVAILABLE:
                self._ensure_sqlalchemy_engine()
                with self._engine.connect() as conn:
                    conn.execute(text("SELECT 1"))
                return True
            else:
                db_file = _resolve_sqlite_file_path()
                with sqlite3.connect(str(db_file)) as conn:
                    conn.execute("SELECT 1")
                return True
        except Exception:
            return False

    def save_contact_message(
        self,
        name: str,
        email: str,
        message: str,
        subject: Optional[str] = None,
        client_hash: Optional[str] = None,
    ) -> ContactMessage:
        """Persist a validated contact message and return the saved record."""
        now = datetime.now(timezone.utc)
        if SQLALCHEMY_AVAILABLE:
            self._ensure_sqlalchemy_engine()
            Base.metadata.create_all(bind=self._engine)
            session = self._session_factory()
            try:
                record = ContactMessage(
                    name=name,
                    email=email,
                    subject=subject,
                    message=message,
                    client_hash=client_hash,
                    created_at=now,
                )
                session.add(record)
                session.commit()
                session.refresh(record)
                return record
            except Exception:
                session.rollback()
                raise
            finally:
                session.close()
        else:
            db_file = _resolve_sqlite_file_path()
            with sqlite3.connect(str(db_file)) as conn:
                conn.execute(CREATE_TABLE_SQL)
                cursor = conn.execute(
                    """
                    INSERT INTO contact_messages (name, email, subject, message, client_hash, created_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (name, email, subject, message, client_hash, now.isoformat()),
                )
                conn.commit()
                row_id = int(cursor.lastrowid or 1)
            return ContactMessage(
                id=row_id,
                name=name,
                email=email,
                subject=subject,
                message=message,
                client_hash=client_hash,
                created_at=now,
            )

    def count_messages(self) -> int:
        """Return total stored message count (internal/test verification only)."""
        if SQLALCHEMY_AVAILABLE:
            self._ensure_sqlalchemy_engine()
            with self._engine.connect() as conn:
                result = conn.execute(text("SELECT COUNT(*) FROM contact_messages"))
                return int(result.scalar() or 0)
        else:
            db_file = _resolve_sqlite_file_path()
            with sqlite3.connect(str(db_file)) as conn:
                conn.execute(CREATE_TABLE_SQL)
                cursor = conn.execute("SELECT COUNT(*) FROM contact_messages")
                row = cursor.fetchone()
                return int(row[0]) if row else 0


db_manager = DatabaseManager()


def get_db() -> Generator[DatabaseManager, None, None]:
    """FastAPI dependency providing the database manager."""
    yield db_manager
