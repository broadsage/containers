# Container Directory Monorepo

Enterprise-scale Next.js + Turborepo monorepo for the Container Directory application.

## 📁 Project Structure

```
container-directory-monorepo/
├── apps/
│   ├── web/          # Main Next.js application (port 3000)
│   ├── docs/         # Documentation Next.js app (port 3002)
│   └── api/          # FastAPI backend (port 8001)
├── packages/
│   ├── ui/           # Shared React components
│   ├── typescript-config/ # Shared TypeScript configurations
│   ├── eslint-config/     # Shared ESLint rules
│   └── tailwind-config/   # Shared Tailwind configuration
└── turbo.json        # Turborepo configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Yarn 1.22.22
- Python 3.8+ (for backend)

### Installation

```bash
# Install all dependencies
yarn install
```

### Development

```bash
# Run all apps in development mode
yarn dev

# Or run individual apps:
cd apps/web && yarn dev      # Main app on port 3000
cd apps/docs && yarn dev     # Docs on port 3002
```

### Building

```bash
# Build all apps
yarn build
```

## 📦 Apps & Packages

See individual README files in each package for detailed documentation.

## 🔗 Ports

- **Web App**: http://localhost:3000
- **Docs**: http://localhost:3002
- **API**: http://localhost:8001
