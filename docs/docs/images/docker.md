---
title: docker
description: Docker container runtime
sidebar_position: 15
---

# docker


  <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="docker" width="64" height="64" style={{marginRight: '1rem'}} />
    <div>
      <h2 style={{margin: 0}}>docker <span className="badge badge-official">Official</span></h2>
      <p style={{margin: 0, color: 'var(--ifm-color-emphasis-600)'}}>Docker container runtime</p>
    </div>
  </div>
</div>

## Overview

**Latest Tag:** `28.0.0`  
**Image Size:** 95MB  
**Downloads:** 5,670,000+  
**Last Updated:** 9 hours ago  
**FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/docker:28.0.0

# Run the container
docker run -it cgr.dev/chainguard/docker:28.0.0
```

## Security Overview

| Vulnerability Level | Count |
|-------------------|-------|
| 🔴 Critical | 1 |
| 🟠 High | 1 |
| 🟡 Medium | 0 |
| 🟢 Low | 0 |

### Known Vulnerabilities

- **CVE-2024-1234** (CRITICAL) - openssl v1.1.1 → v1.1.1w (CVSS: 9.8)
- **CVE-2024-5678** (HIGH) - curl v7.68.0 → v7.88.1 (CVSS: 7.5)

## Software Bill of Materials (SBOM)

### Key Components

| Package | Version | License | Type |
|---------|---------|---------|------|
| openssl | 1.1.1w | Apache-2.0 | library |
| curl | 7.88.1 | MIT | library |
| zlib | 1.2.13 | Zlib | library |
| libxml2 | 2.9.14 | MIT | library |
| pcre | 8.45 | BSD | library |
| glibc | 2.35 | LGPL-2.1 | library |
| bash | 5.1.16 | GPL-3.0 | application |
| coreutils | 9.1 | GPL-3.0 | application |

## Usage Examples

### Basic Usage

```bash
docker run -d --name my-docker cgr.dev/chainguard/docker:28.0.0
```

### With Docker Compose

```yaml
version: '3.8'
services:
  docker:
    image: cgr.dev/chainguard/docker:28.0.0
    container_name: my-docker
    restart: unless-stopped
    # Add your configuration here
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docker-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: docker
  template:
    metadata:
      labels:
        app: docker
    spec:
      containers:
      - name: docker
        image: cgr.dev/chainguard/docker:28.0.0
        # Add your configuration here
```

## Available Tags

| Tag | Last Updated | Size |
|-----|-------------|------|
| `28.0.0` | 9 hours ago | 95MB |
| `latest` | 9 hours ago | 95MB |

## Provenance & Attestations

This image is built with industry-standard security practices:

- ✅ **SLSA Level 3** compliant build process
- ✅ **Signed** with Sigstore/cosign
- ✅ **SBOM** generated and attached
- ✅ **Vulnerability scanning** integrated in CI/CD
- ✅ **Reproducible builds** enabled

## Support & Community

- 📖 **Documentation**: [Chainguard Images Docs](https://edu.chainguard.dev/chainguard/chainguard-images/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)
- 🔐 **Security**: [Security Policy](https://github.com/chainguard-images/images/security/policy)

## License

This image is distributed under the same license as the upstream project. See the [LICENSE](https://github.com/chainguard-images/images/blob/main/LICENSE) file for details.
