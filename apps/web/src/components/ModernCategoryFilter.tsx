'use client';

import React from 'react';
import { Check, Filter } from 'lucide-react';
import { categories } from '../data/mockData';

interface ModernCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ModernCategoryFilter: React.FC<ModernCategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  const allCategories = [
    { id: 'all', name: 'All Images', icon: '🌐' },
    ...categories
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-primary-600" />
          Categories
        </h3>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onCategoryChange('all')}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="space-y-2">
        {allCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105'
                : 'text-gray-700 hover:bg-gray-50 hover:scale-102'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </div>
            {selectedCategory === category.id && (
              <div className="bg-white/20 backdrop-blur-lg rounded-lg p-1">
                <Check className="w-4 h-4" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Pro tip */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <p className="text-xs text-gray-700 flex items-start">
          <span className="text-lg mr-2">💡</span>
          <span>
            <strong className="font-semibold text-gray-900">Pro tip:</strong> Use the search bar above to find specific images quickly
          </span>
        </p>
      </div>
    </div>
  );
};

export default ModernCategoryFilter;