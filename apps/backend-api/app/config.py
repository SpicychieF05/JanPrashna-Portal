from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "JanPrashna Portal API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = False

    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/janprashna"
    REDIS_URL: str = "redis://localhost:6379/0"

    JWT_SECRET: str = "change_this_in_production"
    JWT_REFRESH_SECRET: str = "change_this_refresh_in_production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
    ]

    RATE_LIMIT_SUBMIT: str = "5/10minutes"
    RATE_LIMIT_LOGIN: str = "5/15minutes"

    class Config:
        env_file = ".env"

settings = Settings()
