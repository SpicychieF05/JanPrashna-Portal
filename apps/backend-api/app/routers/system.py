from fastapi import APIRouter
from app.config import settings
import platform, time

START_TIME = time.time()

router = APIRouter()


@router.get("/health")
def health():
    return {"success": True, "data": {"status": "healthy", "timestamp": time.time()}}


@router.get("/version")
def version():
    return {
        "success": True,
        "data": {
            "version": settings.VERSION,
            "project": settings.PROJECT_NAME,
            "python": platform.python_version(),
        },
    }


@router.get("/metrics")
def metrics():
    uptime_seconds = round(time.time() - START_TIME)
    return {
        "success": True,
        "data": {
            "uptime_seconds": uptime_seconds,
            "platform": platform.system(),
        },
    }
