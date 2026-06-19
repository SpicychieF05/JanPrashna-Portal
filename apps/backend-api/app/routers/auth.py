from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Any

from app.db.database import get_db
from app.auth.security import verify_password, create_access_token, create_refresh_token, decode_refresh_token
from app.auth.deps import get_current_user
from app.repositories.user import UserRepository
from app.schemas.requests import LoginRequest, RefreshRequest

router = APIRouter()


@router.post("/login")
def login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    repo = UserRepository(db)
    user = repo.get_by_email(form_data.username)
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    user.last_login = datetime.utcnow().isoformat()
    db.commit()

    return {
        "success": True,
        "data": {
            "access_token": create_access_token(user.id),
            "refresh_token": create_refresh_token(user.id),
            "token_type": "bearer",
        },
    }


@router.post("/refresh")
def refresh_token(body: RefreshRequest, db: Session = Depends(get_db)) -> Any:
    user_id = decode_refresh_token(body.refresh_token)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired refresh token")

    repo = UserRepository(db)
    user = repo.get(user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found or inactive")

    return {
        "success": True,
        "data": {
            "access_token": create_access_token(user.id),
            "refresh_token": create_refresh_token(user.id),
            "token_type": "bearer",
        },
    }


@router.post("/logout")
def logout(current_user=Depends(get_current_user)) -> Any:
    return {"success": True, "message": "Logged out successfully"}


@router.get("/me")
def get_me(current_user=Depends(get_current_user)) -> Any:
    return {
        "success": True,
        "data": {
            "id": str(current_user.id),
            "name": current_user.name,
            "email": current_user.email,
            "role": current_user.role.role_name if current_user.role else None,
        },
    }
