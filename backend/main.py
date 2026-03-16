# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine, Base
from utils.rate_limiter import RateLimiter

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PAWS API",
    description="Simple user registration API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize rate limiter correctly
rate_limiter = RateLimiter(app)

from routers import admin_router

app.include_router(admin_router.router)