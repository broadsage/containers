'use client';

import React from 'react';
import { AlertTriangle, Shield, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Vulnerability {
  cve_id: string;
  severity: string;
  package: string;
  installed_version: string;
  fixed_version?: string;
  cvss_score: number;
  description: string;
}

interface VulnerabilitiesTabProps {
  vulnerabilities: Vulnerability[];
}

const VulnerabilitiesTab: React.FC<VulnerabilitiesTabProps> = ({ vulnerabilities }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          badge: 'bg-red-100'
        };
      case 'high':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          text: 'text-orange-700',
          badge: 'bg-orange-100'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100'
        };
      case 'low':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          badge: 'bg-blue-100'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          badge: 'bg-gray-100'
        };
    }
  };

  const severityStats = {
    critical: vulnerabilities.filter(v => v.severity.toLowerCase() === 'critical').length,
    high: vulnerabilities.filter(v => v.severity.toLowerCase() === 'high').length,
    medium: vulnerabilities.filter(v => v.severity.toLowerCase() === 'medium').length,
    low: vulnerabilities.filter(v => v.severity.toLowerCase() === 'low').length,
  };

  if (vulnerabilities.length === 0) {
    return (
      <div className="space-y-6">
        {/* Zero Vulnerabilities Hero */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-12 border border-green-200 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Shield className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Zero Known Vulnerabilities</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            This image has been thoroughly scanned and contains no known security vulnerabilities. 
            We continuously monitor and update our images to maintain this security standard.
          </p>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Daily Scanning</h3>
            <p className="text-sm text-gray-600">
              Automated vulnerability scans run every 24 hours to ensure continuous security
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <Shield className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Minimal Attack Surface</h3>
            <p className="text-sm text-gray-600">
              Built with only essential components to reduce potential security risks
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <AlertCircle className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Rapid Response</h3>
            <p className="text-sm text-gray-600">
              Security patches are applied within hours of disclosure
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <p className="text-3xl font-bold text-red-700">{severityStats.critical}</p>
          <p className="text-sm text-red-600 mt-1">Critical</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <p className="text-3xl font-bold text-orange-700">{severityStats.high}</p>
          <p className="text-sm text-orange-600 mt-1">High</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <p className="text-3xl font-bold text-yellow-700">{severityStats.medium}</p>
          <p className="text-sm text-yellow-600 mt-1">Medium</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <p className="text-3xl font-bold text-blue-700">{severityStats.low}</p>
          <p className="text-sm text-blue-600 mt-1">Low</p>
        </div>
      </div>

      {/* Vulnerabilities List */}
      <div className="space-y-4">
        {vulnerabilities.map((vuln, index) => {
          const colors = getSeverityColor(vuln.severity);
          
          return (
            <div 
              key={index}
              className={`${colors.bg} rounded-xl p-6 border ${colors.border}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 ${colors.badge} rounded-lg`}>
                    <AlertTriangle className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-mono text-lg font-bold text-gray-900">{vuln.cve_id}</h3>
                      <span className={`px-3 py-1 ${colors.badge} ${colors.text} text-xs font-bold uppercase rounded-full`}>
                        {vuln.severity}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                        CVSS {vuln.cvss_score}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{vuln.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Affected Package</p>
                        <p className="font-mono font-medium text-gray-900">{vuln.package}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Installed Version</p>
                        <p className="font-mono font-medium text-gray-900">{vuln.installed_version}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Fixed Version</p>
                        <p className="font-mono font-medium text-gray-900">
                          {vuln.fixed_version || 'Not available'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 flex items-start space-x-4">
        <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-gray-900 mb-1">About Vulnerability Scanning</h3>
          <p className="text-sm text-gray-700">
            We scan all images daily using multiple industry-standard vulnerability databases. 
            Vulnerabilities are prioritized based on CVSS scores and exploitability in containerized environments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VulnerabilitiesTab;