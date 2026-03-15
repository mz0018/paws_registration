from sqlalchemy.orm import Session
from schemas.admin_schema import Admin

def login_user(user: Admin, db: Session):
    return {
        "message": "Logged in successfully",
        "email": user.email,
        "password": user.password
    }