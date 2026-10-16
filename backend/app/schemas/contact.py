"""Pydantic request and response schemas for health and contact endpoints.

Compatible with both Pydantic v1 and Pydantic v2.
"""
import re
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, validator

EMAIL_REGEX = re.compile(
    r"^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?"
    r"(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$"
)
CONTROL_CHARS_REGEX = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")


class HealthResponse(BaseModel):
    """Schema returned by GET /api/health."""

    status: str = Field(..., description="Overall service status")
    service: str = Field(..., description="Service identifier")
    version: str = Field(..., description="API version")
    database: str = Field(..., description="Database connectivity state")
    timestamp: str = Field(..., description="UTC ISO-8601 timestamp")


class ContactSubmissionRequest(BaseModel):
    """Schema validating public contact form requests on POST /api/contact."""

    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Sender full name (2 to 100 characters)",
    )
    email: str = Field(
        ...,
        min_length=5,
        max_length=254,
        description="Sender email address",
    )
    subject: Optional[str] = Field(
        default="Portfolio Inquiry",
        max_length=150,
        description="Optional inquiry subject line",
    )
    message: str = Field(
        ...,
        min_length=10,
        max_length=2500,
        description="Message content (10 to 2500 characters)",
    )
    website: Optional[str] = Field(
        default="",
        max_length=250,
        description="Honeypot anti-bot field (must remain empty)",
    )

    @validator("name")
    def validate_name(cls, value: str) -> str:
        cleaned = CONTROL_CHARS_REGEX.sub("", value).strip()
        if len(cleaned) < 2:
            raise ValueError("Name must contain at least 2 non-whitespace characters.")
        if len(cleaned) > 100:
            raise ValueError("Name must not exceed 100 characters.")
        return cleaned

    @validator("email")
    def validate_email(cls, value: str) -> str:
        cleaned = CONTROL_CHARS_REGEX.sub("", value).strip().lower()
        if not EMAIL_REGEX.match(cleaned):
            raise ValueError("Please provide a valid email address.")
        return cleaned

    @validator("subject", always=True)
    def validate_subject(cls, value: Optional[str]) -> str:
        if not value:
            return "Portfolio Inquiry"
        cleaned = CONTROL_CHARS_REGEX.sub("", value).strip()
        if not cleaned:
            return "Portfolio Inquiry"
        if len(cleaned) > 150:
            raise ValueError("Subject must not exceed 150 characters.")
        return cleaned

    @validator("message")
    def validate_message(cls, value: str) -> str:
        cleaned = CONTROL_CHARS_REGEX.sub("", value).strip()
        if len(cleaned) < 10:
            raise ValueError("Message must be at least 10 characters long.")
        if len(cleaned) > 2500:
            raise ValueError("Message must not exceed 2500 characters.")
        # Basic anti-spam check: block excessive URL flooding
        url_count = len(re.findall(r"https?://", cleaned, flags=re.IGNORECASE))
        if url_count > 5:
            raise ValueError("Message contains too many external links.")
        return cleaned


class ContactSubmissionResponse(BaseModel):
    """Schema returned upon successful contact message submission."""

    status: str = Field(default="success", description="Submission status")
    message: str = Field(..., description="Human-readable confirmation message")
    reference_id: int = Field(..., description="Stored submission reference ID")
    timestamp: datetime = Field(..., description="UTC timestamp of submission")
