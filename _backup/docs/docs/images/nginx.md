---
title: nginx
description: High-performance HTTP server and reverse proxy
sidebar_position: 2
---

# nginx

![nginx logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg)

**Community Image** | **High-performance HTTP server and reverse proxy**

## Overview

- **Latest Tag:** `mainline`
- **Image Size:** 25MB
- **Downloads:** 2,340,000+
- **Last Updated:** 21 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/nginx:mainline

# Run the container
docker run -it cgr.dev/chainguard/nginx:mainline
```

## Security Features

- 🔒 **Zero Known CVEs** - Scanned and rebuilt nightly
- 📦 **Minimal Size** - Distroless design reduces attack surface
- 🛡️ **Non-root User** - Runs as unprivileged user by default
- ✅ **Signed Images** - Cryptographically signed with Sigstore

## Usage Examples

### Docker

```bash
# Basic usage
docker run --rm cgr.dev/chainguard/nginx:mainline

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/nginx:mainline
```

### Docker Compose

```yaml
version: '3.8'
services:
  nginx:
    image: cgr.dev/chainguard/nginx:mainline
    container_name: my-nginx
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: cgr.dev/chainguard/nginx:mainline
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `mainline` | Latest stable version | 25MB |
| `latest` | Alias for latest stable | 25MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
