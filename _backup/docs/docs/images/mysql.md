---
title: mysql
description: MySQL is an open-source relational database
sidebar_position: 8
---

# mysql

![mysql logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg)

**Community Image** | **MySQL is an open-source relational database**

## Overview

- **Latest Tag:** `9.1.0`
- **Image Size:** 145MB
- **Downloads:** 2,120,000+
- **Last Updated:** 16 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/mysql:9.1.0

# Run the container
docker run -it cgr.dev/chainguard/mysql:9.1.0
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
docker run --rm cgr.dev/chainguard/mysql:9.1.0

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/mysql:9.1.0
```

### Docker Compose

```yaml
version: '3.8'
services:
  mysql:
    image: cgr.dev/chainguard/mysql:9.1.0
    container_name: my-mysql
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: cgr.dev/chainguard/mysql:9.1.0
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `9.1.0` | Latest stable version | 145MB |
| `latest` | Alias for latest stable | 145MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
