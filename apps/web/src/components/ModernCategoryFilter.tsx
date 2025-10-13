'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { categories } from '../data/mockData';
import { FilterButton } from './ui/FilterButton';
import { BADGE_FILTERS } from '../constants/filters';

interface ModernCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedBadge?: string;
  onBadgeChange?: (badge: string) => void;
}

const ModernCategoryFilter: React.FC<ModernCategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange,
  selectedBadge = 'all',
  onBadgeChange
}) => {
  const allCategories = [
    { id: 'all', name: 'all' },
    ...categories
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
      {/* Categories Section */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Categories
        </h3>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <FilterButton
              key={category.id}
              id={category.id}
              name={category.name}
              icon={Layers}
              isSelected={selectedCategory === category.id}
              onClick={() => onCategoryChange(category.id)}
              variant="default"
            />
          ))}
        </div>
      </div>

      {/* Badge Filters Section */}
      {onBadgeChange && (
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Filter by Type
          </h3>
          <div className="space-y-2">
            {BADGE_FILTERS.map((badge) => (
              <FilterButton
                key={badge.id}
                id={badge.id}
                name={badge.name}
                icon={badge.icon}
                isSelected={selectedBadge === badge.id}
                onClick={() => onBadgeChange(badge.id)}
                variant="colored"
                color={badge.color}
                bg={badge.bg}
                border={badge.border}
              />
            ))}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="p-6 bg-gray-50">
        <p className="text-xs text-gray-600 leading-relaxed">
          Browse our curated collection of secure container images with vulnerability scanning and SBOM support.
        </p>
      </div>
    </div>
  );
};

export default ModernCategoryFilter;