# Test configuration for FastAPI app
import pytest
import pytest_asyncio
from httpx import AsyncClient
from fastapi.testclient import TestClient
import os
from motor.motor_asyncio import AsyncIOMotorClient

# Import your FastAPI app
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

try:
    from server import app
except ImportError:
    # Fallback if server.py structure is different
    from app.main import app

# Test database configuration
TEST_DATABASE_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/test_container_directory")

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"

@pytest.fixture
def client():
    """Create a test client for the FastAPI app"""
    return TestClient(app)

@pytest.fixture
async def async_client():
    """Create an async test client"""
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture(scope="function")
async def test_db():
    """Create a test database connection"""
    client = AsyncIOMotorClient(TEST_DATABASE_URL)
    db = client.get_default_database()
    
    # Clean up before test
    await db.drop_collection("images")
    await db.drop_collection("status_checks")
    
    yield db
    
    # Clean up after test
    await db.drop_collection("images")
    await db.drop_collection("status_checks")
    client.close()

@pytest.fixture
def sample_image_data():
    """Sample image data for testing"""
    return {
        "id": "test-node",
        "name": "node",
        "registry": "chainguard",
        "description": "Test Node.js runtime image",
        "category": "runtime",
        "latest_tag": "18.0.0",
        "is_free": True,
        "downloads": 1000,
        "size": "50MB"
    }

@pytest.fixture
def sample_status_check():
    """Sample status check data for testing"""
    return {
        "client_name": "test-client"
    }