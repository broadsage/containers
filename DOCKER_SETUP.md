# Docker Setup Guide

## Overview

This project uses Docker and Docker Compose to provide consistent development, testing, and production environments.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Make (optional, for convenience commands)

## Quick Start

### Development Environment

```bash
# Start all services
make dev

# Or without make
docker-compose up -d
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- MongoDB: mongodb://localhost:27017

### Stop Services

```bash
make down
# or
docker-compose down
```

## Docker Compose Files

### docker-compose.yml (Development)
- **Purpose**: Local development with hot-reload
- **Features**:
  - Volume mounts for live code changes
  - Debug mode enabled
  - Detailed logging
- **Usage**: `docker-compose up`

### docker-compose.test.yml (Testing)
- **Purpose**: Run automated tests
- **Features**:
  - Isolated test database
  - Coverage reporting
  - CI/CD compatible
- **Usage**: `docker-compose -f docker-compose.test.yml up`

### docker-compose.prod.yml (Production)
- **Purpose**: Production deployment
- **Features**:
  - Optimized builds
  - Resource limits
  - Health checks
  - Nginx reverse proxy
- **Usage**: `docker-compose -f docker-compose.prod.yml up -d`

## Service Details

### Backend (FastAPI)
- **Port**: 8001
- **Hot Reload**: Yes (development)
- **Health Check**: http://localhost:8001/health
- **Dockerfile**: `backend/Dockerfile`

### Frontend (Next.js)
- **Port**: 3000
- **Hot Reload**: Yes (development)
- **Health Check**: http://localhost:3000
- **Dockerfile**: `apps/web/Dockerfile`

### MongoDB
- **Port**: 27017
- **Version**: 7
- **Data Persistence**: Yes (Docker volumes)
- **Health Check**: mongosh ping command

## Development Workflow

### 1. Initial Setup
```bash
# Clone repository
git clone <repo-url>
cd openhub-container-registry

# Copy environment variables
cp .env.example .env

# Build and start services
make build
make dev
```

### 2. View Logs
```bash
# All services
make logs

# Specific service
make logs-backend
make logs-frontend
make logs-mongodb
```

### 3. Run Tests
```bash
# All tests
make test

# Backend only
make test-backend

# Frontend only
make test-frontend

# Integration tests
make test-integration
```

### 4. Database Operations
```bash
# Access MongoDB shell
make db-shell

# Seed sample data
make db-seed
```

## Multi-Stage Builds

### Backend Dockerfile Stages
1. **base**: Common dependencies
2. **development**: Dev dependencies + hot reload
3. **test**: Test dependencies + test execution
4. **production**: Optimized for production

### Frontend Dockerfile Stages
1. **base**: Node.js + dependencies
2. **development**: Dev server with hot reload
3. **test**: Test execution environment
4. **builder**: Build optimized production bundle
5. **production**: Minimal runtime image

## Environment Variables

### Required Variables
- `MONGO_URL`: MongoDB connection string
- `PORT`: Backend server port (default: 8001)
- `NEXT_PUBLIC_BACKEND_URL`: Backend API URL for frontend

### Optional Variables
- `DEBUG`: Enable debug mode (default: False)
- `LOG_LEVEL`: Logging level (default: INFO)
- `SECRET_KEY`: Application secret key (production)

See `.env.example` for complete list.

## Health Checks

All services include health checks:
- **Backend**: HTTP GET /health endpoint
- **Frontend**: HTTP GET / endpoint
- **MongoDB**: mongosh ping command

Check service health:
```bash
make health
```

## Networking

Services communicate through a Docker bridge network:
- Network name: `openhub-network`
- Internal DNS: Service names (backend, frontend, mongodb)
- External access: Published ports

## Volume Management

### Development Volumes
- Code mounted for hot-reload
- Node modules excluded
- MongoDB data persisted

### Production Volumes
- Only MongoDB data persisted
- Application code baked into images
- No volume mounts for security

## Troubleshooting

### Port Conflicts
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :8001
lsof -i :27017

# Stop conflicting services
make down
```

### Container Issues
```bash
# Restart services
make restart

# View logs for errors
make logs

# Rebuild from scratch
make clean
make build
make dev
```

### Database Issues
```bash
# Access MongoDB shell
make db-shell

# Check database status
docker exec openhub-mongodb mongosh --eval "db.runCommand({ ping: 1 })"
```

### Clean Start
```bash
# Remove all containers, volumes, and images
make clean-all

# Rebuild everything
make build
make dev
```

## Production Deployment

### Prerequisites
- Set production environment variables
- Configure SSL certificates
- Update nginx configuration

### Deploy
```bash
# Copy and configure environment
cp .env.example .env.prod
# Edit .env.prod with production values

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Best Practices

1. **Never commit .env files** - Use .env.example as template
2. **Use multi-stage builds** - Keep images small
3. **Implement health checks** - Monitor service health
4. **Use named volumes** - Persist important data
5. **Pin image versions** - Ensure reproducibility
6. **Set resource limits** - Prevent resource exhaustion
7. **Use non-root users** - Improve security
8. **Enable logging** - Monitor and debug issues

## CI/CD Integration

See `.github/workflows/` for:
- Automated testing on PR
- Docker image building
- Security scanning
- Integration tests

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## Support

For issues or questions:
1. Check logs: `make logs`
2. Review this guide
3. Check GitHub Issues
4. Contact team
