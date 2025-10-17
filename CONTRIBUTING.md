# Contributing to Container Directory

Thank you for your interest in contributing! This project uses a **simplified single-branch workflow** that's easy for contributors and follows industry best practices.

## 🚀 Quick Start

### Simple 3-Step Process

```bash
# 1. Create feature branch from main
git checkout main && git pull origin main
git checkout -b feature/your-feature-name

# 2. Make changes with conventional commits
git commit -m "feat: add your awesome feature"

# 3. Push and create PR to main
git push origin feature/your-feature-name
```

That's it! No complex branching to remember.

## 📝 Commit Message Format

We use [Conventional Commits](https://conventionalcommits.org/) for automated versioning:

- `feat:` → Minor version bump (new features)
- `fix:` → Patch version bump (bug fixes)  
- `docs:` → Patch version bump (documentation)
- `perf:` → Patch version bump (performance)
- `style:` → No version bump (formatting)
- `refactor:` → No version bump (code restructuring)
- `test:` → No version bump (adding tests)

### Breaking Changes

Add `!` after type or `BREAKING CHANGE:` in body:

```bash
git commit -m "feat!: redesign API structure

BREAKING CHANGE: API endpoints have changed"
```

## 🔄 Automated Release Process

- **Every merge to main** → Automatic release (if needed)
- **Version calculation** → Based on your commit messages
- **Release notes** → Generated from commits
- **Docker images** → Built and published automatically
- **GitHub releases** → Created with changelog

## 🧪 Development Setup

```bash
# Install dependencies
yarn install

# Start development
yarn dev

# Run tests
yarn test

# Check code quality
yarn lint && yarn type-check
```

## � Pull Request Guidelines

1. **Branch from main** (always up-to-date)
2. **Follow conventional commits** (for automated versioning)
3. **Add tests** for new features
4. **Update docs** if needed
5. **Ensure CI passes** (tests, linting, type-checking)

## 🆘 Getting Help

- **Issues**: [GitHub Issues](https://github.com/broadsage/containers/issues)
- **Questions**: [GitHub Discussions](https://github.com/broadsage/containers/discussions)
- **Documentation**: See `/docs` folder

## ✨ Why This Workflow?

- **Simple**: One target branch (main)
- **Fast**: No branching complexity
- **Automated**: Releases happen automatically  
- **Safe**: Comprehensive CI/CD checks
- **Industry Standard**: GitHub Flow best practices

Ready to contribute? [Fork the repo](https://github.com/broadsage/containers/fork) and start coding! 🚀
