import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# =========================================================
# DATABASE URL
# =========================================================

DATABASE_URL = os.getenv("MYSQL_PUBLIC_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "MYSQL_PUBLIC_URL environment variable is not set."
    )


# =========================================================
# MYSQL DRIVER
# =========================================================

# Railway provides:
# mysql://username:password@host:port/database
#
# SQLAlchemy with PyMySQL uses:
# mysql+pymysql://username:password@host:port/database

if DATABASE_URL.startswith("mysql://"):
    DATABASE_URL = DATABASE_URL.replace(
        "mysql://",
        "mysql+pymysql://",
        1
    )


# =========================================================
# DATABASE ENGINE
# =========================================================

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
)


# =========================================================
# DATABASE SESSION
# =========================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# =========================================================
# BASE
# =========================================================

Base = declarative_base()


# =========================================================
# DATABASE DEPENDENCY
# =========================================================

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()