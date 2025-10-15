// Re-export from app.constants for better organization
export * from './app.constants';
export * from './filters';

export const APP_NAME = 'Broadsage Container Image Store';
export const APP_DESCRIPTION = 'Secure, minimal container images with comprehensive vulnerability scanning and SBOM support.';

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
  PRIMARY_HOVER: '#ed1556',
  SECONDARY: '#fd366e',
  SECONDARY_HOVER: '#ed1556',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  ACCENT: '#fd5c8d',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 15,
  VIEW_MODES: ['grid', 'list'] as const,
} as const;

export const BADGE_TYPES = {
  OFFICIAL: 'official',
  COMMUNITY: 'community',
} as const;

export type BadgeType = typeof BADGE_TYPES[keyof typeof BADGE_TYPES];
export type ViewMode = typeof PAGINATION.VIEW_MODES[number];
