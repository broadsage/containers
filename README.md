# 🚀 Broadsage Container Image Store

> **Secure, minimal container images with comprehensive vulnerability scanning and Software Bill of Materials (SBOM) support.**

A modern, enterprise-grade monorepo for browsing, discovering, and managing secure container images with real-time vulnerability scanning and detailed security insights.

[![Version](https://img.shields.io/github/v/release/broadsage/containers?color=blue&label=version)](https://github.com/broadsage/containers/releases)
[![License](https://img.shields.io/github/license/broadsage/containers?color=green)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/broadsage/containers/ci.yml?branch=main)](https://github.com/broadsage/containers/actions)
[![Security Rating](https://img.shields.io/badge/security-A%2B-brightgreen)](https://github.com/broadsage/containers/security)

## ✨ Key Features

### 🔐 **Security-First Approach**

- **Zero Known Vulnerabilities**: Daily automated scanning with industry-standard tools
- **Comprehensive SBOM**: Full Software Bill of Materials for transparency
- **FIPS Compliance**: Specialized images for regulated environments
- **Minimal Attack Surface**: Essential components only to reduce security risks
- **Rapid Security Response**: Patches applied within hours of disclosure

### 🎯 **Rich User Experience**

- **15+ Curated Images**: Production-ready containers for diverse use cases
- **Advanced Filtering**: Search by category, badge type, and security features
- **Detailed Insights**: Comprehensive image information with provenance data
- **Multi-Architecture**: x86_64 and ARM64 support for modern deployments
- **Real-Time Updates**: Live vulnerability status and version information

### 🏗️ **Enterprise Architecture**

- **Turborepo Monorepo**: Scalable, maintainable codebase structure
- **Full-Stack TypeScript**: End-to-end type safety and developer experience
- **Modern React**: Next.js 15 with App Router and React 19
- **API-First Design**: RESTful FastAPI backend with MongoDB
- **CI/CD Integration**: Automated testing, security scanning, and deployment

## 📁 Project Structure

```bash
containers/
├── 🎨 apps/
│   ├── web/                    # Next.js 15 Frontend (Port 3000)
│   │   ├── src/app/           # App Router pages
│   │   ├── src/components/    # React components
│   │   ├── src/hooks/         # Custom React hooks
│   │   └── src/services/      # API client services
│   └── api/                   # FastAPI Backend (Port 8001)
│       ├── app/core/          # Core configurations
│       ├── app/models/        # Database models
│       ├── app/routers/       # API endpoints
│       ├── app/schemas/       # Pydantic schemas
│       └── app/services/      # Business logic
├── 📦 packages/
│   ├── ui/                    # Shared UI components
│   ├── typescript-config/     # TypeScript configurations
│   ├── eslint-config/         # Linting rules
│   └── tailwind-config/       # Design system
├── 📚 docs/                   # Comprehensive documentation
│   ├── development/           # Development guides
│   └── guides/               # User and contribution guides
└── 🔧 Configuration Files
    ├── turbo.json            # Turborepo configuration
    ├── docker-compose.yml    # Development environment
    └── Makefile             # Development shortcuts
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Yarn** 1.22.22
- **Python** 3.8+ (for backend)
- **Docker** (optional, for containerized development)

### 1️⃣ Installation

```bash
# Clone the repository
git clone https://github.com/broadsage/containers.git
cd containers

# Install all dependencies
yarn install

# Install Python dependencies (for API development)
cd apps/api && pip install -r requirements.txt
```

### 2️⃣ Development

```bash
# 🚀 Start all services (recommended)
yarn dev

# 🎯 Or start services individually:
cd apps/web && yarn dev      # Frontend on http://localhost:3000
cd apps/api && uvicorn server:app --reload --port 8001  # API on http://localhost:8001

# 🐳 Docker-based development
make dev                     # Start all services with Docker
```

### 3️⃣ Building

```bash
# Build all applications
yarn build

# Build specific application
cd apps/web && yarn build
cd apps/api && pip install -r requirements.txt
```

## �️ Technology Stack

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.x | React framework with App Router |
| **React** | 19.x | UI library with modern features |
| **TypeScript** | Latest | Type safety and developer experience |
| **Tailwind CSS** | Latest | Utility-first CSS framework |
| **Radix UI** | Latest | Accessible component primitives |

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **FastAPI** | Latest | Modern Python web framework |
| **Python** | 3.8+ | Backend programming language |
| **MongoDB** | Latest | Document database |
| **Pydantic** | Latest | Data validation and settings |
| **Uvicorn** | Latest | ASGI server implementation |

### DevOps & Tooling

| Technology | Purpose |
|------------|---------|
| **Turborepo** | Monorepo management and build optimization |
| **Docker** | Containerization and development environment |
| **GitHub Actions** | CI/CD pipelines and automation |
| **Semantic Release** | Automated versioning and releases |
| **ESLint + Prettier** | Code quality and formatting |
| **Husky** | Git hooks for quality gates |

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start all applications in development mode |
| `yarn build` | Build all applications for production |
| `yarn lint` | Lint all packages and fix issues |
| `yarn type-check` | Run TypeScript type checking |
| `yarn clean` | Clean all build artifacts |
| `yarn format` | Format code with Prettier |
| `yarn release` | Create automated semantic release |
| `make dev` | Start Docker development environment |
| `make test` | Run all tests in containers |
| `make clean` | Clean Docker resources |

## 🌐 Service Endpoints

| Service | URL | Description |
|---------|-----|-------------|
| **Web App** | <http://localhost:3000> | Main frontend application |
| **API** | <http://localhost:8001> | Backend API server |
| **API Docs** | <http://localhost:8001/docs> | Interactive API documentation |
| **MongoDB** | `mongodb://localhost:27017` | Database connection |

## 🔐 Security & Compliance

### Security Scanning

- **Daily Vulnerability Scans**: Automated scanning using Trivy and industry-standard databases
- **CVE Monitoring**: Real-time tracking of Common Vulnerabilities and Exposures
- **SBOM Generation**: Complete Software Bill of Materials for supply chain transparency
- **Security Audits**: Regular audits with tools like Bandit and Safety for Python backend
- **FIPS 140-2 Compliance**: Specialized images for government and regulated industries

### Security Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Zero-Day Protection** | Rapid response to newly discovered vulnerabilities | ✅ Active |
| **Multi-Architecture Scanning** | Security validation for both x86_64 and ARM64 | ✅ Active |
| **Dependency Analysis** | Deep scanning of all package dependencies | ✅ Active |
| **Container Signing** | Cryptographic signatures for image authenticity | ✅ Active |
| **Runtime Security** | Minimal attack surface with hardened base images | ✅ Active |

## 📊 Image Categories

### Available Container Images

| Category | Count | Description | Examples |
|----------|-------|-------------|----------|
| **Featured** | 5+ | Curated, most popular images | nginx, node, python |
| **Starter** | 3+ | Perfect for getting started | alpine, busybox |
| **AI/ML** | 2+ | Machine learning and AI workloads | tensorflow, pytorch |
| **Application** | 3+ | Ready-to-deploy applications | wordpress, redis |
| **Base** | 2+ | Foundation images for custom builds | ubuntu, debian |
| **FIPS** | 1+ | Government-grade compliance | fips-enabled variants |

### Image Features

- **Multi-Architecture Support**: Native builds for x86_64 and ARM64
- **Version Pinning**: Semantic versioning with multiple tag options
- **Size Optimization**: Multiple variants (full, slim, alpine) for different needs
- **Security Hardening**: Minimal dependencies and security-focused configurations
- **Regular Updates**: Automated rebuilds when base images or dependencies update

## 📚 Documentation

### Quick Links

- [� Getting Started](./docs/development/development.md) - Complete development setup
- [� Release Management](./docs/guides/release-management.md) - Automated release process
- [🤝 Contributing Guidelines](./CONTRIBUTING.md) - How to contribute to the project
- [� Changelog](./CHANGELOG.md) - Version history and release notes

### Component Documentation

- [**Web App**](./apps/web/README.md) - Next.js frontend application
- [**API**](./apps/api/README.md) - FastAPI backend service
- [**UI Package**](./packages/ui/README.md) - Shared component library
- [**Configurations**](./packages/) - Shared configurations and tooling

### API Documentation

- **Interactive Docs**: <http://localhost:8001/docs> (when running locally)
- **OpenAPI Schema**: Auto-generated API documentation with FastAPI
- **Endpoint Testing**: Built-in testing interface for all API endpoints

## 🚀 Release Strategy

### Automated Semantic Versioning

This project uses **semantic-release** for automated versioning and releases:

| Commit Type | Version Bump | Example |
|-------------|--------------|---------|
| `fix:` | Patch (1.0.1) | Bug fixes and patches |
| `feat:` | Minor (1.1.0) | New features |
| `feat!:` or `BREAKING CHANGE:` | Major (2.0.0) | Breaking changes |

### Release Channels

| Channel | Purpose | Trigger | Docker Tags |
|---------|---------|---------|-------------|
| **Stable** | Production releases | Merge to `main` | `latest`, `v1.2.3` |
| **Beta** | Release candidates | Manual workflow | `beta`, `v1.2.3-beta.1` |
| **Development** | Development builds | Feature branches | `dev`, `dev-<sha>` |

### Contributing

```bash
# 🔄 Simple 3-step workflow:
git checkout -b feat/awesome-feature
git commit -m "feat: add awesome feature"  # Use conventional commits
# Create PR to main → Automatic release triggers
```

## 🎯 Production Features

### Enterprise-Ready

- ✅ **Monorepo Architecture**: Scalable codebase with Turborepo
- ✅ **Full TypeScript**: End-to-end type safety
- ✅ **Component Library**: Reusable UI components with Radix UI
- ✅ **API-First Design**: RESTful backend with comprehensive documentation
- ✅ **Error Boundaries**: Graceful error handling and recovery
- ✅ **Loading States**: Smooth user experience with skeleton screens
- ✅ **Responsive Design**: Mobile-first, accessible user interface

### Performance & Scalability

- ✅ **Build Optimization**: Turborepo caching and parallel builds
- ✅ **Code Splitting**: Automatic code splitting with Next.js
- ✅ **Image Optimization**: Next.js Image component with WebP support
- ✅ **API Optimization**: Async FastAPI with connection pooling
- ✅ **Caching Strategy**: Multiple layers of caching for optimal performance
- ✅ **Hot Module Replacement**: Fast development experience

### Quality Assurance

- ✅ **Automated Testing**: Unit, integration, and E2E tests
- ✅ **Code Quality**: ESLint, Prettier, and TypeScript checks
- ✅ **Security Scanning**: Automated vulnerability scanning in CI/CD
- ✅ **Dependency Management**: Automated dependency updates with security checks
- ✅ **Git Hooks**: Pre-commit hooks for code quality enforcement
- ✅ **Conventional Commits**: Standardized commit messages for clarity

## 🧪 Testing Strategy

### Comprehensive Test Coverage

```bash
# Run all tests
yarn test                    # All test suites
make test                    # Docker-based testing

# Individual test suites
cd apps/web && yarn test     # Frontend tests
cd apps/api && pytest       # Backend tests
make test-integration        # Integration tests
```

### Test Types

| Test Type | Framework | Coverage | Command |
|-----------|-----------|----------|---------|
| **Unit Tests** | Jest (Frontend), pytest (Backend) | Component/Function level | `yarn test:unit` |
| **Integration Tests** | Jest + Testing Library | API + UI integration | `yarn test:integration` |
| **E2E Tests** | Playwright | Full user workflows | `yarn test:e2e` |
| **Security Tests** | Bandit, Safety | Vulnerability scanning | `yarn test:security` |

## 🐳 Docker & Deployment

### Development Environment

```bash
# Quick start with Docker
make dev                     # Start all services
make logs                    # View logs
make clean                   # Clean up resources

# Individual services
docker-compose up web        # Frontend only
docker-compose up api        # Backend only
docker-compose up mongodb    # Database only
```

### Production Deployment

```bash
# Production build
make prod-up                 # Start production environment
docker-compose -f docker-compose.prod.yml up -d

# Health checks
curl http://localhost:3000/health    # Frontend health
curl http://localhost:8001/health    # Backend health
```

### Container Images

All images are automatically built and published to GitHub Container Registry:

- `ghcr.io/broadsage/containers/web:latest` - Frontend application
- `ghcr.io/broadsage/containers/api:latest` - Backend API

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/yourusername/containers.git`
3. **Create** a feature branch: `git checkout -b feat/amazing-feature`
4. **Make** your changes with tests
5. **Commit** using conventional commits: `git commit -m "feat: add amazing feature"`
6. **Push** to your fork: `git push origin feat/amazing-feature`
7. **Create** a Pull Request

### Development Guidelines

- Follow [Conventional Commits](https://conventionalcommits.org/) specification
- Add tests for new features and bug fixes
- Update documentation for API changes
- Ensure all CI checks pass before submitting PR
- Use TypeScript for type safety

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support & Community

### Getting Help

- **📖 Documentation**: Comprehensive guides in the [docs](./docs) directory
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/broadsage/containers/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/broadsage/containers/discussions)
- **❓ Questions**: [GitHub Discussions Q&A](https://github.com/broadsage/containers/discussions/categories/q-a)

### Community

- **🌟 Star** this repository if you find it useful
- **🔗 Share** with others who might benefit
- **🤝 Contribute** to make it even better
- **📢 Follow** us for updates and announcements

---

## 🏢 Built by the Broadsage Team

[🌐 Website](https://broadsage.com) • [📖 Documentation](./docs) • [🐙 GitHub](https://github.com/broadsage/containers) • [📧 Contact](mailto:support@broadsage.com)
