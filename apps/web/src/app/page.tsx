'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import ModernHero from '../components/ModernHero';
import ModernCategoryFilter from '../components/ModernCategoryFilter';
import ModernImageCard from '../components/ModernImageCard';
import CleanImageCard from '../components/CleanImageCard';
import Footer from '../components/Footer';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { dockerImages } from '../data/mockData';
import { useImageFilters } from '../hooks/useImageFilters';
import { PAGINATION } from '../constants';
import { Button } from '@repo/ui';
import { Grid3x3, List } from 'lucide-react';
import type { ViewMode } from '../constants';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const {
    selectedCategory,
    selectedBadge,
    filteredImages,
    displayedImages,
    hasMore,
    remainingCount,
    handleCategoryChange,
    handleBadgeChange,
    handleSearchChange,
    handleLoadMore,
  } = useImageFilters({ 
    images: dockerImages,
    initialPageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />
        <ModernHero onSearch={handleSearchChange} />
      
        <div className="container mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <ModernCategoryFilter 
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  selectedBadge={selectedBadge}
                  onBadgeChange={handleBadgeChange}
                />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Images' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-gray-600 text-sm">
                      Showing {displayedImages.length} of {filteredImages.length} images
                    </p>
                    {(selectedCategory !== 'all' || selectedBadge !== 'all') && (
                      <button
                        onClick={() => {
                          handleCategoryChange('all');
                          handleBadgeChange('all');
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium underline"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-md transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Grid view"
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-md transition-all ${
                      viewMode === 'list' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title="List view"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Image Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
                  {displayedImages.map((image) => (
                    <CleanImageCard key={image.id} image={image} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 mb-12">
                  {displayedImages.map((image) => (
                    <CleanImageCard key={image.id} image={image} />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center">
                  <Button
                    onClick={handleLoadMore}
                    size="lg"
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                  >
                    Load More Images ({remainingCount} more)
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {displayedImages.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={() => {
                      handleCategoryChange('all');
                      handleSearchChange('');
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
