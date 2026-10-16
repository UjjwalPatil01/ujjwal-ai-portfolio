"""Comprehensive backend tests for health, contact validation, rate limiting, CORS, and security."""
import unittest
from tests.conftest import create_isolated_test_client
from app.db.session import db_manager


def test_health_endpoint_returns_healthy():
    client, _ = create_isolated_test_client()
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"
    assert "timestamp" in data
    assert response.headers.get("x-content-type-options") == "nosniff"


def test_valid_contact_submission_persists_to_sqlite():
    client, db_file = create_isolated_test_client()
    payload = {
        "name": "Priya Sharma",
        "email": "priya.sharma@example.com",
        "subject": "AI/ML Engineer Role Inquiry",
        "message": "Hello Ujjwal, we reviewed your DocuChat and MoodMate repositories and would love to schedule an interview.",
        "website": "",
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 201
    body = response.json()
    assert body["status"] == "success"
    assert body["reference_id"] >= 1
    assert db_file.exists()
    assert db_manager.count_messages() == 1


def test_contact_rejects_invalid_and_oversized_inputs():
    client, _ = create_isolated_test_client()

    # Too short name and invalid email
    bad_payload = {
        "name": "A",
        "email": "not-an-email",
        "message": "Short",
    }
    res1 = client.post("/api/contact", json=bad_payload)
    assert res1.status_code == 422
    assert "detail" in res1.json()

    # Oversized message (> 2500 chars)
    oversized_payload = {
        "name": "Recruiter Name",
        "email": "recruiter@company.com",
        "message": "A" * 2600,
    }
    res2 = client.post("/api/contact", json=oversized_payload)
    assert res2.status_code == 422

    # Link spam flooding (> 5 URLs)
    spam_links_payload = {
        "name": "Spam Bot",
        "email": "bot@spam.org",
        "message": "Check https://a.com https://b.com https://c.com https://d.com https://e.com https://f.com now!",
    }
    res3 = client.post("/api/contact", json=spam_links_payload)
    assert res3.status_code == 422


def test_honeypot_field_blocks_automated_spam():
    client, _ = create_isolated_test_client()
    honeypot_payload = {
        "name": "Automated Bot",
        "email": "bot@example.com",
        "message": "This message filled in the hidden website honeypot field.",
        "website": "https://malicious-bot-site.example",
    }
    res = client.post("/api/contact", json=honeypot_payload)
    assert res.status_code == 400
    assert db_manager.count_messages() == 0


def test_rate_limiting_blocks_excessive_submissions():
    client, _ = create_isolated_test_client(max_requests=3)
    valid_payload = {
        "name": "Test User",
        "email": "user@example.com",
        "message": "Testing rate limit behavior across sequential submissions.",
    }
    for _ in range(3):
        res = client.post("/api/contact", json=valid_payload)
        assert res.status_code == 201

    # 4th request within window must return 429 Too Many Requests
    blocked = client.post("/api/contact", json=valid_payload)
    assert blocked.status_code == 429
    assert "retry-after" in {k.lower() for k in blocked.headers.keys()}


def test_no_public_get_messages_endpoint_exposed():
    client, _ = create_isolated_test_client()
    # GET on /api/contact must be 405 Method Not Allowed (never expose stored messages publicly)
    res = client.get("/api/contact")
    assert res.status_code == 405


def test_cors_allows_configured_origin_and_blocks_unlisted_origin():
    client, _ = create_isolated_test_client()
    allowed_res = client.options(
        "/api/contact",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert allowed_res.status_code == 200
    assert allowed_res.headers.get("access-control-allow-origin") == "http://localhost:5173"

    disallowed_res = client.options(
        "/api/contact",
        headers={
            "Origin": "https://evil.example.com",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert disallowed_res.headers.get("access-control-allow-origin") is None


class TestPortfolioBackendSuite(unittest.TestCase):
    """Unittest test case class exposing all 7 checks individually for unittest & pytest."""

    def test_01_health_endpoint(self):
        test_health_endpoint_returns_healthy()

    def test_02_valid_contact_submission_persists(self):
        test_valid_contact_submission_persists_to_sqlite()

    def test_03_invalid_and_oversized_inputs_rejected(self):
        test_contact_rejects_invalid_and_oversized_inputs()

    def test_04_honeypot_blocks_spam(self):
        test_honeypot_field_blocks_automated_spam()

    def test_05_rate_limiting_enforced(self):
        test_rate_limiting_blocks_excessive_submissions()

    def test_06_no_public_message_dump_endpoint(self):
        test_no_public_get_messages_endpoint_exposed()

    def test_07_cors_origin_policy(self):
        test_cors_allows_configured_origin_and_blocks_unlisted_origin()


if __name__ == "__main__":
    unittest.main()
