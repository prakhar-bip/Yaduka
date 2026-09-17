from app.api.routes.health import router as health_router
from app.api.routes.intake import router as intake_router
from app.api.routes.research import router as research_router
from app.api.routes.strategy import router as strategy_router

__all__ = ["health_router", "intake_router", "research_router", "strategy_router"]
