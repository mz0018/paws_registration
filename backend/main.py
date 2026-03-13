from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import init_db
from models import User
import crud

app = FastAPI()

init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SigninRequest(BaseModel):
    username: str
    password: str

@app.get("/")
def root():
    return {"message": "CRUD API running"}

@app.post("/api/auth/signin")
def signin(data: SigninRequest):
    return {
        "message": "Request received",
        "data": data
    }