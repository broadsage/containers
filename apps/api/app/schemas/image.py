"""
Pydantic schemas for Docker images
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import datetime


class DockerImageBase(BaseModel):
    """Base schema for Docker image"""
    name: str = Field(..., description="Image name")
    logo: str = Field(..., description="Logo URL")
    description: str = Field(..., description="Image description")
    category: str = Field(..., description="Category (featured, starter, ai, etc)")
    latest_tag: str = Field(..., description="Latest version tag")
    downloads: int = Field(default=0, description="Number of downloads")
    size: str = Field(..., description="Image size (e.g., '45MB')")
    is_free: bool = Field(default=True, description="Whether the image is free")
    fips: bool = Field(default=False, description="FIPS compliant")
    badge: Literal["official", "community", "verified"] = Field(..., description="Badge type")


class DockerImageCreate(DockerImageBase):
    """Schema for creating a Docker image"""
    pass


class DockerImageResponse(DockerImageBase):
    """Schema for Docker image response"""
    id: str = Field(..., description="Unique identifier")
    last_changed: str = Field(..., description="Last update time")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True


class DockerImageList(BaseModel):
    """Schema for list of Docker images"""
    images: List[DockerImageResponse]
    total: int
    page: int = 1
    page_size: int = 50


class CategoryResponse(BaseModel):
    """Schema for category"""
    id: str
    name: str
    icon: str


class StatsResponse(BaseModel):
    """Schema for statistics"""
    projects: int
    versions: int
    images: int
    builds: int
