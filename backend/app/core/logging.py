"""Structured logging setup with privacy protection (no raw PII or message dumps)."""
import json
import logging
import sys
from datetime import datetime, timezone
from typing import Any, Dict


class StructuredFormatter(logging.Formatter):
    """Formats log records as single-line structured JSON for production observability."""

    def format(self, record: logging.LogRecord) -> str:
        payload: Dict[str, Any] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        for extra_key in ("event", "status_code", "client_hash", "message_id", "path"):
            if hasattr(record, extra_key):
                payload[extra_key] = getattr(record, extra_key)
        if record.exc_info:
            payload["exception"] = "Internal exception captured (redacted from public response)"
        return json.dumps(payload)


def configure_logging() -> logging.Logger:
    """Initialize application-wide structured logger."""
    logger = logging.getLogger("portfolio_api")
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(StructuredFormatter())
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
        logger.propagate = False
    return logger


logger = configure_logging()
