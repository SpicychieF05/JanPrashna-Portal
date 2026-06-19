import enum
from sqlalchemy import Column, String, Boolean, Text, ForeignKey, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class RoleEnum(str, enum.Enum):
    SUPER_ADMIN = "super_admin"
    DEPARTMENT_ADMIN = "department_admin"
    VIEWER = "viewer"
    AUDITOR = "auditor"


class Permission(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "permissions"
    permission_name = Column(String(100), unique=True, nullable=False)
    description = Column(String(255), nullable=True)


class Role(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "roles"
    role_name = Column(SQLEnum(RoleEnum), unique=True, nullable=False)
    description = Column(String(255), nullable=True)

    users = relationship("AdminUser", back_populates="role", lazy="dynamic")


class AdminUser(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "admin_users"
    name = Column(String(150), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(Text, nullable=False)
    role_id = Column(UUID(as_uuid=True), ForeignKey("roles.id"), nullable=True)
    department_id = Column(UUID(as_uuid=True), ForeignKey("master_departments.id"), nullable=True)
    last_login = Column(String, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)

    role = relationship("Role", back_populates="users")
