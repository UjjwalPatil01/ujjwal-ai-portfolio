from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes.contact import router as contact_router
from app.api.routes.health import router as health_router
from app.core.config import get_settings
from app.core.logging import logger
from app.db.session import db_manager

# Starlette 0.40+ deprecation compatibility (RFC 9110)
UNPROCESSABLE_STATUS = getattr(status, "HTTP_422_UNPROCESSABLE_CONTENT", 422)


def create_app() -> FastAPI:
    """Application factory creating and configuring the FastAPI instance."""
    cfg = get_settings()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        db_manager.init_db()
        logger.info("Database initialized and portfolio API ready", extra={"event": "startup"})
        yield

    application = FastAPI(
        title=cfg.APP_NAME,
        version=cfg.APP_VERSION,
        description=(
            "Backend API for Ujjwal Pradip Patil's AI/ML & Python Backend Portfolio. "
            "Provides health monitoring and rate-limited contact message persistence."
        ),
        docs_url="/api/docs" if cfg.DEBUG or cfg.APP_ENV == "development" else None,
        redoc_url=None,
        lifespan=lifespan,
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=cfg.CORS_ORIGINS,
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Accept"],
        max_age=600,
    )

    @application.middleware("http")
    async def add_security_headers(request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        return response

    @application.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        errors = []
        for err in exc.errors():
            loc = ".".join(str(part) for part in err.get("loc", []) if part != "body")
            msg = err.get("msg", "Invalid value")
            errors.append(f"{loc}: {msg}" if loc else msg)
        return JSONResponse(
            status_code=UNPROCESSABLE_STATUS,
            content={
                "status": "error",
                "detail": "; ".join(errors) if errors else "Validation failed.",
            },
        )

    @application.exception_handler(Exception)
    async def unhandled_exception_handler(
        request: Request, exc: Exception
    ) -> JSONResponse:
        logger.error(
            "Unhandled server exception",
            exc_info=True,
            extra={"event": "unhandled_error", "path": request.url.path},
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": "error",
                "detail": "An unexpected server error occurred. Please try again later.",
            },
        )

    application.include_router(health_router)
    application.include_router(contact_router)

    return application


app = create_app()
