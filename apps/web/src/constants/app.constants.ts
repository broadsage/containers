/**
 * Application-wide constants
 */

export const APP_CONFIG = {
  NAME: 'Broadsage Registry',
  SHORT_NAME: 'Broadsage',
  DESCRIPTION: 'Secure, minimal container images with comprehensive vulnerability scanning and SBOM support.',
  REGISTRY_URL: 'registry.broadsage.com',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 15,
  ITEMS_PER_PAGE_OPTIONS: [10, 15, 25, 50],
} as const;

export const IMAGE_CONFIG = {
  DEFAULT_TAG: 'latest',
  LOGO_SIZE: {
    SMALL: 24,
    MEDIUM: 40,
    LARGE: 64,
  },
} as const;

export const ROUTES = {
  HOME: '/',
  IMAGE_DETAILS: (name: string) => `/image/${name}`,
  DOCS: '/docs',
  API: '/api',
} as const;
