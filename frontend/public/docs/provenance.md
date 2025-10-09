# Image Provenance & Attestations

## What is Provenance?

Provenance provides verifiable information about how a container image was built, including:

- **Who built it**: Identity of the builder
- **When it was built**: Timestamp of the build
- **How it was built**: Build process and environment
- **What was used**: Source code, dependencies, and tools

## Why Provenance Matters

### Supply Chain Security
- Verify the origin of container images
- Detect tampering or unauthorized modifications
- Ensure builds come from trusted sources

### Compliance & Audit
- Meet regulatory requirements
- Provide audit trails
- Track image lineage

## SLSA Framework

SecureHub follows [SLSA (Supply-chain Levels for Software Artifacts)](https://slsa.dev/) guidelines:

- **SLSA Level 3**: Build provenance attestations
- **Verifiable builds**: Cryptographically signed
- **Reproducible**: Same source produces same output

## Attestation Types

SecureHub provides three types of attestations:

### 1. SLSA Provenance (`https://slsa.dev/provenance/v1`)

Contains information about the image build environment:
- Build platform and tools
- Source repository and commit
- Builder identity
- Build parameters

### 2. Image Configuration (`https://apko.dev/image-configuration`)

Contains the configuration used by that particular image build:
- Direct dependencies
- User accounts and permissions
- Entry point and command
- Environment variables

### 3. SBOM (`https://spdx.dev/Document`)

Contains the complete Software Bill of Materials in SPDX format.

## Verifying Image Signatures

All SecureHub images are signed using [Sigstore](https://sigstore.dev/).

### Prerequisites

Install required tools:

```bash
# Install cosign
go install github.com/sigstore/cosign/cmd/cosign@latest

# Install jq for JSON parsing
sudo apt-get install jq
```

### Verify an Image

```bash
cosign verify \
  --certificate-oidc-issuer=https://token.actions.githubusercontent.com \
  --certificate-identity=https://github.com/securehub/images/.github/workflows/release.yaml@refs/heads/main \
  securehub.io/node:latest | jq
```

## Downloading Attestations

### Download SLSA Provenance

```bash
cosign download attestation \
  --platform=linux/amd64 \
  --predicate-type=https://slsa.dev/provenance/v1 \
  securehub.io/node:latest | jq -r .payload | base64 -d | jq
```

### Download Image Configuration

```bash
cosign download attestation \
  --platform=linux/amd64 \
  --predicate-type=https://apko.dev/image-configuration \
  securehub.io/node:latest | jq -r .payload | base64 -d | jq
```

### Download SBOM

```bash
cosign download attestation \
  --platform=linux/amd64 \
  --predicate-type=https://spdx.dev/Document \
  securehub.io/node:latest | jq -r .payload | base64 -d | jq .predicate
```

## Verifying Attestations

### Verify SBOM Attestation

```bash
cosign verify-attestation \
  --type https://spdx.dev/Document \
  --certificate-oidc-issuer=https://token.actions.githubusercontent.com \
  --certificate-identity=https://github.com/securehub/images/.github/workflows/release.yaml@refs/heads/main \
  securehub.io/node:latest
```

### Expected Output

```
Verification for securehub.io/node:latest --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - The code-signing certificate was verified using trusted certificate authority certificates

Certificate subject: https://github.com/securehub/images/.github/workflows/release.yaml@refs/heads/main
Certificate issuer URL: https://token.actions.githubusercontent.com
GitHub Workflow Trigger: schedule
GitHub Workflow SHA: da283c26829d46c2d2883de5ff98bee672428696
```

## Integration with CI/CD

### GitHub Actions

```yaml
- name: Verify Image Signature
  run: |
    cosign verify \
      --certificate-oidc-issuer=https://token.actions.githubusercontent.com \
      --certificate-identity=https://github.com/securehub/images/.github/workflows/release.yaml@refs/heads/main \
      securehub.io/node:${{ matrix.version }}
```

### GitLab CI

```yaml
verify:
  image: gcr.io/projectsigstore/cosign
  script:
    - cosign verify securehub.io/node:latest
```

## Policy Enforcement

Use admission controllers to enforce signature verification:

### Kubernetes with Kyverno

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-securehub-images
spec:
  validationFailureAction: enforce
  rules:
    - name: verify-signature
      match:
        resources:
          kinds:
            - Pod
      verifyImages:
        - image: "securehub.io/*"
          key: |
            -----BEGIN PUBLIC KEY-----
            ...
            -----END PUBLIC KEY-----
```

## Best Practices

1. **Always Verify Signatures**: Don't run unverified images in production
2. **Automate Verification**: Integrate into CI/CD pipelines
3. **Use Admission Controllers**: Enforce policies at the cluster level
4. **Monitor Attestations**: Track changes in build provenance
5. **Archive Attestations**: Keep records for compliance

## Transparency Log

All signatures are recorded in [Rekor](https://rekor.sigstore.dev/), Sigstore's transparency log:

- Immutable record of all signatures
- Publicly auditable
- Cryptographically verifiable

## Learn More

- [Sigstore Documentation](https://docs.sigstore.dev/)
- [SLSA Framework](https://slsa.dev/)
- [Cosign GitHub](https://github.com/sigstore/cosign)
- [SBOM Documentation](/docs/sbom)
