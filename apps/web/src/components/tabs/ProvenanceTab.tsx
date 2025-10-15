'use client';

import React from 'react';
import { GitBranch, Clock, User, Server, CheckCircle, Shield, Code, Package } from 'lucide-react';

interface ProvenanceInfo {
  built_at: string;
  builder: string;
  source_repo: string;
  commit_sha: string;
  build_platform: string;
}

interface ProvenanceTabProps {
  provenance: ProvenanceInfo;
}

const ProvenanceTab: React.FC<ProvenanceTabProps> = ({ provenance }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Build Provenance</h2>
            <p className="text-gray-700 mb-4">
              Complete transparency of how this image was built. All builds are reproducible and verifiable.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Verified Build
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Signed
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full flex items-center">
                <GitBranch className="w-4 h-4 mr-1" />
                Reproducible
              </span>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-lg">
            <Shield className="w-12 h-12 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Build Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Build Environment</h3>
              <p className="text-sm text-gray-500">Infrastructure details</p>
            </div>
          </div>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-500 mb-1">Builder</dt>
              <dd className="font-medium text-gray-900 flex items-center">
                <Code className="w-4 h-4 mr-2 text-gray-400" />
                {provenance.builder}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 mb-1">Build Platform</dt>
              <dd className="font-medium text-gray-900 flex items-center">
                <Server className="w-4 h-4 mr-2 text-gray-400" />
                {provenance.build_platform}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 mb-1">Build Time</dt>
              <dd className="font-medium text-gray-900 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {new Date(provenance.built_at).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-xl">
              <GitBranch className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Source Information</h3>
              <p className="text-sm text-gray-500">Repository and commit details</p>
            </div>
          </div>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-500 mb-1">Source Repository</dt>
              <dd className="font-mono text-sm text-gray-900 break-all">
                <a 
                  href={provenance.source_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {provenance.source_repo}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 mb-1">Commit SHA</dt>
              <dd className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg text-gray-900">
                {provenance.commit_sha}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Build Pipeline */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Build Pipeline</h3>
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500"></div>
          
          <div className="space-y-8">
            {[
              {
                title: 'Source Code Checkout',
                description: 'Clone repository and checkout specific commit',
                icon: GitBranch,
                color: 'blue',
                status: 'completed'
              },
              {
                title: 'Dependency Resolution',
                description: 'Download and verify all dependencies',
                icon: Package,
                color: 'purple',
                status: 'completed'
              },
              {
                title: 'Build Execution',
                description: 'Compile and build the container image',
                icon: Code,
                color: 'green',
                status: 'completed'
              },
              {
                title: 'Security Scanning',
                description: 'Scan for vulnerabilities and generate SBOM',
                icon: Shield,
                color: 'orange',
                status: 'completed'
              },
              {
                title: 'Image Signing',
                description: 'Sign image with cryptographic signature',
                icon: CheckCircle,
                color: 'teal',
                status: 'completed'
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex items-start space-x-4">
                  <div className={`relative z-10 flex items-center justify-center w-12 h-12 bg-${step.color}-100 rounded-xl border-4 border-white shadow-lg`}>
                    <Icon className={`w-6 h-6 text-${step.color}-600`} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900">{step.title}</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Completed
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Verification */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verified & Reproducible</h3>
            <p className="text-gray-700 mb-4">
              This build has been cryptographically signed and can be independently reproduced. 
              The provenance data is immutable and stored on a distributed ledger.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-white border border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium text-sm">
                Download Attestation
              </button>
              <button className="px-4 py-2 bg-white border border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium text-sm">
                Verify Signature
              </button>
              <button className="px-4 py-2 bg-white border border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium text-sm">
                View Build Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvenanceTab;