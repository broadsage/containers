'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import ModernHero from '../components/ModernHero';
import ModernCategoryFilter from '../components/ModernCategoryFilter';
import ModernImageCard from '../components/ModernImageCard';
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
    filteredImages,
    displayedImages,
    hasMore,
    remainingCount,
    handleCategoryChange,
    handleSearchChange,
    handleLoadMore,
  } = useImageFilters({ 
    images: dockerImages,
    initialPageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Header />
        <ModernHero onSearch={handleSearchChange} />
      
        <div className="container mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <ModernCategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Images' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Showing {displayedImages.length} of {filteredImages.length} secure container images
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 bg-white rounded-xl shadow-sm border border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Grid view"
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-lg transition-all ${
                      viewMode === 'list' 
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md' 
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {displayedImages.map((image) => (
                    <ModernImageCard key={image.id} image={image} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mb-12">
                  {displayedImages.map((image) => (
                    <ModernImageCard key={image.id} image={image} />
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
