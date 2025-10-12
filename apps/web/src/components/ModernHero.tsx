'use client';

import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Shield, Zap, Globe } from 'lucide-react';
import { stats } from '../data/mockData';

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
      animate(key as keyof typeof stats, value);
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white">Secure, Minimal, & Free</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Build Secure Software with
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
              Hardened Containers
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Open-source container registry with minimal, secure images.
            <br />
            Built daily with comprehensive SBOM and zero-CVE commitment.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                <Search className="absolute left-6 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search container images..."
                  className="w-full pl-14 pr-6 py-5 text-gray-900 placeholder-gray-400 focus:outline-none text-lg"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button className="absolute right-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <span className="text-gray-400 text-sm">Popular:</span>
            {['Node.js', 'Python', 'Go', 'Nginx', 'PostgreSQL'].map((tech) => (
              <button
                key={tech}
                onClick={() => {
                  setSearchQuery(tech.toLowerCase());
                  onSearch(tech.toLowerCase());
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass text-center p-8 rounded-2xl group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mx-auto mb-4 group-hover:rotate-12 transition-transform">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">
              {animatedStats.projects.toLocaleString()}
            </h3>
            <p className="text-gray-300 text-sm font-medium">Projects</p>
          </div>

          <div className="glass text-center p-8 rounded-2xl group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 group-hover:rotate-12 transition-transform">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">
              {animatedStats.versions.toLocaleString()}
            </h3>
            <p className="text-gray-300 text-sm font-medium">Versions</p>
          </div>

          <div className="glass text-center p-8 rounded-2xl group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto mb-4 group-hover:rotate-12 transition-transform">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">
              {animatedStats.images.toLocaleString()}
            </h3>
            <p className="text-gray-300 text-sm font-medium">Images</p>
          </div>

          <div className="glass text-center p-8 rounded-2xl group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mx-auto mb-4 group-hover:rotate-12 transition-transform">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">
              {(animatedStats.builds / 1000000).toFixed(0)}M+
            </h3>
            <p className="text-gray-300 text-sm font-medium">Builds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;