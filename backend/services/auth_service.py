import pytesseract
import io
from PIL import Image, ImageFilter

from sqlalchemy.orm import Session
from fastapi import HTTPException
from starlette.responses import JSONResponse

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

            response = JSONResponse(content={"message": "Login successful"})

            response.set_cookie(
                key="access_token",
                value=token,
                httponly=True,
                samesite="lax", #change this line to 'strict' in production
                secure=False # this one too, set it to 'True'
                #max_age=3600 #comment out this too
            )

            return response

        except HTTPException:
            raise
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")


    def logout_user(self, response: JSONResponse):
        response.delete_cookie(
            key="access_token",
            httponly=False,
            samesite="lax",
            secure=False
        )

        return { "message": "Logout successful" }

    def verify_id(self, file: UploadFile):
        contents = file.file.read()

        img = Image.open(io.BytesIO(contents))

        img = img.convert("L")
        img = img.filter(ImageFilter.SHARPEN)

        img = img.point(lambda x: 0 if x < 140 else 255)

        text = pytesseract.image_to_string(img, config="--psm 6")

        print("Extracted text:", text)

        return {
            "filename": file.filename,
            "message": "Image processed successfully",
            "converted_text": text
        }

