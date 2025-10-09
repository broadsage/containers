---
title: nginx
description: High-performance HTTP server and reverse proxy
sidebar_position: 2
---

# nginx


  <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="nginx" width="64" height="64" style={{marginRight: '1rem'}} />
    <div>
      <h2 style={{margin: 0}}>nginx <span className="badge badge-community">Community</span></h2>
      <p style={{margin: 0, color: 'var(--ifm-color-emphasis-600)'}}>High-performance HTTP server and reverse proxy</p>
    </div>
  </div>
</div>

## Overview

**Latest Tag:** `mainline`  
**Image Size:** 25MB  
**Downloads:** 2,340,000+  
**Last Updated:** 21 hours ago  
**FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/nginx:mainline

# Run the container
docker run -it cgr.dev/chainguard/nginx:mainline
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
| nginx | 1.27.3 | BSD-2-Clause | application |
| ngx_http_ssl_module | 1.27.3 | BSD-2-Clause | module |
| openssl | 1.1.1w | Apache-2.0 | library |
| curl | 7.88.1 | MIT | library |
| zlib | 1.2.13 | Zlib | library |
| libxml2 | 2.9.14 | MIT | library |
| pcre | 8.45 | BSD | library |
| glibc | 2.35 | LGPL-2.1 | library |

## Usage Examples

### Basic Usage

```bash
docker run -d --name my-nginx cgr.dev/chainguard/nginx:mainline
```

### With Docker Compose

```yaml
version: '3.8'
services:
  nginx:
    image: cgr.dev/chainguard/nginx:mainline
    container_name: my-nginx
    restart: unless-stopped
    # Add your configuration here
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: cgr.dev/chainguard/nginx:mainline
        # Add your configuration here
```

## Available Tags

| Tag | Last Updated | Size |
|-----|-------------|------|
| `mainline` | 21 hours ago | 25MB |
| `latest` | 21 hours ago | 25MB |

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
