import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FilterButtonProps {
  id: string;
  name: string;
  icon?: LucideIcon | null;
  isSelected: boolean;
  onClick: () => void;
  variant?: 'default' | 'colored';
  color?: string;
  bg?: string;
  border?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  id,
  name,
  icon: Icon,
  isSelected,
  onClick,
  variant = 'default',
  color = '',
  bg = '',
  border = ''
}) => {
  if (variant === 'colored') {
    return (
      <button
        onClick={onClick}
        className={`w-full text-left px-3 py-2.5 rounded-md transition-all flex items-center space-x-2 ${
          isSelected
            ? `${bg || 'bg-gray-100'} ${border || 'border-gray-300'} border-2`
            : 'hover:bg-gray-50 border-2 border-transparent'
        }`}
      >
        {Icon && <Icon className={`w-4 h-4 ${color || 'text-gray-600'}`} />}
        <span className={`text-sm font-medium ${
          isSelected 
            ? color || 'text-gray-900'
            : 'text-gray-700'
        }`}>
          {name}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-md transition-all flex items-center space-x-2 ${
        isSelected
          ? 'bg-gray-900 text-white border-2 border-gray-900'
          : 'hover:bg-gray-50 border-2 border-transparent text-gray-700'
      }`}
    >
      {Icon && <Icon className={`w-4 h-4 ${
        isSelected ? 'text-white' : 'text-gray-500'
      }`} />}
      <span className="text-sm font-medium capitalize">
        {name}
      </span>
    </button>
  );
};
