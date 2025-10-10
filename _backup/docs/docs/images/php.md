---
title: php
description: Popular general-purpose scripting language
sidebar_position: 7
---

# php

![php logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg)

**Official Image** | **Popular general-purpose scripting language**

## Overview

- **Latest Tag:** `8.4.13`
- **Image Size:** 78MB
- **Downloads:** 1,230,000+
- **Last Updated:** 23 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/php:8.4.13

# Run the container
docker run -it cgr.dev/chainguard/php:8.4.13
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
docker run --rm cgr.dev/chainguard/php:8.4.13

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/php:8.4.13
```

### Docker Compose

```yaml
version: '3.8'
services:
  php:
    image: cgr.dev/chainguard/php:8.4.13
    container_name: my-php
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: php-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: php
  template:
    metadata:
      labels:
        app: php
    spec:
      containers:
      - name: php
        image: cgr.dev/chainguard/php:8.4.13
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `8.4.13` | Latest stable version | 78MB |
| `latest` | Alias for latest stable | 78MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
