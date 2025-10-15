export interface DockerImage {
  id: number | string;
  name: string;
  description: string;
  logo: string;
  badge: 'official' | 'community';
  category: string;
  tags?: string[];
  downloads: number | string;
  stars?: number;
  lastChanged?: string;
  lastUpdate?: string;
  latestTag?: string;
  size: string;
  vulnerabilities?: number;
  isFree?: boolean;
  free?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count?: number;
  icon?: string;
}

export interface Stats {
  projects: number;
  versions: number;
  images: number;
  builds: number;
}

export interface Vulnerability {
  severity: 'critical' | 'high' | 'medium' | 'low';
  cve: string;
  package: string;
  version: string;
  fixed: string;
  score: number;
}

export interface SBOMPackage {
  name: string;
  version: string;
  license: string;
  type: 'library' | 'application';
}
