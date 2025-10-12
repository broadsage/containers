'use client';

import React from 'react';
import { Layers, HardDrive, Terminal, Settings, Folder, Network } from 'lucide-react';

interface ImageSpec {
  base_image: string;
  layers: number;
  total_size: string;
  created: string;
  author: string;
  entrypoint?: string[];
  cmd?: string[];
  env_vars?: Record<string, string>;
  exposed_ports?: string[];
  volumes?: string[];
}

interface SpecificationsTabProps {
  specifications: ImageSpec;
}

const SpecificationsTab: React.FC<SpecificationsTabProps> = ({ specifications }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Image Specifications</h2>
        <p className="text-gray-700">
          Detailed technical specifications and configuration of this container image
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <Layers className="w-8 h-8 text-blue-600 mb-3" />
          <p className="text-3xl font-bold text-gray-900">{specifications.layers}</p>
          <p className="text-sm text-gray-600 mt-1">Layers</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <HardDrive className="w-8 h-8 text-purple-600 mb-3" />
          <p className="text-3xl font-bold text-gray-900">{specifications.total_size}</p>
          <p className="text-sm text-gray-600 mt-1">Total Size</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <Network className="w-8 h-8 text-green-600 mb-3" />
          <p className="text-3xl font-bold text-gray-900">{specifications.exposed_ports?.length || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Exposed Ports</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <Folder className="w-8 h-8 text-orange-600 mb-3" />
          <p className="text-3xl font-bold text-gray-900">{specifications.volumes?.length || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Volumes</p>
        </div>
      </div>

      {/* Main Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Image Details</h3>
          </div>
          <dl className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <dt className="text-sm text-gray-500 mb-1">Base Image</dt>
              <dd className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg text-gray-900">
                {specifications.base_image}
              </dd>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <dt className="text-sm text-gray-500 mb-1">Author</dt>
              <dd className="font-medium text-gray-900">{specifications.author}</dd>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <dt className="text-sm text-gray-500 mb-1">Created</dt>
              <dd className="font-medium text-gray-900">
                {new Date(specifications.created).toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 mb-1">Architecture</dt>
              <dd className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  linux/amd64
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  linux/arm64
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Runtime Configuration */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Terminal className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Runtime Configuration</h3>
          </div>
          <dl className="space-y-4">
            {specifications.entrypoint && (
              <div className="border-b border-gray-100 pb-3">
                <dt className="text-sm text-gray-500 mb-2">Entrypoint</dt>
                <dd className="font-mono text-sm bg-gray-900 text-green-400 px-4 py-2 rounded-lg">
                  {specifications.entrypoint.join(' ')}
                </dd>
              </div>
            )}
            {specifications.cmd && (
              <div className="border-b border-gray-100 pb-3">
                <dt className="text-sm text-gray-500 mb-2">Default Command</dt>
                <dd className="font-mono text-sm bg-gray-900 text-green-400 px-4 py-2 rounded-lg">
                  {specifications.cmd.join(' ')}
                </dd>
              </div>
            )}
            {specifications.exposed_ports && specifications.exposed_ports.length > 0 && (
              <div>
                <dt className="text-sm text-gray-500 mb-2">Exposed Ports</dt>
                <dd className="flex flex-wrap gap-2">
                  {specifications.exposed_ports.map((port, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm font-mono rounded-full">
                      {port}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Environment Variables */}
      {specifications.env_vars && Object.keys(specifications.env_vars).length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-green-100 rounded-xl">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Environment Variables</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specifications.env_vars).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <dt className="font-mono text-sm text-primary-600 mb-1">{key}</dt>
                <dd className="font-mono text-sm text-gray-900">{value}</dd>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volumes */}
      {specifications.volumes && specifications.volumes.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Folder className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Volume Mount Points</h3>
          </div>
          <div className="space-y-3">
            {specifications.volumes.map((volume, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Folder className="w-5 h-5 text-gray-400" />
                <code className="font-mono text-sm text-gray-900">{volume}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Docker Run Example */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-900 rounded-2xl p-8 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Terminal className="w-6 h-6 mr-2" />
          Docker Run Example
        </h3>
        <div className="bg-black/30 backdrop-blur-lg rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-green-400">
            docker run -d \<br />
            {specifications.exposed_ports?.map(port => 
              `  -p ${port.replace('/tcp', '')}:${port.replace('/tcp', '')} \\\n`
            )}
            {specifications.volumes?.map(vol => 
              `  -v $(pwd)${vol}:${vol} \\\n`
            )}
            {specifications.env_vars && Object.entries(specifications.env_vars).slice(0, 2).map(([key, value]) =>
              `  -e ${key}="${value}" \\\n`
            )}
            {'  hub.opensource.dev/image:latest'}
          </code>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsTab;