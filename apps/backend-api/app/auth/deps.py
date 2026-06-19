from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.auth.security import decode_access_token
from app.models.admin import AdminUser, RoleEnum

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
) -> AdminUser:
    credentials_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user_id = decode_access_token(token)
    if not user_id:
        raise credentials_exc
    user = db.query(AdminUser).filter(AdminUser.id == user_id, AdminUser.is_active.is_(True)).first()
    if not user:
        raise credentials_exc
    return user


def require_role(*roles: RoleEnum):
    def _checker(current_user: AdminUser = Depends(get_current_user)) -> AdminUser:
        if current_user.role is None or current_user.role.role_name not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return current_user
    return _checker


require_admin = require_role(RoleEnum.SUPER_ADMIN, RoleEnum.DEPARTMENT_ADMIN)
require_super_admin = require_role(RoleEnum.SUPER_ADMIN)
require_any = get_current_user
