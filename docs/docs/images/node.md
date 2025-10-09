---
title: node
description: Node.js JavaScript runtime built on Chrome's V8 JavaScript engine
sidebar_position: 1
---

# node

![node logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg)

**Official Image** | **Node.js JavaScript runtime built on Chrome's V8 JavaScript engine**

## Overview

- **Latest Tag:** `24.10.0`
- **Image Size:** 45MB
- **Downloads:** 1,250,000+
- **Last Updated:** 11 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/node:24.10.0

# Run the container
docker run -it cgr.dev/chainguard/node:24.10.0
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
docker run --rm cgr.dev/chainguard/node:24.10.0

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/node:24.10.0
```

### Docker Compose

```yaml
version: '3.8'
services:
  node:
    image: cgr.dev/chainguard/node:24.10.0
    container_name: my-node
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: node
  template:
    metadata:
      labels:
        app: node
    spec:
      containers:
      - name: node
        image: cgr.dev/chainguard/node:24.10.0
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `24.10.0` | Latest stable version | 45MB |
| `latest` | Alias for latest stable | 45MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
