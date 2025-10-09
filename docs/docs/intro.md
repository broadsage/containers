---
title: Introduction
slug: /
sidebar_position: 1
---

# Chainguard Images Documentation

Welcome to the official documentation for **Chainguard Images** - the most secure container images for your software supply chain.

## What are Chainguard Images?

Chainguard Images are **distroless**, **minimal**, and **secure** container images that provide a safer foundation for your applications. Built with a security-first approach, these images dramatically reduce your attack surface while maintaining full functionality.

## Key Features

🔒 **Zero Known Vulnerabilities**: Our images start with zero known CVEs  
📦 **Minimal Size**: 80% smaller than traditional container images  
🚀 **Production Ready**: Used by thousands of organizations in production  
✅ **Always Updated**: Rebuilt nightly with the latest security patches  
🔍 **Full Transparency**: Complete SBOM and provenance data included  

## Quick Start

### 1. Pull Your First Image

```bash
# Pull the Node.js image
docker pull cgr.dev/chainguard/node:latest

# Run it
docker run -it cgr.dev/chainguard/node:latest
```

### 2. Explore the Catalog

Browse our [**Image Catalog**](./images/overview) to find the perfect image for your needs:

- **[Node.js](./images/node)** - JavaScript runtime
- **[Python](./images/python)** - Python interpreter  
- **[Nginx](./images/nginx)** - Web server
- **[PostgreSQL](./images/postgres)** - Database
- **[And many more...](./images/overview)**

### 3. Learn the Basics

Read our [**Getting Started Guide**](./getting-started) for detailed setup instructions and best practices.

## Why Choose Chainguard Images?

### Traditional Images vs Chainguard Images

| Aspect | Traditional Images | Chainguard Images |
|--------|-------------------|------------------|
| **Size** | 200MB - 1GB+ | 20MB - 200MB |
| **Vulnerabilities** | 50-200+ CVEs | 0 known CVEs |
| **Package Manager** | ✅ Included | ❌ Removed (distroless) |
| **Shell Access** | ✅ Available | ❌ Not available (distroless) |
| **Security Updates** | Manual/Weekly | Automated/Nightly |
| **SBOM Included** | ❌ Usually not | ✅ Always |

### Security Benefits

1. **Reduced Attack Surface**: No package managers, shells, or unnecessary tools
2. **Faster Patching**: Automated security updates within hours of disclosure
3. **Supply Chain Security**: Full provenance and SBOM for compliance
4. **FIPS Compliance**: Available for regulated environments

## Architecture Support

All Chainguard Images support:
- **linux/amd64** (Intel/AMD 64-bit)
- **linux/arm64** (ARM 64-bit, including Apple Silicon)

## Registry Information

**Registry**: `cgr.dev/chainguard/`  
**Authentication**: Public images require no credentials  
**Rate Limits**: Generous limits for open source usage  
**Mirrors**: Available globally with CDN acceleration  

## Getting Help

- 📚 **[Browse Documentation](./images/overview)** - Comprehensive guides and references
- 🐛 **[Report Issues](https://github.com/chainguard-images/images/issues)** - Bug reports and feature requests  
- 💬 **[Join Discussions](https://github.com/chainguard-images/images/discussions)** - Community Q&A
- 🔐 **[Security Reports](mailto:security@chainguard.dev)** - Responsible disclosure

## Next Steps

1. **[🚀 Getting Started](./getting-started)** - Set up your first Chainguard image
2. **[📦 Browse Images](./images/overview)** - Explore our complete catalog  
3. **[🛡️ Security Guide](./guides/vulnerabilities)** - Learn about our security practices
4. **[🤝 Community](./guides/community)** - Connect with other users

---

*Ready to secure your software supply chain? Let's get started!* 🚀