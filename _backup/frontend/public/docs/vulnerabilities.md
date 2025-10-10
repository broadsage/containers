# Vulnerability Management

## Overview

SecureHub continuously scans all container images for known security vulnerabilities (CVEs) and provides detailed reports to help you secure your deployments.

## Vulnerability Scanning

### Automated Scanning

- **Continuous monitoring**: Images are scanned with every build
- **Daily updates**: Vulnerability database updated daily
- **Multi-source data**: Aggregates CVE data from multiple sources
- **Real-time alerts**: Get notified of new vulnerabilities

### Severity Levels

Vulnerabilities are categorized by severity:

#### Critical (CVSS 9.0-10.0)
- Immediate action required
- Can be exploited remotely
- Requires no authentication
- High impact on confidentiality, integrity, or availability

#### High (CVSS 7.0-8.9)
- Prompt action recommended
- Significant security risk
- May require specific conditions to exploit

#### Medium (CVSS 4.0-6.9)
- Action recommended
- Moderate security risk
- Limited impact or difficult to exploit

#### Low (CVSS 0.1-3.9)
- Awareness recommended
- Minimal security risk
- Very limited impact

## Viewing Vulnerabilities

### Web Interface

1. Navigate to any image detail page
2. View vulnerability counts in the summary cards
3. Click the **Vulnerabilities** tab for detailed CVE information

### Information Provided

For each vulnerability:

- **CVE ID**: Common Vulnerabilities and Exposures identifier
- **Severity**: Critical, High, Medium, or Low
- **CVSS Score**: Numerical score (0-10)
- **Affected Package**: Which component is vulnerable
- **Installed Version**: Current version in the image
- **Fixed Version**: Version that patches the vulnerability

## Remediation

### Updating Images

The fastest way to fix vulnerabilities:

```bash
# Pull the latest version
docker pull securehub.io/node:latest

# Rebuild your application
docker build -t myapp:latest .
```

### Version Comparison

Compare vulnerability counts across versions:

1. Go to the **Versions** tab
2. View vulnerability badges (C, H, M, L) for each version
3. Select versions with fewer vulnerabilities

### Upgrade Strategy

```bash
# Check current vulnerabilities
curl https://securehub.io/api/images/node/vulnerabilities

# Update to latest
FROM securehub.io/node:24.10.0  # specific version
# OR
FROM securehub.io/node:latest   # always latest
```

## Integration

### CI/CD Integration

Fail builds with critical vulnerabilities:

```yaml
# GitHub Actions
- name: Check Vulnerabilities
  run: |
    CRITICAL=$(curl -s https://securehub.io/api/images/node/vulnerabilities | jq '.counts.critical')
    if [ "$CRITICAL" -gt 0 ]; then
      echo "Critical vulnerabilities found"
      exit 1
    fi
```

### Kubernetes Admission

Block vulnerable images from deploying:

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: block-critical-vulnerabilities
spec:
  validationFailureAction: enforce
  rules:
    - name: check-vulnerabilities
      match:
        resources:
          kinds:
            - Pod
      validate:
        message: "Image has critical vulnerabilities"
        pattern:
          spec:
            containers:
              - image: "securehub.io/*:*"
```

### Monitoring & Alerting

Set up alerts for new vulnerabilities:

```python
import requests

def check_vulnerabilities(image_name):
    response = requests.get(
        f"https://securehub.io/api/images/{image_name}/vulnerabilities"
    )
    vulns = response.json()
    
    if vulns['counts']['critical'] > 0:
        send_alert(f"Critical vulnerabilities in {image_name}")
```

## Best Practices

### 1. Use Specific Tags

```dockerfile
# Good: Specific version
FROM securehub.io/node:24.10.0

# Avoid: Generic tags that change
FROM securehub.io/node:latest
```

### 2. Regular Updates

- Update base images weekly
- Monitor vulnerability feeds
- Test updates in staging first

### 3. Minimal Images

- Use minimal base images
- Remove unnecessary packages
- Multi-stage builds to reduce surface

```dockerfile
# Build stage
FROM securehub.io/node:24.10.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Runtime stage - minimal
FROM securehub.io/node:24.10.0-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["node", "server.js"]
```

### 4. Vulnerability Scanning in CI

```yaml
# .github/workflows/scan.yml
name: Vulnerability Scan
on:
  schedule:
    - cron: '0 0 * * *'  # Daily
  pull_request:

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Scan for vulnerabilities
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:${{ github.sha }}'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'
```

### 5. Runtime Protection

- Use read-only file systems
- Drop unnecessary capabilities
- Run as non-root user

```dockerfile
FROM securehub.io/node:24.10.0

# Run as non-root
USER node

# Read-only root filesystem
CMD ["node", "--frozen-intrinsics", "server.js"]
```

## CVE Data Sources

SecureHub aggregates vulnerability data from:

- **NVD**: National Vulnerability Database
- **GitHub Advisory Database**: Package-specific advisories
- **OSV**: Open Source Vulnerabilities database
- **Vendor Advisories**: Direct from software vendors

## False Positives

Sometimes vulnerabilities don't apply:

1. **Check Applicability**: Read CVE details
2. **Verify Exploit**: Confirm if your usage is affected
3. **Accept Risk**: Document why it's safe to ignore
4. **Suppress**: Use `.securehub-ignore` file

```yaml
# .securehub-ignore
CVE-2024-1234:
  reason: "Function not used in our application"
  expires: "2024-12-31"
```

## Emergency Response

When a critical vulnerability is announced:

1. **Assess Impact**: Check if your images are affected
2. **Update Immediately**: Pull latest patched images
3. **Redeploy**: Roll out fixes to production
4. **Verify**: Confirm vulnerability is remediated

## Learn More

- [SBOM Documentation](/docs/sbom)
- [Provenance Tracking](/docs/provenance)
- [Security Best Practices](https://securehub.io/security)
- [CVE Database](https://cve.mitre.org/)
