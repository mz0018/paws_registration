from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

#APIRouter = used to organize API Routes into groups
#Depends = lets one function use the result of another function automatically
#Session = used to interact with the database

from schemas.admin_schema import Admin
from database.database import get_db
from services.auth_service import login_user

router = APIRouter(prefix="/api/auth", tags=["Admin"])

@router.get("/")
def root():
    return {"Hello": "World"}

@router.post("/signin", status_code=status.HTTP_201_CREATED)
def auth_user(user: Admin, db: Session = Depends(get_db)):
    return login_user(user, db)