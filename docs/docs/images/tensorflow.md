---
title: tensorflow
description: An end-to-end open source platform for machine learning
sidebar_position: 10
---

# tensorflow

![tensorflow logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg)

**Community Image** | **An end-to-end open source platform for machine learning**

## Overview

- **Latest Tag:** `2.18.0`
- **Image Size:** 1.2GB
- **Downloads:** 560,000+
- **Last Updated:** 20 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/tensorflow:2.18.0

# Run the container
docker run -it cgr.dev/chainguard/tensorflow:2.18.0
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
docker run --rm cgr.dev/chainguard/tensorflow:2.18.0

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/tensorflow:2.18.0
```

### Docker Compose

```yaml
version: '3.8'
services:
  tensorflow:
    image: cgr.dev/chainguard/tensorflow:2.18.0
    container_name: my-tensorflow
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tensorflow-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: tensorflow
  template:
    metadata:
      labels:
        app: tensorflow
    spec:
      containers:
      - name: tensorflow
        image: cgr.dev/chainguard/tensorflow:2.18.0
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `2.18.0` | Latest stable version | 1.2GB |
| `latest` | Alias for latest stable | 1.2GB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
