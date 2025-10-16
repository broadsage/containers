# syntax=docker/dockerfile:1.4

# Base stage with shared dependencies
FROM node:20-alpine AS base

# Install security updates and dumb-init for proper signal handling
RUN apk add --no-cache \
    dumb-init \
    && apk update \
    && apk upgrade

# Set working directory
WORKDIR /app

# Create non-root user early
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy package files for better layer caching
COPY package.json yarn.lock ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages


# Dependencies stage
FROM base AS deps

# Install dependencies
RUN yarn install --frozen-lockfile --production=false


# Development stage
FROM base AS development

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages

# Copy application code
COPY apps/web ./apps/web
COPY turbo.json ./

EXPOSE 3000

ENV NODE_ENV=development

CMD ["yarn", "dev"]


# Test stage
FROM base AS test

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages

# Copy application code and tests
COPY apps/web ./apps/web
COPY turbo.json ./

# Run tests
CMD ["yarn", "test", "--coverage", "--watchAll=false"]

# ================================================================
# Build stage
# ================================================================
FROM base AS builder

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages

# Copy source code
COPY apps/web ./apps/web
COPY turbo.json ./

# Set build environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN yarn workspace web build


# Production stage
FROM node:20-alpine AS production

# Install security updates and runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    && apk update \
    && apk upgrade \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application with proper ownership
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set runtime environment
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    NEXT_TELEMETRY_DISABLED=1

# Health check with proper endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]
