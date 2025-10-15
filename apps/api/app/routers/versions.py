"""
Image versions and detailed information endpoints
"""
from fastapi import APIRouter, HTTPException
from typing import List
from ..schemas.version import (
    ImageVersion,
    Vulnerability,
    SBOMPackage,
    ProvenanceInfo,
    AdvisoryInfo,
    ImageSpecifications
)
from datetime import datetime

router = APIRouter(prefix="/images/{image_name}", tags=["versions"])


@router.get("/versions", response_model=List[ImageVersion])
async def get_image_versions(image_name: str):
    """
    Get all versions/tags for a specific image
    """
    # Mock data - will be replaced with database queries
    versions = [
        ImageVersion(
            tag="latest",
            pull_url=f"hub.opensource.dev/{image_name}:latest",
            compressed_size="56.41 MB",
            architectures=["x86_64", "arm64"],
            last_changed="3 days ago",
            is_free=True,
            variant="default"
        ),
        ImageVersion(
            tag="latest-dev",
            pull_url=f"hub.opensource.dev/{image_name}:latest-dev",
            compressed_size="263.24 MB",
            architectures=["x86_64", "arm64"],
            last_changed="2 days ago",
            is_free=True,
            variant="dev"
        ),
        ImageVersion(
            tag="24.10.0",
            pull_url=f"hub.opensource.dev/{image_name}:24.10.0",
            compressed_size="56.41 MB",
            architectures=["x86_64", "arm64"],
            last_changed="1 week ago",
            is_free=False,
            variant="default"
        ),
        ImageVersion(
            tag="24.10.0-slim",
            pull_url=f"hub.opensource.dev/{image_name}:24.10.0-slim",
            compressed_size="53.68 MB",
            architectures=["x86_64", "arm64"],
            last_changed="1 week ago",
            is_free=False,
            variant="slim"
        )
    ]
    return versions


@router.get("/vulnerabilities", response_model=List[Vulnerability])
async def get_image_vulnerabilities(image_name: str):
    """
    Get vulnerability scan results for an image
    """
    vulnerabilities = [
        Vulnerability(
            cve_id="CVE-2024-1234",
            severity="Critical",
            package="openssl",
            installed_version="1.1.1q",
            fixed_version="1.1.1w",
            cvss_score=9.8,
            description="Remote code execution vulnerability in OpenSSL"
        ),
        Vulnerability(
            cve_id="CVE-2024-5678",
            severity="High",
            package="curl",
            installed_version="7.68.0",
            fixed_version="7.88.1",
            cvss_score=7.5,
            description="Buffer overflow in curl HTTP/2 handling"
        ),
        Vulnerability(
            cve_id="CVE-2024-9012",
            severity="Medium",
            package="libxml2",
            installed_version="2.9.10",
            fixed_version="2.9.14",
            cvss_score=5.3,
            description="XML external entity injection vulnerability"
        )
    ]
    return vulnerabilities


@router.get("/sbom", response_model=List[SBOMPackage])
async def get_image_sbom(image_name: str):
    """
    Get Software Bill of Materials (SBOM) for an image
    """
    sbom = [
        SBOMPackage(
            name="openssl",
            version="1.1.1w",
            license="Apache-2.0",
            package_type="library",
            source="https://github.com/openssl/openssl"
        ),
        SBOMPackage(
            name="curl",
            version="7.88.1",
            license="MIT",
            package_type="library",
            source="https://github.com/curl/curl"
        ),
        SBOMPackage(
            name="zlib",
            version="1.2.13",
            license="Zlib",
            package_type="library",
            source="https://github.com/madler/zlib"
        ),
        SBOMPackage(
            name="glibc",
            version="2.35",
            license="LGPL-2.1",
            package_type="library",
            source="https://www.gnu.org/software/libc/"
        )
    ]
    return sbom


@router.get("/provenance", response_model=ProvenanceInfo)
async def get_image_provenance(image_name: str):
    """
    Get provenance information for an image
    """
    provenance = ProvenanceInfo(
        built_at=datetime.utcnow(),
        builder="GitHub Actions",
        source_repo=f"https://github.com/opensource-hub/{image_name}",
        commit_sha="a1b2c3d4e5f6g7h8i9j0",
        build_platform="linux/amd64,linux/arm64"
    )
    return provenance


@router.get("/advisories", response_model=List[AdvisoryInfo])
async def get_image_advisories(image_name: str):
    """
    Get security advisories for an image
    """
    advisories = [
        AdvisoryInfo(
            advisory_id="GHSA-xxxx-yyyy-zzzz",
            title="Critical vulnerability in dependencies",
            severity="Critical",
            published_date=datetime.utcnow(),
            affected_versions=["24.9.0", "24.9.1"],
            description="A critical vulnerability was discovered in a core dependency",
            mitigation="Update to version 24.10.0 or later"
        )
    ]
    return advisories


@router.get("/specifications", response_model=ImageSpecifications)
async def get_image_specifications(image_name: str):
    """
    Get detailed specifications for an image
    """
    specs = ImageSpecifications(
        base_image="alpine:3.19",
        layers=12,
        total_size="180 MB",
        created=datetime.utcnow(),
        author="OpenSource Hub Team",
        entrypoint=["/usr/local/bin/docker-entrypoint.sh"],
        cmd=["node"],
        env_vars={
            "NODE_VERSION": "24.10.0",
            "PATH": "/usr/local/bin:$PATH"
        },
        exposed_ports=["3000/tcp"],
        volumes=["/app", "/data"]
    )
    return specs
