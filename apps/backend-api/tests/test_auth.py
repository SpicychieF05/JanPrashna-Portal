def test_login_invalid_credentials(client):
    r = client.post("/api/v1/auth/login", data={"username": "nonexistent@wb.gov.in", "password": "wrong"})
    assert r.status_code == 401
    assert r.json()["success"] is False


def test_me_unauthenticated(client):
    r = client.get("/api/v1/auth/me")
    assert r.status_code == 401


def test_refresh_invalid_token(client):
    r = client.post("/api/v1/auth/refresh", json={"refresh_token": "bad.token.here"})
    assert r.status_code == 401
