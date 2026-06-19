from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "JanPrashna Portal API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Add other configuration variables here
    # DATABASE_URL: str
    
    class Config:
        case_sensitive = True

settings = Settings()
