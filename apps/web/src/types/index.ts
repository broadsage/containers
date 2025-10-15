export interface DockerImage {
  id: string;
  name: string;
  description: string;
  logo: string;
  badge: 'official' | 'community';
  category: string;
  tags: string[];
  downloads: string;
  stars: number;
  lastUpdate: string;
  size: string;
  vulnerabilities: number;
  fips?: boolean;
  free?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
