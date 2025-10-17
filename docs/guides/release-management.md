# 🚀 Release Management Guide

## Overview

This project uses **automated semantic versioning** with a simplified single-branch workflow based on industry best practices from Next.js, React, and other modern web projects.

## 🎯 Release Strategy

### **Simplified GitHub Flow**

- **Single development branch**: `main`
- **Feature branches**: Short-lived branches for development
- **Automated releases**: Based on conventional commits
- **Multiple release channels**: Stable, beta, alpha

## 📊 Release Channels

| Channel | Branch | Purpose | Automation | Docker Tag |
|---------|--------|---------|------------|------------|
| **Stable** | `main` | Production releases | Auto on merge | `latest`, `v1.2.3` |
| **Beta** | `beta` | Release candidates | Manual trigger | `beta`, `v1.2.3-beta.1` |
| **Alpha** | `alpha` | Development builds | Manual trigger | `alpha`, `v1.2.3-alpha.1` |

## 🔄 Automated Workflow

### **For Contributors (Simple)**

```bash
# 1. Create feature branch
git checkout main && git pull origin main
git checkout -b feature/awesome-feature

# 2. Make changes with conventional commits
git commit -m "feat: add awesome feature"

# 3. Create PR to main
git push origin feature/awesome-feature
# PR → Review → Merge → Automatic Release ✨
```

### **For Maintainers**

```bash
# Regular releases (automatic)
# Just merge PRs - system handles versioning

# Beta releases (manual)
# Go to GitHub Actions → Release → Run workflow → Select "beta"

# Emergency patches (manual)
# Create hotfix branch → Fast-track PR → Merge
```

## 📝 Semantic Versioning

Based on [Conventional Commits](https://conventionalcommits.org/):

### **Version Bumps**

- `fix:` → **1.0.0** → **1.0.1** (Patch)
- `feat:` → **1.0.0** → **1.1.0** (Minor)  
- `feat!:` or `BREAKING CHANGE:` → **1.0.0** → **2.0.0** (Major)

### **Commit Types**

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New features | Minor |
| `fix` | Bug fixes | Patch |
| `perf` | Performance improvements | Patch |
| `docs` | Documentation changes | Patch |
| `style` | Code formatting | None |
| `refactor` | Code restructuring | None |
| `test` | Adding tests | None |
| `ci` | CI/CD changes | Patch |
| `build` | Build system changes | Patch |

## 🛠️ Release Automation

### **What Gets Automated**

1. **Version Calculation**: Based on commit messages
2. **Changelog Generation**: From conventional commits
3. **Git Tagging**: Semantic version tags
4. **GitHub Releases**: With release notes and assets
5. **Docker Images**: Multi-platform builds
6. **SBOM Generation**: Security bill of materials
7. **NPM Publishing**: Package updates (disabled by default)

### **Workflow Files**

- `.github/workflows/release.yml` - Main release workflow
- `.releaserc.json` - Semantic-release configuration
- `.commitlintrc.json` - Commit message validation

## 📦 Artifacts

Each release produces:

- **Git Tag**: `v1.2.3`
- **GitHub Release**: With automated changelog
- **Docker Images**: 
  - `ghcr.io/broadsage/containers/web:latest`
  - `ghcr.io/broadsage/containers/web:v1.2.3`
- **SBOM File**: `sbom.spdx.json` for security scanning
- **Coverage Reports**: Test coverage data

## 🔧 Manual Release Types

### **Creating Beta Releases**

For testing features before production:

1. Go to **GitHub Actions**
2. Select **Release** workflow
3. Click **Run workflow**
4. Choose **beta** from dropdown
5. System creates `v1.2.3-beta.1`

### **Emergency Hotfixes**

For critical production issues:

```bash
# 1. Create hotfix branch from main
git checkout main && git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. Make the fix with conventional commit
git commit -m "fix: resolve critical security vulnerability

This patch addresses CVE-2024-XXXX"

# 3. Fast-track PR process
# Create PR → Skip normal review → Emergency merge
```

### **Major Version Releases**

For breaking changes:

```bash
# 1. Prepare breaking change
git commit -m "feat!: redesign API architecture

BREAKING CHANGE: API endpoints have been restructured from /v1/ to /v2/
- All endpoints now use /v2/ prefix
- Authentication header format changed
- Response schema updated"

# 2. System automatically creates v2.0.0
```

## � Release Metrics

### **Monitoring**

- **Release Frequency**: Track via GitHub releases
- **Build Success Rate**: Monitor CI/CD pipeline
- **Security Compliance**: SBOM and vulnerability scans
- **Performance**: Docker image sizes and build times

### **Quality Gates**

Before any release:

- ✅ All tests pass
- ✅ Security audit passes  
- ✅ Type checking passes
- ✅ Linting passes
- ✅ Build succeeds
- ✅ Docker images build successfully

## 🚨 Rollback Strategy

### **Immediate Rollback**

```bash
# Option 1: Revert commit on main
git checkout main
git revert <commit-hash>
git push origin main
# Triggers automatic patch release

# Option 2: Manual tag rollback
git tag -d v1.2.3
git push origin :refs/tags/v1.2.3
# Manually create GitHub release from previous version
```

### **Docker Rollback**

```bash
# Previous version is always available
docker pull ghcr.io/broadsage/containers/web:v1.2.2
# Update deployment to use previous tag
```

## 📋 Release Checklist

### **Before Release (Automated)**

- [ ] All CI checks pass
- [ ] Security audit clean
- [ ] Tests have adequate coverage
- [ ] Documentation updated
- [ ] Breaking changes documented

### **After Release (Monitor)**

- [ ] Verify Docker images published
- [ ] Check GitHub release created
- [ ] Validate SBOM generated
- [ ] Monitor deployment health
- [ ] Confirm version numbers correct

## 🎉 Benefits

### **For Developers**

- **Simple**: Single target branch
- **Fast**: No branching complexity  
- **Automated**: Releases happen automatically
- **Transparent**: Clear versioning and changelog

### **For Operations**

- **Reliable**: Industry-standard semantic versioning
- **Traceable**: Full release history and artifacts
- **Secure**: Automated security scanning and SBOM
- **Scalable**: Easy to add contributors

## 📚 References

- [Conventional Commits](https://conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Semantic Release](https://semantic-release.gitbook.io/)

---

**Questions?** Open an issue or discussion in the GitHub repository!
