---
title: python
description: Python is a programming language that lets you work quickly
sidebar_position: 4
---

# python

![python logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg)

**Official Image** | **Python is a programming language that lets you work quickly**

## Overview

- **Latest Tag:** `3.13.1`
- **Image Size:** 50MB
- **Downloads:** 3,450,000+
- **Last Updated:** 15 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/python:3.13.1

# Run the container
docker run -it cgr.dev/chainguard/python:3.13.1
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
docker run --rm cgr.dev/chainguard/python:3.13.1

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/python:3.13.1
```

### Docker Compose

```yaml
version: '3.8'
services:
  python:
    image: cgr.dev/chainguard/python:3.13.1
    container_name: my-python
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: python-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: python
  template:
    metadata:
      labels:
        app: python
    spec:
      containers:
      - name: python
        image: cgr.dev/chainguard/python:3.13.1
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `3.13.1` | Latest stable version | 50MB |
| `latest` | Alias for latest stable | 50MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
