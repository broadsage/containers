# CI/CD Setup Guide

## Overview

This project uses GitHub Actions for continuous integration and deployment. Workflows automatically test, build, and validate code on every push and pull request.

## GitHub Actions Workflows

### 1. Backend CI (`backend-ci.yml`)

**Triggers:**
- Push to main/develop branches
- Pull requests to main/develop
- Changes in `backend/` directory

**Jobs:**

#### Lint and Test
- **Python versions**: 3.10, 3.11
- **Steps**:
  1. Code formatting check (Black)
  2. Import sorting (isort)
  3. Linting (Flake8)
  4. Unit tests with coverage (pytest)
  5. Upload coverage to Codecov

#### Security Scan
- **Tools**: Bandit, Safety
- **Purpose**: Detect security vulnerabilities

#### Build
- **Action**: Build Docker image
- **Cache**: GitHub Actions cache
- **Validates**: Dockerfile and build process

### 2. Frontend CI (`frontend-ci.yml`)

**Triggers:**
- Push to main/develop branches
- Pull requests to main/develop
- Changes in `apps/web/` or `packages/` directories

**Jobs:**

#### Lint and Type Check
- **Node version**: 20.x
- **Steps**:
  1. ESLint checks with SARIF output
  2. TypeScript type checking
  3. Upload ESLint results to Security tab

#### Test
- **Strategy**: Matrix for unit and integration tests
- **Steps**:
  1. Unit tests with coverage (Jest)
  2. Integration tests
  3. Upload coverage to Codecov
  4. Upload test results as artifacts

#### Build
- **Action**: Build Next.js application
- **Output**: Upload build artifacts for Docker workflow
- **Cache**: Yarn dependencies and Turbo cache

#### Security Scan
- **Tools**: npm audit
- **Purpose**: Detect vulnerabilities in dependencies

### 3. Docker CI (`docker-ci.yml`)

**Triggers:**
- Push to main branch
- Pull requests to main
- Changes in `apps/web/`, `packages/`, Docker files
- Called by other workflows (workflow_call)

**Features:**
- **Multi-platform builds**: linux/amd64, linux/arm64 (configurable)
- **Build artifact reuse**: Uses artifacts from frontend-ci when available
- **Enhanced caching**: GitHub Actions cache with platform-specific scopes
- **Security scanning**: Trivy vulnerability scanner, SBOM generation
- **Smart platform selection**: Single platform for PRs, multi-platform for releases

**Jobs:**

#### Docker Build
- **Platforms**: Configurable (default: linux/amd64 for PRs, multi-platform for main)
- **Timeout**: 30 minutes
- **Steps**:
  1. Setup Docker Buildx with optimized driver
  2. Download build artifacts from frontend-ci (if available)
  3. Build and push Docker images with enhanced caching
  4. Generate and upload SBOM
  5. Run Trivy security scan

#### Docker Test
- **Purpose**: Smoke test the built Docker image
- **Steps**:
  1. Pull the built image
  2. Run container and test health endpoint
  3. Cleanup

### 4. Release (`release.yml`)

**Triggers:**
- Push to main branch
- Manual workflow dispatch with release type selection

**Features:**
- **Semantic versioning**: Automated version bumps based on conventional commits
- **Release notes**: Auto-generated from commit messages
- **Docker integration**: Calls docker-ci workflow for multi-platform builds
- **Git tagging**: Automatic tag creation

**Jobs:**

#### Release
- **Tool**: semantic-release
- **Actions**:
  1. Analyze commits for version bump
  2. Generate release notes
  3. Create Git tag and GitHub release
  4. Output release information for downstream jobs

#### Docker Release
- **Dependency**: Calls docker-ci.yml workflow
- **Platforms**: linux/amd64, linux/arm64
- **Tags**: Semantic version tags (v1.2.3, v1.2, v1, latest)
- **Security**: SBOM generation and attestation

### 5. Integration Tests (`integration-tests.yml`)

**Triggers:**
- Push to main/develop branches
- Pull requests to main/develop

**Services:**
- MongoDB service container

**Steps:**
1. Start MongoDB
2. Start backend server
3. Build frontend
4. Run integration tests
5. Upload test results

## Required GitHub Secrets

### Optional (for enhanced features)
- `SNYK_TOKEN`: For Snyk security scanning
- `CODECOV_TOKEN`: For coverage reporting (optional)

## Setting Up CI/CD

### 1. Enable GitHub Actions

Actions are automatically enabled for repositories. Workflows in `.github/workflows/` will run automatically.

### 2. Configure Secrets (Optional)

1. Go to repository Settings > Secrets and variables > Actions
2. Add required secrets:
   - `SNYK_TOKEN` (if using Snyk)
   - Other secrets as needed

### 3. Branch Protection Rules

Recommended rules for `main` branch:

1. Go to Settings > Branches > Add rule
2. Configure:
   - Require pull request reviews
   - Require status checks to pass:
     - Backend CI: lint-and-test
     - Frontend CI: lint-and-test
     - Integration Tests
   - Require branches to be up to date
   - Include administrators

## Workflow Details

### Caching Strategy

**Python Dependencies:**
```yaml
- uses: actions/setup-python@v5
  with:
    cache: 'pip'
```

**Node Dependencies:**
```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'yarn'
```

**Docker Layers:**
```yaml
- uses: docker/build-push-action@v5
  with:
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

### Matrix Strategy

Tests run across multiple versions:
- **Backend**: Python 3.10, 3.11
- **Frontend**: Node 18.x, 20.x

Ensures compatibility across versions.

### Test Coverage

Coverage reports are:
1. Generated during tests
2. Uploaded to Codecov (if token provided)
3. Available as artifacts
4. Shown in PR comments

## Local Testing

Run the same tests locally:

### Backend
```bash
cd backend
pytest tests/ -v --cov=app
black --check app/
flake8 app/
```

### Frontend
```bash
cd apps/web
yarn lint
yarn tsc --noEmit
yarn test --coverage
```

### Integration
```bash
make test-integration
```

## Monitoring Workflows

### View Workflow Runs
1. Go to Actions tab in GitHub
2. Select workflow
3. View run details

### Check Logs
1. Click on failed job
2. Expand step to see logs
3. Download logs if needed

### Artifacts
Test results and coverage reports are uploaded as artifacts:
1. Go to workflow run
2. Scroll to Artifacts section
3. Download artifacts

## Troubleshooting

### Workflow Fails

1. **Check logs**: Click on failed step
2. **Run locally**: Reproduce issue locally
3. **Fix and commit**: Push fix to re-trigger

### Common Issues

#### Tests Timeout
- Increase timeout in workflow
- Optimize slow tests
- Check for infinite loops

#### Dependency Installation Fails
- Check requirements.txt/package.json
- Verify package availability
- Update dependency versions

#### Build Fails
- Check Dockerfile syntax
- Verify build context
- Review build logs

#### Coverage Upload Fails
- Check Codecov token
- Verify coverage file path

## Architecture Benefits

### Separate Workflow Design

The project uses a **separate workflow architecture** for optimal performance:

#### Benefits:
1. **Parallel Execution**: Frontend CI and Docker builds can run simultaneously
2. **Independent Failure Domains**: Docker build failures don't affect code quality checks
3. **Resource Optimization**: Better CI resource utilization and faster feedback
4. **Maintainability**: Clearer separation of concerns and easier workflow management
5. **Scalability**: Each workflow can be optimized independently

#### Performance Optimizations:
- **Smart Platform Building**: Single platform (linux/amd64) for PRs, multi-platform for releases
- **Build Artifact Reuse**: Docker workflow reuses frontend build artifacts when available
- **Enhanced Caching**: Platform-specific Docker layer cache, Turbo cache, and dependency caching
- **Optimized Context**: Comprehensive .dockerignore reduces build context size
- **Timeout Management**: Appropriate timeouts (30min for Docker, 10-15min for others)

#### Workflow Orchestration:
```
Pull Request Flow:
├── frontend-ci.yml (parallel)
├── docker-ci.yml (uses artifacts from frontend-ci)
└── integration-tests.yml

Release Flow:
├── release.yml
└── docker-ci.yml (called with release parameters)
```

### Docker Build Strategy

#### Multi-Platform Considerations:
- **Development**: linux/amd64 only for faster feedback
- **Production**: linux/amd64,linux/arm64 for broad compatibility
- **Performance**: ~2-3x faster single-platform builds for PRs

#### Caching Strategy:
- **Layer Cache**: GitHub Actions cache with platform-specific scopes
- **Build Context**: Optimized with comprehensive .dockerignore
- **Dependency Cache**: Yarn/npm cache reused across jobs
- **Artifact Reuse**: Frontend builds shared between workflows when available
- Review Codecov status

## Best Practices

1. **Keep workflows fast**: Use caching, parallel jobs
2. **Fail fast**: Stop on first error
3. **Meaningful names**: Clear job and step names
4. **Security**: Use secrets for sensitive data
5. **Artifacts**: Upload important files
6. **Notifications**: Configure for failures
7. **Documentation**: Keep this guide updated

## Workflow Status Badges

Add badges to README.md:

```markdown
![Backend CI](https://github.com/username/repo/workflows/Backend%20CI/badge.svg)
![Frontend CI](https://github.com/username/repo/workflows/Frontend%20CI/badge.svg)
![Integration Tests](https://github.com/username/repo/workflows/Integration%20Tests/badge.svg)
```

## Extending CI/CD

### Add New Workflow

1. Create file in `.github/workflows/`
2. Define trigger events
3. Add jobs and steps
4. Test workflow

### Add New Job

```yaml
  new-job:
    name: New Job Name
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Do something
        run: echo "Hello"
```

### Add Deployment

```yaml
  deploy:
    needs: [lint-and-test, build]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: ./deploy.sh
```

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

## Support

For CI/CD issues:
1. Check workflow logs
2. Review this guide
3. Check GitHub Actions status
4. Contact DevOps team