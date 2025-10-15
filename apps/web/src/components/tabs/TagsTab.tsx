'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, Cpu, Calendar, Filter } from 'lucide-react';
import { Button } from '@repo/ui';

interface Version {
  tag: string;
  pull_url: string;
  compressed_size: string;
  architectures: string[];
  last_changed: string;
  is_free: boolean;
  variant: string;
}

interface TagsTabProps {
  imageName: string;
  versions: Version[];
}

const TagsTab: React.FC<TagsTabProps> = ({ imageName, versions }) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [variantFilter, setVariantFilter] = useState('all');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredVersions = variantFilter === 'all' 
    ? versions 
    : versions.filter(v => v.variant === variantFilter);

  const variants = ['all', ...Array.from(new Set(versions.map(v => v.variant)))];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Available Tags & Versions</h2>
        <p className="text-gray-600 mb-6">
          Choose from {versions.length} available tags for the <span className="font-mono text-primary-600">{imageName}</span> image
        </p>

        {/* Variant Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 mr-2">Variant:</span>
          {variants.map(variant => (
            <button
              key={variant}
              onClick={() => setVariantFilter(variant)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                variantFilter === variant
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {variant === 'all' ? 'All' : variant}
            </button>
          ))}
        </div>
      </div>

      {/* Versions Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tag
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Pull Command
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Architectures
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVersions.map((version, index) => (
                <tr 
                  key={index}
                  className="hover:bg-gradient-to-r hover:from-primary-50/30 hover:to-secondary-50/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <code className="px-3 py-1 bg-gray-100 text-primary-600 rounded-lg text-sm font-mono">
                        {version.tag}
                      </code>
                      {version.is_free && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                          FREE
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm text-gray-600 font-mono">
                        {version.pull_url}
                      </code>
                      <button
                        onClick={() => copyToClipboard(version.pull_url)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedUrl === version.pull_url ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Download className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 font-medium">
                        {version.compressed_size}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {version.architectures.map(arch => (
                        <span 
                          key={arch}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded"
                        >
                          <Cpu className="w-3 h-3 mr-1" />
                          {arch}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{version.last_changed}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Start</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600 mb-2">Pull the image:</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-900 text-green-400 px-4 py-3 rounded-lg text-sm font-mono">
                docker pull {versions[0]?.pull_url || 'hub.opensource.dev/' + imageName + ':latest'}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(`docker pull ${versions[0]?.pull_url || 'hub.opensource.dev/' + imageName + ':latest'}`)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Run the container:</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-900 text-green-400 px-4 py-3 rounded-lg text-sm font-mono">
                docker run {versions[0]?.pull_url || 'hub.opensource.dev/' + imageName + ':latest'}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(`docker run ${versions[0]?.pull_url || 'hub.opensource.dev/' + imageName + ':latest'}`)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsTab;