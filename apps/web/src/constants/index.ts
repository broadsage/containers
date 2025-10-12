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
  PRIMARY: '#fd366e',
  PRIMARY_HOVER: '#ea1350',
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
