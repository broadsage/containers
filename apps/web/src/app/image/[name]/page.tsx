'use client';

import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import { ArrowLeft, Copy, Check, Download, Clock } from 'lucide-react';
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
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Directory
          </button>
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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Clean Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Directory
          </Link>

          {/* Image Header */}
          <div className="flex items-start space-x-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <img 
                  src={image.logo} 
                  alt={image.name} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{image.name}</h1>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-sm text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Last changed {image.lastChanged}
                </span>
                {image.fips && (
                  <span className="text-xs font-semibold text-blue-600 px-2 py-1 bg-blue-50 rounded border border-blue-200">
                    FIPS available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pull Command & CTA Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Docker Pull Command */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Try this image for free
              </h3>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-md font-mono text-sm">
                  docker pull hub.opensource.dev/{image.name}
                </code>
                <button
                  onClick={copyPullCommand}
                  className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  title="Copy command"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Need access to a specific tag? <Link href="#" className="text-blue-600 hover:text-blue-700">Contact us</Link>.
              </p>
            </div>

            {/* CTA Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Get full access to this image
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Browse all versions, view SBOM details, and get vulnerability alerts.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                Sign up for free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="container mx-auto px-6 lg:px-8 py-8">
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
