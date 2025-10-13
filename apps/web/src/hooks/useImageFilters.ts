import { useState, useMemo, useCallback } from 'react';
import { DockerImage } from '../types';

interface UseImageFiltersProps {
  images: DockerImage[];
  initialPageSize?: number;
}

export function useImageFilters({ images, initialPageSize = 15 }: UseImageFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllImages, setShowAllImages] = useState(false);

  const filteredImages = useMemo(() => {
    let filtered = images;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    // Filter by badge type
    if (selectedBadge !== 'all') {
      filtered = filtered.filter(img => img.badge === selectedBadge);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(img => 
        img.name.toLowerCase().includes(query) ||
        img.description.toLowerCase().includes(query) ||
        img.badge.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [images, selectedCategory, selectedBadge, searchQuery]);

  const displayedImages = useMemo(() => {
    return showAllImages ? filteredImages : filteredImages.slice(0, initialPageSize);
  }, [filteredImages, showAllImages, initialPageSize]);

  const hasMore = filteredImages.length > displayedImages.length;
  const remainingCount = filteredImages.length - displayedImages.length;

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setShowAllImages(false); // Reset pagination when changing category
  }, []);

  const handleBadgeChange = useCallback((badge: string) => {
    setSelectedBadge(badge);
    setShowAllImages(false); // Reset pagination when changing badge
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setShowAllImages(false); // Reset pagination when searching
  }, []);

  const handleLoadMore = useCallback(() => {
    setShowAllImages(true);
  }, []);

  return {
    selectedCategory,
    selectedBadge,
    searchQuery,
    filteredImages,
    displayedImages,
    hasMore,
    remainingCount,
    handleCategoryChange,
    handleBadgeChange,
    handleSearchChange,
    handleLoadMore,
  };
}
