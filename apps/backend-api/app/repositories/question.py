from typing import Optional, List
from sqlalchemy.orm import Session
from app.repositories.base import BaseRepository
from app.models.core import QuestionSubmission, AIStatusEnum


class QuestionRepository(BaseRepository[QuestionSubmission]):
    def __init__(self, db: Session):
        super().__init__(QuestionSubmission, db)

    def get_active(self, skip: int = 0, limit: int = 20) -> List[QuestionSubmission]:
        return (
            self.db.query(QuestionSubmission)
            .filter(QuestionSubmission.is_deleted.is_(False))
            .order_by(QuestionSubmission.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    def count_active(self) -> int:
        return self.db.query(QuestionSubmission).filter(QuestionSubmission.is_deleted.is_(False)).count()

    def filter_by(self, district_id=None, language=None, status=None, skip=0, limit=20):
        q = self.db.query(QuestionSubmission).filter(QuestionSubmission.is_deleted.is_(False))
        if district_id:
            q = q.filter(QuestionSubmission.district_id == district_id)
        if language:
            q = q.filter(QuestionSubmission.language == language)
        if status:
            q = q.filter(QuestionSubmission.ai_processing_status == status)
        return q.order_by(QuestionSubmission.created_at.desc()).offset(skip).limit(limit).all()

    def count_by_status(self, status: AIStatusEnum) -> int:
        return (
            self.db.query(QuestionSubmission)
            .filter(QuestionSubmission.ai_processing_status == status, QuestionSubmission.is_deleted.is_(False))
            .count()
        )
