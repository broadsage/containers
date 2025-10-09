# Getting Started with SecureHub

## Welcome to SecureHub

SecureHub is a free, open-source platform providing secure container images with enterprise-grade features. Built by the community, for the community.

## Quick Start

### Pulling an Image

To pull a container image from SecureHub:

```bash
docker pull securehub.io/node:latest
```

### Running a Container

```bash
docker run -it securehub.io/node:latest
```

### Using in Dockerfile

```dockerfile
FROM securehub.io/node:24.10.0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

## Why SecureHub?

### 100% Free & Open Source
No hidden costs, no enterprise tiers - everything is free for everyone.

### Enterprise-Grade Security
- **SBOM (Software Bill of Materials)**: Every image comes with a complete SBOM
- **Vulnerability Scanning**: Continuous scanning for CVEs
- **Provenance Tracking**: Verifiable build provenance with Sigstore
- **Image Signing**: All images are cryptographically signed

### Minimal & Secure by Default
- Built with Wolfi, a minimal Linux distribution
- Only essential packages included
- Reduced attack surface
- No unnecessary bloat

### Community Maintained
Built and improved by developers from around the world.

## Available Images

Browse our [directory](/) to find secure container images for:

- **Programming Languages**: Node.js, Python, Go, PHP, Ruby
- **Databases**: PostgreSQL, MySQL, MongoDB, Redis
- **Web Servers**: Nginx, Apache
- **AI/ML**: TensorFlow, PyTorch
- **And many more...**

## Image Types

### Official Images
Maintained by the SecureHub core team, these images follow strict security and quality standards.

### Community Images
Contributed and maintained by the community, reviewed by maintainers.

### Verified Publishers
Images from verified organizations and trusted publishers.

## Next Steps

- [Browse the Directory](/)
- [Learn about SBOM](/docs/sbom)
- [Understand Provenance](/docs/provenance)
- [Join our Community](/community)
- [Contribute to SecureHub](/contribute)

## Getting Help

If you need help:

- Check our [Documentation](/docs)
- Ask on [Discord](https://discord.gg/securehub)
- Open an issue on [GitHub](https://github.com/securehub/images)
- Join our [Community Forum](/community)
