"""Database model definition for stored contact messages.

Supports SQLAlchemy 2.0+ ORM natively when installed, and provides a lightweight
dataclass representation with identical schema for environments using stdlib sqlite3.
"""
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Optional

try:
    from sqlalchemy import Column, DateTime, Integer, String, Text
    from sqlalchemy.orm import declarative_base

    SQLALCHEMY_AVAILABLE = True
    Base = declarative_base()

    class ContactMessage(Base):  # type: ignore[valid-type,misc]
        """SQLAlchemy model representing a validated contact submission."""

        __tablename__ = "contact_messages"

        id = Column(Integer, primary_key=True, index=True, autoincrement=True)
        name = Column(String(100), nullable=False)
        email = Column(String(254), nullable=False, index=True)
        subject = Column(String(150), nullable=True)
        message = Column(Text, nullable=False)
        client_hash = Column(String(64), nullable=True)
        created_at = Column(
            DateTime(timezone=True),
            nullable=False,
            default=lambda: datetime.now(timezone.utc),
        )

except ImportError:
    SQLALCHEMY_AVAILABLE = False
    Base = None

    @dataclass
    class ContactMessage:  # type: ignore[no-redef]
        """Dataclass model representing a validated contact submission."""

        name: str
        email: str
        message: str
        subject: Optional[str] = None
        client_hash: Optional[str] = None
        id: Optional[int] = None
        created_at: Optional[datetime] = None
