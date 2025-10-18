# Web App - Container Directory

Next.js 15 application for browsing secure container images.

## 🎯 Features

- Browse 15+ Docker images with detailed information
- Filter by category (Featured, Starter, AI, Application, Base, FIPS)
- Search functionality across image names and descriptions
- Grid and list view modes
- Image detail pages with comprehensive information
- Responsive design with Tailwind CSS
- Server-side rendering (SSR) and Static Site Generation (SSG)
- TypeScript for type safety
- Error boundaries for graceful error handling
- Loading states and skeleton screens

## 📁 Project Structure

```text
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with metadata
│   ├── page.tsx      # Home page
│   ├── not-found.tsx # 404 page
│   └── image/        # Dynamic image detail pages
├── components/       # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ModernHero.tsx
│   ├── ModernCategoryFilter.tsx
│   ├── CleanImageCard.tsx
│   ├── TabNavigation.tsx
│   ├── ErrorBoundary.tsx
│   └── Loading.tsx
├── config/          # Configuration files
│   └── env.ts       # Environment validation
├── constants/       # App constants
│   └── index.ts     # Routes, colors, pagination
├── data/           # Mock data
│   └── mockData.ts  # Docker image data
├── hooks/          # Custom React hooks
│   └── useImageFilters.ts
├── lib/            # Utility functions
│   └── utils.ts
├── providers/      # React context providers
│   └── index.tsx
└── types/          # TypeScript type definitions
    └── index.ts
```

## 🚀 Getting Started

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### Building

```bash
yarn build
yarn start
```

## 🔧 Configuration

### Environment Variables

Optional variables (create `.env.local` if needed):

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## 📝 Available Scripts

```bash
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server
yarn lint             # Run ESLint
yarn type-check       # Run TypeScript compiler
yarn test             # Run Jest tests
yarn test:watch       # Run tests in watch mode
yarn test:coverage    # Run tests with coverage
yarn clean            # Clean build artifacts
```

## 🎨 Styling

- **Framework**: Tailwind CSS
- **UI Library**: Radix UI primitives
- **Components**: shadcn/ui inspired components
- **Icons**: Lucide React

## 🧪 Best Practices

- TypeScript strict mode enabled
- ESLint for code quality
- Error boundaries for error handling
- Custom hooks for reusable logic
- Mock data architecture for development
- Proper loading and error states
- SEO optimized with metadata
- Accessibility (a11y) compliant

## 📦 Dependencies

### Core

- Next.js 15
- React 19
- TypeScript 5.8

### UI

- Tailwind CSS
- Radix UI
- Lucide React (icons)

### Utilities

- clsx & tailwind-merge (className utilities)
- React Hook Form (forms)
- Zod (validation)

## 🔗 Related

- [Main README](../../README.md)
- [UI Package](../../packages/ui/README.md)
- [Contributing Guide](../../CONTRIBUTING.md)
- Zod (validation)

## 🔗 Related

- [Main README](../../README.md)
- [UI Package](../../packages/ui/README.md)
- [Contributing Guide](../../CONTRIBUTING.md)
