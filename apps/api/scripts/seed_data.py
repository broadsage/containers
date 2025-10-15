"""
Seed database with Docker image data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "container_directory")

# Sample data
IMAGES_DATA = [
    {
        "_id": "node",
        "name": "node",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "description": "Node.js JavaScript runtime built on Chrome's V8 JavaScript engine",
        "category": "featured",
        "latest_tag": "24.10.0",
        "downloads": 1250000,
        "size": "45MB",
        "is_free": True,
        "fips": False,
        "badge": "official",
        "last_changed": "11 hours ago"
    },
    {
        "_id": "nginx",
        "name": "nginx",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
        "description": "High-performance HTTP server and reverse proxy",
        "category": "featured",
        "latest_tag": "mainline",
        "downloads": 2340000,
        "size": "25MB",
        "is_free": True,
        "fips": False,
        "badge": "community",
        "last_changed": "21 hours ago"
    },
    {
        "_id": "postgres",
        "name": "postgres",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        "description": "Powerful, open source object-relational database system",
        "category": "featured",
        "latest_tag": "18.0",
        "downloads": 1890000,
        "size": "120MB",
        "is_free": True,
        "fips": False,
        "badge": "verified",
        "last_changed": "18 hours ago"
    },
    {
        "_id": "python",
        "name": "python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "description": "Python is a programming language that lets you work quickly",
        "category": "starter",
        "latest_tag": "3.13.1",
        "downloads": 3450000,
        "size": "50MB",
        "is_free": True,
        "fips": False,
        "badge": "official",
        "last_changed": "15 hours ago"
    },
    {
        "_id": "redis",
        "name": "redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        "description": "In-memory data structure store, used as database, cache",
        "category": "featured",
        "latest_tag": "7.4.2",
        "downloads": 1670000,
        "size": "35MB",
        "is_free": False,
        "fips": True,
        "badge": "verified",
        "last_changed": "12 hours ago"
    },
    {
        "_id": "go",
        "name": "go",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
        "description": "Go is an open source programming language",
        "category": "starter",
        "latest_tag": "1.25.2",
        "downloads": 890000,
        "size": "340MB",
        "is_free": True,
        "fips": False,
        "badge": "community",
        "last_changed": "18 hours ago"
    },
    {
        "_id": "php",
        "name": "php",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        "description": "Popular general-purpose scripting language",
        "category": "application",
        "latest_tag": "8.4.13",
        "downloads": 1230000,
        "size": "78MB",
        "is_free": True,
        "fips": False,
        "badge": "official",
        "last_changed": "23 hours ago"
    },
    {
        "_id": "mysql",
        "name": "mysql",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        "description": "MySQL is an open-source relational database",
        "category": "base",
        "latest_tag": "9.1.0",
        "downloads": 2120000,
        "size": "145MB",
        "is_free": False,
        "fips": False,
        "badge": "community",
        "last_changed": "16 hours ago"
    },
    {
        "_id": "mongodb",
        "name": "mongodb",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        "description": "MongoDB is a source-available cross-platform document-oriented database",
        "category": "base",
        "latest_tag": "8.0.4",
        "downloads": 1780000,
        "size": "420MB",
        "is_free": False,
        "fips": True,
        "badge": "verified",
        "last_changed": "14 hours ago"
    },
    {
        "_id": "tensorflow",
        "name": "tensorflow",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        "description": "An end-to-end open source platform for machine learning",
        "category": "ai",
        "latest_tag": "2.18.0",
        "downloads": 560000,
        "size": "1.2GB",
        "is_free": False,
        "fips": False,
        "badge": "verified",
        "last_changed": "20 hours ago"
    },
    {
        "_id": "pytorch",
        "name": "pytorch",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        "description": "An open source machine learning framework",
        "category": "ai",
        "latest_tag": "2.6.1",
        "downloads": 480000,
        "size": "1.8GB",
        "is_free": False,
        "fips": False,
        "badge": "verified",
        "last_changed": "22 hours ago"
    },
    {
        "_id": "jenkins",
        "name": "jenkins",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
        "description": "Open source automation server",
        "category": "application",
        "latest_tag": "2.485",
        "downloads": 1340000,
        "size": "450MB",
        "is_free": True,
        "fips": False,
        "badge": "community",
        "last_changed": "19 hours ago"
    },
    {
        "_id": "elasticsearch",
        "name": "elasticsearch",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
        "description": "Distributed, RESTful search and analytics engine",
        "category": "application",
        "latest_tag": "8.17.1",
        "downloads": 910000,
        "size": "620MB",
        "is_free": False,
        "fips": False,
        "badge": "verified",
        "last_changed": "17 hours ago"
    },
    {
        "_id": "kafka",
        "name": "kafka",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
        "description": "Distributed event streaming platform",
        "category": "application",
        "latest_tag": "3.9.0",
        "downloads": 720000,
        "size": "380MB",
        "is_free": False,
        "fips": False,
        "badge": "community",
        "last_changed": "13 hours ago"
    },
    {
        "_id": "docker",
        "name": "docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "description": "Docker container runtime",
        "category": "base",
        "latest_tag": "28.0.0",
        "downloads": 5670000,
        "size": "95MB",
        "is_free": True,
        "fips": False,
        "badge": "official",
        "last_changed": "9 hours ago"
    }
]


async def seed_database():
    """Seed the database with sample data"""
    print("🌱 Starting database seeding...")
    
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(MONGO_URL)
        db = client[DB_NAME]
        collection = db["images"]
        
        # Test connection
        await client.admin.command('ping')
        print(f"✅ Connected to MongoDB: {DB_NAME}")
        
        # Clear existing data
        result = await collection.delete_many({})
        print(f"🗑️  Deleted {result.deleted_count} existing documents")
        
        # Add timestamps to all images
        for image in IMAGES_DATA:
            image["created_at"] = datetime.utcnow()
            image["updated_at"] = datetime.utcnow()
        
        # Insert new data
        result = await collection.insert_many(IMAGES_DATA)
        print(f"✅ Inserted {len(result.inserted_ids)} images")
        
        # Create indexes
        await collection.create_index("name")
        await collection.create_index("category")
        print("✅ Created indexes")
        
        # Display summary
        print("\n📊 Seeding Summary:")
        print(f"   Total images: {len(IMAGES_DATA)}")
        
        categories = {}
        for img in IMAGES_DATA:
            cat = img["category"]
            categories[cat] = categories.get(cat, 0) + 1
        
        for cat, count in categories.items():
            print(f"   - {cat}: {count} images")
        
        print("\n✅ Database seeding completed successfully!")
        
        # Close connection
        client.close()
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(seed_database())
