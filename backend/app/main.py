import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db
from app.api.routes import health_router, intake_router, research_router, strategy_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("yaduka.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up %s (Env: %s)", settings.APP_NAME, settings.APP_ENV)
    try:
        init_db()
        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.error("Database initialization warning: %s", str(e))
    yield
    logger.info("Shutting down %s", settings.APP_NAME)

app = FastAPI(
    title=settings.APP_NAME,
    description="Intelligent Marketing & Strategic Growth Engine for Startups and Small Businesses",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routes under /api
app.include_router(health_router, prefix="/api")
app.include_router(intake_router, prefix="/api")
app.include_router(research_router, prefix="/api")
app.include_router(strategy_router, prefix="/api")

@app.get("/")
def root_status():
    return {
        "message": f"Welcome to {settings.APP_NAME} API",
        "docs": "/docs",
        "status": "operational",
        "version": "1.0.0"
    }
