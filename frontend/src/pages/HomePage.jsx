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
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {displayedImages.length} of {filteredImages.length} images
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedImages.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>

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