import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { dockerImages, generateVulnerabilities, generateSBOM } from '../mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Download, Package, Shield, AlertTriangle, CheckCircle, XCircle, Clock, Tag, Database, FileText, Layers, FileKey, Copy } from 'lucide-react';

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
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="specification">Specification</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="sbom">SBOM</TabsTrigger>
            <TabsTrigger value="provenance">Provenance</TabsTrigger>
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
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Complete software bill of materials for {image.name}:{image.latestTag}. 
                    This SBOM is generated in SPDX format and includes all dependencies.
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">Format:</span>
                      <Badge variant="outline">SPDX 2.3</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">Total Packages:</span>
                      <span className="text-gray-600">{sbom.length}</span>
                    </div>
                  </div>
                </div>
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

          <TabsContent value="provenance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileKey className="w-5 h-5" />
                  <span>Image Signatures & Attestations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Introduction */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      All SecureHub container images contain verifiable signatures and high-quality SBOMs (software bill of materials), 
                      features that enable users to confirm the origin of each image build and have a detailed list of everything that is packed within.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                      You'll need <code className="bg-white px-2 py-1 rounded text-sm font-mono">cosign</code> and{' '}
                      <code className="bg-white px-2 py-1 rounded text-sm font-mono">jq</code> in order to download and verify image attestations.
                    </p>
                  </div>

                  {/* Registry Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Registry and Tags</h3>
                    <p className="text-gray-600 mb-4">
                      Attestations are provided per image build, so you'll need to specify the correct tag and registry when pulling attestations from an image with cosign.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <code className="text-sm font-mono font-semibold text-gray-900 mt-0.5">securehub.io/public</code>
                        <span className="text-gray-600">- the Public Registry contains our <strong>Starter Images</strong></span>
                      </div>
                      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <code className="text-sm font-mono font-semibold text-gray-900 mt-0.5">securehub.io/$ORGANIZATION</code>
                        <span className="text-gray-600">- contains all <strong>Production Images</strong> that your organisation has access to</span>
                      </div>
                    </div>
                  </div>

                  {/* Verifying Image Signatures */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Verifying Image Signatures</h3>
                    <p className="text-gray-600 mb-4">
                      The <strong>{image.name}</strong> SecureHub Containers are signed using Sigstore, and you can check the included signatures using cosign.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Starter Images</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`cosign verify \\\n  --certificate-oidc-issuer=https://token.actions.githubusercontent.com \\\n  --certificate-identity=https://github.com/securehub/images/.github/workflows/release.yaml@refs/heads/main \\\n  securehub.io/public/${image.name}:${image.latestTag} | jq`);
                            }}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>{`cosign verify \\
  --certificate-oidc-issuer=https://token.actions.githubusercontent.com \\
  --certificate-identity=https://github.com/securehub/images/.github/workflows/release.yaml@refs/heads/main \\
  securehub.io/public/${image.name}:${image.latestTag} | jq`}</pre>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Production Images</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`cosign verify \\\n  --certificate-oidc-issuer=https://issuer.securehub.io \\\n  --certificate-identity-regexp="https://issuer.securehub.io/.*" \\\n  securehub.io/$ORGANIZATION/${image.name}:${image.latestTag} | jq`);
                            }}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>{`cosign verify \\
  --certificate-oidc-issuer=https://issuer.securehub.io \\
  --certificate-identity-regexp="https://issuer.securehub.io/.*" \\
  securehub.io/$ORGANIZATION/${image.name}:${image.latestTag} | jq`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attestation Types */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Downloading Image Attestations</h3>
                    <p className="text-gray-600 mb-4">
                      The following attestations for the {image.name} image can be obtained and verified via cosign:
                    </p>
                    
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full border">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b">Attestation Type</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">https://slsa.dev/provenance/v1</code>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              The SLSA 1.0 provenance attestation contains information about the image build environment.
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">https://apko.dev/image-configuration</code>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              Contains the configuration used by that particular image build, including direct dependencies, user accounts, and entry point.
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">https://spdx.dev/Document</code>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              Contains the image SBOM (Software Bill of Materials) in SPDX format.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-gray-600 mb-4">
                      To download an attestation, use the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">cosign download attestation</code> command 
                      and provide both the predicate type and the build platform. For example, the following command will obtain the SBOM:
                    </p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Download SBOM Attestation</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`cosign download attestation \\\n  --platform=linux/amd64 \\\n  --predicate-type=https://spdx.dev/Document \\\n  securehub.io/public/${image.name}:${image.latestTag} | jq -r .payload | base64 -d | jq .predicate`);
                            }}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>{`cosign download attestation \\
  --platform=linux/amd64 \\
  --predicate-type=https://spdx.dev/Document \\
  securehub.io/public/${image.name}:${image.latestTag} | jq -r .payload | base64 -d | jq .predicate`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verifying Attestations */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Verifying Image Attestations</h3>
                    <p className="text-gray-600 mb-4">
                      You can use the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">cosign verify-attestation</code> command 
                      to check the signatures of the {image.name} image attestations:
                    </p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Verify Attestation</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`cosign verify-attestation \\\n  --type https://spdx.dev/Document \\\n  --certificate-oidc-issuer=https://token.actions.githubusercontent.com \\\n  --certificate-identity=https://github.com/securehub/images/.github/workflows/release.yaml@refs/heads/main \\\n  securehub.io/public/${image.name}:${image.latestTag}`);
                            }}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>{`cosign verify-attestation \\
  --type https://spdx.dev/Document \\
  --certificate-oidc-issuer=https://token.actions.githubusercontent.com \\
  --certificate-identity=https://github.com/securehub/images/.github/workflows/release.yaml@refs/heads/main \\
  securehub.io/public/${image.name}:${image.latestTag}`}</pre>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-900 mb-2">Expected Verification Output:</h5>
                        <div className="bg-white border border-green-200 p-3 rounded font-mono text-xs text-gray-700 overflow-x-auto">
                          <pre>{`Verification for securehub.io/public/${image.name}:${image.latestTag} --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - The code-signing certificate was verified using trusted certificate authority certificates

Certificate subject: https://github.com/securehub/images/.github/workflows/release.yaml@refs/heads/main
Certificate issuer URL: https://token.actions.githubusercontent.com
GitHub Workflow Trigger: schedule
GitHub Workflow SHA: da283c26829d46c2d2883de5ff98bee672428696
GitHub Workflow Name: .github/workflows/release.yaml
...`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-2">Important Notes</h4>
                        <ul className="space-y-1 text-sm text-amber-800">
                          <li>• By default, commands will fetch attestations for the <code className="bg-white px-1.5 py-0.5 rounded">latest</code> tag</li>
                          <li>• You can specify a different tag to fetch attestations from a specific version</li>
                          <li>• Replace the <code className="bg-white px-1.5 py-0.5 rounded">--predicate-type</code> parameter to download different attestations</li>
                          <li>• Ensure you have cosign and jq installed before running these commands</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="versions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="w-5 h-5" />
                  <span>Available Versions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { tag: image.latestTag, status: 'latest', date: image.lastChanged, vulns: { critical: 0, high: 1, medium: 1, low: 1 } },
                    { tag: '24.9.0', status: 'stable', date: '2 days ago', vulns: { critical: 1, high: 2, medium: 2, low: 1 } },
                    { tag: '24.8.0', status: 'stable', date: '1 week ago', vulns: { critical: 2, high: 3, medium: 3, low: 2 } },
                    { tag: '24.7.1', status: 'stable', date: '2 weeks ago', vulns: { critical: 3, high: 4, medium: 4, low: 3 } },
                    { tag: '24.7.0', status: 'deprecated', date: '3 weeks ago', vulns: { critical: 5, high: 6, medium: 5, low: 4 } },
                  ].map((version, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-[#fd366e] transition-all hover:shadow-md"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2 mb-1">
                            <code className="text-lg font-semibold text-gray-900">{version.tag}</code>
                            {version.status === 'latest' && (
                              <Badge style={{ backgroundColor: '#fd366e' }} className="text-white">
                                Latest
                              </Badge>
                            )}
                            {version.status === 'deprecated' && (
                              <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                                Deprecated
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Updated {version.date}</span>
                            </span>
                            <span>•</span>
                            <span>{image.size}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Vulnerability badges */}
                        {version.vulns.critical > 0 && (
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                            <span className="text-sm font-medium text-red-600">{version.vulns.critical} C</span>
                          </div>
                        )}
                        {version.vulns.high > 0 && (
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                            <span className="text-sm font-medium text-orange-600">{version.vulns.high} H</span>
                          </div>
                        )}
                        {version.vulns.medium > 0 && (
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                            <span className="text-sm font-medium text-yellow-600">{version.vulns.medium} M</span>
                          </div>
                        )}
                        {version.vulns.low > 0 && (
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            <span className="text-sm font-medium text-blue-600">{version.vulns.low} L</span>
                          </div>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="ml-4"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Pull
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Version Policy</h4>
                      <p className="text-sm text-blue-800">
                        We recommend always using the latest tag for production deployments. 
                        Deprecated versions are no longer receiving security updates and should be upgraded immediately.
                      </p>
                    </div>
                  </div>
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