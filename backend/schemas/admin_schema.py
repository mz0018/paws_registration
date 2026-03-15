from pydantic import BaseModel, EmailStr

#BaseModel = check if data types are correct
#EmailStr = email must contain a real email format

class Admin(BaseModel):
    email: EmailStr
    password: str

