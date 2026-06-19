import enum
from sqlalchemy import Column, String, Integer, Text, ForeignKey, Date, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class ReportTypeEnum(str, enum.Enum):
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    CUSTOM = "custom"


class ReportStatusEnum(str, enum.Enum):
    GENERATING = "generating"
    GENERATED = "generated"
    FAILED = "failed"


class FrequencyEnum(str, enum.Enum):
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    CUSTOM = "custom"


class DeliveryStatusEnum(str, enum.Enum):
    SENT = "sent"
    FAILED = "failed"
    PENDING = "pending"
    RETRYING = "retrying"


class GeneratedReport(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "generated_reports"
    report_name = Column(String(255), nullable=False)
    report_type = Column(SQLEnum(ReportTypeEnum), nullable=False)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    generated_by = Column(UUID(as_uuid=True), ForeignKey("admin_users.id"), nullable=True)
    ai_summary = Column(Text, nullable=True)
    status = Column(SQLEnum(ReportStatusEnum), default=ReportStatusEnum.GENERATING)
    total_questions = Column(Integer, default=0)
    clusters_analyzed = Column(Integer, default=0)
    pdf_path = Column(String(512), nullable=True)
    excel_path = Column(String(512), nullable=True)

    report_clusters = relationship("ReportCluster", back_populates="report", lazy="dynamic")


class ReportCluster(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "report_clusters"
    report_id = Column(UUID(as_uuid=True), ForeignKey("generated_reports.id"), nullable=False, index=True)
    cluster_id = Column(UUID(as_uuid=True), ForeignKey("question_clusters.id"), nullable=False, index=True)
    rank = Column(Integer, nullable=True)

    report = relationship("GeneratedReport", back_populates="report_clusters")


class EmailRecipient(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "email_recipients"
    name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    designation = Column(String(150), nullable=True)
    department_id = Column(UUID(as_uuid=True), ForeignKey("master_departments.id"), nullable=True)
    frequency = Column(SQLEnum(FrequencyEnum), default=FrequencyEnum.WEEKLY)
    is_active = Column(String(10), default="true")


class EmailSchedule(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "email_schedules"
    schedule_name = Column(String(255), nullable=False)
    frequency = Column(SQLEnum(FrequencyEnum), nullable=False)
    day_of_week = Column(String(20), nullable=True)
    day_of_month = Column(Integer, nullable=True)
    send_time = Column(String(10), nullable=False)
    is_active = Column(String(10), default="true")
    next_run_at = Column(String(30), nullable=True)


class EmailDeliveryLog(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "email_delivery_logs"
    report_id = Column(UUID(as_uuid=True), ForeignKey("generated_reports.id"), nullable=True)
    recipient_id = Column(UUID(as_uuid=True), ForeignKey("email_recipients.id"), nullable=True)
    status = Column(SQLEnum(DeliveryStatusEnum), default=DeliveryStatusEnum.PENDING)
    error_message = Column(Text, nullable=True)
    retry_count = Column(Integer, default=0)
