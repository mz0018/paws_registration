"""
Database models - defines table structures
"""

from sqlalchemy import Column, Integer, String
from database import Base


class Admin(Base):

    __tablename__ = "admin"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
