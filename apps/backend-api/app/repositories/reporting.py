from sqlalchemy.orm import Session
from app.repositories.base import BaseRepository
from app.models.reporting import GeneratedReport
from app.models.audit import AuditLog


class ReportRepository(BaseRepository[GeneratedReport]):
    def __init__(self, db: Session):
        super().__init__(GeneratedReport, db)


class AuditRepository(BaseRepository[AuditLog]):
    def __init__(self, db: Session):
        super().__init__(AuditLog, db)

    def create_log(
        self,
        user_id: str,
        user_email: str,
        action: str,
        resource: str,
        resource_id: str = None,
        ip_hash: str = None,
        request_id: str = None,
    ) -> AuditLog:
        log = AuditLog(
            user_id=user_id,
            user_email=user_email,
            action=action,
            resource=resource,
            resource_id=resource_id,
            ip_hash=ip_hash,
            request_id=request_id,
        )
        return self.create(log)
