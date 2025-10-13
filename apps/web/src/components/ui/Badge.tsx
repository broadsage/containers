import React from 'react';
import { Shield, Award, Star, LucideIcon } from 'lucide-react';

export type BadgeType = 'official' | 'community' | 'verified';

interface BadgeConfig {
  icon: LucideIcon;
  text: string;
  color: string;
  bg: string;
  border: string;
}

export const badgeConfig: Record<BadgeType, BadgeConfig> = {
  official: {
    icon: Shield,
    text: 'Official',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  community: {
    icon: Award,
    text: 'Community',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  verified: {
    icon: Star,
    text: 'Verified',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  }
};

interface BadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: {
    container: 'px-2 py-1',
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
      className={`inline-flex items-center space-x-1.5 ${sizeClass.container} ${config.bg} ${config.border} border rounded-md ${className}`}
    >
      <Icon className={`${sizeClass.icon} ${config.color}`} />
      <span className={`${sizeClass.text} font-semibold ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
};
