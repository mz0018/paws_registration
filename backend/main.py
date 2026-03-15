from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import admin_router
from database.database import engine, Base

Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="PAWS API",
    description="Simple user registration API",
    version="1.0.0"
)

# Allow cross-origin requests (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_router.router)
