---
title: redis
description: In-memory data structure store, used as database, cache
sidebar_position: 5
---

# redis

![redis logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg)

**Verified Image** | **In-memory data structure store, used as database, cache**

## Overview

- **Latest Tag:** `7.4.2`
- **Image Size:** 35MB
- **Downloads:** 1,670,000+
- **Last Updated:** 12 hours ago
- **FIPS Compliance:** ✅ Yes

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/redis:7.4.2

# Run the container
docker run -it cgr.dev/chainguard/redis:7.4.2
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
docker run --rm cgr.dev/chainguard/redis:7.4.2

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/redis:7.4.2
```

### Docker Compose

```yaml
version: '3.8'
services:
  redis:
    image: cgr.dev/chainguard/redis:7.4.2
    container_name: my-redis
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: cgr.dev/chainguard/redis:7.4.2
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `7.4.2` | Latest stable version | 35MB |
| `latest` | Alias for latest stable | 35MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
