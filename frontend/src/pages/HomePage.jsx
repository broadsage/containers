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
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-5 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Containers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Libraries</a></li>
                <li><a href="#" className="hover:text-white transition-colors">VMs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">FedRAMP</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PCI DSS</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Golden Images</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CVE Remediation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customers</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Customer Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Events & Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">© 2025 SecureHub. All Rights Reserved.</p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;