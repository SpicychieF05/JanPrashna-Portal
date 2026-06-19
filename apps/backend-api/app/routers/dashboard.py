from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Any

from app.db.database import get_db
from app.auth.deps import get_current_active_admin

router = APIRouter()

@router.get("/dashboard")
def get_dashboard_summary(db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)) -> Any:
    # Epic 4.4 Dashboard APIs
    return {
        "success": True,
        "data": {
            "total_questions": 0,
            "processed_questions": 0,
            "clusters": 0,
            "recent_activity": []
        }
    }
