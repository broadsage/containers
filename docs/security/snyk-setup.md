# Snyk Security Integration

This project uses Snyk for security vulnerability scanning in GitHub Actions.

## Features

The Snyk workflow (`.github/workflows/snyk-security.yml`) includes:

1. **Dependency Scanning** - Scans Node.js dependencies for vulnerabilities
2. **Docker Image Scanning** - Scans Docker images for vulnerabilities
3. **Continuous Monitoring** - Monitors main branch for new vulnerabilities
4. **GitHub Security Integration** - Results appear in GitHub Security tab

## Setup Instructions

### 1. Get Your Snyk Token

1. Sign up for a free account at [https://snyk.io](https://snyk.io)
2. Go to your account settings: [https://app.snyk.io/account](https://app.snyk.io/account)
3. Copy your API token from the "General" section

### 2. Add Snyk Token to GitHub

1. Go to your GitHub repository settings
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `SNYK_TOKEN`
5. Value: Paste your Snyk API token
6. Click **Add secret**

### 3. Enable Code Scanning (Optional)

To see Snyk results in the GitHub Security tab:

1. Go to your repository's **Settings** → **Code security and analysis**
2. Enable **Code scanning**
3. The workflow will automatically upload results

## Workflow Details

### Triggers

- **Push** to `main` branch or any `feature/**` branches
- **Pull requests** to `main` branch
- **Daily scheduled scan** at 2 AM UTC
- **Manual trigger** via GitHub Actions UI

### Jobs

#### 1. `snyk-scan`
- Scans dependencies in root, frontend, and backend
- Tests for vulnerabilities (high severity threshold)
- Uploads results to GitHub Code Scanning
- Runs on: Push, PR, Schedule, Manual

#### 2. `snyk-monitor`
- Continuously monitors the main branch
- Tracks vulnerabilities over time in Snyk dashboard
- Runs on: Push to main branch only

#### 3. `snyk-docker`
- Scans Docker images for both frontend and backend
- Checks base images and dependencies
- Runs on: Push and Pull Requests

## Viewing Results

### In GitHub
1. Go to **Security** tab in your repository
2. Click **Code scanning alerts**
3. View Snyk findings with severity levels

### In Snyk Dashboard
1. Log in to [https://app.snyk.io](https://app.snyk.io)
2. View all monitored projects
3. See detailed vulnerability information
4. Get fix recommendations

## Customization

### Change Severity Threshold

Edit the workflow to change from `high` to `medium` or `low`:

```yaml
args: --severity-threshold=medium
```

### Add More Projects

Add more matrix entries in the `snyk-scan` job:

```yaml
- name: 'Your Package Name'
  path: 'packages/your-package'
```

### Disable Certain Scans

Comment out or remove jobs you don't need:
- Remove `snyk-docker` if you don't use Docker
- Remove `snyk-monitor` if you only want PR checks

## Troubleshooting

### "SNYK_TOKEN not found"
- Make sure you added the secret to GitHub repository settings
- Secret name must be exactly `SNYK_TOKEN`

### "No supported manifest files found"
- Ensure dependencies are installed before scanning
- Check that package.json/requirements.txt exists

### Build failures on Docker scan
- Check Docker builds locally first
- Ensure Dockerfile paths are correct

## Local Testing

Install Snyk CLI locally:

```bash
# Install globally
npm install -g snyk

# Authenticate
snyk auth

# Test current project
snyk test

# Test all workspaces
snyk test --all-projects

# Test Docker image
docker build -t myapp:latest .
snyk container test myapp:latest
```

## Resources

- [Snyk Documentation](https://docs.snyk.io)
- [Snyk GitHub Actions](https://github.com/snyk/actions)
- [Snyk CLI Reference](https://docs.snyk.io/snyk-cli)
