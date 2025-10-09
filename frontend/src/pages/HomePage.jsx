import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategoryFilter from '../components/CategoryFilter';
import ImageCard from '../components/ImageCard';
import Footer from '../components/Footer';
import { dockerImages } from '../mockData';
import { Button } from '../components/ui/button';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllImages, setShowAllImages] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredImages = useMemo(() => {
    let filtered = dockerImages;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(img => 
        img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const displayedImages = showAllImages ? filteredImages : filteredImages.slice(0, 15);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection onSearch={setSearchQuery} />
      
      <div className="container mx-auto px-8 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 text-sm">
                Showing {displayedImages.length} of {filteredImages.length} images
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                  title="Grid view"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                  title="List view"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayedImages.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            ) : (
              <div className="space-y-3 mb-8">
                {displayedImages.map((image) => (
                  <div
                    key={image.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:border-[#fd366e] transition-all cursor-pointer hover:shadow-md"
                    onClick={() => window.location.href = `/image/${image.name}`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Logo */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-50 rounded-lg p-2">
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
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-base font-semibold text-gray-900 hover:text-[#fd366e] transition-colors">
                            {image.name}
                          </h3>
                          {image.fips && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-blue-600">FIPS available</span>
                            </>
                          )}
                        </div>
                        
                        {/* Docker Hub style badges */}
                        {image.badges && image.badges.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {image.badges.map((badge, index) => {
                              if (badge === 'official') {
                                return (
                                  <div key={index} className="inline-flex items-center space-x-1 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-[10px] font-medium text-blue-700">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Official Image</span>
                                  </div>
                                );
                              } else if (badge === 'opensource') {
                                return (
                                  <div key={index} className="inline-flex items-center space-x-1 px-2 py-0.5 bg-green-50 border border-green-200 rounded text-[10px] font-medium text-green-700">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Open Source</span>
                                  </div>
                                );
                              } else if (badge === 'verified') {
                                return (
                                  <div key={index} className="inline-flex items-center space-x-1 px-2 py-0.5 bg-purple-50 border border-purple-200 rounded text-[10px] font-medium text-purple-700">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Verified Publisher</span>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        )}
                        
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span>Last changed {image.lastChanged}</span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                          {image.description}
                        </p>

                        <div className="text-xs text-gray-600">
                          Latest tag: <span className="font-medium text-gray-900">{image.latestTag}</span>
                          <span className="text-gray-400"> + 162 more tags</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!showAllImages && filteredImages.length > 15 && (
              <div className="text-center">
                <Button
                  onClick={() => setShowAllImages(true)}
                  style={{ backgroundColor: '#fd366e' }}
                  className="text-white hover:opacity-90"
                >
                  View {filteredImages.length - 15} more
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;