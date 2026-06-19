import enum
from sqlalchemy import Column, String, Integer, Text, ForeignKey, Enum as SQLEnum, Numeric, DateTime, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class TrendEnum(str, enum.Enum):
    RISING = "rising"
    STABLE = "stable"
    DECLINING = "declining"


class AILogStepEnum(str, enum.Enum):
    LANGUAGE_DETECTION = "language_detection"
    TRANSLATION = "translation"
    NORMALIZATION = "normalization"
    EMBEDDING = "embedding"
    CLUSTERING = "clustering"
    SUMMARY = "summary"


class AILogStatusEnum(str, enum.Enum):
    SUCCESS = "success"
    FAILED = "failed"
    SKIPPED = "skipped"


class QuestionEmbedding(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "question_embeddings"
    question_id = Column(UUID(as_uuid=True), ForeignKey("question_submissions.id"), nullable=False, unique=True, index=True)
    embedding_provider = Column(String(50), nullable=False)
    embedding_model = Column(String(100), nullable=False)
    vector_id = Column(String(255), nullable=False)


class QuestionCluster(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "question_clusters"
    cluster_name = Column(String(255), nullable=False)
    canonical_question = Column(Text, nullable=True)
    confidence = Column(Numeric(5, 4), nullable=True)
    question_count = Column(Integer, default=0, nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey("master_departments.id"), nullable=True)
    scheme_id = Column(UUID(as_uuid=True), ForeignKey("master_schemes.id"), nullable=True)
    trend = Column(SQLEnum(TrendEnum), default=TrendEnum.STABLE, nullable=False)
    is_approved = Column(String(20), default="pending")

    cluster_questions = relationship("ClusterQuestion", back_populates="cluster", lazy="dynamic")


class ClusterQuestion(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "cluster_questions"
    cluster_id = Column(UUID(as_uuid=True), ForeignKey("question_clusters.id"), nullable=False, index=True)
    question_id = Column(UUID(as_uuid=True), ForeignKey("question_submissions.id"), nullable=False, index=True)
    similarity_score = Column(Numeric(5, 4), nullable=True)

    cluster = relationship("QuestionCluster", back_populates="cluster_questions")

    __table_args__ = (
        Index("ix_cluster_questions_unique", "cluster_id", "question_id", unique=True),
    )


class AIProcessingLog(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "ai_processing_logs"
    question_id = Column(UUID(as_uuid=True), ForeignKey("question_submissions.id"), nullable=True)
    step = Column(SQLEnum(AILogStepEnum), nullable=False)
    status = Column(SQLEnum(AILogStatusEnum), nullable=False)
    duration_ms = Column(Integer, nullable=True)
    error_message = Column(Text, nullable=True)
    retry_count = Column(Integer, default=0)
    provider = Column(String(50), nullable=True)
