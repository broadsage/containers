# Release Management with Semantic Release

This project uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) for automated release management.

## 🔄 How It Works

Releases are automatically triggered when commits are pushed to:
- `main` branch → Production releases (1.0.0, 1.1.0, etc.)
- `nextjs` branch → Beta releases (1.1.0-beta.1, etc.)
- `develop` branch → Alpha releases (1.1.0-alpha.1, etc.)

## 📝 Commit Message Format

Use [Conventional Commits](https://conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types and Their Release Impact

| Type | Release | Example |
|------|---------|---------|
| `feat` | Minor (1.1.0) | `feat(web): add image search functionality` |
| `fix` | Patch (1.0.1) | `fix(api): resolve memory leak in image processing` |
| `perf` | Patch (1.0.1) | `perf(web): optimize bundle size` |
| `build` | Patch (1.0.1) | `build: update dependencies` |
| `ci` | Patch (1.0.1) | `ci: add semantic-release workflow` |
| `docs` | Patch (1.0.1) | `docs: update API documentation` |
| `feat!` or `BREAKING CHANGE:` | Major (2.0.0) | Breaking changes |

### Breaking Changes

Add `!` after type or `BREAKING CHANGE:` in footer:

```
feat!: remove deprecated API endpoint

BREAKING CHANGE: The /api/v1/old-endpoint has been removed.
Use /api/v2/new-endpoint instead.
```

## 🚀 Release Process

1. **Commit Changes**: Use conventional commit messages
2. **Push to Branch**: Releases are triggered on push to `main`, `nextjs`, or `develop`
3. **Automated Release**: 
   - Version is calculated from commit types
   - CHANGELOG.md is updated
   - GitHub release is created
   - Docker images are tagged and pushed
   - SBOM is generated and attached

## 📋 Generated Artifacts

Each release automatically creates:
- 📦 **Git Tag**: Semantic version (v1.2.3)
- 📝 **CHANGELOG.md**: Updated with release notes
- 🐳 **Docker Images**: Tagged with version
- 🔒 **SBOM**: Software Bill of Materials
- 📄 **GitHub Release**: With release notes and assets

## 🛠️ Manual Release (Local)

For testing or emergency releases:

```bash
# Dry run (test without publishing)
yarn release:dry-run

# Actual release (requires GITHUB_TOKEN)
GITHUB_TOKEN=your_token yarn release
```

## 🔧 Configuration Files

- `.releaserc.json` - Semantic release configuration
- `.commitlintrc.json` - Commit message linting rules
- `.husky/commit-msg` - Git hook for commit validation
- `.github/workflows/release.yml` - CI/CD release workflow