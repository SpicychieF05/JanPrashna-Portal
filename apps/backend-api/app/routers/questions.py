from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import Any
from pydantic import BaseModel
from datetime import datetime

from app.db.database import get_db
from app.models.core import QuestionSubmission, AIStatusEnum
from app.auth.deps import get_current_active_admin

router = APIRouter()

class QuestionSubmit(BaseModel):
    district_id: str
    rural_urban: str
    age: int | None = None
    occupation: str | None = None
    gender: str | None = None
    language: str
    original_question: str
    police_station_id: str | None = None

@router.post("/public/questions")
def submit_question(data: QuestionSubmit, request: Request, db: Session = Depends(get_db)) -> Any:
    # 5. Question APIs - POST
    new_question = QuestionSubmission(
        district_id=data.district_id,
        rural_urban=data.rural_urban,
        age=data.age,
        occupation=data.occupation,
        gender=data.gender,
        language=data.language,
        original_question=data.original_question,
        police_station_id=data.police_station_id,
        ai_processing_status=AIStatusEnum.UNPROCESSED,
        ip_hash=request.client.host if request.client else None
    )
    db.add(new_question)
    db.commit()
    db.refresh(new_question)
    return {"success": True, "data": {"id": str(new_question.id)}}

@router.get("/admin/questions")
def get_questions(db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)) -> Any:
    # Basic list returning stub
    return {"success": True, "data": []}

@router.get("/admin/questions/{id}")
def get_question_details(id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)) -> Any:
    return {"success": True, "data": {}}

@router.delete("/admin/questions/{id}")
def delete_question(id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)) -> Any:
    return {"success": True, "message": "Deleted"}
