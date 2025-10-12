"""
Configuration management
"""
from typing import List
from pydantic_settings import BaseSettings
from pydantic import validator


class Settings(BaseSettings):
    """Application settings"""
    
    # API Settings
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "Container Directory API"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Secure container image directory API"
    
    # Database
    MONGO_URL: str
    DB_NAME: str = "container_directory"
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:3000"
    
    def get_cors_origins(self) -> List[str]:
        """Parse CORS origins from string"""
        if isinstance(self.CORS_ORIGINS, str):
            return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
        return self.CORS_ORIGINS
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: str = "true"
    
    def is_debug(self) -> bool:
        """Check if debug mode is enabled"""
        return self.DEBUG.lower() in ("true", "1", "yes")
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
