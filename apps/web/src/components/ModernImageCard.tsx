'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Tag, Download } from 'lucide-react';
import { DockerImage } from '../types';
import { Badge } from './ui/Badge';

  return (
    <Link href={`/image/${image.name}`}>
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 hover:-translate-y-1">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative p-6">
          {/* Header with Logo and Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={image.logo} 
                  alt={image.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              {image.fips && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs px-2 py-1 rounded-lg font-bold shadow-lg">
                  FIPS
                </span>
              )}
            </div>
            <Badge type={image.badge} size="md" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {image.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {image.description}
          </p>

          {/* Meta Information */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              <span>{image.lastChanged || 'Recently'}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <Tag className="w-3.5 h-3.5 mr-1.5" />
              <span>{image.latestTag || 'latest'}</span>
            </div>

            <div className="flex items-center text-xs text-gray-500">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>{(image.downloads / 1000).toFixed(0)}K pulls</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                {image.size}
              </span>
              {image.isFree && (
                <span className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg">
                  Free
                </span>
              )}
            </div>

            <div className="flex items-center text-primary-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
              View
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
      </div>
    </Link>
  );
};

export default ModernImageCard;