'use client';

import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import TabNavigation from '../../../components/TabNavigation';
import TagsTab from '../../../components/tabs/TagsTab';
import OverviewTab from '../../../components/tabs/OverviewTab';
import VulnerabilitiesTab from '../../../components/tabs/VulnerabilitiesTab';
import SBOMTab from '../../../components/tabs/SBOMTab';
import ProvenanceTab from '../../../components/tabs/ProvenanceTab';
import SpecificationsTab from '../../../components/tabs/SpecificationsTab';
import ComparisonTab from '../../../components/tabs/ComparisonTab';
import AdvisoriesTab from '../../../components/tabs/AdvisoriesTab';
import { dockerImages } from '../../../data/mockData';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Button } from '@repo/ui';
import { Badge } from '../../../components/ui/Badge';

export default function ImageDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const image = dockerImages.find(img => img.name === resolvedParams.name);
  
  const [activeTab, setActiveTab] = useState('tags');
  const [copied, setCopied] = useState(false);

  // State for tab data
  const [versions, setVersions] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [sbom, setSbom] = useState([]);
  const [provenance, setProvenance] = useState(null);
  const [specifications, setSpecifications] = useState(null);
  const [advisories, setAdvisories] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001/api/v1';
      
      try {
        const versionsRes = await fetch(`${backendUrl}/images/${resolvedParams.name}/versions`);
        const vulnRes = await fetch(`${backendUrl}/images/${resolvedParams.name}/vulnerabilities`);
        const sbomRes = await fetch(`${backendUrl}/images/${resolvedParams.name}/sbom`);
        const provenanceRes = await fetch(`${backendUrl}/images/${resolvedParams.name}/provenance`);
        const specsRes = await fetch(`${backendUrl}/images/${resolvedParams.name}/specifications`);
        const advisoriesRes = await fetch(`${backendUrl}/images/${resolvedParams.name}/advisories`);
        
        if (versionsRes.ok) setVersions(await versionsRes.json());
        if (vulnRes.ok) setVulnerabilities(await vulnRes.json());
        if (sbomRes.ok) setSbom(await sbomRes.json());
        if (provenanceRes.ok) setProvenance(await provenanceRes.json());
        if (specsRes.ok) setSpecifications(await specsRes.json());
        if (advisoriesRes.ok) setAdvisories(await advisoriesRes.json());
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchData();
  }, [resolvedParams.name]);

  if (!image) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Image Not Found</h1>
          <Button onClick={() => router.push('/')}>Back to Directory</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const copyPullCommand = () => {
    const command = `docker pull hub.opensource.dev/${image.name}:latest`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Directory
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-2xl opacity-50"></div>
              <div className="relative w-32 h-32 bg-white rounded-2xl p-6 shadow-2xl">
                <img 
                  src={image.logo} 
                  alt={image.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              {image.fips && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                  FIPS
                </span>
              )}
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-4xl font-bold text-white">{image.name}</h1>
                {renderBadge()}
              </div>
              <p className="text-xl text-gray-300 mb-6">{image.description}</p>
              
              {/* Quick Pull */}
              <div className="flex items-center space-x-3">
                <code className="flex-1 bg-black/30 backdrop-blur-lg border border-white/20 text-white px-6 py-4 rounded-xl font-mono text-sm">
                  docker pull hub.opensource.dev/{image.name}:latest
                </code>
                <Button
                  onClick={copyPullCommand}
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        {activeTab === 'tags' && <TagsTab imageName={image.name} versions={versions} />}
        {activeTab === 'overview' && <OverviewTab image={image} />}
        {activeTab === 'vulnerabilities' && <VulnerabilitiesTab vulnerabilities={vulnerabilities} />}
        {activeTab === 'sbom' && <SBOMTab packages={sbom} />}
        {activeTab === 'provenance' && (
          provenance ? (
            <ProvenanceTab provenance={provenance} />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">Loading provenance information...</p>
            </div>
          )
        )}
        {activeTab === 'specifications' && (
          specifications ? (
            <SpecificationsTab specifications={specifications} />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">Loading specifications...</p>
            </div>
          )
        )}
        {activeTab === 'comparison' && <ComparisonTab imageName={image.name} />}
        {activeTab === 'advisories' && <AdvisoriesTab advisories={advisories} />}
      </div>

      <Footer />
    </div>
  );
}
