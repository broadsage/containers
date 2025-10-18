.PHONY: help dev build test up down logs clean

# Default target
help:
	@echo "Broadsage Container Image Store - Development Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev              - Start development environment"
	@echo "  make build            - Build all Docker images"
	@echo "  make up               - Start all services"
	@echo "  make down             - Stop all services"
	@echo "  make logs             - View logs from all services"
	@echo "  make logs-frontend    - View frontend logs"
	@echo ""
	@echo "Testing:"
	@echo "  make test             - Run all tests"
	@echo "  make test-frontend    - Run frontend tests"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean            - Remove all containers and volumes"
	@echo "  make clean-images     - Remove all images"
	@echo ""

# Development
dev:
	docker-compose up -d
	@echo "✅ Development environment started"
	@echo "Frontend: http://localhost:3000"

build:
	docker-compose build
	@echo "✅ All images built successfully"

up:
	docker-compose up -d
	@echo "✅ All services started"

down:
	docker-compose down
	@echo "✅ All services stopped"

restart:
	docker-compose restart
	@echo "✅ All services restarted"

# Logs
logs:
	docker-compose logs -f

logs-frontend:
	docker-compose logs -f frontend

# Testing
test:
	docker-compose -f docker-compose.test.yml up --abort-on-container-exit
	@echo "✅ All tests completed"

test-frontend:
	docker-compose -f docker-compose.test.yml up --abort-on-container-exit frontend-test
	@echo "✅ Frontend tests completed"

# Production
prod-up:
	docker-compose -f docker-compose.prod.yml up -d
	@echo "✅ Production environment started"

prod-down:
	docker-compose -f docker-compose.prod.yml down
	@echo "✅ Production environment stopped"

prod-logs:
	docker-compose -f docker-compose.prod.yml logs -f

# Cleanup
clean:
	docker-compose down -v
	@echo "✅ All containers and volumes removed"

clean-images:
	docker-compose down --rmi all
	@echo "✅ All images removed"

clean-all:
	docker-compose down -v --rmi all
	@echo "✅ Complete cleanup done"

# Health Check
health:
	@echo "Checking service health..."
	@curl -f http://localhost:3000 && echo "✅ Frontend healthy" || echo "❌ Frontend unhealthy"

# Status
status:
	docker-compose ps
