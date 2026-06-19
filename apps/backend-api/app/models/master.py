import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class District(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_districts"
    district_name = Column(String(100), nullable=False)
    district_code = Column(String(10), nullable=True)
    is_active = Column(Boolean, default=True)

    subdivisions = relationship("Subdivision", back_populates="district", lazy="dynamic")
    municipalities = relationship("Municipality", back_populates="district", lazy="dynamic")
    police_stations = relationship("PoliceStation", back_populates="district", lazy="dynamic")
    pincodes = relationship("Pincode", back_populates="district", lazy="dynamic")


class Subdivision(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_subdivisions"
    district_id = Column(UUID(as_uuid=True), ForeignKey("master_districts.id"), nullable=False, index=True)
    subdivision_name = Column(String(100), nullable=False)
    subdivision_code = Column(String(20), nullable=True)

    district = relationship("District", back_populates="subdivisions")
    blocks = relationship("Block", back_populates="subdivision", lazy="dynamic")


class Block(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_blocks"
    subdivision_id = Column(UUID(as_uuid=True), ForeignKey("master_subdivisions.id"), nullable=False, index=True)
    block_name = Column(String(100), nullable=False)
    block_code = Column(String(20), nullable=True)

    subdivision = relationship("Subdivision", back_populates="blocks")
    gram_panchayats = relationship("GramPanchayat", back_populates="block", lazy="dynamic")


class GramPanchayat(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_gram_panchayats"
    block_id = Column(UUID(as_uuid=True), ForeignKey("master_blocks.id"), nullable=False, index=True)
    gp_name = Column(String(150), nullable=False)

    block = relationship("Block", back_populates="gram_panchayats")


class Municipality(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_municipalities"
    district_id = Column(UUID(as_uuid=True), ForeignKey("master_districts.id"), nullable=False, index=True)
    municipality_name = Column(String(150), nullable=False)

    district = relationship("District", back_populates="municipalities")
    wards = relationship("Ward", back_populates="municipality", lazy="dynamic")


class Ward(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_wards"
    municipality_id = Column(UUID(as_uuid=True), ForeignKey("master_municipalities.id"), nullable=False, index=True)
    ward_name = Column(String(100), nullable=False)
    ward_number = Column(String(10), nullable=True)

    municipality = relationship("Municipality", back_populates="wards")


class PoliceStation(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_police_stations"
    district_id = Column(UUID(as_uuid=True), ForeignKey("master_districts.id"), nullable=False, index=True)
    police_station_name = Column(String(150), nullable=False)

    district = relationship("District", back_populates="police_stations")


class Pincode(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_pincodes"
    pincode = Column(String(6), nullable=False, index=True)
    district_id = Column(UUID(as_uuid=True), ForeignKey("master_districts.id"), nullable=False, index=True)

    district = relationship("District", back_populates="pincodes")


class Department(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_departments"
    department_name = Column(String(150), nullable=False)
    department_code = Column(String(20), nullable=True)
    is_active = Column(Boolean, default=True)


class Scheme(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "master_schemes"
    scheme_name = Column(String(200), nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey("master_departments.id"), nullable=True)
    is_active = Column(Boolean, default=True)
