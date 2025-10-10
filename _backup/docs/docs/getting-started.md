---
title: Getting Started
description: Quick start guide for using Chainguard Images
sidebar_position: 2
---

# Getting Started with Chainguard Images

This guide will help you get up and running with Chainguard Images in minutes. Whether you're new to containers or an experienced developer, this guide covers everything you need to know.

## Prerequisites

Before you begin, make sure you have:

- **Docker** or **Podman** installed on your system
- **Internet connection** to pull images from our registry
- **Basic familiarity** with container concepts (optional but helpful)

### Installing Docker

If you don't have Docker installed:

```bash
# On Ubuntu/Debian
sudo apt update && sudo apt install docker.io

# On macOS (using Homebrew)
brew install --cask docker

# On Windows
# Download Docker Desktop from https://docker.com/products/docker-desktop
```

## Step 1: Pull Your First Image

Let's start with a simple Node.js image:

```bash
# Pull the latest Node.js image
docker pull cgr.dev/chainguard/node:latest

# Verify the image was downloaded
docker images cgr.dev/chainguard/node
```

You should see output similar to:
```
REPOSITORY              TAG     IMAGE ID      CREATED      SIZE
cgr.dev/chainguard/node latest  abc123def456  2 hours ago  45MB
```

## Step 2: Run Your First Container

```bash
# Run Node.js interactively
docker run -it cgr.dev/chainguard/node:latest

# You should see the Node.js REPL
# Try: console.log('Hello from Chainguard!')
```

### Running with a Simple Application

Create a simple Node.js app:

```bash
# Create a project directory
mkdir my-app && cd my-app

# Create a simple server
cat << 'EOF' > server.js
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Chainguard Images!\n');
});
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
EOF

# Run with volume mount
docker run -it -v $(pwd):/app -w /app -p 3000:3000 \
  cgr.dev/chainguard/node:latest node server.js
```

Visit `http://localhost:3000` to see your app running!

## Step 3: Understanding Image Tags

Chainguard Images use semantic versioning for tags:

```bash
# Different tagging strategies
docker pull cgr.dev/chainguard/node:latest    # Latest stable
docker pull cgr.dev/chainguard/node:20        # Major version
docker pull cgr.dev/chainguard/node:20.10     # Minor version  
docker pull cgr.dev/chainguard/node:20.10.0   # Exact version
```

### Choosing the Right Tag

| Use Case | Recommended Tag | Example |
|----------|----------------|----------|
| **Development** | `:latest` | `cgr.dev/chainguard/node:latest` |
| **Production** | `:major.minor` | `cgr.dev/chainguard/node:20.10` |
| **Reproducible Builds** | `:exact` | `cgr.dev/chainguard/node:20.10.0` |
| **Security Critical** | `:latest` | `cgr.dev/chainguard/node:latest` |

## Step 4: Working with Different Images

### Web Server (Nginx)

```bash
# Pull and run Nginx
docker pull cgr.dev/chainguard/nginx:latest
docker run -d -p 8080:8080 cgr.dev/chainguard/nginx:latest

# Visit http://localhost:8080
```

### Database (PostgreSQL)

```bash
# Run PostgreSQL with environment variables
docker run -d \
  --name postgres-db \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  cgr.dev/chainguard/postgres:latest
```

### Python Application

```bash
# Create a Python script
echo 'print("Hello from Python!")' > hello.py

# Run with Python image
docker run -it -v $(pwd):/app -w /app \
  cgr.dev/chainguard/python:latest python hello.py
```

## Step 5: Building Your Own Images

### Basic Dockerfile

Create a `Dockerfile` using Chainguard Images as base:

```dockerfile
# Use Chainguard's Node.js image as base
FROM cgr.dev/chainguard/node:latest

# Copy your application
COPY package*.json ./
COPY src/ ./src/

# Install dependencies (if needed)
USER root
RUN npm ci --only=production
USER nonroot

# Set the startup command
CMD ["node", "src/index.js"]
```

### Multi-stage Build

```dockerfile
# Build stage
FROM cgr.dev/chainguard/node:latest as builder
USER root
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM cgr.dev/chainguard/node:latest
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

### Building and Running

```bash
# Build your image
docker build -t my-app:latest .

# Run your image
docker run -p 3000:3000 my-app:latest
```

## Step 6: Using Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    image: cgr.dev/chainguard/nginx:latest
    ports:
      - "80:8080"
    volumes:
      - ./html:/usr/share/nginx/html:ro

  api:
    image: cgr.dev/chainguard/node:latest
    command: node server.js
    volumes:
      - ./api:/app
    working_dir: /app
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: cgr.dev/chainguard/postgres:latest
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run your stack:

```bash
docker compose up -d
```

## Step 7: Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: cgr.dev/chainguard/node:latest
        ports:
        - containerPort: 3000
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
          capabilities:
            drop:
            - ALL
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## Best Practices

### Security

1. **Use specific tags** in production instead of `:latest`
2. **Run as non-root** (Chainguard images default to non-root)
3. **Use multi-stage builds** to minimize final image size
4. **Regularly update** your base images

### Performance

1. **Layer caching**: Order Dockerfile commands by change frequency
2. **Image size**: Use `.dockerignore` to exclude unnecessary files
3. **Resource limits**: Set appropriate CPU and memory limits

### Development Workflow

```bash
# Development with live reload
docker run -it \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  cgr.dev/chainguard/node:latest \
  npm run dev
```

## Troubleshooting

### Common Issues

**Issue**: Permission denied when running containers
```bash
# Solution: Add your user to docker group
sudo usermod -aG docker $USER
# Then log out and back in
```

**Issue**: Image pull fails
```bash
# Check connectivity
docker pull cgr.dev/chainguard/node:latest

# If behind corporate proxy
docker pull --config /path/to/docker/config cgr.dev/chainguard/node:latest
```

**Issue**: Container exits immediately
```bash
# Debug with shell access (if available)
docker run -it cgr.dev/chainguard/node:latest sh

# Check logs
docker logs <container-id>
```

### Getting Help

If you encounter issues:

1. **Check the logs**: `docker logs <container-name>`
2. **Verify image**: `docker image inspect cgr.dev/chainguard/node:latest`
3. **Community help**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)
4. **Report bugs**: [GitHub Issues](https://github.com/chainguard-images/images/issues)

## Next Steps

Now that you're up and running:

1. **[📦 Explore more images](./images/overview)** - Browse our full catalog
2. **[🛡️ Learn about security](./guides/vulnerabilities)** - Understand our security model  
3. **[📋 Check out SBOM](./guides/sbom)** - Learn about software bill of materials
4. **[🤝 Join the community](./guides/community)** - Connect with other users

---

*Congratulations! You're now ready to build secure applications with Chainguard Images.* 🎉