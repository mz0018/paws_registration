from fastapi import APIRouter, Depends, Request, Response, UploadFile, File
from sqlalchemy.orm import Session
from starlette import status

#APIRouter = used to organize API Routes into groups
#Depends = lets one function use the result of another function automatically
#Session = used to interact with the database

from schemas.admin_schema import Admin
from database.database import get_db
from services import auth_service
from services.auth_service import AuthService

from main import rate_limiter

router = APIRouter(prefix="/api/auth", tags=["Admin"])

@router.get("/")
def root():
    return {"Hello": "World"}

@router.post("/signout", status_code=status.HTTP_200_OK)
def signout(response: Response, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    return auth_service.logout_user(response)

@router.post("/signin", status_code=status.HTTP_201_CREATED)
@rate_limiter.limit("5/minute")  # limit to 5 login attempts per minute
def auth_user(request: Request, user: Admin, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    return auth_service.login_user(user)

@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    service = AuthService(db)
    return await service.scan_image(file)

