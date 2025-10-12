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
    <div className="border-b border-gray-200 bg-white sticky top-20 z-40 shadow-sm">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap
                  transition-all duration-300 border-b-2
                  ${isActive 
                    ? 'text-primary-600 border-primary-600' 
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`
                    px-2 py-0.5 text-xs font-semibold rounded-full
                    ${tab.count === 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                    }
                  `}>
                    {tab.count}
                  </span>
                )}
                
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
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