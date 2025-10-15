# Multi-stage Dockerfile for Frontend

# Base stage with dependencies
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies for all packages
COPY package.json yarn.lock ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages

RUN yarn install --frozen-lockfile

# Development stage
FROM base AS development

# Copy application code
COPY apps/web ./apps/web
COPY turbo.json ./

EXPOSE 3000

ENV NODE_ENV=development

CMD ["yarn", "dev"]

# Test stage
FROM base AS test

# Copy application code and tests
COPY apps/web ./apps/web
COPY turbo.json ./

# Run tests
CMD ["yarn", "test", "--coverage", "--watchAll=false"]

# Build stage
FROM base AS builder

# Copy application code
COPY apps/web ./apps/web
COPY turbo.json ./

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN yarn build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "apps/web/server.js"]
