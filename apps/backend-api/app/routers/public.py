from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from typing import Any

from app.db.database import get_db
from app.schemas.requests import QuestionSubmitRequest
from app.schemas.responses import ApiResponse
from app.models.master import District
from app.models.core import QuestionSubmission, AIStatusEnum

router = APIRouter()


@router.get("/districts")
def get_districts(db: Session = Depends(get_db)) -> Any:
    districts = db.query(District).filter(District.is_active.is_(True)).order_by(District.district_name).all()
    return {
        "success": True,
        "data": [{"id": str(d.id), "district_name": d.district_name, "district_code": d.district_code} for d in districts],
    }


@router.post("/questions", status_code=201)
def submit_question(payload: QuestionSubmitRequest, request: Request, db: Session = Depends(get_db)) -> Any:
    ip = request.client.host if request.client else None
    import hashlib
    ip_hash = hashlib.sha256(ip.encode()).hexdigest() if ip else None

    question = QuestionSubmission(
        district_id=payload.district_id,
        subdivision_id=payload.subdivision_id,
        block_id=payload.block_id,
        gram_panchayat_id=payload.gram_panchayat_id,
        municipality_id=payload.municipality_id,
        ward_id=payload.ward_id,
        police_station_id=payload.police_station_id,
        pincode_id=payload.pincode_id,
        rural_urban=payload.rural_urban,
        age=payload.age,
        occupation=payload.occupation,
        gender=payload.gender,
        language=payload.language,
        original_question=payload.original_question,
        ai_processing_status=AIStatusEnum.UNPROCESSED,
        submission_source="web",
        ip_hash=ip_hash,
    )
    db.add(question)
    db.commit()
    db.refresh(question)

    return {"success": True, "data": {"id": str(question.id), "message": "Question submitted successfully"}}
