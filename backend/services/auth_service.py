from sqlalchemy.orm import Session
from fastapi import HTTPException

from schemas.admin_schema import Admin as AdminSchema
from models.models import Admin as AdminModel

from utils.jwt_handler import create_access_token
from utils.security import verify_password


class AuthService:

    def __init__(self, db: Session):
        self.db = db


    def login_user(self, user: AdminSchema):

        try:
            db_user = (
                self.db.query(AdminModel)
                .filter(AdminModel.email == user.email)
                .first()
            )

            if not db_user:
                raise HTTPException(status_code=401, detail="Invalid credentials")

            if not verify_password(user.password, db_user.password):
                raise HTTPException(status_code=401, detail="Invalid credentials")

            token = create_access_token({
                "sub": db_user.email
            })

            return {
                "message": "Login successful",
                "access_token": token,
                "token_type": "bearer"
            }

        except HTTPException:
            raise
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")

    # def create_user(self, user: Admin):
    #
    #     try:
    #         hashed_password = hash_password(user.password)
    #
    #         new_user = Admin(
    #             email=user.email,
    #             password=hashed_password
    #         )
    #
    #         self.db.add(new_user)
    #         self.db.commit()
    #         self.db.refresh(new_user)
    #
    #         return {
    #             "message": "User created successfully",
    #             "email": new_user.email,
    #         }
    #     except Exception:
    #         raise HTTPException(status_code=500, detail="Something went wrong")