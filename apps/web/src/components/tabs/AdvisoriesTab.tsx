'use client';

import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Calendar, Tag } from 'lucide-react';

interface Advisory {
  advisory_id: string;
  title: string;
  severity: string;
  published_date: string;
  affected_versions: string[];
  description: string;
  mitigation: string;
}

interface AdvisoriesTabProps {
  advisories: Advisory[];
}

const AdvisoriesTab: React.FC<AdvisoriesTabProps> = ({ advisories }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          badge: 'bg-red-100',
          icon: 'text-red-600'
        };
      case 'high':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          text: 'text-orange-700',
          badge: 'bg-orange-100',
          icon: 'text-orange-600'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100',
          icon: 'text-yellow-600'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          badge: 'bg-blue-100',
          icon: 'text-blue-600'
        };
    }
  };

  if (advisories.length === 0) {
    return (
      <div className="space-y-6">
        {/* No Advisories Hero */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-12 border border-green-200 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">No Active Security Advisories</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            This image has no known security advisories. We monitor security databases 24/7 
            and will notify you immediately if any advisories are published.
          </p>
        </div>

        {/* Monitoring Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <Bell className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">24/7 Monitoring</h3>
            <p className="text-sm text-gray-600">
              Continuous monitoring of CVE databases and security mailing lists
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <AlertTriangle className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Instant Alerts</h3>
            <p className="text-sm text-gray-600">
              Immediate notification system when new advisories are published
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Rapid Response</h3>
            <p className="text-sm text-gray-600">
              Security patches typically released within hours of disclosure
            </p>
          </div>
        </div>

        {/* Subscribe */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Subscribe to Security Updates</h3>
          <p className="text-gray-600 mb-6">
            Get notified immediately when security advisories are published for this image
          </p>
          <div className="flex gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Security Advisories</h2>
            <p className="text-gray-700">
              {advisories.length} active security {advisories.length === 1 ? 'advisory' : 'advisories'} for this image
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-lg">
            <Bell className="w-12 h-12 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Advisories List */}
      <div className="space-y-4">
        {advisories.map((advisory, index) => {
          const colors = getSeverityColor(advisory.severity);
          
          return (
            <div 
              key={index}
              className={`${colors.bg} rounded-2xl p-6 border ${colors.border}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-3 ${colors.badge} rounded-xl`}>
                    <AlertTriangle className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{advisory.title}</h3>
                      <span className={`px-3 py-1 ${colors.badge} ${colors.text} text-xs font-bold uppercase rounded-full`}>
                        {advisory.severity}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-mono rounded-full">
                        {advisory.advisory_id}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Published {new Date(advisory.published_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        <span>{advisory.affected_versions.length} affected version(s)</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{advisory.description}</p>

                    {/* Affected Versions */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Affected Versions:</p>
                      <div className="flex flex-wrap gap-2">
                        {advisory.affected_versions.map((version, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm font-mono rounded-lg">
                            {version}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mitigation */}
                    <div className={`p-4 ${colors.badge} rounded-lg border ${colors.border}`}>
                      <div className="flex items-start space-x-2">
                        <Info className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Mitigation</p>
                          <p className="text-sm text-gray-700">{advisory.mitigation}</p>
                        </div>
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
          <h3 className="font-bold text-gray-900 mb-1">About Security Advisories</h3>
          <p className="text-sm text-gray-700">
            Security advisories are official notifications about vulnerabilities or security issues. 
            We recommend always running the latest version to ensure you have all security patches applied.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvisoriesTab;