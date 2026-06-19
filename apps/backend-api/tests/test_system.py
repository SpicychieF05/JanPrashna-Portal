def test_health(client):
    r = client.get("/system/health")
    assert r.status_code == 200
    assert r.json()["data"]["status"] == "healthy"


def test_version(client):
    r = client.get("/system/version")
    assert r.status_code == 200
    assert "version" in r.json()["data"]


def test_metrics(client):
    r = client.get("/system/metrics")
    assert r.status_code == 200
    assert "uptime_seconds" in r.json()["data"]
