const fs = require('fs');
const path = require('path');

// Simplified mock data
const dockerImages = [
  {
    id: 1, name: 'node', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    lastChanged: '11 hours ago', latestTag: '24.10.0', isFree: true, category: 'featured',
    description: 'Node.js JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    downloads: 1250000, size: '45MB', fips: false, badge: 'official'
  },
  {
    id: 2, name: 'nginx', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    lastChanged: '21 hours ago', latestTag: 'mainline', isFree: true, category: 'featured',
    description: 'High-performance HTTP server and reverse proxy',
    downloads: 2340000, size: '25MB', fips: false, badge: 'community'
  },
  {
    id: 3, name: 'postgres', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    lastChanged: '18 hours ago', latestTag: '18.0', isFree: true, category: 'featured',
    description: 'Powerful, open source object-relational database system',
    downloads: 1890000, size: '120MB', fips: false, badge: 'verified'
  },
  {
    id: 4, name: 'python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    lastChanged: '15 hours ago', latestTag: '3.13.1', isFree: true, category: 'starter',
    description: 'Python is a programming language that lets you work quickly',
    downloads: 3450000, size: '50MB', fips: false, badge: 'official'
  },
  {
    id: 5, name: 'redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    lastChanged: '12 hours ago', latestTag: '7.4.2', isFree: false, category: 'featured',
    description: 'In-memory data structure store, used as database, cache',
    downloads: 1670000, size: '35MB', fips: true, badge: 'verified'
  }
];

function generateSimpleImageDoc(image) {
  const badgeText = image.badge.charAt(0).toUpperCase() + image.badge.slice(1);
  
  return `---
title: ${image.name}
description: ${image.description}
sidebar_position: ${image.id}
---

# ${image.name}

![${image.name} logo](${image.logo})

**${badgeText} Image** | **${image.description}**

## Overview

- **Latest Tag:** \`${image.latestTag}\`
- **Image Size:** ${image.size}
- **Downloads:** ${image.downloads.toLocaleString()}+
- **Last Updated:** ${image.lastChanged}
- **FIPS Compliance:** ${image.fips ? '✅ Yes' : '❌ No'}

## Quick Start

\`\`\`bash
# Pull the image
docker pull cgr.dev/chainguard/${image.name}:${image.latestTag}

# Run the container
docker run -it cgr.dev/chainguard/${image.name}:${image.latestTag}
\`\`\`

## Security Features

- 🔒 **Zero Known CVEs** - Scanned and rebuilt nightly
- 📦 **Minimal Size** - Distroless design reduces attack surface
- 🛡️ **Non-root User** - Runs as unprivileged user by default
- ✅ **Signed Images** - Cryptographically signed with Sigstore

## Usage Examples

### Docker

\`\`\`bash
# Basic usage
docker run --rm cgr.dev/chainguard/${image.name}:${image.latestTag}

# With volume mount
docker run --rm -v $(pwd):/app -w /app cgr.dev/chainguard/${image.name}:${image.latestTag}
\`\`\`

### Docker Compose

\`\`\`yaml
version: '3.8'
services:
  ${image.name}:
    image: cgr.dev/chainguard/${image.name}:${image.latestTag}
    container_name: my-${image.name}
    restart: unless-stopped
\`\`\`

### Kubernetes

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${image.name}-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${image.name}
  template:
    metadata:
      labels:
        app: ${image.name}
    spec:
      containers:
      - name: ${image.name}
        image: cgr.dev/chainguard/${image.name}:${image.latestTag}
        securityContext:
          runAsNonRoot: true
          runAsUser: 65532
\`\`\`

## Available Tags

| Tag | Description | Size |
|-----|-------------|------|
| \`${image.latestTag}\` | Latest stable version | ${image.size} |
| \`latest\` | Alias for latest stable | ${image.size} |

## Support

- 📖 **Documentation**: [Chainguard Images Docs](/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/chainguard-images/images/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/chainguard-images/images/discussions)

## License

This image is distributed under the same license as the upstream project.
`;
}

// Generate simplified documentation
dockerImages.forEach(image => {
  const docContent = generateSimpleImageDoc(image);
  const filePath = path.join(__dirname, 'docs', 'images', `${image.name}.md`);
  
  fs.writeFileSync(filePath, docContent);
  console.log(`Generated simplified documentation for ${image.name}`);
});

console.log('✅ All simplified image documentation generated successfully!');