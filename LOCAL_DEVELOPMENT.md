# Local Development Guide

Complete guide for developing the Container Directory application locally.

## 📋 Prerequisites

### Required Software
- **Node.js**: >= 18.0.0 ([Download](https://nodejs.org/))
- **Yarn**: 1.22.22 ([Install](https://classic.yarnpkg.com/en/docs/install))
- **Python**: >= 3.8 ([Download](https://www.python.org/downloads/))
- **MongoDB**: >= 4.4 ([Install Guide](https://docs.mongodb.com/manual/installation/))

### Check Installations
```bash
node --version    # Should be >= 18.0.0
yarn --version    # Should be 1.22.22
python --version  # Should be >= 3.8
mongod --version  # Should be >= 4.4
```

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
# Navigate to project root
cd /app

# Install root dependencies (Turborepo)
yarn install

# Install API dependencies
cd apps/api
pip install -r requirements.txt
cd ../..

# Install Web dependencies (automatic via Turborepo)
# Already done by root yarn install
```

### 2. Set Up MongoDB

```bash
# Start MongoDB (if not running)
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify MongoDB is running
mongosh --eval "db.runCommand({ ping: 1 })"
```

### 3. Configure Environment Variables

#### API Configuration (`apps/api/.env`)
```bash
cd apps/api
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=container_directory
CORS_ORIGINS=http://localhost:3000
ENVIRONMENT=development
DEBUG=true
EOF
```

#### Web Configuration (`apps/web/.env.local`)
```bash
cd apps/web
cat > .env.local << EOF
NEXT_PUBLIC_BACKEND_URL=http://localhost:8001/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NODE_ENV=development
EOF
```

### 4. Seed Database

```bash
cd apps/api
python scripts/seed_data.py
```

Expected output:
```
🌱 Starting database seeding...
✅ Connected to MongoDB: container_directory
🗑️  Deleted 0 existing documents
✅ Inserted 15 images
✅ Created indexes
✅ Database seeding completed successfully!
```

### 5. Start Development Servers

#### Option A: Start All Services (Recommended)
```bash
# From project root
yarn dev
```

This starts:
- **Web** on http://localhost:3000
- **API** on http://localhost:8001

#### Option B: Start Services Individually

**Terminal 1 - API:**
```bash
cd apps/api
python -m app.main
# Or with uvicorn directly:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

**Terminal 2 - Web:**
```bash
cd apps/web
yarn dev
```

## 📁 Project Structure

```
/app/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/           # App Router pages
│   │   │   ├── components/    # React components
│   │   │   ├── config/        # Configuration
│   │   │   ├── constants/     # Constants
│   │   │   ├── data/          # Data layer
│   │   │   ├── hooks/         # Custom hooks
│   │   │   ├── lib/           # Utilities
│   │   │   ├── providers/     # Context providers
│   │   │   ├── services/      # API clients
│   │   │   └── types/         # TypeScript types
│   │   ├── public/            # Static assets
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                    # FastAPI backend
│       ├── app/
│       │   ├── core/          # Config, database
│       │   ├── models/        # Database models
│       │   ├── schemas/       # Pydantic schemas
│       │   ├── routers/       # API endpoints
│       │   ├── services/      # Business logic
│       │   └── utils/         # Helper functions
│       ├── scripts/           # Utility scripts
│       ├── requirements.txt
│       └── .env
│
├── packages/
│   ├── ui/                    # Shared UI components
│   ├── typescript-config/     # Shared TS configs
│   ├── eslint-config/         # Shared lint rules
│   └── tailwind-config/       # Shared Tailwind config
│
├── turbo.json                 # Turborepo configuration
├── package.json               # Root package.json
└── README.md
```

## 🔧 Development Workflows

### Frontend Development (Web)

#### Add a New Page
```bash
cd apps/web/src/app
mkdir new-page
touch new-page/page.tsx
```

Example page:
```typescript
export default function NewPage() {
  return <div>New Page</div>;
}
```

#### Add a New Component
```bash
cd apps/web/src/components
touch NewComponent.tsx
```

#### Use API Client
```typescript
import { apiClient } from '@/services/api.client';

const data = await apiClient.get('/images');
```

#### Run Type Checking
```bash
cd apps/web
yarn type-check
```

#### Run Linting
```bash
cd apps/web
yarn lint
```

### Backend Development (API)

#### Project Structure
```
app/
├── core/           # Core functionality
│   ├── config.py   # Settings
│   └── database.py # DB connection
├── models/         # Database models
├── schemas/        # Pydantic schemas
├── routers/        # API routes
│   ├── health.py
│   └── images.py
└── services/       # Business logic
    └── image_service.py
```

#### Add a New Endpoint

1. **Create Schema** (`app/schemas/new_schema.py`):
```python
from pydantic import BaseModel

class NewItemResponse(BaseModel):
    id: str
    name: str
```

2. **Create Router** (`app/routers/new_router.py`):
```python
from fastapi import APIRouter
from ..schemas.new_schema import NewItemResponse

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/", response_model=list[NewItemResponse])
async def get_items():
    return []
```

3. **Register Router** (`app/main.py`):
```python
from .routers import new_router
app.include_router(new_router.router, prefix=settings.API_V1_PREFIX)
```

#### Database Operations

```python
from app.core.database import database

# Get collection
collection = database.get_collection("images")

# Find documents
cursor = collection.find({"category": "featured"})
images = await cursor.to_list(length=100)

# Insert document
result = await collection.insert_one({"name": "test"})

# Update document
await collection.update_one(
    {"_id": "node"},
    {"$set": {"downloads": 1000}}
)
```

#### Run Tests
```bash
cd apps/api
pytest
```

#### Check API Documentation
Visit http://localhost:8001/api/docs for interactive API docs

## 🌐 API Endpoints

### Health
- `GET /api/health` - Health check
- `GET /api/` - API root

### Images
- `GET /api/v1/images/` - Get all images
  - Query params: `category`, `search`, `page`, `page_size`
- `GET /api/v1/images/{name}` - Get image by name
- `GET /api/v1/images/categories/list` - Get categories
- `GET /api/v1/images/stats/summary` - Get stats

### Example Requests

```bash
# Get all images
curl http://localhost:8001/api/v1/images/

# Filter by category
curl "http://localhost:8001/api/v1/images/?category=featured"

# Search images
curl "http://localhost:8001/api/v1/images/?search=node"

# Pagination
curl "http://localhost:8001/api/v1/images/?page=1&page_size=10"

# Get single image
curl http://localhost:8001/api/v1/images/node

# Get categories
curl http://localhost:8001/api/v1/images/categories/list

# Get stats
curl http://localhost:8001/api/v1/images/stats/summary
```

## 🧪 Testing

### Frontend Testing
```bash
cd apps/web
yarn test
```

### Backend Testing
```bash
cd apps/api
pytest -v
```

### Manual Testing Checklist
- [ ] Homepage loads
- [ ] Image list displays
- [ ] Category filtering works
- [ ] Search functionality works
- [ ] Image detail page loads
- [ ] API health check responds
- [ ] Database connection successful

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem**: `pymongo.errors.ServerSelectionTimeoutError`

**Solution**:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check connection
mongosh
```

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Module Not Found

**Problem**: `ModuleNotFoundError: No module named 'app'`

**Solution**:
```bash
cd apps/api
pip install -r requirements.txt
```

### TypeScript Errors

**Problem**: Type errors in frontend

**Solution**:
```bash
cd apps/web
yarn type-check
# Fix reported errors
```

## 📊 Monitoring

### Check Service Status
```bash
# API health
curl http://localhost:8001/api/health

# Web app
curl http://localhost:3000
```

### View Logs

**API Logs** (via Supervisor):
```bash
tail -f /var/log/supervisor/backend.out.log
tail -f /var/log/supervisor/backend.err.log
```

**Web Logs**:
```bash
# In terminal where yarn dev is running
# Or check browser console (F12)
```

### Database Inspection
```bash
# Connect to MongoDB
mongosh

# Use database
use container_directory

# List collections
show collections

# Query images
db.images.find().pretty()

# Count documents
db.images.countDocuments()
```

## 🔄 Common Tasks

### Reset Database
```bash
cd apps/api
python scripts/seed_data.py
```

### Clean and Rebuild
```bash
# Clean everything
yarn clean

# Reinstall dependencies
yarn install

# Rebuild
yarn build
```

### Update Dependencies

**Frontend**:
```bash
cd apps/web
yarn upgrade-interactive --latest
```

**Backend**:
```bash
cd apps/api
pip list --outdated
pip install --upgrade <package-name>
# Update requirements.txt
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Pydantic Documentation](https://docs.pydantic.dev/)

## 🆘 Getting Help

1. Check this documentation
2. Review [CONTRIBUTING.md](./CONTRIBUTING.md)
3. Check [README.md](./README.md)
4. Open an issue on GitHub

## 📝 Notes

- The API runs on port **8001**
- The web app runs on port **3000**
- MongoDB runs on port **27017**
- Hot reload is enabled for both services
- API documentation is available at http://localhost:8001/api/docs
