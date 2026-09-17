import os
import sys
import uvicorn

# Add the current directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.config import settings

if __name__ == "__main__":
    print(f"Starting {settings.APP_NAME} on port {settings.APP_PORT}...")
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=settings.APP_PORT,
        reload=False
    )
