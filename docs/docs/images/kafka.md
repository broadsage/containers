---
title: kafka
description: Distributed event streaming platform
sidebar_position: 14
---

# kafka

![kafka logo](https://www.svgrepo.com/show/353952/kafka-icon.svg)

**Community Image** | **Distributed event streaming platform**

## Overview

- **Latest Tag:** `3.9.0`
- **Image Size:** 380MB
- **Downloads:** 720,000+
- **Last Updated:** 13 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/kafka:3.9.0

# Run the container
docker run -it cgr.dev/chainguard/kafka:3.9.0
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
docker run --rm cgr.dev/chainguard/kafka:3.9.0

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/kafka:3.9.0
```

### Docker Compose

```yaml
version: '3.8'
services:
  kafka:
    image: cgr.dev/chainguard/kafka:3.9.0
    container_name: my-kafka
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kafka-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kafka
  template:
    metadata:
      labels:
        app: kafka
    spec:
      containers:
      - name: kafka
        image: cgr.dev/chainguard/kafka:3.9.0
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `3.9.0` | Latest stable version | 380MB |
| `latest` | Alias for latest stable | 380MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
