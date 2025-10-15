import React from 'react';
import { Shield, Users } from 'lucide-react';

export type BadgeType = 'official' | 'community';

interface BadgeConfig {
  icon: React.ElementType;
  text: string;
  color: string;
  bg: string;
  border: string;
  ringColor: string;
}

export const badgeConfig: Record<BadgeType, BadgeConfig> = {
  official: {
    icon: Shield,
    text: 'Official',
    color: 'text-blue-700',
    bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
    border: 'border-blue-300',
    ringColor: 'ring-blue-200'
  },
  community: {
    icon: Users,
    text: 'Community',
    color: 'text-green-700',
    bg: 'bg-gradient-to-r from-green-50 to-green-100',
    border: 'border-green-300',
    ringColor: 'ring-green-200'
  }
};

interface BadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: {
    container: 'px-2.5 py-1',
    icon: 'w-3 h-3',
    text: 'text-xs'
  },
  md: {
    container: 'px-3 py-1.5',
    icon: 'w-4 h-4',
    text: 'text-sm'
  },
  lg: {
    container: 'px-4 py-2',
    icon: 'w-5 h-5',
    text: 'text-base'
  }
};

export const Badge: React.FC<BadgeProps> = ({ type, size = 'md', className = '' }) => {
  const config = badgeConfig[type];
  const Icon = config.icon;
  const sizeClass = sizeClasses[size];

  return (
    <div 
      className={`inline-flex items-center space-x-1.5 ${sizeClass.container} ${config.bg} ${config.border} border rounded-lg shadow-sm ring-1 ${config.ringColor} transition-all hover:shadow-md ${className}`}
    >
      <Icon className={`${sizeClass.icon} ${config.color}`} strokeWidth={2.5} />
      <span className={`${sizeClass.text} font-semibold ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
};
