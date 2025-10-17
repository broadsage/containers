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

### 3. GitHub Pages Deployment (`github-pages.yml`)

**Triggers:**
- Push to main branch
- Changes in `apps/web/`, `packages/`, or workflow file
- Manual workflow dispatch

**Features:**
- **Static site generation**: Next.js static export optimized for GitHub Pages
- **Automatic deployment**: Direct deployment to GitHub Pages environment
- **Build optimization**: Turbo build system with dependency caching
- **Pages configuration**: Automatic basePath injection and image optimization

**Jobs:**

#### Build
- **Purpose**: Build Next.js application for static export
- **Timeout**: 15 minutes
- **Steps**:
  1. Setup Node.js environment with Yarn caching
  2. Configure GitHub Pages settings
  3. Install dependencies and build application
  4. Upload static files as Pages artifact

#### Deploy
- **Purpose**: Deploy built static files to GitHub Pages
- **Environment**: github-pages
- **Timeout**: 10 minutes
- **Steps**:
  1. Deploy artifact to GitHub Pages
  2. Return deployment URL

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

### GitHub Pages Deployment Architecture

The project uses **GitHub Pages** for hosting the static Next.js application:

#### Benefits:
1. **Static Site Generation**: Fast, secure, and reliable hosting
2. **Automatic Deployment**: Direct integration with GitHub Actions
3. **Global CDN**: GitHub's global content delivery network
4. **Custom Domain Support**: Can be configured with custom domains
5. **Zero Server Management**: No infrastructure to maintain

#### Performance Optimizations:
- **Static Export**: Next.js optimized for static file generation
- **Build Caching**: Turbo cache and dependency caching for faster builds
- **Image Optimization**: Unoptimized images for static export compatibility
- **Trailing Slashes**: Proper URL structure for static hosting

#### Workflow Orchestration:
```
Main Branch Push:
├── frontend-ci.yml (code quality & testing)
└── github-pages.yml (build & deploy)

Pull Request Flow:
├── frontend-ci.yml (validation)
└── integration-tests.yml (if applicable)

Release Flow:
├── release.yml (semantic versioning)
└── github-pages.yml (triggered by main push)
```

### GitHub Pages Configuration

#### Static Site Generation:
- **Output**: Static HTML/CSS/JS files
- **Routing**: File-based routing with trailing slashes
- **Images**: Unoptimized for static compatibility
- **API**: Client-side API calls to external services

#### Deployment Strategy:
- **Build Environment**: GitHub Actions runners
- **Artifact Upload**: Pages-specific artifact format
- **Deployment**: Automatic to github-pages environment
- **URL**: `https://<username>.github.io/<repository>/`
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