---
title: docker
description: Docker container runtime
sidebar_position: 15
---

# docker

![docker logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg)

**Official Image** | **Docker container runtime**

## Overview

- **Latest Tag:** `28.0.0`
- **Image Size:** 95MB
- **Downloads:** 5,670,000+
- **Last Updated:** 9 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/docker:28.0.0

# Run the container
docker run -it cgr.dev/chainguard/docker:28.0.0
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
docker run --rm cgr.dev/chainguard/docker:28.0.0

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/docker:28.0.0
```

### Docker Compose

```yaml
version: '3.8'
services:
  docker:
    image: cgr.dev/chainguard/docker:28.0.0
    container_name: my-docker
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docker-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: docker
  template:
    metadata:
      labels:
        app: docker
    spec:
      containers:
      - name: docker
        image: cgr.dev/chainguard/docker:28.0.0
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `28.0.0` | Latest stable version | 95MB |
| `latest` | Alias for latest stable | 95MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
