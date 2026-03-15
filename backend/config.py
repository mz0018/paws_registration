from dotenv import load_dotenv
import os

# Load .env file (only works in development, won't fail in production)
load_dotenv()

# Database connection URL
# Format: postgresql://username:password@host:port/database_name
DATABASE_URL = os.getenv("DATABASE_URL")

# Validate that DATABASE_URL is set
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in .env file")
