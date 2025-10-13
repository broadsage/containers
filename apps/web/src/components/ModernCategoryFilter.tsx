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
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider">
          Categories
        </h3>
        <div className="space-y-1.5">
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-all flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-gray-900 text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${
                selectedCategory === category.id ? 'text-white' : 'text-gray-400'
              }`} />
              <span className="capitalize text-xs">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Badge Filters Section */}
      {onBadgeChange && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider">
            Filter by Type
          </h3>
          <div className="space-y-1.5">
            {BADGE_FILTERS.map((badge) => {
              const Icon = badge.icon;
              return (
                <button
                  key={badge.id}
                  onClick={() => onBadgeChange(badge.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-all flex items-center space-x-2 ${
                    selectedBadge === badge.id
                      ? `${badge.bg || 'bg-gray-100'} ${badge.border || 'border-gray-300'} border font-medium`
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${badge.color || 'text-gray-600'}`} />}
                  <span className={`text-xs ${
                    selectedBadge === badge.id 
                      ? badge.color || 'text-gray-900'
                      : 'text-gray-700'
                  }`}>
                    {badge.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Info Section - Removed for compact design */}
    </div>
  );
};

export default ModernCategoryFilter;