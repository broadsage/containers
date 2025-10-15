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
  fips?: boolean;
  isFree?: boolean;
  free?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
