---
title: mongodb
description: MongoDB is a source-available cross-platform document-oriented database
sidebar_position: 9
---

# mongodb

![mongodb logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg)

**Verified Image** | **MongoDB is a source-available cross-platform document-oriented database**

## Overview

- **Latest Tag:** `8.0.4`
- **Image Size:** 420MB
- **Downloads:** 1,780,000+
- **Last Updated:** 14 hours ago
- **FIPS Compliance:** ✅ Yes

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/mongodb:8.0.4

# Run the container
docker run -it cgr.dev/chainguard/mongodb:8.0.4
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
docker run --rm cgr.dev/chainguard/mongodb:8.0.4

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/mongodb:8.0.4
```

### Docker Compose

```yaml
version: '3.8'
services:
  mongodb:
    image: cgr.dev/chainguard/mongodb:8.0.4
    container_name: my-mongodb
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: cgr.dev/chainguard/mongodb:8.0.4
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `8.0.4` | Latest stable version | 420MB |
| `latest` | Alias for latest stable | 420MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
