import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Tag, CheckCircle, Shield, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const ImageCard = ({ image }) => {
  const navigate = useNavigate();

  const renderBadge = (badgeType) => {
    switch (badgeType) {
      case 'official':
        return (
          <div className="inline-flex items-center space-x-1 px-1.5 py-0.5 bg-blue-50 border border-blue-200 rounded text-[10px] font-medium text-blue-700">
            <CheckCircle className="w-2.5 h-2.5" />
            <span>Official Image</span>
          </div>
        );
      case 'community':
        return (
          <div className="inline-flex items-center space-x-1 px-1.5 py-0.5 bg-green-50 border border-green-200 rounded text-[10px] font-medium text-green-700">
            <Shield className="w-2.5 h-2.5" />
            <span>Community</span>
          </div>
        );
      case 'verified':
        return (
          <div className="inline-flex items-center space-x-1 px-1.5 py-0.5 bg-purple-50 border border-purple-200 rounded text-[10px] font-medium text-purple-700">
            <Award className="w-2.5 h-2.5" />
            <span>Verified Publisher</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200"
      onClick={() => navigate(`/image/${image.name}`)}
    >
      <CardContent className="p-4">
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
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#fd366e] transition-colors">
                {image.name}
              </h3>
            </div>
            
            {/* Docker Hub style badges */}
            {image.badges && image.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {image.badges.map((badge, index) => (
                  <React.Fragment key={index}>
                    {renderBadge(badge)}
                  </React.Fragment>
                ))}
              </div>
            )}
            
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
      </CardContent>
    </Card>
  );
};

export default ImageCard;