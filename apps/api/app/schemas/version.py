"""
Pydantic schemas for image versions
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class ImageVersion(BaseModel):
    """Image version schema"""
    tag: str = Field(..., description="Version tag")
    pull_url: str = Field(..., description="Docker pull URL")
    compressed_size: str = Field(..., description="Compressed image size")
    architectures: List[str] = Field(default=["x86_64", "arm64"], description="Supported architectures")
    last_changed: str = Field(..., description="Last update time")
    is_free: bool = Field(default=True, description="Free tier availability")
    end_of_life: Optional[str] = Field(None, description="End of life date")
    variant: str = Field(default="default", description="Image variant")


class Vulnerability(BaseModel):
    """Vulnerability schema"""
    cve_id: str = Field(..., description="CVE identifier")
    severity: str = Field(..., description="Severity level")
    package: str = Field(..., description="Affected package")
    installed_version: str = Field(..., description="Current version")
    fixed_version: Optional[str] = Field(None, description="Fixed version")
    cvss_score: float = Field(..., description="CVSS score")
    description: str = Field(..., description="Vulnerability description")


class SBOMPackage(BaseModel):
    """SBOM package schema"""
    name: str = Field(..., description="Package name")
    version: str = Field(..., description="Package version")
    license: str = Field(..., description="Package license")
    package_type: str = Field(..., description="Package type (library/binary)")
    source: Optional[str] = Field(None, description="Source repository")


class ProvenanceInfo(BaseModel):
    """Provenance information schema"""
    built_at: datetime = Field(..., description="Build timestamp")
    builder: str = Field(..., description="Builder information")
    source_repo: str = Field(..., description="Source repository")
    commit_sha: str = Field(..., description="Git commit SHA")
    build_platform: str = Field(..., description="Build platform")


class AdvisoryInfo(BaseModel):
    """Security advisory schema"""
    advisory_id: str = Field(..., description="Advisory identifier")
    title: str = Field(..., description="Advisory title")
    severity: str = Field(..., description="Severity level")
    published_date: datetime = Field(..., description="Publication date")
    affected_versions: List[str] = Field(..., description="Affected versions")
    description: str = Field(..., description="Advisory description")
    mitigation: str = Field(..., description="Mitigation steps")


class ImageSpecifications(BaseModel):
    """Image specifications schema"""
    base_image: str = Field(..., description="Base image")
    layers: int = Field(..., description="Number of layers")
    total_size: str = Field(..., description="Total uncompressed size")
    created: datetime = Field(..., description="Creation timestamp")
    author: str = Field(..., description="Image author")
    entrypoint: Optional[List[str]] = Field(None, description="Entrypoint command")
    cmd: Optional[List[str]] = Field(None, description="Default command")
    env_vars: Optional[dict] = Field(None, description="Environment variables")
    exposed_ports: Optional[List[str]] = Field(None, description="Exposed ports")
    volumes: Optional[List[str]] = Field(None, description="Volume mount points")


class HelmChart(BaseModel):
    """Helm chart schema"""
    name: str = Field(..., description="Chart name")
    version: str = Field(..., description="Chart version")
    app_version: str = Field(..., description="App version")
    description: str = Field(..., description="Chart description")
    icon: str = Field(..., description="Chart icon URL")
    maintainers: List[str] = Field(default=[], description="Chart maintainers")
    keywords: List[str] = Field(default=[], description="Chart keywords")
