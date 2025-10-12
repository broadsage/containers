"""
MongoDB document models
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class DockerImageModel(BaseModel):
    """Docker image document model"""
    id: str = Field(alias="_id")
    name: str
    logo: str
    description: str
    category: str
    latest_tag: str
    downloads: int = 0
    size: str
    is_free: bool = True
    fips: bool = False
    badge: str
    last_changed: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "_id": "node",
                "name": "node",
                "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                "description": "Node.js JavaScript runtime",
                "category": "featured",
                "latest_tag": "24.10.0",
                "downloads": 1250000,
                "size": "45MB",
                "is_free": True,
                "fips": False,
                "badge": "official",
                "last_changed": "11 hours ago"
            }
        }
