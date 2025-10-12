"""
Docker images API endpoints
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from ..schemas.image import (
    DockerImageResponse,
    DockerImageList,
    CategoryResponse,
    StatsResponse
)
from ..services.image_service import image_service

router = APIRouter(prefix="/images", tags=["images"])


@router.get("/", response_model=DockerImageList)
async def get_images(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search in name and description"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page")
):
    """
    Get all Docker images with optional filtering
    
    - **category**: Filter by category (featured, starter, ai, application, base, fips)
    - **search**: Search term for name and description
    - **page**: Page number (starts at 1)
    - **page_size**: Number of items per page (max 100)
    """
    skip = (page - 1) * page_size
    
    images = await image_service.get_all_images(
        category=category,
        search=search,
        skip=skip,
        limit=page_size
    )
    
    total = await image_service.get_count(category=category)
    
    return DockerImageList(
        images=images,
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/{name}", response_model=DockerImageResponse)
async def get_image(name: str):
    """
    Get a specific Docker image by name
    
    - **name**: Image name (e.g., 'node', 'nginx', 'postgres')
    """
    image = await image_service.get_image_by_name(name)
    
    if not image:
        raise HTTPException(status_code=404, detail=f"Image '{name}' not found")
    
    return image


@router.get("/categories/list", response_model=List[CategoryResponse])
async def get_categories():
    """Get all available categories"""
    categories = [
        {"id": "featured", "name": "Featured", "icon": "⭐"},
        {"id": "starter", "name": "Starter", "icon": "🚀"},
        {"id": "ai", "name": "AI", "icon": "🤖"},
        {"id": "application", "name": "Application", "icon": "📦"},
        {"id": "base", "name": "Base", "icon": "🏗️"},
        {"id": "fips", "name": "FIPS", "icon": "🔒"},
    ]
    return [CategoryResponse(**cat) for cat in categories]


@router.get("/stats/summary", response_model=StatsResponse)
async def get_stats():
    """Get platform statistics"""
    total_images = await image_service.get_count()
    
    return StatsResponse(
        projects=1756,
        versions=105204,
        images=total_images,
        builds=308074969
    )
