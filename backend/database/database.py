from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Import DATABASE_URL from config.py
from config import DATABASE_URL

# Create database engine
engine = create_engine(DATABASE_URL)

# Create SessionLocal class for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for SQLAlchemy models
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
