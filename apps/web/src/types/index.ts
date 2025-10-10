export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface DockerImage {
  id: number;
  name: string;
  logo: string;
  lastChanged: string;
  latestTag: string;
  isFree: boolean;
  category: string;
  description: string;
  downloads: number;
  size: string;
  fips: boolean;
  badge: 'official' | 'community' | 'verified';
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

export interface Stats {
  projects: number;
  versions: number;
  images: number;
  builds: number;
}
