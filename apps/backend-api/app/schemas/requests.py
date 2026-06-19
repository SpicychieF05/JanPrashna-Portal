from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from uuid import UUID


class QuestionSubmitRequest(BaseModel):
    district_id: UUID
    subdivision_id: Optional[UUID] = None
    block_id: Optional[UUID] = None
    gram_panchayat_id: Optional[UUID] = None
    municipality_id: Optional[UUID] = None
    ward_id: Optional[UUID] = None
    police_station_id: Optional[UUID] = None
    pincode_id: Optional[UUID] = None
    rural_urban: str
    age: Optional[int] = None
    occupation: Optional[str] = None
    gender: Optional[str] = None
    language: str
    original_question: str

    @field_validator("original_question")
    @classmethod
    def validate_question_length(cls, v: str) -> str:
        if len(v.strip()) < 5:
            raise ValueError("Question must be at least 5 characters long")
        if len(v) > 500:
            raise ValueError("Question must not exceed 500 characters")
        return v.strip()

    @field_validator("age")
    @classmethod
    def validate_age(cls, v: Optional[int]) -> Optional[int]:
        if v is not None and not (18 <= v <= 120):
            raise ValueError("Age must be between 18 and 120")
        return v


class QuestionSubmitResponse(BaseModel):
    id: str
    message: str = "Question submitted successfully"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: Optional[str] = None

    class Config:
        from_attributes = True
