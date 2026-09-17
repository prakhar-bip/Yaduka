import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.exc import OperationalError
from app.config import settings

logger = logging.getLogger("yaduka.database")

# Create Base class for ORM models
Base = declarative_base()

def get_engine():
    """
    Attempts to connect to PostgreSQL (configured via DATABASE_URL).
    If PostgreSQL is unreachable or not running, falls back safely to SQLite.
    """
    pg_url = settings.DATABASE_URL
    try:
        engine = create_engine(pg_url, pool_pre_ping=True)
        # Test connection
        with engine.connect() as conn:
            logger.info("Successfully connected to PostgreSQL database at %s", pg_url)
        return engine
    except Exception as exc:
        logger.warning(
            "Could not connect to PostgreSQL at '%s' (%s). "
            "Falling back to development SQLite database at '%s'. "
            "To use PostgreSQL, ensure your Postgres server is running and configure .env.",
            pg_url, str(exc), settings.FALLBACK_SQLITE_URL
        )
        sqlite_engine = create_engine(
            settings.FALLBACK_SQLITE_URL, 
            connect_args={"check_same_thread": False}
        )
        return sqlite_engine

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """FastAPI dependency yielding a database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Creates all database tables defined in models."""
    import app.models  # noqa: F401
    Base.metadata.create_all(bind=engine)
