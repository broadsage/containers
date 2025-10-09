import React, { useEffect, useState } from 'react';
import { Search, Info } from 'lucide-react';
import { Input } from './ui/input';
import { dockerImages, stats } from '../mockData';

const HeroSection = ({ onSearch }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % 200);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-8">
        {/* Hero Text */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Eliminate your CVEs
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Build, ship, and run secure software with minimal, hardened container images —
            rebuilt from source daily and guarded under our industry-leading remediation SLA.
          </p>
        </div>

        {/* Scrolling Logos */}
        <div className="relative h-20 mb-12 overflow-hidden">
          <div 
            className="absolute flex space-x-6 transition-transform"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {[...dockerImages, ...dockerImages].map((image, index) => (
              <div 
                key={index} 
                className="relative flex-shrink-0 w-16 h-16 bg-white rounded-lg shadow-sm p-2 hover:shadow-md transition-shadow"
              >
                <img 
                  src={image.logo} 
                  alt={image.name} 
                  className="w-full h-full object-contain"
                />
                {image.fips && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                    FIPS
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-gray-600 text-sm font-medium flex items-center gap-2">
                Projects
                <Info className="w-4 h-4 text-gray-400" />
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.projects.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-gray-600 text-sm font-medium flex items-center gap-2">
                Versions
                <Info className="w-4 h-4 text-gray-400" />
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.versions.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-gray-600 text-sm font-medium flex items-center gap-2">
                Images
                <Info className="w-4 h-4 text-gray-400" />
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.images.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-gray-600 text-sm font-medium flex items-center gap-2">
                Builds
                <Info className="w-4 h-4 text-gray-400" />
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.builds.toLocaleString()}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search SecureHub Containers"
              className="pl-12 pr-4 py-6 text-base border-gray-300 focus:border-[#fd366e] focus:ring-[#fd366e]"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;