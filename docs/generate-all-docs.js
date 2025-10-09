const fs = require('fs');
const path = require('path');

// All images data
const dockerImages = [
  { id: 1, name: 'node', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', lastChanged: '11 hours ago', latestTag: '24.10.0', isFree: true, category: 'featured', description: 'Node.js JavaScript runtime built on Chrome\'s V8 JavaScript engine', downloads: 1250000, size: '45MB', fips: false, badge: 'official' },
  { id: 2, name: 'nginx', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', lastChanged: '21 hours ago', latestTag: 'mainline', isFree: true, category: 'featured', description: 'High-performance HTTP server and reverse proxy', downloads: 2340000, size: '25MB', fips: false, badge: 'community' },
  { id: 3, name: 'postgres', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', lastChanged: '18 hours ago', latestTag: '18.0', isFree: true, category: 'featured', description: 'Powerful, open source object-relational database system', downloads: 1890000, size: '120MB', fips: false, badge: 'verified' },
  { id: 4, name: 'python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', lastChanged: '15 hours ago', latestTag: '3.13.1', isFree: true, category: 'starter', description: 'Python is a programming language that lets you work quickly', downloads: 3450000, size: '50MB', fips: false, badge: 'official' },
  { id: 5, name: 'redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', lastChanged: '12 hours ago', latestTag: '7.4.2', isFree: false, category: 'featured', description: 'In-memory data structure store, used as database, cache', downloads: 1670000, size: '35MB', fips: true, badge: 'verified' },
  { id: 6, name: 'go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', lastChanged: '18 hours ago', latestTag: '1.25.2', isFree: true, category: 'starter', description: 'Go is an open source programming language', downloads: 890000, size: '340MB', fips: false, badge: 'community' },
  { id: 7, name: 'php', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', lastChanged: '23 hours ago', latestTag: '8.4.13', isFree: true, category: 'application', description: 'Popular general-purpose scripting language', downloads: 1230000, size: '78MB', fips: false, badge: 'official' },
  { id: 8, name: 'mysql', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', lastChanged: '16 hours ago', latestTag: '9.1.0', isFree: false, category: 'base', description: 'MySQL is an open-source relational database', downloads: 2120000, size: '145MB', fips: false, badge: 'community' },
  { id: 9, name: 'mongodb', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', lastChanged: '14 hours ago', latestTag: '8.0.4', isFree: false, category: 'base', description: 'MongoDB is a source-available cross-platform document-oriented database', downloads: 1780000, size: '420MB', fips: true, badge: 'verified' },
  { id: 10, name: 'tensorflow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', lastChanged: '20 hours ago', latestTag: '2.18.0', isFree: false, category: 'ai', description: 'An end-to-end open source platform for machine learning', downloads: 560000, size: '1.2GB', fips: false, badge: 'community' },
  { id: 11, name: 'pytorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', lastChanged: '22 hours ago', latestTag: '2.6.0', isFree: false, category: 'ai', description: 'Tensors and Dynamic neural networks in Python', downloads: 480000, size: '980MB', fips: false, badge: 'verified' },
  { id: 12, name: 'jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', lastChanged: '20 hours ago', latestTag: '2.530', isFree: false, category: 'application', description: 'Jenkins automation server', downloads: 670000, size: '280MB', fips: false, badge: 'official' },
  { id: 13, name: 'elasticsearch', logo: 'https://www.svgrepo.com/show/373574/elasticsearch.svg', lastChanged: '17 hours ago', latestTag: '8.17.2', isFree: false, category: 'base', description: 'Distributed, RESTful search and analytics engine', downloads: 890000, size: '520MB', fips: true, badge: 'verified' },
  { id: 14, name: 'kafka', logo: 'https://www.svgrepo.com/show/353952/kafka-icon.svg', lastChanged: '13 hours ago', latestTag: '3.9.0', isFree: false, category: 'application', description: 'Distributed event streaming platform', downloads: 720000, size: '380MB', fips: false, badge: 'community' },
  { id: 15, name: 'docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', lastChanged: '9 hours ago', latestTag: '28.0.0', isFree: true, category: 'base', description: 'Docker container runtime', downloads: 5670000, size: '95MB', fips: false, badge: 'official' }
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

// Generate documentation for all images
dockerImages.forEach(image => {
  const docContent = generateSimpleImageDoc(image);
  const filePath = path.join(__dirname, 'docs', 'images', `${image.name}.md`);
  
  fs.writeFileSync(filePath, docContent);
  console.log(`Generated documentation for ${image.name}`);
});

console.log('✅ All image documentation generated successfully!');