# Frontend CI/CD Setup Guide

## Required GitHub Repository Secrets

To enable all features of the frontend CI/CD pipeline, configure the following secrets in your GitHub repository settings:

### Security Scanning
- `SNYK_TOKEN`: Snyk authentication token for vulnerability scanning
  - Sign up at https://snyk.io
  - Generate API token in Account Settings
  - Used for dependency and container vulnerability scanning

### Code Coverage
- `CODECOV_TOKEN`: Codecov token for test coverage reporting
  - Sign up at https://codecov.io
  - Link your repository and get the token
  - Used for uploading and tracking test coverage

### Container Registry (Automatic)
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions
  - Used for publishing Docker images to GitHub Container Registry (ghcr.io)
  - No manual configuration needed

## Optional Secrets

### Enhanced Security (Advanced)
- `SONAR_TOKEN`: SonarCloud token for advanced code analysis
- `WHITESOURCE_API_KEY`: WhiteSource (Mend) for license compliance

## Workflow Features

### ✅ Implemented
- **Multi-stage Pipeline**: Code quality → Testing → Build → Security → Publish
- **Advanced Caching**: Smart dependency and build artifact caching
- **Security Scanning**: 
  - Trivy container vulnerability scanning
  - Snyk dependency and container scanning
  - ESLint SARIF output for GitHub Security tab
- **Test Coverage**: Jest with coverage reporting and Codecov integration
- **Docker Multi-arch**: Builds for linux/amd64 and linux/arm64
- **SBOM Generation**: Software Bill of Materials for supply chain security
- **Proper Error Handling**: Fail-fast where appropriate, continue-on-error for optional steps

### 🔧 Configuration
- **Node.js Versions**: Tests on Node 18.x and 20.x
- **Build Targets**: Development, Test, and Production Docker stages
- **Security Gates**: Required security scans before publishing
- **Environment Variables**: Proper production configuration
- **Health Checks**: Built-in container health monitoring

### 🚀 Publishing
- **GitHub Container Registry**: Automatic image publishing to ghcr.io
- **Image Tagging**: Semantic versioning with branch, SHA, and latest tags
- **Multi-platform**: ARM64 and AMD64 support for broad compatibility
- **Layer Optimization**: Efficient Docker layer caching

## Usage

### Triggering the Pipeline
- **Push to main/nextjs**: Full pipeline including Docker publishing
- **Pull Requests**: Code quality, testing, and security scanning (no publishing)
- **Release**: Semantic version tagging and publishing

### Monitoring
- **GitHub Actions**: View pipeline status in Actions tab
- **Security**: Security findings in Security → Code scanning alerts
- **Coverage**: Test coverage reports in PR comments and Codecov dashboard
- **Artifacts**: Build artifacts and test reports available in workflow runs

## Best Practices Applied

1. **Security First**: Non-root containers, vulnerability scanning, SBOM generation
2. **Performance**: Multi-stage builds, layer caching, parallel job execution
3. **Reliability**: Proper error handling, health checks, timeout configurations
4. **Observability**: Comprehensive logging, artifact uploads, status reporting
5. **Scalability**: Matrix builds, caching strategies, resource optimization

## Next Steps

1. Configure required secrets in repository settings
2. Update branch protection rules to require CI checks
3. Set up Codecov and Snyk integrations
4. Configure deployment workflows for staging/production environments