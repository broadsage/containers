'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { categories } from '../data/mockData';
import { BADGE_FILTERS } from '../constants/filters';

interface ModernCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedBadge?: string;
  onBadgeChange?: (badge: string) => void;
  onViewModeChange?: (viewMode: 'grid' | 'list') => void;
}

const ModernCategoryFilter: React.FC<ModernCategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange,
  selectedBadge = 'all',
  onBadgeChange,
  onViewModeChange
}) => {
  const allCategories = [
    { id: 'all', name: 'All Images' },
    ...categories.map(cat => ({ id: cat.id, name: cat.name }))
  ];

  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Categories
        </h3>
        <div className="space-y-0.5">
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-2 py-1.5 text-sm transition-colors flex items-center justify-between group ${
                selectedCategory === category.id
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="capitalize">{category.name}</span>
              {selectedCategory === category.id && (
                <Check className="w-4 h-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Badge Filters Section */}
      {onBadgeChange && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Type
          </h3>
          <div className="space-y-0.5">
            {BADGE_FILTERS.map((badge) => {
              const Icon = badge.icon;
              return (
                <button
                  key={badge.id}
                  onClick={() => onBadgeChange(badge.id)}
                  className={`w-full text-left px-2 py-1.5 text-sm transition-colors flex items-center justify-between group ${
                    selectedBadge === badge.id
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {Icon && <Icon className={`w-3.5 h-3.5 ${badge.color || 'text-gray-400'}`} />}
                    <span>{badge.name}</span>
                  </div>
                  {selectedBadge === badge.id && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* View All Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            onCategoryChange('all');
            if (onBadgeChange) onBadgeChange('all');
            if (onViewModeChange) onViewModeChange('list');
          }}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          View all images
        </button>
      </div>
    </div>
  );
};

export default ModernCategoryFilter;