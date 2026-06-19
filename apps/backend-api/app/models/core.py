import enum
from sqlalchemy import Column, String, SmallInteger, Text, ForeignKey, Enum as SQLEnum, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin, SoftDeleteMixin


class AreaTypeEnum(str, enum.Enum):
    RURAL = "rural"
    URBAN = "urban"


class GenderEnum(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"
    PREFER_NOT_TO_SAY = "prefer_not_to_say"


class LanguageEnum(str, enum.Enum):
    ENGLISH = "english"
    BENGALI = "bengali"
    MIXED = "mixed"


class AIStatusEnum(str, enum.Enum):
    UNPROCESSED = "unprocessed"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class QuestionSubmission(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "question_submissions"

    district_id = Column(UUID(as_uuid=True), ForeignKey("master_districts.id"), nullable=False)
    subdivision_id = Column(UUID(as_uuid=True), ForeignKey("master_subdivisions.id"), nullable=True)
    block_id = Column(UUID(as_uuid=True), ForeignKey("master_blocks.id"), nullable=True)
    municipality_id = Column(UUID(as_uuid=True), ForeignKey("master_municipalities.id"), nullable=True)
    ward_id = Column(UUID(as_uuid=True), ForeignKey("master_wards.id"), nullable=True)
    gram_panchayat_id = Column(UUID(as_uuid=True), ForeignKey("master_gram_panchayats.id"), nullable=True)
    police_station_id = Column(UUID(as_uuid=True), ForeignKey("master_police_stations.id"), nullable=True)
    pincode_id = Column(UUID(as_uuid=True), ForeignKey("master_pincodes.id"), nullable=True)

    rural_urban = Column(SQLEnum(AreaTypeEnum), nullable=False)
    age = Column(SmallInteger, nullable=True)
    occupation = Column(String(150), nullable=True)
    gender = Column(SQLEnum(GenderEnum), nullable=True)
    language = Column(SQLEnum(LanguageEnum), nullable=False)

    original_question = Column(Text, nullable=False)
    translated_question = Column(Text, nullable=True)
    normalized_question = Column(Text, nullable=True)

    ai_processing_status = Column(SQLEnum(AIStatusEnum), default=AIStatusEnum.UNPROCESSED, nullable=False)
    submission_source = Column(String(50), default="web", nullable=True)
    ip_hash = Column(String(64), nullable=True)
    browser_fingerprint = Column(String(128), nullable=True)

    tags = relationship("QuestionTag", back_populates="question", lazy="dynamic")
    department_mappings = relationship("QuestionDepartmentMapping", back_populates="question", lazy="dynamic")
    scheme_mappings = relationship("QuestionSchemeMapping", back_populates="question", lazy="dynamic")

    __table_args__ = (
        Index("ix_qs_district_created", "district_id", "created_at"),
        Index("ix_qs_language_created", "language", "created_at"),
        Index("ix_qs_ai_status", "ai_processing_status"),
    )


class QuestionTag(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "question_tags"
    question_id = Column(UUID(as_uuid=True), ForeignKey("question_submissions.id"), nullable=False, index=True)
    tag = Column(String(100), nullable=False)
    confidence = Column(String(10), nullable=True)

    question = relationship("QuestionSubmission", back_populates="tags")


class QuestionDepartmentMapping(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "question_department_mappings"
    question_id = Column(UUID(as_uuid=True), ForeignKey("question_submissions.id"), nullable=False, index=True)
    department_id = Column(UUID(as_uuid=True), ForeignKey("master_departments.id"), nullable=False, index=True)
    confidence = Column(String(10), nullable=True)

    question = relationship("QuestionSubmission", back_populates="department_mappings")


class QuestionSchemeMapping(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "question_scheme_mappings"
    question_id = Column(UUID(as_uuid=True), ForeignKey("question_submissions.id"), nullable=False, index=True)
    scheme_id = Column(UUID(as_uuid=True), ForeignKey("master_schemes.id"), nullable=False, index=True)
    confidence = Column(String(10), nullable=True)

    question = relationship("QuestionSubmission", back_populates="scheme_mappings")
