'use client';

import React from 'react';
import { 
  Tags, 
  FileText, 
  GitCompare, 
  Shield, 
  FileCode, 
  Package, 
  AlertTriangle, 
  Bell 
} from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { id: 'tags', label: 'Tags', icon: Tags },
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: AlertTriangle, count: 0 },
    { id: 'sbom', label: 'SBOM', icon: Package },
    { id: 'provenance', label: 'Provenance', icon: Shield },
    { id: 'specifications', label: 'Specifications', icon: FileCode },
    { id: 'comparison', label: 'Comparison', icon: GitCompare },
    { id: 'advisories', label: 'Advisories', icon: Bell, count: 0 },
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative px-4 py-3 text-sm font-medium whitespace-nowrap
                  transition-colors border-b-2
                  ${isActive 
                    ? 'text-gray-900 border-blue-600' 
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                  }
                `}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`
                    ml-2 px-1.5 py-0.5 text-xs font-semibold rounded
                    ${tab.count === 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                    }
                  `}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TabNavigation;