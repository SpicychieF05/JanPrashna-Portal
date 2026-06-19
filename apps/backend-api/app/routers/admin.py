from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.db.database import get_db
from app.auth.deps import require_admin, require_any
from app.repositories.question import QuestionRepository
from app.models.core import AIStatusEnum

router = APIRouter()


@router.get("/questions")
def list_questions(
    db: Session = Depends(get_db),
    current_user=Depends(require_any),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    district_id: Optional[str] = None,
    language: Optional[str] = None,
    status: Optional[str] = None,
) -> Any:
    repo = QuestionRepository(db)
    skip = (page - 1) * page_size
    items = repo.filter_by(district_id=district_id, language=language, status=status, skip=skip, limit=page_size)
    total = repo.count_active()
    return {
        "success": True,
        "data": [
            {
                "id": str(q.id),
                "district_id": str(q.district_id),
                "language": q.language,
                "rural_urban": q.rural_urban,
                "original_question": q.original_question,
                "translated_question": q.translated_question,
                "ai_processing_status": q.ai_processing_status,
                "created_at": q.created_at.isoformat(),
            }
            for q in items
        ],
        "meta": {
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": -(-total // page_size),
        },
    }


@router.get("/questions/{question_id}")
def get_question(question_id: str, db: Session = Depends(get_db), current_user=Depends(require_any)) -> Any:
    repo = QuestionRepository(db)
    question = repo.get(question_id)
    if not question or question.is_deleted:
        raise HTTPException(status_code=404, detail="Question not found")
    return {
        "success": True,
        "data": {
            "id": str(question.id),
            "district_id": str(question.district_id),
            "rural_urban": question.rural_urban,
            "age": question.age,
            "occupation": question.occupation,
            "gender": question.gender,
            "language": question.language,
            "original_question": question.original_question,
            "translated_question": question.translated_question,
            "normalized_question": question.normalized_question,
            "ai_processing_status": question.ai_processing_status,
            "created_at": question.created_at.isoformat(),
        },
    }


@router.delete("/questions/{question_id}", status_code=200)
def delete_question(question_id: str, db: Session = Depends(get_db), current_user=Depends(require_admin)) -> Any:
    repo = QuestionRepository(db)
    question = repo.get(question_id)
    if not question or question.is_deleted:
        raise HTTPException(status_code=404, detail="Question not found")
    repo.soft_delete(question)
    return {"success": True, "message": "Question deleted successfully"}


@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db), current_user=Depends(require_any)) -> Any:
    repo = QuestionRepository(db)
    total = repo.count_active()
    processed = repo.count_by_status(AIStatusEnum.COMPLETED)
    processing = repo.count_by_status(AIStatusEnum.PROCESSING)
    unprocessed = repo.count_by_status(AIStatusEnum.UNPROCESSED)
    return {
        "success": True,
        "data": {
            "total_questions": total,
            "processed_questions": processed,
            "processing_queue": processing + unprocessed,
            "active_clusters": 0,
            "reports_generated": 0,
        },
    }


@router.get("/audit-logs")
def get_audit_logs(db: Session = Depends(get_db), current_user=Depends(require_any)) -> Any:
    from app.models.audit import AuditLog
    logs = db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(50).all()
    return {
        "success": True,
        "data": [
            {
                "id": str(l.id),
                "user_email": l.user_email,
                "action": l.action,
                "resource": l.resource,
                "resource_id": l.resource_id,
                "request_id": l.request_id,
                "ip_hash": l.ip_hash,
                "created_at": l.created_at.isoformat(),
            }
            for l in logs
        ],
    }
