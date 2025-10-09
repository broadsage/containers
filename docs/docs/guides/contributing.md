---
title: Contributing Guide
description: How to contribute to Chainguard Images
sidebar_position: 5
---

# Contributing Guide

Thank you for your interest in contributing to Chainguard Images! This guide will help you get started with contributing to our open-source project.

## Quick Start

1. **⭐ Star the repository** - [chainguard-images/images](https://github.com/chainguard-images/images)
2. **👥 Join discussions** - [GitHub Discussions](https://github.com/chainguard-images/images/discussions)
3. **🐛 Find an issue** - Look for "good first issue" labels
4. **📝 Read this guide** - Understand our contribution process
5. **🚀 Start contributing** - Submit your first PR!

## Types of Contributions

### 📝 Documentation
- Fix typos and improve clarity
- Add usage examples
- Create tutorials and guides
- Translate content

### 🐛 Bug Fixes
- Fix image build issues
- Resolve security vulnerabilities
- Improve error handling
- Performance optimizations

### ✨ Features
- Add new images
- Improve existing images
- Add new variants or tags
- Build system improvements

### 🗺 Infrastructure
- CI/CD improvements
- Testing enhancements
- Automation scripts
- Monitoring and observability

## Getting Started

### Prerequisites

**Required Tools:**
- **Git** - Version control
- **Docker** - Container runtime
- **Make** - Build automation
- **Go** (optional) - For certain build tools

**Recommended Tools:**
- **Melange** - APK package builder
- **Apko** - Declarative container image builder  
- **Cosign** - Container signing and verification
- **Syft** - SBOM generation

### Development Environment Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/images.git
cd images

# 2. Add upstream remote
git remote add upstream https://github.com/chainguard-images/images.git

# 3. Install development dependencies
make install-dev-tools

# 4. Verify setup
make test
```

### Project Structure

```
images/
├── images/               # Individual image definitions
│   ├── node/
│   │   ├── image.yaml      # Image configuration
│   │   ├── README.md       # Image documentation
│   │   └── tests/          # Image tests
│   └── nginx/
├── .github/            # GitHub Actions workflows
├── hack/               # Build scripts and utilities
├── docs/               # Documentation
├── Makefile            # Build automation
└── README.md           # Project overview
```

## Contributing Process

### 1. Choose Your Contribution

**For Beginners:**
- Look for issues labeled `good first issue`
- Documentation improvements
- Simple bug fixes
- Adding usage examples

**For Experienced Contributors:**
- New image additions
- Complex feature implementations
- Build system improvements
- Security enhancements

### 2. Create an Issue (if needed)

Before starting work:

1. **Search existing issues** to avoid duplicates
2. **Create a new issue** if none exists
3. **Discuss your approach** with maintainers
4. **Wait for approval** for significant changes

### 3. Development Workflow

```bash
# 1. Create a feature branch
git checkout -b fix/node-security-update

# 2. Make your changes
# Edit files, add tests, update documentation

# 3. Test your changes locally
make test-image IMAGE=node

# 4. Commit with descriptive messages
git add .
git commit -m "fix(node): update to Node.js 20.10.1 for CVE-2024-1234"

# 5. Push to your fork
git push origin fix/node-security-update

# 6. Create a pull request
```

### 4. Pull Request Guidelines

**PR Title Format:**
```
type(scope): brief description

Examples:
feat(nginx): add nginx 1.25 image variant
fix(python): resolve pip installation issue
docs(redis): improve usage examples
```

**PR Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature  
- [ ] Documentation update
- [ ] Breaking change

## Testing
- [ ] Local testing completed
- [ ] CI tests pass
- [ ] Security scan clean

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### 5. Review Process

**Automated Checks:**
- ✅ **CI Build** - All builds must pass
- ✅ **Security Scan** - No high/critical vulnerabilities
- ✅ **Lint Check** - Code style compliance
- ✅ **Tests** - All tests must pass

**Human Review:**
- 👥 **Peer Review** - Code review by maintainers
- 🛡️ **Security Review** - For security-related changes
- 📋 **Documentation Review** - For docs changes

## Adding New Images

### Image Requirements

**Security:**
- ✅ Must start with zero known CVEs
- ✅ Distroless design (minimal components)
- ✅ Non-root user by default
- ✅ Signed with Sigstore/cosign

**Quality:**
- ✅ Comprehensive documentation
- ✅ Usage examples
- ✅ Automated tests
- ✅ Multi-architecture support

**Compliance:**
- ✅ Open source licenses only
- ✅ SBOM generation
- ✅ Provenance attestation
- ✅ Regular update schedule

### Creating a New Image

```bash
# 1. Create image directory
mkdir images/myapp
cd images/myapp

# 2. Create image configuration
cat > image.yaml << 'EOF'
image:
  name: myapp
  entrypoint:
    command: /usr/bin/myapp
  accounts:
    groups:
      - groupname: nonroot
        gid: 65532
    users:
      - username: nonroot
        uid: 65532
        gid: 65532
    run-as: 65532
  environment:
    PATH: /usr/sbin:/sbin:/usr/bin:/bin

contents:
  packages:
    - ca-certificates-bundle
    - myapp

versions:
  - 'latest'
  - '1.0'
EOF

# 3. Create documentation
cat > README.md << 'EOF'
# myapp

Description of the application and image.

## Usage

```bash
docker run cgr.dev/chainguard/myapp:latest
```

## Tags

- `latest` - Latest stable version
- `1.0` - Version 1.0.x
EOF

# 4. Add tests
mkdir tests
cat > tests/main.tf << 'EOF'
terraform {
  required_providers {
    oci = { source = "chainguard-dev/oci" }
  }
}

variable "digest" {
  description = "The image digest to run tests against."
}

data "oci_exec_test" "version" {
  digest = var.digest
  script = "docker run --rm $IMAGE_NAME --version"
}
EOF
```

### Testing Your Image

```bash
# Build the image
make image IMAGE=myapp

# Run tests
make test-image IMAGE=myapp

# Security scan
make scan-image IMAGE=myapp

# Generate SBOM
make sbom-image IMAGE=myapp
```

## Code Style and Standards

### Configuration Files

**YAML Style:**
```yaml
# Use 2 spaces for indentation
image:
  name: node
  entrypoint:
    command: /usr/bin/node
  
# Use quotes for strings with special characters
environment:
  PATH: "/usr/bin:/bin"
  
# Sort arrays alphabetically when possible
packages:
  - ca-certificates-bundle
  - node
  - npm
```

**Dockerfile Best Practices:**
```dockerfile
# Use specific versions
FROM cgr.dev/chainguard/node:20.10.0

# Run as non-root
USER nonroot

# Use COPY instead of ADD
COPY package*.json ./

# Minimize layers
RUN npm ci --only=production \
    && npm cache clean --force
```

### Documentation Standards

**README Structure:**
```markdown
# Image Name

## Overview
Brief description and key features

## Usage
Basic usage examples

## Configuration
Environment variables and options

## Examples
Common use cases

## Tags and Versions
Available tags and their meanings

## Security
Security considerations and features
```

**Code Comments:**
```yaml
# Use comments to explain complex configurations
image:
  name: complex-app
  # Custom entrypoint required for configuration loading
  entrypoint:
    command: /usr/bin/custom-init
    
# Group related configurations
contents:
  # Runtime dependencies
  packages:
    - ca-certificates-bundle
    - complex-app
  
  # Development tools (removed in production builds)
  # repositories:
  #   - https://packages.wolfi.dev/os
```

## Testing Guidelines

### Test Types

**Unit Tests:**
```bash
# Test basic functionality
docker run --rm cgr.dev/chainguard/node:latest node --version

# Test entrypoint
docker run --rm cgr.dev/chainguard/node:latest --help
```

**Integration Tests:**
```terraform
# Terraform-based tests
data "oci_exec_test" "npm_install" {
  digest = var.digest
  script = """
    docker run --rm -v $(pwd)/test-app:/app -w /app $IMAGE_NAME npm install
  """
}
```

**Security Tests:**
```bash
# Vulnerability scanning
grype cgr.dev/chainguard/node:latest

# Configuration analysis
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image cgr.dev/chainguard/node:latest
```

### Writing Good Tests

```terraform
# Test naming convention: describe what you're testing
data "oci_exec_test" "python_can_import_standard_library" {
  digest = var.digest
  script = """
    docker run --rm $IMAGE_NAME python -c "import json, sys, os"
  """
}

# Test both success and failure cases
data "oci_exec_test" "invalid_command_fails" {
  digest = var.digest
  script = "docker run --rm $IMAGE_NAME invalid-command || true"
}

# Test with realistic scenarios
data "oci_exec_test" "can_run_sample_app" {
  digest = var.digest
  script = """
    echo 'console.log("Hello World")' > /tmp/test.js
    docker run --rm -v /tmp/test.js:/test.js $IMAGE_NAME node /test.js
  """
}
```

## Release Process

### Versioning Strategy

We follow semantic versioning for image tags:

- **Major versions**: `node:20`
- **Minor versions**: `node:20.10`  
- **Patch versions**: `node:20.10.0`
- **Latest**: `node:latest`
- **Build date**: `node:20.10.0-20240115`

### Automated Releases

```yaml
# .github/workflows/release.yml
name: Release Images
on:
  schedule:
    # Nightly builds
    - cron: '0 2 * * *'
  workflow_dispatch:

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Build and push images
      run: |
        make release-all
        
    - name: Generate release notes
      run: |
        make generate-release-notes
```

### Manual Release Checklist

- [ ] **Version bump** - Update version in image.yaml
- [ ] **Changelog** - Document changes
- [ ] **Tests** - All tests pass
- [ ] **Security scan** - No critical vulnerabilities
- [ ] **Documentation** - Update docs if needed
- [ ] **Tag release** - Create git tag
- [ ] **Build images** - Trigger build pipeline
- [ ] **Verify deployment** - Test published images
- [ ] **Announce** - Update community channels

## Security Guidelines

### Vulnerability Handling

**Reporting Vulnerabilities:**
1. **Private disclosure** - Email security@chainguard.dev
2. **Provide details** - CVE, affected components, impact
3. **Wait for confirmation** - Before public disclosure
4. **Coordinate fix** - Work with maintainers

**Fixing Vulnerabilities:**
```bash
# 1. Identify vulnerable package
grype cgr.dev/chainguard/node:latest

# 2. Update package version in image.yaml
vim images/node/image.yaml

# 3. Test the fix
make test-image IMAGE=node
make scan-image IMAGE=node

# 4. Create emergency PR
git checkout -b security/node-cve-2024-1234
git commit -m "security(node): fix CVE-2024-1234 by updating to node 20.10.1"
```

### Security Best Practices

**Image Configuration:**
```yaml
image:
  name: secure-app
  accounts:
    # Always create non-root user
    users:
      - username: nonroot
        uid: 65532
        gid: 65532
    # Run as non-root
    run-as: 65532
  
# Minimize attack surface
contents:
  packages:
    # Only include essential packages
    - ca-certificates-bundle
    - secure-app
    # No package managers, shells, or debug tools
```

**Dockerfile Security:**
```dockerfile
# Use specific, minimal base images
FROM cgr.dev/chainguard/static:latest

# Don't install unnecessary packages
# RUN apt-get update && apt-get install -y curl  # ❌ Bad

# Copy only what's needed
COPY --chown=nonroot:nonroot app /usr/bin/app

# Use non-root user
USER nonroot

# Use exec form for ENTRYPOINT
ENTRYPOINT ["/usr/bin/app"]
```

## Communication Guidelines

### Issue and PR Communication

**Be Clear and Specific:**
```markdown
❌ "Node image is broken"
✅ "Node.js 20.10.0 fails to start with 'MODULE_NOT_FOUND' error when importing 'fs' module"
```

**Provide Context:**
```markdown
## Steps to Reproduce
1. Pull image: `docker pull cgr.dev/chainguard/node:20.10.0`
2. Run: `docker run -it cgr.dev/chainguard/node:20.10.0`
3. Execute: `node -e "require('fs')"`
4. Error occurs: `Error: Cannot find module 'fs'`

## Environment
- Platform: linux/amd64
- Docker version: 24.0.7
- Host OS: Ubuntu 22.04 LTS
```

**Be Respectful:**
- Use inclusive language
- Assume good intentions
- Provide constructive feedback
- Thank contributors for their time

### Community Interactions

**GitHub Discussions:**
```markdown
# Good discussion starter
## Question: Best practices for multi-stage builds with Chainguard Images

I'm trying to optimize my Docker builds using Chainguard Images as base images. 
What are the recommended patterns for multi-stage builds?

Current approach:
```dockerfile
FROM cgr.dev/chainguard/node:latest as builder
# ... build steps

FROM cgr.dev/chainguard/node:latest as runtime
# ... runtime setup
```

Are there any specific considerations or optimizations I should be aware of?
```

**Code Reviews:**
```markdown
# Constructive review comments

## Suggestion: Use more specific image tag
Instead of `:latest`, consider using a specific version for reproducible builds:

```yaml
# Instead of:
image: cgr.dev/chainguard/node:latest

# Use:
image: cgr.dev/chainguard/node:20.10.0
```

This ensures consistent builds across environments.

## Question: Security consideration
Have you considered the security implications of running as root? 
The current configuration might benefit from using the nonroot user.
```

## Commit Message Guidelines

### Format

```
type(scope): short description

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix  
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
- **security**: Security-related changes

### Examples

```bash
# Good commit messages
git commit -m "feat(nginx): add nginx 1.25 image variant"

git commit -m "fix(python): resolve pip installation issue in alpine variant

The alpine variant was failing to install packages due to missing 
build dependencies. Added build-essential and python3-dev to the
package list.

Fixes #123"

git commit -m "security(node): update to Node.js 20.10.1 for CVE-2024-1234"

git commit -m "docs(redis): improve usage examples and add performance tips"

# Bad commit messages
git commit -m "fix stuff"  # Too vague
git commit -m "Update node.yaml"  # Doesn't explain what changed
git commit -m "WIP"  # Work in progress, not ready for review
```

## Recognition and Rewards

### Contribution Tracking

We track and recognize contributions:

- **GitHub profile badges**
- **Monthly contributor spotlight**
- **Annual contribution awards**
- **Conference speaking opportunities**

### Contribution Types Recognized

- 📝 **Documentation** improvements
- 🐛 **Bug fixes** and issue resolution
- ✨ **Feature development**
- 🛠️ **Infrastructure** improvements
- 🤝 **Community support** and mentoring
- 📰 **Content creation** (blogs, talks, tutorials)

### Swag and Rewards

**Contribution Milestones:**
- **First PR merged**: Welcome package with stickers
- **5 PRs merged**: Chainguard t-shirt
- **15 PRs merged**: Hoodie and special recognition
- **Top contributor**: Conference sponsorship

## Getting Help

### Where to Ask Questions

1. **GitHub Discussions** - General questions and community help
2. **Issue comments** - Specific questions about existing issues
3. **PR comments** - Questions about your contribution
4. **Community forums** - Broader discussions and tutorials

### Mentorship Program

**New Contributor Support:**
- 👥 **Buddy system** - Paired with experienced contributor
- 📚 **Learning resources** - Curated guides and tutorials
- 💬 **Regular check-ins** - Progress reviews and guidance
- 🎆 **Goal setting** - Help define contribution objectives

**Apply for mentorship**: [community@chainguard.dev](mailto:community@chainguard.dev)

## FAQ

### Q: I'm new to containers. Where should I start?
**A**: Start with our [Getting Started guide](../getting-started) and look for issues labeled "good first issue". The community is very welcoming to newcomers!

### Q: How long does it take for PRs to be reviewed?
**A**: We aim to provide initial feedback within 2-3 business days. Complex changes may take longer for thorough review.

### Q: Can I work on multiple issues at once?
**A**: We recommend focusing on one issue at a time, especially when starting out. This helps ensure quality and prevents conflicts.

### Q: What if my PR is rejected?
**A**: Rejection is rare and usually due to technical constraints or project direction. We'll provide detailed feedback to help you understand and potentially revise your approach.

### Q: Can I contribute even if I can't code?
**A**: Absolutely! Documentation, testing, issue triage, community support, and many other contributions are valuable and welcomed.

### Q: How do I become a maintainer?
**A**: Maintainers are selected from active, long-term contributors who demonstrate technical expertise and community leadership. The process is merit-based and transparent.

## Resources and Links

### Development Resources
- **🛠️ Melange Documentation**: [https://github.com/chainguard-dev/melange](https://github.com/chainguard-dev/melange)
- **📦 Apko Documentation**: [https://github.com/chainguard-dev/apko](https://github.com/chainguard-dev/apko)
- **🔐 Cosign Documentation**: [https://docs.sigstore.dev/cosign/overview/](https://docs.sigstore.dev/cosign/overview/)
- **📋 Container Security Guide**: [https://edu.chainguard.dev/](https://edu.chainguard.dev/)

### Community Links
- **👥 GitHub Discussions**: [https://github.com/chainguard-images/images/discussions](https://github.com/chainguard-images/images/discussions)
- **💬 Community Forum**: [https://community.chainguard.dev](https://community.chainguard.dev)
- **🐦 Twitter**: [@chainguarddev](https://twitter.com/chainguarddev)
- **📧 Newsletter**: [https://chainguard.dev/newsletter](https://chainguard.dev/newsletter)

---

*Thank you for contributing to Chainguard Images! Together, we're building a more secure software supply chain.* 🛡️

**Ready to get started?**
1. 🔍 [Browse good first issues](https://github.com/chainguard-images/images/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
2. 📝 [Join our discussions](https://github.com/chainguard-images/images/discussions)
3. 🚀 [Submit your first PR](https://github.com/chainguard-images/images/compare)

*Every contribution, no matter how small, makes a difference!* ✨