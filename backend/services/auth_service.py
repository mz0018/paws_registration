from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from starlette.responses import Response
import os
import uuid
from datetime import datetime
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import io

from schemas.admin_schema import Admin as AdminSchema
from models.models import Admin as AdminModel

from utils.jwt_handler import create_access_token
from utils.security import verify_password


ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png"]
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def preprocess_image(self, image: Image.Image) -> Image.Image:
        image = ImageOps.exif_transpose(image)

        if image.mode != "RGB":
            image = image.convert("RGB")

        image = image.filter(ImageFilter.GaussianBlur(radius=1))

        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(1.5)

        return image

    async def scan_image(self, file: UploadFile = File(...)):
        if file.content_type not in ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only JPEG and PNG are allowed.",
            )

        contents = await file.read()

        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400, detail="File too large. Maximum size is 10MB."
            )

        try:
            image = Image.open(io.BytesIO(contents))
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid image file.")

        image = self.preprocess_image(image)

        unique_filename = f"{uuid.uuid4()}_{int(datetime.now().timestamp())}.jpg"
        upload_dir = os.path.join(os.path.dirname(__file__), "..", "uploads")
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, unique_filename)

        image.save(file_path, "JPEG", quality=85)

        return {
            "success": True,
            "image_path": f"/uploads/{unique_filename}",
            "filename": unique_filename,
        }

    def login_user(self, user: AdminSchema):
        try:
            db_user = (
                self.db.query(AdminModel).filter(AdminModel.email == user.email).first()
            )

            if not db_user:
                raise HTTPException(status_code=401, detail="Invalid credentials")

            if not verify_password(user.password, db_user.password):
                raise HTTPException(status_code=401, detail="Invalid credentials")

            token = create_access_token({"sub": db_user.email})

            response = JSONResponse(content={"message": "Login successful"})

            response.set_cookie(
                key="access_token",
                value=token,
                httponly=True,
                samesite="lax",
                secure=False,
            )

            return response

        except HTTPException:
            raise
        except Exception:
            raise HTTPException(status_code=500, detail="Something went wrong")

    def logout_user(self, response: Response):
        response.delete_cookie(
            key="access_token", httponly=False, samesite="lax", secure=False
        )

        return {"message": "Logout successful"}
