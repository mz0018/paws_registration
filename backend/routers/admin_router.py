from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

#APIRouter = used to organize API Routes into groups
#Depends = lets one function use the result of another function automatically
#Session = used to interact with the database

from schemas.admin_schema import Admin
from database.database import get_db
from services import auth_service
from services.auth_service import AuthService

router = APIRouter(prefix="/api/auth", tags=["Admin"])

@router.get("/")
def root():
    return {"Hello": "World"}

@router.post("/signin", status_code=status.HTTP_201_CREATED)
def auth_user(user: Admin, db: Session = Depends(get_db)):

    auth_service = AuthService(db)

    return auth_service.login_user(user)

# @router.post("/signup", status_code=status.HTTP_201_CREATED)
# def reg_user(user: Admin, db: Session = Depends(get_db)):
#
#     auth_service = AuthService(db)
#
#     return auth_service.create_user(user)