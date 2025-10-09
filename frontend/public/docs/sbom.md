# Software Bill of Materials (SBOM)

## What is an SBOM?

A Software Bill of Materials (SBOM) is a formal record containing the details and supply chain relationships of components used in building software. Think of it as an ingredient list for your container image.

## Why SBOMs Matter

### Security
- **Vulnerability Tracking**: Quickly identify if your images contain vulnerable components
- **Supply Chain Security**: Understand your software supply chain
- **Compliance**: Meet regulatory requirements (Executive Order 14028, etc.)

### Transparency
- Know exactly what's in your container
- Verify component licenses
- Track dependencies

## SBOM Format

SecureHub generates SBOMs in **SPDX 2.3** format, an industry-standard format recognized by:

- U.S. National Telecommunications and Information Administration (NTIA)
- Linux Foundation
- ISO/IEC standards

## Viewing an SBOM

### Via Web Interface

1. Navigate to any image detail page
2. Click on the **SBOM** tab
3. View all packages and their metadata

### Downloading an SBOM

```bash
# Download SBOM using cosign
cosign download attestation \
  --platform=linux/amd64 \
  --predicate-type=https://spdx.dev/Document \
  securehub.io/node:latest | jq -r .payload | base64 -d | jq .predicate
```

## SBOM Contents

Each SBOM includes:

### Package Information
- **Name**: Package identifier
- **Version**: Exact version installed
- **License**: Software license (Apache-2.0, MIT, GPL, etc.)
- **Type**: Library, runtime, application, etc.

### Relationships
- Direct dependencies
- Transitive dependencies
- Package provenance

### Cryptographic Hashes
- SHA256 checksums for verification
- Package integrity verification

## Using SBOMs

### Vulnerability Scanning

```bash
# Scan SBOM for vulnerabilities using Grype
grype sbom:sbom.spdx.json
```

### License Compliance

```bash
# Extract license information
jq '.packages[] | {name: .name, license: .licenseConcluded}' sbom.spdx.json
```

### Supply Chain Analysis

Use SBOMs to:
- Audit software components
- Track component origins
- Verify supply chain integrity
- Monitor for malicious packages

## Continuous Updates

SBOMs are generated with every image build, ensuring:

- Up-to-date component information
- Accurate vulnerability data
- Real-time supply chain visibility

## Best Practices

1. **Review SBOMs Regularly**: Check for known vulnerabilities
2. **Store SBOMs**: Keep SBOMs for compliance and auditing
3. **Automate Scanning**: Integrate SBOM scanning in CI/CD
4. **Track Changes**: Monitor SBOM diffs between versions

## Standards Compliance

SecureHub SBOMs comply with:

- **SPDX 2.3**: Open standard for SBOMs
- **NTIA Minimum Elements**: All required SBOM fields
- **Executive Order 14028**: Federal software supply chain requirements

## Tools & Integration

SBOMs work with popular tools:

- **Grype**: Vulnerability scanner
- **Syft**: SBOM generator
- **Dependency-Track**: Component analysis platform
- **OWASP CycloneDX**: Alternative SBOM format converter

## Learn More

- [SPDX Specification](https://spdx.dev/)
- [NTIA SBOM Guidelines](https://www.ntia.gov/SBOM)
- [Provenance Documentation](/docs/provenance)
- [Vulnerability Scanning](/docs/vulnerabilities)
