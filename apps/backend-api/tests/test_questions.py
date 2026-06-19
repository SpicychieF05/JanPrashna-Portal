def test_submit_question_invalid_payload(client):
    r = client.post("/api/v1/public/questions", json={})
    assert r.status_code == 422
    assert r.json()["success"] is False


def test_submit_question_too_short(client):
    import uuid
    r = client.post("/api/v1/public/questions", json={
        "district_id": str(uuid.uuid4()),
        "rural_urban": "rural",
        "language": "bengali",
        "original_question": "Hi",
    })
    assert r.status_code == 422


def test_get_districts_empty(client):
    r = client.get("/api/v1/public/districts")
    assert r.status_code == 200
    assert r.json()["success"] is True
    assert isinstance(r.json()["data"], list)


def test_list_questions_unauthenticated(client):
    r = client.get("/api/v1/admin/questions")
    assert r.status_code == 401
