"""Optional SMTP notification helper.

Email notifications are strictly optional and disabled by default so the portfolio
runs out-of-the-box without SMTP credentials.
"""
import smtplib
from email.message import EmailMessage
from typing import Optional

from app.core.config import get_settings
from app.core.logging import logger


def send_optional_notification(
    sender_name: str,
    sender_email: str,
    subject: Optional[str],
    message_body: str,
    reference_id: int,
) -> bool:
    """Send an optional email notification if SMTP_ENABLED is true and configured."""
    cfg = get_settings()
    if not cfg.SMTP_ENABLED or not cfg.SMTP_USERNAME or not cfg.SMTP_PASSWORD:
        return False

    try:
        msg = EmailMessage()
        msg["Subject"] = f"[Portfolio Contact #{reference_id}] {subject or 'New Inquiry'}"
        msg["From"] = cfg.SMTP_FROM_EMAIL or cfg.SMTP_USERNAME
        msg["To"] = cfg.SMTP_TO_EMAIL
        msg["Reply-To"] = sender_email
        msg.set_content(
            f"New portfolio inquiry received (#{reference_id})\n\n"
            f"From: {sender_name} <{sender_email}>\n"
            f"Subject: {subject or 'Portfolio Inquiry'}\n\n"
            f"Message:\n{message_body}\n"
        )

        with smtplib.SMTP(cfg.SMTP_HOST, cfg.SMTP_PORT, timeout=8) as server:
            server.starttls()
            server.login(cfg.SMTP_USERNAME, cfg.SMTP_PASSWORD)
            server.send_message(msg)

        logger.info(
            "Optional SMTP notification sent",
            extra={"event": "smtp_sent", "message_id": reference_id},
        )
        return True
    except Exception:
        logger.warning(
            "Optional SMTP notification failed; message remains safely stored in SQLite",
            extra={"event": "smtp_failed", "message_id": reference_id},
        )
        return False
