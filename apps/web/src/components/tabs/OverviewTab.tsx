'use client';

import React from 'react';
import { Shield, Download, Package, Clock, Star, GitBranch } from 'lucide-react';
import { DockerImage } from '../../types';

interface OverviewTabProps {
  image: DockerImage;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ image }) => {
  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <Download className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{(Number(image.downloads) / 1000000).toFixed(1)}M+</p>
          <p className="text-sm text-gray-600 mt-1">Total Pulls</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-600 mt-1">Vulnerabilities</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{image.size}</p>
          <p className="text-sm text-gray-600 mt-1">Compressed Size</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{image.lastChanged}</p>
          <p className="text-sm text-gray-600 mt-1">Last Updated</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About {image.name}</h2>
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          {image.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Star className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Minimal base image for reduced attack surface</span>
              </li>
              <li className="flex items-start">
                <Star className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Comprehensive SBOM included</span>
              </li>
              <li className="flex items-start">
                <Star className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Regular security updates and patches</span>
              </li>
              <li className="flex items-start">
                <Star className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Multi-architecture support (x86_64, arm64)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Image Details</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-gray-600">Category</dt>
                <dd className="font-medium text-gray-900 capitalize">{image.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Latest Tag</dt>
                <dd className="font-mono text-sm bg-gray-100 px-3 py-1 rounded text-gray-900">{image.latestTag}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">License</dt>
                <dd className="font-medium text-gray-900">{image.isFree ? 'Free & Open Source' : 'Commercial'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Support</dt>
                <dd className="font-medium text-gray-900">{image.badge === 'official' ? 'Official Support' : 'Community Support'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Security First</h3>
            <p className="text-gray-700 mb-4">
              This image is built with security as a top priority. It includes comprehensive vulnerability scanning, 
              SBOM generation, and provenance tracking to ensure supply chain integrity.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Zero Known CVEs
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Signed & Verified
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                SBOM Included
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Daily Updates
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <GitBranch className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Development</h3>
            <p className="text-sm text-gray-600">
              Perfect for local development environments and CI/CD pipelines
            </p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <Shield className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Production</h3>
            <p className="text-sm text-gray-600">
              Hardened and minimal for secure production deployments
            </p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <Package className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Microservices</h3>
            <p className="text-sm text-gray-600">
              Lightweight base for building scalable microservices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;