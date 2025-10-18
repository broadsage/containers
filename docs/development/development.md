# Local Development Guide# Local Development Guide



Complete guide for developing the Container Directory application locally.Complete guide for developing the Container Directory application locally.



## 📋 Prerequisites## 📋 Prerequisites



### Required Software### Required Software



- **Node.js**: >= 18.0.0 ([Download](https://nodejs.org/))- **Node.js**: >= 18.0.0 ([Download](https://nodejs.org/))

- **Yarn**: 1.22.22 ([Install](https://classic.yarnpkg.com/en/docs/install))- **Yarn**: 1.22.22 ([Install](https://classic.yarnpkg.com/en/docs/install))

- **Git**: For version control ([Download](https://git-scm.com/))- **Python**: >= 3.8 ([Download](https://www.python.org/downloads/))

- **MongoDB**: >= 4.4 ([Install Guide](https://docs.mongodb.com/manual/installation/))

### Check Installations

### Check Installations

```bash

node --version    # Should be >= 18.0.0```bash

yarn --version    # Should be 1.22.22node --version    # Should be >= 18.0.0

git --version     # Should be >= 2.0.0yarn --version    # Should be 1.22.22

```python --version  # Should be >= 3.8

mongod --version  # Should be >= 4.4

## 🚀 Quick Start```



### 1. Clone and Install Dependencies## 🚀 Quick Start



```bash### 1. Clone and Install Dependencies

# Clone the repository

git clone https://github.com/broadsage/containers.git```bash

cd containers# Navigate to project root

cd /app

# Install all dependencies using Turborepo

yarn install# Install root dependencies (Turborepo)

```yarn install



### 2. Start Development Server# Install API dependencies

cd apps/api

```bashpip install -r requirements.txt

# Start Next.js development servercd ../..

yarn dev

```# Install Web dependencies (automatic via Turborepo)

# Already done by root yarn install

The application will be available at:```

- **Frontend**: http://localhost:3000

### 2. Set Up MongoDB

### 3. Verify Setup

```bash

Open http://localhost:3000 in your browser. You should see:# Start MongoDB (if not running)

- ✅ Container directory homepagesudo systemctl start mongod

- ✅ 15+ container images displayed

- ✅ Search and filter functionality working# Or using Docker

- ✅ Category filters functionaldocker run -d -p 27017:27017 --name mongodb mongo:latest



## 📁 Project Structure# Verify MongoDB is running

mongosh --eval "db.runCommand({ ping: 1 })"

```text```

containers/

├── apps/### 3. Configure Environment Variables

│   └── web/                    # Next.js frontend application

│       ├── src/#### API Configuration (`apps/api/.env`)

│       │   ├── app/           # App Router pages

│       │   ├── components/    # React components```bash

│       │   ├── config/        # Configurationcd apps/api

│       │   ├── constants/     # Constantscat > .env << EOF

│       │   ├── data/          # Mock dataMONGO_URL=mongodb://localhost:27017

│       │   ├── hooks/         # Custom hooksDB_NAME=container_directory

│       │   ├── lib/           # UtilitiesCORS_ORIGINS=http://localhost:3000

│       │   ├── providers/     # Context providersENVIRONMENT=development

│       │   └── types/         # TypeScript typesDEBUG=true

│       ├── public/            # Static assetsEOF

│       ├── tests/             # Test files```

│       └── package.json

├── packages/                   # Shared packages#### Web Configuration (`apps/web/.env.local`)

│   ├── eslint-config/         # ESLint configurations

│   ├── tailwind-config/       # Tailwind configurations```bash

│   ├── typescript-config/     # TypeScript configurationscd apps/web

│   └── ui/                    # Shared UI componentscat > .env.local << EOF

├── compose/                    # Docker Compose filesNEXT_PUBLIC_BACKEND_URL=http://localhost:8001/api/v1

├── docs/                       # DocumentationNEXT_PUBLIC_APP_URL=http://localhost:3000

├── turbo/                      # Turbo generatorsNEXT_PUBLIC_ENABLE_ANALYTICS=false

├── package.json               # Root package.jsonNODE_ENV=development

└── turbo.json                 # Turborepo configurationEOF

``````



## 🛠️ Development Workflow### 4. Seed Database



### Running the Application```bash

cd apps/api

```bashpython scripts/seed_data.py

# Development mode (with hot reload)```

yarn dev

Expected output:

# Build for production

yarn build```text

🌱 Starting database seeding...

# Start production server✅ Connected to MongoDB: container_directory

yarn start🗑️  Deleted 0 existing documents

✅ Inserted 15 images

# Run in Docker✅ Created indexes

make dev✅ Database seeding completed successfully!

``````



### Code Quality### 5. Start Development Servers



```bash#### Option A: Start All Services (Recommended)

# Run ESLint

yarn lint```bash

# From project root

# Fix linting issuesyarn dev

yarn lint --fix```



# Type checkingThis starts:

yarn type-check

- **Web** on http://localhost:3000

# Run all tests- **API** on http://localhost:8001

yarn test

#### Option B: Start Services Individually

# Run tests in watch mode

yarn test:watch**Terminal 1 - API:**



# Run tests with coverage```bash

yarn test:coveragecd apps/api

```python -m app.main

# Or with uvicorn directly:

### Clean Build Artifactsuvicorn app.main:app --reload --host 0.0.0.0 --port 8001

```

```bash

# Clean all build artifacts and caches**Terminal 2 - Web:**

yarn clean

```bash

# Clean Docker containerscd apps/web

make cleanyarn dev

``````



## 🔧 Configuration## 📁 Project Structure



### Environment Variables```text

/app/

The application uses environment variables for configuration. Create `.env.local` in `apps/web/` if you need custom settings:├── apps/

│   ├── web/                    # Next.js frontend

```bash│   │   ├── src/

# Optional environment variables│   │   │   ├── app/           # App Router pages

NEXT_PUBLIC_APP_URL=http://localhost:3000│   │   │   ├── components/    # React components

NEXT_PUBLIC_ENABLE_ANALYTICS=false│   │   │   ├── config/        # Configuration

NODE_ENV=development│   │   │   ├── constants/     # Constants

```│   │   │   ├── data/          # Data layer

│   │   │   ├── hooks/         # Custom hooks

### Turborepo Configuration│   │   │   ├── lib/           # Utilities

│   │   │   ├── providers/     # Context providers

The monorepo uses Turborepo for build orchestration. Configuration is in `turbo.json`:│   │   │   ├── services/      # API clients

│   │   │   └── types/         # TypeScript types

```json│   │   ├── public/            # Static assets

{│   │   ├── package.json

  "tasks": {│   │   └── tsconfig.json

    "build": { "dependsOn": ["^build"], "outputs": [".next/**"] },│   │

    "dev": { "cache": false, "persistent": true },│   └── api/                    # FastAPI backend

    "lint": { "dependsOn": ["^lint"] },│       ├── app/

    "type-check": { "dependsOn": ["^type-check"] },│       │   ├── core/          # Config, database

    "clean": { "cache": false }│       │   ├── models/        # Database models

  }│       │   ├── schemas/       # Pydantic schemas

}│       │   ├── routers/       # API endpoints

```│       │   ├── services/      # Business logic

│       │   └── utils/         # Helper functions

## 🧪 Testing│       ├── scripts/           # Utility scripts

│       ├── requirements.txt

### Unit Tests│       └── .env

│

```bash├── packages/

# Run all tests│   ├── ui/                    # Shared UI components

yarn test│   ├── typescript-config/     # Shared TS configs

│   ├── eslint-config/         # Shared lint rules

# Run specific test file│   └── tailwind-config/       # Shared Tailwind config

yarn test src/components/Header.test.tsx│

├── turbo.json                 # Turborepo configuration

# Watch mode├── package.json               # Root package.json

yarn test:watch└── README.md

```

# Coverage report

yarn test:coverage## 🔧 Development Workflows

```

### Frontend Development (Web)

### Integration Tests

#### Add a New Page

```bash

# Run integration tests```bash

yarn test:integrationcd apps/web/src/app

mkdir new-page

# Using Docker Composetouch new-page/page.tsx

docker-compose -f compose/docker-compose.test.yml up --abort-on-container-exit frontend-test```

```

Example page:

## 🎨 UI Development

```typescript

### Component Libraryexport default function NewPage() {

  return <div>New Page</div>;

The project uses **shadcn/ui** inspired components with **Radix UI** primitives:}

```

```bash

# Component location#### Add a New Component

apps/web/src/components/ui/

``````bash

cd apps/web/src/components

### Stylingtouch NewComponent.tsx

```

- **Framework**: Tailwind CSS

- **Configuration**: `apps/web/tailwind.config.ts`#### Use API Client

- **Global Styles**: `apps/web/src/app/globals.css`

- **Icons**: Lucide React```typescript

import { apiClient } from '@/services/api.client';

### Adding New Components

const data = await apiClient.get('/images');

```bash```

# Create component file

touch apps/web/src/components/MyComponent.tsx#### Run Type Checking



# Create test file```bash

touch apps/web/src/components/__tests__/MyComponent.test.tsxcd apps/web

```yarn type-check

```

## 📦 Package Management

#### Run Linting

### Adding Dependencies

```bash

```bashcd apps/web

# Add to specific workspaceyarn lint

cd apps/web```

yarn add <package-name>

### Backend Development (API)

# Add to root

yarn add -W <package-name>#### Project Structure



# Add dev dependency```text

yarn add -D <package-name>app/

```├── core/           # Core functionality

│   ├── config.py   # Settings

### Updating Dependencies│   └── database.py # DB connection

├── models/         # Database models

```bash├── schemas/        # Pydantic schemas

# Interactive upgrade├── routers/        # API routes

yarn upgrade-interactive --latest│   ├── health.py

│   └── images.py

# Update specific package└── services/       # Business logic

yarn upgrade <package-name>    └── image_service.py

``````



## 🏗️ Creating New Packages#### Add a New Endpoint



Use the Turborepo generator to scaffold new packages:1. **Create Schema** (`app/schemas/new_schema.py`):



```bash```python

# Run the generatorfrom pydantic import BaseModel

yarn gen

class NewItemResponse(BaseModel):

# Follow the prompts to create:    id: str

# - New workspace package    name: str

# - Shared library```

# - UI component library

```2. **Create Router** (`app/routers/new_router.py`):



## 🔄 Common Tasks```python

from fastapi import APIRouter

### Add New Container Imagefrom ..schemas.new_schema import NewItemResponse



1. Edit `apps/web/src/data/mockData.ts`router = APIRouter(prefix="/items", tags=["items"])

2. Add new image object to `dockerImages` array

3. Include logo URL, description, categories, etc.@router.get("/", response_model=list[NewItemResponse])

4. Test locally with `yarn dev`async def get_items():

    return []

### Update Styles```



1. Modify Tailwind config: `apps/web/tailwind.config.ts`3. **Register Router** (`app/main.py`):

2. Update global styles: `apps/web/src/app/globals.css`

3. Changes apply automatically in dev mode```python

from .routers import new_router

### Add New Pageapp.include_router(new_router.router, prefix=settings.API_V1_PREFIX)

```

1. Create file in `apps/web/src/app/`

2. Use Next.js App Router conventions#### Database Operations

3. Add metadata for SEO

4. Test navigation and routing```python

from app.core.database import database

## 🐛 Troubleshooting

# Get collection

### Port Already in Usecollection = database.get_collection("images")



```bash# Find documents

# Kill process on port 3000cursor = collection.find({"category": "featured"})

lsof -ti:3000 | xargs kill -9images = await cursor.to_list(length=100)



# Or use different port# Insert document

yarn dev -- -p 3001result = await collection.insert_one({"name": "test"})

```

# Update document

### TypeScript Errorsawait collection.update_one(

    {"_id": "node"},

```bash    {"$set": {"downloads": 1000}}

# Clear Next.js cache)

rm -rf apps/web/.next```



# Re-run type check#### Run Tests

yarn type-check

``````bash

cd apps/api

### Dependencies Out of Syncpytest

```

```bash

# Clean install#### Check API Documentation

yarn clean

rm -rf node_modulesVisit http://localhost:8001/api/docs for interactive API docs

yarn install

```## 🌐 API Endpoints



### Build Failures### Health



```bash- `GET /api/health` - Health check

# Clear all caches- `GET /api/` - API root

yarn clean

### Images

# Clean Docker volumes

docker-compose down -v- `GET /api/v1/images/` - Get all images

  - Query params: `category`, `search`, `page`, `page_size`

# Rebuild- `GET /api/v1/images/{name}` - Get image by name

yarn build- `GET /api/v1/images/categories/list` - Get categories

```- `GET /api/v1/images/stats/summary` - Get stats



## 📚 Additional Resources### Example Requests



### Documentation```bash

- [Next.js Documentation](https://nextjs.org/docs)# Get all images

- [React Documentation](https://react.dev/)curl http://localhost:8001/api/v1/images/

- [Turborepo Documentation](https://turbo.build/repo/docs)

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)# Filter by category

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)curl "http://localhost:8001/api/v1/images/?category=featured"



### Tools# Search images

- [Radix UI](https://www.radix-ui.com/)curl "http://localhost:8001/api/v1/images/?search=node"

- [Lucide Icons](https://lucide.dev/)

- [shadcn/ui](https://ui.shadcn.com/)# Pagination

curl "http://localhost:8001/api/v1/images/?page=1&page_size=10"

## 🤝 Contributing

# Get single image

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines on:curl http://localhost:8001/api/v1/images/node

- Code style and conventions

- Commit message format# Get categories

- Pull request processcurl http://localhost:8001/api/v1/images/categories/list

- Testing requirements

# Get stats

## 🔐 Securitycurl http://localhost:8001/api/v1/images/stats/summary

```

- All dependencies are regularly updated

- Snyk security scanning runs daily## 🧪 Testing

- GitHub Dependabot alerts enabled

- Follow [security best practices](../security/snyk-setup.md)### Frontend Testing



## 📝 Git Workflow```bash

cd apps/web

```bashyarn test

# Create feature branch```

git checkout -b feat/my-feature

### Backend Testing

# Make changes and commit

git add .```bash

git commit -m "feat: add new feature"cd apps/api

pytest -v

# Push and create PR```

git push origin feat/my-feature

```### Manual Testing Checklist



## 🚀 Deployment- [ ] Homepage loads

- [ ] Image list displays

### Docker Deployment- [ ] Category filtering works

- [ ] Search functionality works

```bash- [ ] Image detail page loads

# Build production image- [ ] API health check responds

docker-compose -f compose/docker-compose.prod.yml build- [ ] Database connection successful



# Start production services## 🐛 Troubleshooting

docker-compose -f compose/docker-compose.prod.yml up -d

```### MongoDB Connection Issues



### Vercel Deployment**Problem**: `pymongo.errors.ServerSelectionTimeoutError`



The project is optimized for Vercel deployment:**Solution**:



```bash```bash

# Install Vercel CLI# Check if MongoDB is running

npm i -g vercelsudo systemctl status mongod



# Deploy# Start MongoDB

vercelsudo systemctl start mongod



# Deploy to production# Check connection

vercel --prodmongosh

``````



## 💡 Tips and Best Practices### Port Already in Use



1. **Use TypeScript strictly** - Enable all strict checks**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

2. **Write tests** - Aim for >80% coverage

3. **Follow conventions** - Use conventional commits**Solution**:

4. **Keep components small** - Single responsibility principle

5. **Use hooks wisely** - Extract reusable logic```bash

6. **Optimize images** - Use Next.js Image component# Find process using port

7. **Monitor performance** - Use React DevToolslsof -i :3000

8. **Document code** - Add JSDoc comments for complex logic

# Kill process

## 🆘 Getting Helpkill -9 <PID>

```

- **Issues**: [GitHub Issues](https://github.com/broadsage/containers/issues)

- **Discussions**: [GitHub Discussions](https://github.com/broadsage/containers/discussions)### Module Not Found

- **Documentation**: [docs/](../)

**Problem**: `ModuleNotFoundError: No module named 'app'`

---

**Solution**:

Happy coding! 🎉

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
