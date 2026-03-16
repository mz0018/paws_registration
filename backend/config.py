from dotenv import load_dotenv
import os

# Load .env file (only works in development, won't fail in production)
load_dotenv()

# Database connection URL
# Format: postgresql://username:password@host:port/database_name
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Validate that DATABASE_URL is set
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in .env file")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY not found in .env file")