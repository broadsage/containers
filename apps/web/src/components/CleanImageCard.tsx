'use client';

import React from 'react';
import Link from 'next/link';
import { DockerImage } from '../types';
import { Badge } from './ui/Badge';

interface CleanImageCardProps {
  image: DockerImage;
}

const CleanImageCard: React.FC<CleanImageCardProps> = ({ image }) => {
  return (
    <Link href={`/image/${image.name}`}>
      <div className="group relative overflow-hidden bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 p-4">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-50"></div>
        
        {/* Content wrapper */}
        <div className="relative z-10">
        {/* Header with Logo and Badge */}
        <div className="flex items-start justify-between mb-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <img 
                src={image.logo} 
                alt={image.name} 
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            
            {/* Name */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {image.name}
              </h3>
            </div>
          </div>

          {/* Free Badge */}
          {image.isFree && (
            <span className="text-xs font-medium text-purple-600 px-2 py-1 bg-purple-50 rounded-md flex-shrink-0">
              Free
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="space-y-1.5 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-xs">Last changed {image.lastChanged}</span>
            {image.fips && (
              <span className="text-xs font-semibold text-blue-600 px-2 py-0.5 bg-blue-50 rounded border border-blue-200">
                FIPS
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            Latest tag: <span className="font-mono text-gray-700">{image.latestTag}</span>
          </div>
        </div>

        {/* Badge Type */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Badge type={image.badge} size="sm" />
        </div>
        </div>
      </div>
    </Link>
  );
};

export default CleanImageCard;
