'use client';

import React from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { dockerImages } from '../../../data/mockData';
import { ArrowLeft, Download, Shield, Clock, Package } from 'lucide-react';
import { Button } from '@repo/ui';

export default function ImageDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const image = dockerImages.find(img => img.name === resolvedParams.name);

  if (!image) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Image Not Found</h1>
          <Button onClick={() => router.push('/')}>Back to Directory</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </button>

        {/* Image Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gray-50 rounded-lg p-4">
              <img 
                src={image.logo} 
                alt={image.name} 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{image.name}</h1>
              <p className="text-gray-600 mb-4">{image.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Updated {image.lastChanged}</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  <span>{image.downloads.toLocaleString()} downloads</span>
                </div>
                <div className="flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  <span>{image.size}</span>
                </div>
              </div>
            </div>

            <div>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Pull Image
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h2>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <code>docker pull cgr.dev/chainguard/{image.name}:{image.latestTag}</code>
          </div>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this image</h2>
              <p className="text-gray-600 leading-relaxed">
                {image.description}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {image.latestTag}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  latest
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Info</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-500">Size</dt>
                  <dd className="text-sm font-medium text-gray-900">{image.size}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Downloads</dt>
                  <dd className="text-sm font-medium text-gray-900">{image.downloads.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Category</dt>
                  <dd className="text-sm font-medium text-gray-900 capitalize">{image.category}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">License</dt>
                  <dd className="text-sm font-medium text-gray-900">{image.isFree ? 'Free' : 'Commercial'}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Shield className="w-5 h-5" />
                <span>No known vulnerabilities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
