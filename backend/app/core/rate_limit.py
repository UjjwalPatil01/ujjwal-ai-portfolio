"""Sliding-window in-memory rate limiter for public endpoints."""
import hashlib
import threading
import time
from collections import defaultdict, deque
from typing import Deque, Dict, Tuple
from fastapi import HTTPException, Request, status

from app.core.config import get_settings


class SlidingWindowRateLimiter:
    """Thread-safe sliding window rate limiter keyed by hashed client IP."""

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._requests: Dict[str, Deque[float]] = defaultdict(deque)

    @staticmethod
    def hash_client_ip(ip_address: str) -> str:
        """Hash client IP so raw IP addresses are never stored in plain text."""
        return hashlib.sha256(ip_address.encode("utf-8")).hexdigest()[:16]

    def get_client_identifier(self, request: Request) -> str:
        """Extract client IP respecting standard proxy headers."""
        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            client_ip = forwarded_for.split(",")[0].strip()
        else:
            client_ip = request.client.host if request.client else "unknown"
        return self.hash_client_ip(client_ip)

    def check_rate_limit(self, client_hash: str) -> Tuple[bool, int]:
        """
        Check whether client_hash is within configured rate limits.
        Returns (allowed, retry_after_seconds).
        """
        cfg = get_settings()
        max_requests = cfg.RATE_LIMIT_MAX_REQUESTS
        window_seconds = cfg.RATE_LIMIT_WINDOW_SECONDS
        now = time.monotonic()

        with self._lock:
            history = self._requests[client_hash]
            cutoff = now - window_seconds
            while history and history[0] <= cutoff:
                history.popleft()

            if len(history) >= max_requests:
                retry_after = max(1, int(window_seconds - (now - history[0])))
                return False, retry_after

            history.append(now)
            return True, 0

    def reset(self) -> None:
        """Clear all tracked rate-limit buckets (used in automated tests)."""
        with self._lock:
            self._requests.clear()


rate_limiter = SlidingWindowRateLimiter()


def enforce_contact_rate_limit(request: Request) -> str:
    """FastAPI dependency enforcing rate limits on the public contact endpoint."""
    client_hash = rate_limiter.get_client_identifier(request)
    allowed, retry_after = rate_limiter.check_rate_limit(client_hash)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=(
                f"Rate limit exceeded. Please wait {retry_after} seconds before "
                "sending another message, or email ujjwalpatil163@gmail.com directly."
            ),
            headers={"Retry-After": str(retry_after)},
        )
    return client_hash
