import { Shield, Award, Star } from 'lucide-react';
import { BadgeType } from '../components/ui/Badge';

export interface BadgeFilterConfig {
  id: BadgeType | 'all';
  name: string;
  icon: any | null;
  color?: string;
  bg?: string;
  border?: string;
}

export const BADGE_FILTERS: BadgeFilterConfig[] = [
  { 
    id: 'all', 
    name: 'All', 
    icon: null 
  },
  { 
    id: 'official', 
    name: 'Official', 
    icon: Shield, 
    color: 'text-blue-600', 
    bg: 'bg-blue-50', 
    border: 'border-blue-200' 
  },
  { 
    id: 'community', 
    name: 'Community', 
    icon: Award, 
    color: 'text-green-600', 
    bg: 'bg-green-50', 
    border: 'border-green-200' 
  },
  { 
    id: 'verified', 
    name: 'Verified', 
    icon: Star, 
    color: 'text-purple-600', 
    bg: 'bg-purple-50', 
    border: 'border-purple-200' 
  }
];
