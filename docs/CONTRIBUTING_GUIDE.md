# 🤝 Contributing Guide

Welcome to the Container Directory project! This guide will help you get started with contributing to our codebase using our simplified, industry-standard release workflow.

## 🚀 Quick Start for Contributors

### 1. **Simple Workflow - Single Branch Strategy**

We use **GitHub Flow** - a simplified, industry-standard workflow:

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/containers.git
cd containers

# 2. Create a feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-awesome-feature

# 3. Make your changes and commit with conventional commits
git add .
git commit -m "feat: add awesome new feature"

# 4. Push and create a Pull Request to main
git push origin feature/your-awesome-feature
```

**That's it! 🎉** No complex branching strategies to remember.

## 📝 Commit Message Convention

We use [Conventional Commits](https://conventionalcommits.org/) for automated versioning:

### **Commit Types:**
- `feat:` - New features (triggers **minor** version bump)
- `fix:` - Bug fixes (triggers **patch** version bump)  
- `perf:` - Performance improvements (triggers **patch** version bump)
- `docs:` - Documentation changes (triggers **patch** version bump)
- `style:` - Code style changes (no version bump)
- `refactor:` - Code refactoring (no version bump)
- `test:` - Adding tests (no version bump)
- `ci:` - CI/CD changes (triggers **patch** version bump)
- `build:` - Build system changes (triggers **patch** version bump)

### **Breaking Changes:**
Add `BREAKING CHANGE:` in the commit body or `!` after the type:
```bash
git commit -m "feat!: redesign API structure

BREAKING CHANGE: API endpoints have been restructured"
```

### **Examples:**
```bash
# ✅ Good commits
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login button styling issue"
git commit -m "docs: update installation instructions"
git commit -m "perf: optimize image loading performance"

# ❌ Bad commits  
git commit -m "update stuff"
git commit -m "WIP"
git commit -m "fixes"
```

## 🔄 Release Process (Automated)

### **How Releases Work:**

1. **Automatic Releases**: Every merge to `main` triggers our automated release system
2. **Version Calculation**: Based on your commit messages using semantic versioning
3. **Release Notes**: Automatically generated from your commits
4. **Docker Images**: Automatically built and published
5. **GitHub Releases**: Created with changelog and artifacts

### **Release Channels:**

| Branch | Purpose | Release Type | Docker Tag |
|--------|---------|--------------|------------|
| `main` | Production | Stable (latest) | `latest`, `v1.2.3` |
| `beta` | Release Candidates | Beta testing | `beta`, `v1.2.3-beta.1` |
| `alpha` | Development | Bleeding edge | `alpha`, `v1.2.3-alpha.1` |

### **Manual Beta Releases:**

For testing features before production:

```bash
# Create beta release via GitHub Actions
# Go to Actions → Release → Run workflow → Select "beta"
```

## 🧪 Development Workflow

### **Setup:**
```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run tests
yarn test

# Run linting
yarn lint

# Type checking  
yarn type-check

# Build for production
yarn build
```

### **Testing Requirements:**
- ✅ All tests must pass
- ✅ Code coverage should not decrease
- ✅ Linting must pass
- ✅ Type checking must pass
- ✅ Security audit must pass

### **Pre-commit Hooks:**
We automatically run checks on every commit:
- **Lint staged files**
- **Validate commit message format**
- **Run type checking**

## 📋 Pull Request Guidelines

### **Before Creating a PR:**
1. **Rebase your branch** on latest main
2. **Run full test suite** locally
3. **Update documentation** if needed
4. **Add tests** for new features
5. **Ensure conventional commit messages**

### **PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)  
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or properly marked)
```

### **Review Process:**
1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Code Review**: Team member reviews your code
3. **Approval**: Once approved, maintainer merges to main
4. **Automatic Release**: System creates release if needed

## 🏗️ Architecture Overview

### **Monorepo Structure:**
```
containers/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # FastAPI backend  
├── packages/
│   ├── ui/           # Shared UI components
│   └── eslint-config/# Shared linting config
├── docs/             # Documentation
└── .github/          # CI/CD workflows
```

### **Technology Stack:**
- **Frontend**: Next.js 15.5.5, React, TypeScript, Tailwind CSS
- **Backend**: Python FastAPI, SQLAlchemy
- **Build**: Turbo (monorepo), Docker multi-platform
- **Testing**: Jest, Playwright, pytest
- **CI/CD**: GitHub Actions, semantic-release
- **Deployment**: Docker containers, GitHub Container Registry

## 🚀 Release Examples

### **Patch Release (1.0.0 → 1.0.1):**
```bash
git commit -m "fix: resolve header navigation issue"
# Results in: v1.0.1
```

### **Minor Release (1.0.0 → 1.1.0):**
```bash
git commit -m "feat: add dark mode support"
# Results in: v1.1.0
```

### **Major Release (1.0.0 → 2.0.0):**
```bash
git commit -m "feat!: redesign API architecture

BREAKING CHANGE: API endpoints restructured from /v1/ to /v2/"
# Results in: v2.0.0
```

### **Beta Release:**
```bash
# Trigger via GitHub Actions workflow dispatch
# Results in: v1.1.0-beta.1
```

## 🆘 Getting Help

### **Common Issues:**

**Q: My commit message was rejected**
```bash
# Fix: Use conventional commits format
git commit -m "feat: your feature description"
```

**Q: Tests are failing**
```bash
# Fix: Run tests locally first
yarn test
yarn lint
yarn type-check
```

**Q: I want to create a beta release**
```bash
# Fix: Use GitHub Actions workflow dispatch
# Go to Actions → Release → Run workflow → Select "beta"
```

### **Support Channels:**
- 📝 **Issues**: [GitHub Issues](https://github.com/broadsage/containers/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/broadsage/containers/discussions)
- 📖 **Documentation**: [`/docs`](./README.md)

## ✨ Benefits of Our Workflow

### **For Contributors:**
- ✅ **Simple**: Only one target branch (`main`)
- ✅ **Fast**: No complex branching delays
- ✅ **Automated**: Releases happen automatically
- ✅ **Safe**: Comprehensive testing before merge
- ✅ **Transparent**: Clear release notes and versioning

### **For Maintainers:**
- ✅ **Reliable**: Industry-standard semantic versioning
- ✅ **Auditable**: Full release history and artifacts
- ✅ **Scalable**: Easy to add more contributors
- ✅ **Professional**: Follows GitHub Flow best practices

---

**Ready to contribute? 🚀**

1. [Fork the repository](https://github.com/broadsage/containers/fork)
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Thank you for contributing to Container Directory! 🙏