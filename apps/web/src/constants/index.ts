export const APP_NAME = 'SecureHub';
export const APP_DESCRIPTION = 'Explore secure, minimal Docker images from Chainguard';

export const ROUTES = {
  HOME: '/',
  IMAGE_DETAIL: (name: string) => `/image/${name}`,
  DOCS: '/docs',
  COMMUNITY: '/community',
  CONTRIBUTE: '/contribute',
} as const;

export const PORTS = {
  WEB: 3000,
  DOCS: 3002,
  API: 8001,
} as const;

export const BRAND_COLORS = {
  PRIMARY: '#6366f1',
  PRIMARY_HOVER: '#4f46e5',
  SECONDARY: '#8b5cf6',
  SECONDARY_HOVER: '#7c3aed',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  ACCENT: '#06b6d4',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 15,
  VIEW_MODES: ['grid', 'list'] as const,
} as const;

export const BADGE_TYPES = {
  OFFICIAL: 'official',
  COMMUNITY: 'community',
  VERIFIED: 'verified',
} as const;

export type BadgeType = typeof BADGE_TYPES[keyof typeof BADGE_TYPES];
export type ViewMode = typeof PAGINATION.VIEW_MODES[number];
