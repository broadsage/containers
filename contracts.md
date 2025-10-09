# API Contracts & Backend Implementation Plan

## Current Mock Data Status

### Mock Data in `/app/frontend/src/mockData.js`:
- **Docker Images**: 15 container images with metadata
- **Vulnerabilities**: Generated per image with severity levels
- **SBOM**: Generated per image with package details
- **Statistics**: Global stats (projects, versions, images, builds)
- **Categories**: Image categorization

## API Endpoints to Implement

### 1. Images API

#### GET `/api/images`
**Description**: Get all docker images with filtering
**Query Parameters**:
- `category` (optional): Filter by category (featured, starter, ai, etc.)
- `search` (optional): Search by name or description
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset

**Response**:
```json
{
  "images": [
    {
      "id": 1,
      "name": "node",
      "logo": "url",
      "lastChanged": "11 hours ago",
      "latestTag": "24.10.0",
      "isFree": true,
      "category": "featured",
      "description": "...",
      "downloads": 1250000,
      "size": "45MB",
      "fips": false
    }
  ],
  "total": 15
}
```

#### GET `/api/images/:id`
**Description**: Get single image details
**Response**:
```json
{
  "id": 1,
  "name": "node",
  "logo": "url",
  "lastChanged": "11 hours ago",
  "latestTag": "24.10.0",
  "isFree": true,
  "category": "featured",
  "description": "...",
  "downloads": 1250000,
  "size": "45MB",
  "fips": false
}
```

### 2. Vulnerabilities API

#### GET `/api/images/:id/vulnerabilities`
**Description**: Get vulnerabilities for specific image
**Response**:
```json
{
  "vulnerabilities": [
    {
      "severity": "critical",
      "cve": "CVE-2024-1234",
      "package": "openssl",
      "version": "1.1.1",
      "fixed": "1.1.1w",
      "score": 9.8
    }
  ],
  "counts": {
    "critical": 1,
    "high": 2,
    "medium": 1,
    "low": 1
  }
}
```

### 3. SBOM API

#### GET `/api/images/:id/sbom`
**Description**: Get Software Bill of Materials for specific image
**Response**:
```json
{
  "packages": [
    {
      "name": "openssl",
      "version": "1.1.1w",
      "license": "Apache-2.0",
      "type": "library"
    }
  ]
}
```

### 4. Statistics API

#### GET `/api/stats`
**Description**: Get global statistics
**Response**:
```json
{
  "projects": 1756,
  "versions": 105204,
  "images": 208548,
  "builds": 308074969
}
```

### 5. Categories API

#### GET `/api/categories`
**Description**: Get all categories
**Response**:
```json
{
  "categories": [
    {
      "id": "featured",
      "name": "Featured",
      "count": 5
    }
  ]
}
```

## MongoDB Collections

### 1. `images` Collection
```javascript
{
  _id: ObjectId,
  imageId: Number,
  name: String,
  logo: String,
  lastChanged: String,
  latestTag: String,
  isFree: Boolean,
  category: String,
  description: String,
  downloads: Number,
  size: String,
  fips: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. `vulnerabilities` Collection
```javascript
{
  _id: ObjectId,
  imageId: Number,
  severity: String, // critical, high, medium, low
  cve: String,
  package: String,
  version: String,
  fixed: String,
  score: Number,
  createdAt: Date
}
```

### 3. `sbom` Collection
```javascript
{
  _id: ObjectId,
  imageId: Number,
  packageName: String,
  version: String,
  license: String,
  type: String, // library, runtime, application, etc.
  createdAt: Date
}
```

### 4. `stats` Collection
```javascript
{
  _id: ObjectId,
  projects: Number,
  versions: Number,
  images: Number,
  builds: Number,
  lastUpdated: Date
}
```

## Frontend Integration Changes

### Files to Update:

1. **`/app/frontend/src/pages/HomePage.jsx`**
   - Replace `import { dockerImages } from '../mockData'` with API call to `/api/images`
   - Replace `filteredImages` logic with API filtering parameters
   - Add loading states

2. **`/app/frontend/src/pages/ImageDetailPage.jsx`**
   - Replace `dockerImages.find()` with API call to `/api/images/:id`
   - Replace `generateVulnerabilities()` with API call to `/api/images/:id/vulnerabilities`
   - Replace `generateSBOM()` with API call to `/api/images/:id/sbom`
   - Add loading states

3. **`/app/frontend/src/components/HeroSection.jsx`**
   - Replace `import { stats } from '../mockData'` with API call to `/api/stats`
   - Add loading state for stats

## Backend Implementation Steps

1. **Create MongoDB Models** (`/app/backend/models/`)
   - `image.py` - Image model
   - `vulnerability.py` - Vulnerability model
   - `sbom.py` - SBOM model
   - `stats.py` - Stats model

2. **Create API Routes** (`/app/backend/routes/`)
   - `images.py` - Image CRUD operations
   - `vulnerabilities.py` - Vulnerability operations
   - `sbom.py` - SBOM operations
   - `stats.py` - Stats operations

3. **Create Services** (`/app/backend/services/`)
   - `image_service.py` - Business logic for images
   - `vulnerability_service.py` - Business logic for vulnerabilities
   - `sbom_service.py` - Business logic for SBOM

4. **Seed Database**
   - Create script to populate MongoDB with mock data from `mockData.js`
   - `/app/backend/seed_data.py`

## Testing Strategy

1. **Backend Testing**
   - Test all API endpoints with curl
   - Verify response formats match contracts
   - Test filtering and search functionality

2. **Frontend Integration Testing**
   - Test image listing page
   - Test image detail page
   - Test search functionality
   - Test category filtering

## Notes

- All data is currently **MOCKED** in frontend
- Backend will use same mock data structure
- Frontend API integration will replace mock imports with axios calls
- Add proper error handling for API failures
- Add loading states for better UX
