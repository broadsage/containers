---
title: elasticsearch
description: Distributed, RESTful search and analytics engine
sidebar_position: 13
---

# elasticsearch

![elasticsearch logo](https://www.svgrepo.com/show/373574/elasticsearch.svg)

**Verified Image** | **Distributed, RESTful search and analytics engine**

## Overview

- **Latest Tag:** `8.17.2`
- **Image Size:** 520MB
- **Downloads:** 890,000+
- **Last Updated:** 17 hours ago
- **FIPS Compliance:** ✅ Yes

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/elasticsearch:8.17.2

# Run the container
docker run -it cgr.dev/chainguard/elasticsearch:8.17.2
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
docker run --rm cgr.dev/chainguard/elasticsearch:8.17.2

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/elasticsearch:8.17.2
```

### Docker Compose

```yaml
version: '3.8'
services:
  elasticsearch:
    image: cgr.dev/chainguard/elasticsearch:8.17.2
    container_name: my-elasticsearch
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elasticsearch-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      containers:
      - name: elasticsearch
        image: cgr.dev/chainguard/elasticsearch:8.17.2
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `8.17.2` | Latest stable version | 520MB |
| `latest` | Alias for latest stable | 520MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
