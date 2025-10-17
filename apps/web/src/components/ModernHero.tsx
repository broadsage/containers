'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { stats, dockerImages } from '../data/mockData';

interface ModernHeroProps {
  onSearch: (query: string) => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    versions: 0,
    images: 0,
    builds: 0,
  });

  // Featured images for scrolling animation
  const featuredLogos = dockerImages.slice(0, 15).map(img => ({
    name: img.name,
    logo: img.logo,
  }));

  // Duplicate the logos for seamless infinite scroll
  const scrollingLogos = [...featuredLogos, ...featuredLogos, ...featuredLogos];

  // Animate stats on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const animate = (key: keyof typeof stats, target: number) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedStats(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, interval);
    };

    Object.entries(stats).forEach(([key, value]) => {
      animate(key as keyof typeof stats, value as number);
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto mb-12">
          {/* Main Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted Container Images
            <br />
            for Modern Applications
          </h1>

          {/* Subheading */}
          <p className="text-lg lg:text-xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
            Discover secure, optimized container images with comprehensive vulnerability scanning.
            <br className="hidden sm:block" />
            Browse our curated registry of pre-built images ready for production deployment.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search className="absolute left-4 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search container images..."
                className="w-full pl-12 pr-32 py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button 
                onClick={() => onSearch(searchQuery)}
                className="absolute right-2 bg-gray-900 text-white px-6 py-2.5 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
            <span className="text-gray-500 text-sm font-medium">Popular:</span>
            {['Node.js', 'Python', 'Go', 'Nginx', 'PostgreSQL'].map((tech) => (
              <button
                key={tech}
                onClick={() => {
                  setSearchQuery(tech.toLowerCase());
                  onSearch(tech.toLowerCase());
                }}
                className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors border border-gray-200"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scrolling Logos */}
        <div className="relative mb-16 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex animate-scroll-left">
            {scrollingLogos.map((item, index) => (
              <div 
                key={`${item.name}-${index}`}
                className="flex-shrink-0 mx-6 flex items-center justify-center"
                style={{ width: '120px', height: '80px' }}
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain opacity-40 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-gray-200 pt-12">
          <div className="text-center">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              {animatedStats.projects.toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Projects</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              {animatedStats.versions.toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Versions</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              {animatedStats.images.toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Images</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              {(animatedStats.builds / 1000000).toFixed(0)}M+
            </h3>
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Builds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;