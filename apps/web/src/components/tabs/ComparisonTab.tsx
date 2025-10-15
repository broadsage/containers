'use client';

import React, { useState } from 'react';
import { GitCompare, TrendingDown, Shield, Zap, CheckCircle, XCircle } from 'lucide-react';

interface ComparisonTabProps {
  imageName: string;
}

const ComparisonTab: React.FC<ComparisonTabProps> = ({ imageName }) => {
  const [compareWith, setCompareWith] = useState('official');

  const comparisons = {
    official: {
      name: 'Official Docker Hub Image',
      size: '980 MB',
      vulnerabilities: 127,
      layers: 23,
      lastUpdate: '2 months ago',
    },
    openhub: {
      name: 'Broadsage Container Image',
      size: '45 MB',
      vulnerabilities: 0,
      layers: 12,
      lastUpdate: '2 days ago',
    }
  };

  const improvement = {
    size: ((parseFloat(comparisons.official.size) - parseFloat(comparisons.openhub.size)) / parseFloat(comparisons.official.size) * 100).toFixed(1),
    vulnerabilities: comparisons.official.vulnerabilities - comparisons.openhub.vulnerabilities,
    layers: comparisons.official.layers - comparisons.openhub.layers,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Image Comparison</h2>
        <p className="text-gray-700 mb-4">
          See how our secure, minimal image compares to standard alternatives
        </p>
        <select
          value={compareWith}
          onChange={(e) => setCompareWith(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="official">Official Docker Hub Image</option>
          <option value="alpine">Alpine-based Image</option>
          <option value="debian">Debian-based Image</option>
        </select>
      </div>

      {/* Quick Comparison Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="w-8 h-8 text-green-600" />
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
              -{improvement.size}%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{comparisons.openhub.size}</p>
          <p className="text-sm text-gray-600 mt-1">Image Size Reduction</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
              -{improvement.vulnerabilities}
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-600 mt-1">Vulnerabilities</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-8 h-8 text-purple-600" />
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-full">
              2x Faster
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">3.2s</p>
          <p className="text-sm text-gray-600 mt-1">Pull Time</p>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Broadsage</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Official</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Compressed Size</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-lg">
                    {comparisons.openhub.size}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">{comparisons.official.size}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Vulnerabilities</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-lg">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {comparisons.openhub.vulnerabilities}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 font-semibold rounded-lg">
                    <XCircle className="w-4 h-4 mr-1" />
                    {comparisons.official.vulnerabilities}
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Number of Layers</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-lg">
                    {comparisons.openhub.layers}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">{comparisons.official.layers}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">SBOM Included</td>
                <td className="px-6 py-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                </td>
                <td className="px-6 py-4 text-center">
                  <XCircle className="w-6 h-6 text-gray-300 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Signed & Verified</td>
                <td className="px-6 py-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                </td>
                <td className="px-6 py-4 text-center">
                  <XCircle className="w-6 h-6 text-gray-300 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Daily Updates</td>
                <td className="px-6 py-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                </td>
                <td className="px-6 py-4 text-center">
                  <XCircle className="w-6 h-6 text-gray-300 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Last Updated</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-lg">
                    {comparisons.openhub.lastUpdate}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">{comparisons.official.lastUpdate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Why Choose Broadsage */}
      <div className="bg-gradient-to-r from-primary-50 to-pink-50 rounded-2xl p-8 border border-primary-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Broadsage Container Images?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Minimal Attack Surface</h4>
              <p className="text-sm text-gray-600">
                Only essential packages included, reducing security vulnerabilities by up to 95%
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Zero Known CVEs</h4>
              <p className="text-sm text-gray-600">
                Continuously scanned and patched to maintain zero known vulnerabilities
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Faster Deployments</h4>
              <p className="text-sm text-gray-600">
                Smaller size means faster pull times and reduced bandwidth costs
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <GitCompare className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Complete Transparency</h4>
              <p className="text-sm text-gray-600">
                Full SBOM and provenance tracking for supply chain security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTab;