---
title: jenkins
description: Jenkins automation server
sidebar_position: 12
---

# jenkins

![jenkins logo](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg)

**Official Image** | **Jenkins automation server**

## Overview

- **Latest Tag:** `2.530`
- **Image Size:** 280MB
- **Downloads:** 670,000+
- **Last Updated:** 20 hours ago
- **FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/jenkins:2.530

# Run the container
docker run -it cgr.dev/chainguard/jenkins:2.530
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
docker run --rm cgr.dev/chainguard/jenkins:2.530

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/jenkins:2.530
```

### Docker Compose

```yaml
version: '3.8'
services:
  jenkins:
    image: cgr.dev/chainguard/jenkins:2.530
    container_name: my-jenkins
    restart: unless-stopped
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jenkins-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jenkins
  template:
    metadata:
      labels:
        app: jenkins
    spec:
      containers:
      - name: jenkins
        image: cgr.dev/chainguard/jenkins:2.530
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
```

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| `2.530` | Latest stable version | 280MB |
| `latest` | Alias for latest stable | 280MB |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
