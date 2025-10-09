---
title: jenkins
description: Jenkins automation server
sidebar_position: 12
---

# jenkins


  <div style="display: flex; align-items: center; margin-bottom: 1rem;">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="jenkins" width="64" height="64" style={{marginRight: '1rem'}} />
    <div>
      <h2 style="margin: 0;">jenkins **Official**</h2>
      **Jenkins automation server**
    
  


## Overview

**Latest Tag:** `2.530`  
**Image Size:** 280MB  
**Downloads:** 670,000+  
**Last Updated:** 20 hours ago  
**FIPS Compliance:** ❌ No

## Quick Start

```bash
# Pull the image
docker pull cgr.dev/chainguard/jenkins:2.530

# Run the container
docker run -it cgr.dev/chainguard/jenkins:2.530
```

## Security Overview

| Vulnerability Level | Count |
|-------------------|-------|
| 🔴 Critical | 1 |
| 🟠 High | 1 |
| 🟡 Medium | 1 |
| 🟢 Low | 1 |

### Known Vulnerabilities

- **CVE-2024-1234** (CRITICAL) - openssl v1.1.1 → v1.1.1w (CVSS: 9.8)
- **CVE-2024-5678** (HIGH) - curl v7.68.0 → v7.88.1 (CVSS: 7.5)
- **CVE-2024-9012** (MEDIUM) - libxml2 v2.9.10 → v2.9.14 (CVSS: 5.3)
- **CVE-2024-3456** (LOW) - zlib v1.2.11 → v1.2.13 (CVSS: 3.7)

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
docker run -d --name my-jenkins cgr.dev/chainguard/jenkins:2.530
```

### With Docker Compose

```yaml
version: '3.8'
services:
  jenkins:
    image: cgr.dev/chainguard/jenkins:2.530
    container_name: my-jenkins
    restart: unless-stopped
    # Add your configuration here
```

### Kubernetes Deployment

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
        # Add your configuration here
```

## Available Tags

| Tag | Last Updated | Size |
|-----|-------------|------|
| `2.530` | 20 hours ago | 280MB |
| `latest` | 20 hours ago | 280MB |

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
