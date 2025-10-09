import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { dockerImages, generateVulnerabilities, generateSBOM } from '../mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Download, Package, Shield, AlertTriangle, CheckCircle, XCircle, Clock, Tag, Database, FileText, Layers } from 'lucide-react';

const ImageDetailPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const image = dockerImages.find(img => img.name === name);
  const [activeTab, setActiveTab] = useState('specification');

  if (!image) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Image not found</h1>
          <Button onClick={() => navigate('/')} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const vulnerabilities = generateVulnerabilities(image.id);
  const sbom = generateSBOM(image.name);

  const vulnCounts = {
    critical: vulnerabilities.filter(v => v.severity === 'critical').length,
    high: vulnerabilities.filter(v => v.severity === 'high').length,
    medium: vulnerabilities.filter(v => v.severity === 'medium').length,
    low: vulnerabilities.filter(v => v.severity === 'low').length,
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </Button>

        {/* Image Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-50 rounded-xl p-4">
                    <img src={image.logo} alt={image.name} className="w-full h-full object-contain" />
                  </div>
                  {image.fips && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white">
                      FIPS
                    </Badge>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <h1 className="text-4xl font-bold text-gray-900">{image.name}</h1>
                    {image.isFree && (
                      <Badge className="bg-blue-50 text-blue-700">Free</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-lg mb-4">{image.description}</p>
                  
                  <div className="grid grid-cols-4 gap-6 mt-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Latest: <span className="font-medium text-gray-900">{image.latestTag}</span></span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Updated {image.lastChanged}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Download className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{image.downloads.toLocaleString()} pulls</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Database className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Size: {image.size}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button style={{ backgroundColor: '#fd366e' }} className="text-white hover:opacity-90">
                <Download className="w-4 h-4 mr-2" />
                Pull Image
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vulnerability Summary */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Critical</p>
                  <p className="text-3xl font-bold text-red-600">{vulnCounts.critical}</p>
                </div>
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">High</p>
                  <p className="text-3xl font-bold text-orange-600">{vulnCounts.high}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Medium</p>
                  <p className="text-3xl font-bold text-yellow-600">{vulnCounts.medium}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Low</p>
                  <p className="text-3xl font-bold text-blue-600">{vulnCounts.low}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="specification">Specification</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="sbom">SBOM</TabsTrigger>
            <TabsTrigger value="versions">Versions</TabsTrigger>
          </TabsList>

          <TabsContent value="specification">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Image Specification</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Overview</h3>
                    <p className="text-gray-600 mb-4">{image.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-l-4 border-[#fd366e] pl-4">
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-semibold text-gray-900 capitalize">{image.category}</p>
                      </div>
                      <div className="border-l-4 border-[#fd366e] pl-4">
                        <p className="text-sm text-gray-500">License</p>
                        <p className="font-semibold text-gray-900">Apache-2.0</p>
                      </div>
                      <div className="border-l-4 border-[#fd366e] pl-4">
                        <p className="text-sm text-gray-500">Architecture</p>
                        <p className="font-semibold text-gray-900">amd64, arm64</p>
                      </div>
                      <div className="border-l-4 border-[#fd366e] pl-4">
                        <p className="text-sm text-gray-500">OS</p>
                        <p className="font-semibold text-gray-900">Linux</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Pull Command</h3>
                    <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                      docker pull securehub.io/{image.name}:{image.latestTag}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Docker Compose</h3>
                    <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                      <pre>{`version: '3.8'
services:
  ${image.name}:
    image: securehub.io/${image.name}:${image.latestTag}
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production`}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Security Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Rebuilt from source daily</p>
                          <p className="text-sm text-gray-600">Automatic rebuilds ensure latest security patches</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Minimal attack surface</p>
                          <p className="text-sm text-gray-600">Only essential packages included</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Industry-leading remediation SLA</p>
                          <p className="text-sm text-gray-600">Critical vulnerabilities patched within 24 hours</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Continuous vulnerability scanning</p>
                          <p className="text-sm text-gray-600">Automated scanning with every build</p>
                        </div>
                      </li>
                      {image.fips && (
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">FIPS 140-2 compliant</p>
                            <p className="text-sm text-gray-600">Meets federal cryptographic standards</p>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Image Layers</h3>
                    <div className="space-y-2">
                      {[
                        { command: 'FROM alpine:3.19', size: '7.3 MB' },
                        { command: `RUN apk add --no-cache ${image.name}`, size: image.size },
                        { command: 'COPY . /app', size: '2.1 MB' },
                        { command: 'WORKDIR /app', size: '0 B' },
                        { command: `CMD ["${image.name}"]`, size: '0 B' }
                      ].map((layer, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <code className="text-sm text-gray-700">{layer.command}</code>
                          <span className="text-sm font-medium text-gray-600">{layer.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vulnerabilities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Vulnerabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {vulnerabilities.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Vulnerabilities Found</h3>
                    <p className="text-gray-600">This image is currently free of known vulnerabilities.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vulnerabilities.map((vuln, index) => (
                      <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(vuln.severity)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Badge className={getSeverityColor(vuln.severity)}>
                              {vuln.severity.toUpperCase()}
                            </Badge>
                            <h4 className="font-semibold">{vuln.cve}</h4>
                            <span className="text-sm">CVSS: {vuln.score}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                          <div>
                            <span className="font-medium">Package:</span> {vuln.package}
                          </div>
                          <div>
                            <span className="font-medium">Installed:</span> {vuln.version}
                          </div>
                          <div>
                            <span className="font-medium">Fixed in:</span> {vuln.fixed}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sbom">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Software Bill of Materials (SBOM)</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export SBOM
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Package Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Version</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">License</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sbom.map((pkg, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-900">{pkg.name}</td>
                          <td className="py-3 px-4 text-gray-600">{pkg.version}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{pkg.license}</Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600 capitalize">{pkg.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ImageDetailPage;