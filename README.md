# Container Directory Monorepo

Enterprise-scale Next.js + Turborepo monorepo for secure container image directory.

## 📁 Project Structure

```
container-directory/
├── apps/
│   ├── web/          # Main Next.js 15 application (port 3000)
│   └── api/          # FastAPI backend (port 8001)
├── packages/
│   ├── ui/           # Shared React components
│   ├── typescript-config/ # Shared TypeScript configurations
│   ├── eslint-config/     # Shared ESLint rules
│   └── tailwind-config/   # Shared Tailwind configuration
└── turbo.json        # Turborepo configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- Yarn 1.22.22
- Python 3.8+ (for backend)

### Installation

```bash
# Install all dependencies
yarn install

# Install Python dependencies
cd apps/api && pip install -r requirements.txt
```

### Development

```bash
# Run all apps concurrently
yarn dev

# Or run individually:
cd apps/web && yarn dev      # Web app on port 3000
cd apps/api && uvicorn server:app --reload --port 8001  # API
```

### Building

```bash
# Build all apps
yarn build

# Build specific app
cd apps/web && yarn build
```

## 📦 Architecture

### Apps

- **web** - Next.js 15 application with App Router, TypeScript, and Tailwind CSS
- **api** - FastAPI backend with MongoDB

### Packages

- **@repo/ui** - Shared React components with Radix UI primitives
- **@repo/typescript-config** - Centralized TypeScript configurations
- **@repo/eslint-config** - Shared ESLint rules
- **@repo/tailwind-config** - Unified Tailwind theme

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, MongoDB
- **Monorepo**: Turborepo
- **UI**: Radix UI, shadcn/ui
- **Build**: Turbo, ESBuild
- **Package Manager**: Yarn Workspaces

## 📝 Available Scripts

- `yarn dev` - Start all apps in development mode
- `yarn build` - Build all apps for production
- `yarn lint` - Lint all packages
- `yarn type-check` - Type check all TypeScript code
- `yarn clean` - Clean all build artifacts

## 🔗 Ports

- **Web**: http://localhost:3000
- **API**: http://localhost:8001

## 📖 Documentation

See individual package READMEs for detailed documentation:
- [Web App](./apps/web/README.md)
- [API](./apps/api/README.md)
- [UI Package](./packages/ui/README.md)

## 🏗️ Enterprise Features

- ✅ Monorepo architecture with Turborepo
- ✅ Full TypeScript type safety
- ✅ Shared component library
- ✅ Centralized configuration
- ✅ Optimized build caching
- ✅ Hot module replacement
- ✅ Error boundaries
- ✅ Loading states
- ✅ Custom hooks
- ✅ API client abstraction
- ✅ Environment validation
