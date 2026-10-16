"""Business logic for validating, spam-filtering, and persisting contact submissions."""
from datetime import datetime, timezone
from fastapi import HTTPException, status

from app.core.logging import logger
from app.db.session import DatabaseManager
from app.schemas.contact import ContactSubmissionRequest, ContactSubmissionResponse
from app.services.email_service import send_optional_notification


def process_contact_submission(
    payload: ContactSubmissionRequest,
    client_hash: str,
    db: DatabaseManager,
) -> ContactSubmissionResponse:
    """Validate honeypot, persist message to SQLite, and trigger optional notification."""
    if payload.website and payload.website.strip():
        logger.warning(
            "Honeypot field triggered on contact submission",
            extra={"event": "contact_honeypot_blocked", "client_hash": client_hash},
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Spam check failed. Please leave the hidden website field empty.",
        )

    record = db.save_contact_message(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        client_hash=client_hash,
    )

    ref_id = int(record.id or 1)
    created_ts = record.created_at or datetime.now(timezone.utc)

    logger.info(
        "Contact submission stored",
        extra={
            "event": "contact_stored",
            "message_id": ref_id,
            "client_hash": client_hash,
        },
    )

    # Best-effort optional SMTP notification (never blocks or fails the request)
    send_optional_notification(
        sender_name=payload.name,
        sender_email=payload.email,
        subject=payload.subject,
        message_body=payload.message,
        reference_id=ref_id,
    )

    return ContactSubmissionResponse(
        status="success",
        message="Thank you for reaching out! Your message has been received and Ujjwal will respond soon.",
        reference_id=ref_id,
        timestamp=created_ts,
    )
