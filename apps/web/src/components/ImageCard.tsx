'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Tag } from 'lucide-react';
import { DockerImage } from '../types';
import { Badge } from './ui/Badge';

interface ImageCardProps {
  image: DockerImage;
}

  return (
    <Link href={`/image/${image.name}`}>
      <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer group p-4">
        <div className="flex items-start space-x-3">
          {/* Logo */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 bg-gray-50 rounded-lg p-2 group-hover:bg-gray-100 transition-colors">
              <img 
                src={image.logo} 
                alt={image.name} 
                className="w-full h-full object-contain"
              />
            </div>
            {image.fips && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
                FIPS
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#fd366e] transition-colors">
                {image.name}
              </h3>
              {/* Docker Hub style badge */}
              {image.badge && renderBadge(image.badge)}
            </div>
            
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <Clock className="w-3 h-3 mr-1" />
              <span>Last changed {image.lastChanged}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <Tag className="w-3 h-3 mr-1" />
              <span>Latest tag: {image.latestTag}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
