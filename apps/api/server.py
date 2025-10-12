"""
Legacy server.py - Redirects to new app structure
This file is kept for backward compatibility with supervisor
"""
from app.main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)