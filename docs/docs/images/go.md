---
title: go
description: Go is an open source programming language
sidebar_position: 6
---

# go

![go logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg)

**Community Image** | **Go is an open source programming language**

## Overview

- **Latest Tag:** `1.25.2`
- **Image Size:** 340MB
- **Downloads:** 890,000+
- **Last Updated:** 18 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/go:1.25.2

# Run the container
docker run -it cgr.dev/chainguard/go:1.25.2
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
docker run --rm cgr.dev/chainguard/go:1.25.2

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/go:1.25.2
```

### Docker Compose

```yaml
version: '3.8'
services:
  go:
    image: cgr.dev/chainguard/go:1.25.2
    container_name: my-go
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: go-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: go
  template:
    metadata:
      labels:
        app: go
    spec:
      containers:
      - name: go
        image: cgr.dev/chainguard/go:1.25.2
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `1.25.2` | Latest stable version | 340MB |
| `latest` | Alias for latest stable | 340MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
