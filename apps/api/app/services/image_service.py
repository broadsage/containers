"""
Business logic for Docker images
"""
from typing import List, Optional
from datetime import datetime
import logging

from ..core.database import database
from ..schemas.image import DockerImageResponse, DockerImageCreate

logger = logging.getLogger(__name__)


class ImageService:
    """Service for managing Docker images"""
    
    def __init__(self):
        self.collection_name = "images"
    
    async def get_all_images(
        self, 
        category: Optional[str] = None,
        search: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[DockerImageResponse]:
        """Get all images with optional filtering"""
        collection = database.get_collection(self.collection_name)
        
        # Build query
        query = {}
        if category and category != "all":
            query["category"] = category
        
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}}
            ]
        
        # Execute query
        cursor = collection.find(query).skip(skip).limit(limit)
        images = await cursor.to_list(length=limit)
        
        # Convert to response models
        return [
            DockerImageResponse(
                id=img["_id"],
                name=img["name"],
                logo=img["logo"],
                description=img["description"],
                category=img["category"],
                latest_tag=img["latest_tag"],
                downloads=img.get("downloads", 0),
                size=img["size"],
                is_free=img.get("is_free", True),
                fips=img.get("fips", False),
                badge=img["badge"],
                last_changed=img["last_changed"],
                created_at=img.get("created_at", datetime.utcnow()),
                updated_at=img.get("updated_at", datetime.utcnow())
            )
            for img in images
        ]
    
    async def get_image_by_name(self, name: str) -> Optional[DockerImageResponse]:
        """Get a single image by name"""
        collection = database.get_collection(self.collection_name)
        
        image = await collection.find_one({"_id": name})
        
        if not image:
            return None
        
        return DockerImageResponse(
            id=image["_id"],
            name=image["name"],
            logo=image["logo"],
            description=image["description"],
            category=image["category"],
            latest_tag=image["latest_tag"],
            downloads=image.get("downloads", 0),
            size=image["size"],
            is_free=image.get("is_free", True),
            fips=image.get("fips", False),
            badge=image["badge"],
            last_changed=image["last_changed"],
            created_at=image.get("created_at", datetime.utcnow()),
            updated_at=image.get("updated_at", datetime.utcnow())
        )
    
    async def create_image(self, image: DockerImageCreate) -> DockerImageResponse:
        """Create a new image"""
        collection = database.get_collection(self.collection_name)
        
        image_dict = image.model_dump()
        image_dict["_id"] = image.name
        image_dict["created_at"] = datetime.utcnow()
        image_dict["updated_at"] = datetime.utcnow()
        image_dict["last_changed"] = "just now"
        
        await collection.insert_one(image_dict)
        
        return await self.get_image_by_name(image.name)
    
    async def get_count(self, category: Optional[str] = None) -> int:
        """Get total count of images"""
        collection = database.get_collection(self.collection_name)
        
        query = {}
        if category and category != "all":
            query["category"] = category
        
        return await collection.count_documents(query)


image_service = ImageService()
