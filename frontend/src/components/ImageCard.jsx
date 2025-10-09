import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const ImageCard = ({ image }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200"
      onClick={() => navigate(`/image/${image.id}`)}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Logo */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 group-hover:bg-gray-100 transition-colors">
              <img 
                src={image.logo} 
                alt={image.name} 
                className="w-full h-full object-contain"
              />
            </div>
            {image.fips && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                FIPS
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#fd366e] transition-colors">
                {image.name}
              </h3>
              {image.isFree && (
                <Badge 
                  variant="secondary" 
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  Free
                </Badge>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>Last changed {image.lastChanged}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Tag className="w-4 h-4 mr-1" />
              <span>Latest tag: {image.latestTag}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCard;