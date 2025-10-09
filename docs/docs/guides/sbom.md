---
title: Software Bill of Materials (SBOM)
description: Understanding and using SBOMs with Chainguard Images
sidebar_position: 2
---

# Software Bill of Materials (SBOM)

A Software Bill of Materials (SBOM) is a comprehensive inventory of all components, libraries, and dependencies used to build a software artifact. Chainguard Images include detailed SBOMs for complete supply chain transparency.

## What is an SBOM?

Think of an SBOM as a "nutrition label" for software - it tells you exactly what's inside your container image, including:

- 📦 **All software packages** and their versions
- 📜 **Licenses** for each component  
- 🔗 **Dependencies** and their relationships
- 📋 **File locations** and checksums
- 🏷️ **Metadata** about the build process

## Why SBOMs Matter

### Security Benefits
- **Vulnerability Management**: Quickly identify which images contain vulnerable components
- **Incident Response**: Rapid assessment of affected systems during security events
- **Compliance**: Meet regulatory requirements (Executive Order 14028, EU Cyber Resilience Act)

### Operational Benefits  
- **License Compliance**: Track open source license obligations
- **Dependency Management**: Understand your software supply chain
- **Risk Assessment**: Evaluate third-party component risks

## SBOM Standards

Chainguard Images support multiple SBOM formats:

### SPDX (Software Package Data Exchange)
```json
{
  "spdxVersion": "SPDX-2.3",
  "dataLicense": "CC0-1.0",
  "SPDXID": "SPDXRef-DOCUMENT",
  "name": "cgr.dev/chainguard/node:latest",
  "packages": [
    {
      "SPDXID": "SPDXRef-Package-nodejs",
      "name": "nodejs",
      "versionInfo": "20.10.0",
      "licenseConcluded": "MIT"
    }
  ]
}
```

### CycloneDX
```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.4",
  "version": 1,
  "metadata": {
    "component": {
      "type": "container",
      "name": "cgr.dev/chainguard/node",
      "version": "latest"
    }
  },
  "components": [
    {
      "type": "library", 
      "name": "nodejs",
      "version": "20.10.0",
      "licenses": ["MIT"]
    }
  ]
}
```

## Accessing SBOMs

### Method 1: Using Cosign

```bash
# Install cosign
go install github.com/sigstore/cosign/v2/cmd/cosign@latest

# Download SBOM attestation
cosign download attestation cgr.dev/chainguard/node:latest \
  --predicate-type https://spdx.dev/Document > sbom.json

# View the SBOM
jq '.payload | @base64d | fromjson | .predicate' sbom.json
```

### Method 2: Using Syft

```bash
# Install syft
curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh

# Generate SBOM from image
syft cgr.dev/chainguard/node:latest -o spdx-json > sbom.json

# Generate in different formats
syft cgr.dev/chainguard/node:latest -o cyclonedx-json > sbom-cyclonedx.json
syft cgr.dev/chainguard/node:latest -o table  # Human readable
```

### Method 3: Registry API

```bash
# Get image manifest
curl -H "Accept: application/vnd.docker.distribution.manifest.v2+json" \
  https://cgr.dev/v2/chainguard/node/manifests/latest

# Download SBOM layer (if available)
curl -L https://cgr.dev/v2/chainguard/node/blobs/[SBOM_DIGEST]
```

## SBOM Structure

### Package Information

Each package entry includes:

```json
{
  "name": "openssl",
  "version": "3.0.12", 
  "type": "library",
  "supplier": "Organization: OpenSSL Software Foundation",
  "downloadLocation": "https://github.com/openssl/openssl",
  "filesAnalyzed": true,
  "licenseConcluded": "Apache-2.0",
  "licenseDeclared": "Apache-2.0",
  "copyrightText": "Copyright (c) 1998-2023 The OpenSSL Project",
  "checksums": [
    {
      "algorithm": "SHA1",
      "checksumValue": "da39a3ee5e6b4b0d3255bfef95601890afd80709"
    }
  ]
}
```

### Relationship Information

```json
{
  "spdxElementId": "SPDXRef-Package-nodejs",
  "relationshipType": "DEPENDS_ON", 
  "relatedSpdxElement": "SPDXRef-Package-openssl"
}
```

## Using SBOMs for Security

### Vulnerability Scanning

```bash
# Generate SBOM
syft cgr.dev/chainguard/node:latest -o spdx-json > sbom.json

# Scan SBOM for vulnerabilities
grype sbom:sbom.json

# Output as JSON for automation
grype sbom:sbom.json -o json > vulnerabilities.json
```

### Automated Monitoring

```python
#!/usr/bin/env python3
import json
import subprocess

def check_vulnerabilities(image):
    # Generate SBOM
    result = subprocess.run(
        ['syft', image, '-o', 'spdx-json'],
        capture_output=True, text=True
    )
    sbom = json.loads(result.stdout)
    
    # Extract packages
    packages = sbom.get('packages', [])
    
    # Check each package against vulnerability DB
    vulnerable_packages = []
    for pkg in packages:
        # Your vulnerability checking logic here
        if is_vulnerable(pkg['name'], pkg['versionInfo']):
            vulnerable_packages.append(pkg)
    
    return vulnerable_packages

if __name__ == "__main__":
    vulns = check_vulnerabilities('cgr.dev/chainguard/node:latest')
    if vulns:
        print(f"Found {len(vulns)} vulnerable packages")
        for vuln in vulns:
            print(f"- {vuln['name']} {vuln['versionInfo']}")
```

## SBOM Analysis Tools

### SPDX Tools

```bash
# Install SPDX tools
pip install spdx-tools

# Validate SBOM
spdx-tools convert --format json --validate sbom.spdx

# Convert between formats
spdx-tools convert --format yaml --output sbom.yaml sbom.json
```

### CycloneDX CLI

```bash
# Install CycloneDX CLI
npm install -g @cyclonedx/cli

# Validate CycloneDX SBOM
cyclonedx validate --input-file sbom-cyclonedx.json

# Convert formats
cyclonedx convert --input-file sbom-cyclonedx.json --output-format xml
```

### Custom Analysis

```bash
# Extract license information
jq '.packages[] | {name: .name, license: .licenseConcluded}' sbom.json

# Find GPL licensed packages
jq '.packages[] | select(.licenseConcluded | contains("GPL"))' sbom.json

# Count packages by type
jq '.packages | group_by(.packageType) | map({type: .[0].packageType, count: length})' sbom.json
```

## Compliance Use Cases

### License Compliance

```bash
# Extract all licenses
jq -r '.packages[] | .licenseConcluded' sbom.json | sort | uniq

# Find copyleft licenses
jq '.packages[] | select(.licenseConcluded | test("GPL|AGPL|LGPL"; "i"))' sbom.json

# Generate license report
cat << 'EOF' > license-report.sh
#!/bin/bash
echo "# License Report"
echo "Generated: $(date)"
echo ""
echo "## License Summary"
jq -r '.packages[] | .licenseConcluded' sbom.json | \
  sort | uniq -c | sort -nr
EOF

chmod +x license-report.sh
./license-report.sh
```

### Supply Chain Risk Assessment

```python
#!/usr/bin/env python3
import json
from collections import defaultdict

def analyze_supply_chain_risk(sbom_file):
    with open(sbom_file) as f:
        sbom = json.load(f)
    
    packages = sbom.get('packages', [])
    
    # Analyze by supplier
    suppliers = defaultdict(list)
    for pkg in packages:
        supplier = pkg.get('supplier', 'Unknown')
        suppliers[supplier].append(pkg['name'])
    
    # Find single points of failure
    high_risk_suppliers = {k: v for k, v in suppliers.items() 
                          if len(v) > 10}
    
    # Analyze by download location
    sources = defaultdict(list)
    for pkg in packages:
        location = pkg.get('downloadLocation', 'Unknown')
        if 'github.com' in location:
            org = location.split('/')[-2] if location != 'Unknown' else 'Unknown'
            sources[org].append(pkg['name'])
    
    return {
        'total_packages': len(packages),
        'suppliers': dict(suppliers),
        'high_risk_suppliers': high_risk_suppliers,
        'github_orgs': dict(sources)
    }

# Usage
risk_analysis = analyze_supply_chain_risk('sbom.json')
print(json.dumps(risk_analysis, indent=2))
```

## Integration with CI/CD

### GitHub Actions

```yaml
name: SBOM Generation and Analysis
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  sbom-analysis:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Build image
      run: docker build -t myapp:${{ github.sha }} .
    
    - name: Generate SBOM
      run: |
        # Install syft
        curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh
        
        # Generate SBOM
        syft myapp:${{ github.sha }} -o spdx-json > sbom.json
        
        # Generate human-readable format
        syft myapp:${{ github.sha }} -o table > sbom.txt
    
    - name: Vulnerability scan
      run: |
        # Install grype
        curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh
        
        # Scan SBOM
        grype sbom:sbom.json --fail-on medium
    
    - name: Upload SBOM artifacts
      uses: actions/upload-artifact@v3
      with:
        name: sbom-files
        path: |
          sbom.json
          sbom.txt
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t myapp:${BUILD_NUMBER} .'
            }
        }
        
        stage('Generate SBOM') {
            steps {
                sh '''
                    # Generate SBOM
                    syft myapp:${BUILD_NUMBER} -o spdx-json > sbom.json
                    
                    # Archive SBOM
                    cp sbom.json sbom-${BUILD_NUMBER}.json
                '''
                
                archiveArtifacts artifacts: 'sbom*.json', fingerprint: true
            }
        }
        
        stage('Security Scan') {
            steps {
                sh 'grype sbom:sbom.json --fail-on high'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'sbom.json',
                reportName: 'SBOM Report'
            ])
        }
    }
}
```

## SBOM Management Best Practices

### 1. Automate SBOM Generation

```dockerfile
# Multi-stage build with SBOM generation
FROM cgr.dev/chainguard/node:latest as builder
COPY package*.json ./
RUN npm ci --only=production

FROM cgr.dev/chainguard/node:latest
COPY --from=builder /app/node_modules ./node_modules
COPY src/ ./src/

# Generate SBOM at build time
RUN syft / -o spdx-json > /app/sbom.json

CMD ["node", "src/index.js"]
```

### 2. Version Control SBOMs

```bash
# Store SBOMs alongside source code
mkdir -p .sboms
syft . -o spdx-json > .sboms/$(git rev-parse HEAD).json

# Track changes over time
git add .sboms/
git commit -m "Add SBOM for $(git rev-parse HEAD)"
```

### 3. Regular SBOM Updates

```bash
#!/bin/bash
# Update SBOMs for all production images

IMAGES=(
    "cgr.dev/chainguard/node:latest"
    "cgr.dev/chainguard/nginx:latest"  
    "cgr.dev/chainguard/postgres:latest"
)

for image in "${IMAGES[@]}"; do
    echo "Updating SBOM for $image"
    
    # Pull latest
    docker pull "$image"
    
    # Generate SBOM
    syft "$image" -o spdx-json > "sbom-$(basename $image).json"
    
    # Check for changes
    if ! cmp -s "sbom-$(basename $image).json" "previous-sbom-$(basename $image).json"; then
        echo "SBOM changed for $image"
        # Notify or take action
    fi
    
    # Backup previous version
    cp "sbom-$(basename $image).json" "previous-sbom-$(basename $image).json"
done
```

## FAQ

### Q: How accurate are the SBOMs?
**A**: Our SBOMs are generated directly from the build process and are highly accurate. They include all packages installed during image creation.

### Q: Can I generate SBOMs for my own images based on Chainguard Images?
**A**: Yes! Use tools like Syft or Docker's built-in SBOM generation: `docker buildx build --sbom=true -t myapp .`

### Q: What format should I use for SBOMs?
**A**: SPDX is the most widely supported, but CycloneDX has better vulnerability integration. Choose based on your toolchain.

### Q: How often are SBOMs updated?
**A**: SBOMs are generated with every image build. Since we rebuild nightly, SBOMs are always current.

### Q: Can I use SBOMs offline?
**A**: Yes! SBOMs are self-contained documents that can be used without internet access for compliance and analysis.

## Resources

- 📚 **SPDX Specification**: [https://spdx.github.io/spdx-spec/](https://spdx.github.io/spdx-spec/)
- 🔄 **CycloneDX Standard**: [https://cyclonedx.org/](https://cyclonedx.org/)
- 🔍 **Syft Documentation**: [https://github.com/anchore/syft](https://github.com/anchore/syft)
- 🔐 **Cosign Documentation**: [https://docs.sigstore.dev/cosign/overview/](https://docs.sigstore.dev/cosign/overview/)
- 📋 **NTIA SBOM Guidelines**: [https://www.ntia.doc.gov/sbom](https://www.ntia.doc.gov/sbom)

---

*Complete transparency through comprehensive SBOMs.* 📋