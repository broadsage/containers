# 🚀 Broadsage Container Image Store

[![Version](https://img.shields.io/github/v/release/broadsage/containers?color=blue&label=version)](https://github.com/broadsage/containers/releases)
[![License](https://img.shields.io/github/license/broadsage/containers?color=green)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/broadsage/containers/ci.yml?branch=main)](https://github.com/broadsage/containers/actions)

Secure, minimal container images with comprehensive vulnerability scanning and SBOM support. A modern monorepo for browsing and managing production-ready container images.

## ✨ Features

- 🔐 **Zero vulnerabilities** with daily automated scanning
- 📋 **Complete SBOM** for supply chain transparency  
- �️ **15+ curated images** for production use
- 🔍 **Advanced filtering** by category and security features
- 🏛️ **FIPS compliance** for regulated environments
- 🌐 **Multi-architecture** support (x86_64, ARM64)

## 📁 Structure

```bash
containers/
├── apps/
│   ├── web/          # Next.js frontend (port 3000)  
│   └── api/          # FastAPI backend (port 8001)
├── packages/         # Shared configurations
└── docs/             # Documentation
```

## 🚀 Quick Start

**Prerequisites:** Node.js 18+, Yarn, Python 3.8+

```bash
# Install and start development
git clone https://github.com/broadsage/containers.git
cd containers
yarn install
yarn dev
```

**Services:**

- Frontend: <http://localhost:3000>
- Backend API: <http://localhost:8001>

## 🛠️ Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS  
**Backend:** FastAPI, Python, MongoDB  
**Tools:** Turborepo, Docker, GitHub Actions

## 📝 Commands

```bash
yarn dev          # Start development
yarn build        # Build for production  
yarn lint         # Lint and format
yarn test         # Run tests
make dev          # Docker development
```

## � Available Images

**Categories:** Featured • Starter • AI/ML • Application • Base • FIPS  
**Examples:** nginx, node, python, tensorflow, alpine, ubuntu  
**Features:** Multi-arch, versioned, security-hardened, regularly updated

## 📚 Documentation

- [🚀 Development Setup](./docs/development/development.md)
- [📦 Release Management](./docs/guides/release-management.md)  
- [🤝 Contributing](./CONTRIBUTING.md)

## 🤝 Contributing

```bash
git checkout -b feat/new-feature
git commit -m "feat: add new feature"  # Use conventional commits
# Create PR → Automatic release
```

See [Contributing Guide](./CONTRIBUTING.md) for details.
