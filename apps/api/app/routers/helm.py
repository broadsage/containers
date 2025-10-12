"""
Helm charts endpoints
"""
from fastapi import APIRouter
from typing import List
from ..schemas.version import HelmChart

router = APIRouter(prefix="/helm", tags=["helm"])


@router.get("/charts", response_model=List[HelmChart])
async def get_helm_charts():
    """
    Get all available Helm charts
    """
    charts = [
        HelmChart(
            name="nginx",
            version="15.1.0",
            app_version="1.25.3",
            description="NGINX Open Source is a web server that can be also used as a reverse proxy, load balancer, and HTTP cache",
            icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
            maintainers=["OpenSource Hub Team"],
            keywords=["nginx", "http", "web", "www", "reverse proxy"]
        ),
        HelmChart(
            name="postgresql",
            version="13.2.1",
            app_version="16.1.0",
            description="PostgreSQL is an advanced object-relational database management system",
            icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
            maintainers=["OpenSource Hub Team"],
            keywords=["postgresql", "postgres", "database", "sql"]
        ),
        HelmChart(
            name="mongodb",
            version="14.3.0",
            app_version="7.0.4",
            description="MongoDB is a cross-platform document-oriented database",
            icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
            maintainers=["OpenSource Hub Team"],
            keywords=["mongodb", "database", "nosql"]
        ),
        HelmChart(
            name="redis",
            version="18.4.0",
            app_version="7.2.3",
            description="Redis is an in-memory database that persists on disk",
            icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
            maintainers=["OpenSource Hub Team"],
            keywords=["redis", "cache", "database"]
        )
    ]
    return charts


@router.get("/charts/{chart_name}", response_model=HelmChart)
async def get_helm_chart(chart_name: str):
    """
    Get details for a specific Helm chart
    """
    # Mock implementation
    chart = HelmChart(
        name=chart_name,
        version="1.0.0",
        app_version="latest",
        description=f"Helm chart for {chart_name}",
        icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        maintainers=["OpenSource Hub Team"],
        keywords=[chart_name, "kubernetes", "helm"]
    )
    return chart
