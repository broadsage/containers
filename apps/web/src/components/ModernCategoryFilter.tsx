'use client';

import React from 'react';
import { Shield, Award, Star, Layers } from 'lucide-react';
import { categories } from '../data/mockData';

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
    { id: 'all', name: 'all', icon: Layers },
    ...categories.map(cat => ({ ...cat, icon: Layers }))
  ];

  const badges = [
    { id: 'all', name: 'All', icon: null },
    { id: 'official', name: 'Official', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { id: 'community', name: 'Community', icon: Award, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    { id: 'verified', name: 'Verified', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
      {/* Categories Section */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Categories
        </h3>
        <div className="space-y-2">
          {allCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-all flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white border-2 border-gray-900'
                    : 'hover:bg-gray-50 border-2 border-transparent text-gray-700'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${
                  selectedCategory === category.id ? 'text-white' : 'text-gray-500'
                }`} />}
                <span className="text-sm font-medium capitalize">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Badge Filters Section */}
      {onBadgeChange && (
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Filter by Type
          </h3>
          <div className="space-y-2">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <button
                  key={badge.id}
                  onClick={() => onBadgeChange(badge.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-md transition-all flex items-center space-x-2 ${
                    selectedBadge === badge.id
                      ? `${badge.bg || 'bg-gray-100'} ${badge.border || 'border-gray-300'} border-2`
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${badge.color || 'text-gray-600'}`} />}
                  <span className={`text-sm font-medium ${
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