---
title: postgres
description: Powerful, open source object-relational database system
sidebar_position: 3
---

# postgres

![postgres logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg)

**Verified Image** | **Powerful, open source object-relational database system**

## Overview

- **Latest Tag:** `18.0`
- **Image Size:** 120MB
- **Downloads:** 1,890,000+
- **Last Updated:** 18 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/postgres:18.0

# Run the container
docker run -it cgr.dev/chainguard/postgres:18.0
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
docker run --rm cgr.dev/chainguard/postgres:18.0

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/postgres:18.0
```

### Docker Compose

```yaml
version: '3.8'
services:
  postgres:
    image: cgr.dev/chainguard/postgres:18.0
    container_name: my-postgres
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: cgr.dev/chainguard/postgres:18.0
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `18.0` | Latest stable version | 120MB |
| `latest` | Alias for latest stable | 120MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
