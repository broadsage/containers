---
title: Image Catalog Overview  
description: Complete catalog of secure, distroless container images
sidebar_position: 1
---

# Image Catalog Overview

Welcome to the Chainguard Images catalog - your source for secure, minimal, and production-ready container images. Our images are built with security as the top priority, providing you with the most secure foundation for your applications.

## Why Chainguard Images?

🔒 **Security First**: Every image is scanned and rebuilt nightly to ensure the latest security patches  
📦 **Minimal Attack Surface**: Distroless design with only essential components  
🚀 **Production Ready**: Optimized for performance and reliability  
✅ **Compliance**: FIPS-ready images available for regulated environments  
🔍 **Transparency**: Full SBOM and provenance data for every image  

## Image Categories

### 🌟 Featured Images
Popular images that form the backbone of most applications:
- [**node**](./node) - Node.js JavaScript runtime
- [**nginx**](./nginx) - High-performance web server
- [**postgres**](./postgres) - Powerful relational database
- [**python**](./python) - Python programming language
- [**redis**](./redis) - In-memory data store

### 🏗️ Base Images  
Foundational images for building custom applications:
- [**docker**](./docker) - Docker container runtime
- [**mysql**](./mysql) - MySQL relational database
- [**mongodb**](./mongodb) - NoSQL document database
- [**elasticsearch**](./elasticsearch) - Search and analytics engine

### 🤖 AI/ML Images
Specialized images for machine learning and AI workloads:
- [**tensorflow**](./tensorflow) - Machine learning platform
- [**pytorch**](./pytorch) - Deep learning framework

### 📦 Application Images
Ready-to-use application containers:
- [**php**](./php) - PHP scripting language
- [**jenkins**](./jenkins) - CI/CD automation server
- [**kafka**](./kafka) - Event streaming platform

### 💻 Development Images
Tools and runtimes for development workflows:
- [**go**](./go) - Go programming language

## Getting Started

### Basic Usage

```bash
# Pull any Chainguard image
docker pull cgr.dev/chainguard/[IMAGE_NAME]:latest

# Example with Node.js
docker pull cgr.dev/chainguard/node:latest
docker run -it cgr.dev/chainguard/node:latest
```

### Registry Information

**Registry URL**: `cgr.dev/chainguard/`  
**Authentication**: Public images require no authentication  
**Supported Architectures**: `linux/amd64`, `linux/arm64`

### Image Naming Convention

```
cgr.dev/chainguard/[IMAGE_NAME]:[TAG]
```

- **IMAGE_NAME**: The application name (e.g., `node`, `nginx`)
- **TAG**: Version tag (e.g., `latest`, `18`, `1.21`)

## Security Features

### Vulnerability Management
- 🔄 **Nightly rebuilds** with latest security patches
- 📊 **Continuous scanning** with industry-leading tools
- ⚡ **Fast response** to critical vulnerabilities (typically < 24 hours)

### Supply Chain Security
- 🔐 **Sigstore signing** with cosign for authenticity
- 📋 **Complete SBOM** for every image and layer
- 🎯 **Provenance attestation** for build transparency
- ✅ **SLSA Level 3** compliance

### Compliance & Standards
- 🏛️ **FIPS 140-2** ready images available
- 📜 **SOC 2 Type II** compliant infrastructure
- 🛡️ **CIS Benchmarks** alignment where applicable

## Version Tags

Each image supports multiple tagging strategies:

| Tag Type | Example | Description |
|----------|---------|-------------|
| Latest | `:latest` | Most recent stable version |
| Major | `:18` | Latest patch of major version |
| Minor | `:18.17` | Latest patch of minor version |
| Exact | `:18.17.1` | Specific version pin |
| Date | `:18.17.1-20240101` | Version with build date |

## Image Statistics

- **Total Images**: 15+ production-ready images
- **Total Downloads**: 25M+ pulls across all images  
- **Average Size Reduction**: 80% smaller than traditional images
- **Security Updates**: Daily automated rebuilds
- **Uptime**: 99.9% registry availability

## Support Levels

### 🟢 Official Images
Maintained by Chainguard with full support and SLA guarantees.

### 🟡 Community Images  
Community-maintained with best-effort support from Chainguard.

### 🔵 Verified Publisher
Third-party maintained images verified by Chainguard security team.

## Next Steps

1. 📖 **[Getting Started Guide](../getting-started)** - Learn the basics
2. 🔍 **Browse Images** - Explore specific image documentation
3. 🛡️ **[Security Guide](../guides/vulnerabilities)** - Understand our security model
4. 🤝 **[Community](../guides/community)** - Join our community

---

*Need help? Check our [troubleshooting guide](../guides/troubleshooting) or [open an issue](https://github.com/chainguard-images/images/issues).*