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

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with metadata
│   ├── page.tsx      # Home page
│   ├── not-found.tsx # 404 page
│   └── image/        # Dynamic image detail pages
├── components/       # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── CategoryFilter.tsx
│   ├── ImageCard.tsx
│   ├── ErrorBoundary.tsx
│   └── Loading.tsx
├── config/          # Configuration files
│   └── env.ts       # Environment validation
├── constants/       # App constants
│   └── index.ts     # Routes, colors, pagination
├── data/           # Data layer
│   └── mockData.ts  # Docker image data
├── hooks/          # Custom React hooks
│   └── useImageFilters.ts
├── lib/            # Utility functions
│   └── utils.ts
├── providers/      # React context providers
│   └── index.tsx
├── services/       # API clients
│   └── api.client.ts
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

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL
- `NEXT_PUBLIC_APP_URL` - Frontend app URL
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable analytics (true/false)

## 📝 Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript compiler check

## 🎨 Styling

- **Framework**: Tailwind CSS
- **UI Library**: Radix UI primitives
- **Components**: shadcn/ui inspired components
- **Theme**: Chainguard brand colors (#fd366e)

## 🧪 Best Practices

- TypeScript strict mode enabled
- ESLint for code quality
- Error boundaries for error handling
- Custom hooks for reusable logic
- Service layer for API calls
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
- Axios (HTTP client)
- clsx & tailwind-merge (className utilities)
- React Hook Form (forms)
- Zod (validation)

## 🔗 Related

- [API Documentation](../api/README.md)
- [UI Package](../../packages/ui/README.md)
