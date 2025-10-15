'use client';

import React, { useState } from 'react';
import { Package, Download, Search, Filter } from 'lucide-react';
import { Button } from '@repo/ui';

interface SBOMPackage {
  name: string;
  version: string;
  license: string;
  package_type: string;
  source?: string;
}

interface SBOMTabProps {
  packages: SBOMPackage[];
}

const SBOMTab: React.FC<SBOMTabProps> = ({ packages }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || pkg.package_type === typeFilter;
    return matchesSearch && matchesType;
  });

  const packageTypes = ['all', ...Array.from(new Set(packages.map(p => p.package_type)))];
  const licenseStats = packages.reduce((acc, pkg) => {
    acc[pkg.license] = (acc[pkg.license] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Software Bill of Materials</h2>
            <p className="text-gray-700 mb-4">
              Complete transparency of all {packages.length} packages included in this image
            </p>
            <Button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download SBOM (JSON)
            </Button>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-lg">
            <Package className="w-12 h-12 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <p className="text-3xl font-bold text-gray-900">{packages.length}</p>
          <p className="text-sm text-gray-600 mt-1">Total Packages</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <p className="text-3xl font-bold text-gray-900">{Object.keys(licenseStats).length}</p>
          <p className="text-sm text-gray-600 mt-1">Unique Licenses</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <p className="text-3xl font-bold text-gray-900">
            {packages.filter(p => p.package_type === 'library').length}
          </p>
          <p className="text-sm text-gray-600 mt-1">Libraries</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <p className="text-3xl font-bold text-gray-900">
            {packages.filter(p => p.package_type === 'application').length}
          </p>
          <p className="text-sm text-gray-600 mt-1">Applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {packageTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Package Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Version</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">License</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPackages.map((pkg, index) => (
                <tr 
                  key={index}
                  className="hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-pink-50/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="font-mono text-sm text-gray-900">{pkg.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {pkg.version}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {pkg.license}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      pkg.package_type === 'library' 
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {pkg.package_type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SBOMTab;