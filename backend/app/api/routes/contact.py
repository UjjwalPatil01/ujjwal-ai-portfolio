"""Public contact form submission route."""
from fastapi import APIRouter, Depends, status

from app.core.rate_limit import enforce_contact_rate_limit
from app.db.session import DatabaseManager, get_db
from app.schemas.contact import ContactSubmissionRequest, ContactSubmissionResponse
from app.services.contact_service import process_contact_submission

router = APIRouter(tags=["Contact"])


@router.post(
    "/api/contact",
    response_model=ContactSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact message",
)
def submit_contact_message(
    payload: ContactSubmissionRequest,
    client_hash: str = Depends(enforce_contact_rate_limit),
    db: DatabaseManager = Depends(get_db),
) -> ContactSubmissionResponse:
    """Validate, rate-limit, and store a contact message in SQLite."""
    return process_contact_submission(payload=payload, client_hash=client_hash, db=db)
