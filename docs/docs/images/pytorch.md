---
title: pytorch
description: Tensors and Dynamic neural networks in Python
sidebar_position: 11
---

# pytorch

![pytorch logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg)

**Verified Image** | **Tensors and Dynamic neural networks in Python**

## Overview

- **Latest Tag:** `2.6.0`
- **Image Size:** 980MB
- **Downloads:** 480,000+
- **Last Updated:** 22 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/pytorch:2.6.0

# Run the container
docker run -it cgr.dev/chainguard/pytorch:2.6.0
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
docker run --rm cgr.dev/chainguard/pytorch:2.6.0

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/pytorch:2.6.0
```

### Docker Compose

```yaml
version: '3.8'
services:
  pytorch:
    image: cgr.dev/chainguard/pytorch:2.6.0
    container_name: my-pytorch
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pytorch-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: pytorch
  template:
    metadata:
      labels:
        app: pytorch
    spec:
      containers:
      - name: pytorch
        image: cgr.dev/chainguard/pytorch:2.6.0
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `2.6.0` | Latest stable version | 980MB |
| `latest` | Alias for latest stable | 980MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
