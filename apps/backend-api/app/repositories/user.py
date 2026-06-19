from typing import Optional
from sqlalchemy.orm import Session
from app.repositories.base import BaseRepository
from app.models.admin import AdminUser


class UserRepository(BaseRepository[AdminUser]):
    def __init__(self, db: Session):
        super().__init__(AdminUser, db)

    def get_by_email(self, email: str) -> Optional[AdminUser]:
        return (
            self.db.query(AdminUser)
            .filter(AdminUser.email == email, AdminUser.is_active.is_(True))
            .first()
        )
