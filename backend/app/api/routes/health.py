"""Health check route for readiness and backend availability probing."""
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, Response, status

from app.core.config import get_settings
from app.db.session import DatabaseManager, get_db
from app.schemas.contact import HealthResponse

router = APIRouter(tags=["Health"])


@router.get(
    "/api/health",
    response_model=HealthResponse,
    summary="Check API and database health",
)
def health_check(
    response: Response,
    db: DatabaseManager = Depends(get_db),
) -> HealthResponse:
    """Return service status and verify SQLite database connectivity."""
    cfg = get_settings()
    db_ok = db.check_health()
    if not db_ok:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

    return HealthResponse(
        status="healthy" if db_ok else "degraded",
        service=cfg.APP_NAME,
        version=cfg.APP_VERSION,
        database="connected" if db_ok else "unreachable",
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
