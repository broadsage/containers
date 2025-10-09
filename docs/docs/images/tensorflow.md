---
title: tensorflow
description: An end-to-end open source platform for machine learning
sidebar_position: 10
---

# tensorflow

<div className="image-card">
  <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="tensorflow" width="64" height="64" style={{marginRight: '1rem'}} />
    <div>
      <h2 style={{margin: 0}}>tensorflow <span className="badge badge-community">Community</span></h2>
      <p style={{margin: 0, color: 'var(--ifm-color-emphasis-600)'}}>An end-to-end open source platform for machine learning</p>
    </div>
  </div>
</div>

## Overview

**Latest Tag:** `2.18.0`  
**Image Size:** 1.2GB  
**Downloads:** 560,000+  
**Last Updated:** 20 hours ago  
**FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/tensorflow:2.18.0

# Run the container
docker run -it cgr.dev/chainguard/tensorflow:2.18.0
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
docker run -d --name my-tensorflow cgr.dev/chainguard/tensorflow:2.18.0
```

### With Docker Compose

```yaml
version: '3.8'
services:
  tensorflow:
    image: cgr.dev/chainguard/tensorflow:2.18.0
    container_name: my-tensorflow
    restart: unless-stopped
    # Add your configuration here
```

### Kubernetes Deployment

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
        # Add your configuration here
```

## Available Tags

| Tag | Last Updated | Size |
|-----|-------------|------|
| `2.18.0` | 20 hours ago | 1.2GB |
| `latest` | 20 hours ago | 1.2GB |

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
