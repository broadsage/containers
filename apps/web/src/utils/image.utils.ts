/**
 * Image-related utility functions
 */

/**
 * Handle image load errors gracefully
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
};

/**
 * Format image size
 */
export const formatImageSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

/**
 * Get docker pull command
 */
export const getDockerPullCommand = (imageName: string, tag: string = 'latest'): string => {
  return `docker pull hub.opensource.dev/${imageName}:${tag}`;
};

/**
 * Format relative time
 */
export const formatRelativeTime = (dateString: string): string => {
  // Simple implementation, can be enhanced with date-fns or dayjs
  return dateString;
};
