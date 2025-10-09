import React from 'react';
import { Check } from 'lucide-react';
import { categories } from '../mockData';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
            selectedCategory === 'all'
              ? 'bg-[#fd366e] text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {selectedCategory === 'all' && <Check className="w-4 h-4" />}
          <span>All Images</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
              selectedCategory === category.id
                ? 'bg-[#fd366e] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {selectedCategory === category.id && <Check className="w-4 h-4" />}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;