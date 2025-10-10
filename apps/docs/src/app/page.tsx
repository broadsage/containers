import Link from 'next/link';
import { Book, Shield, FileCode, Users, GitBranch } from 'lucide-react';

export default function DocsHome() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Learn how to use SecureHub images',
      icon: Book,
      href: '/getting-started',
    },
    {
      title: 'Security',
      description: 'Security best practices and SBOM information',
      icon: Shield,
      href: '/security',
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation',
      icon: FileCode,
      href: '/api',
    },
    {
      title: 'Community',
      description: 'Join our community and contribute',
      icon: Users,
      href: '/community',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">SecureHub Docs</h1>
            </div>
            <Link href="http://localhost:3000" className="text-sm text-gray-600 hover:text-gray-900">
              Back to Directory
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to SecureHub Documentation
            </h2>
            <p className="text-lg text-gray-600">
              Learn how to use our secure container images in your projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.title} href={section.href}>
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start</h3>
            <p className="text-gray-600 mb-4">Pull and run a secure container image:</p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <code>docker pull cgr.dev/chainguard/node:latest</code>
              <br />
              <code>docker run cgr.dev/chainguard/node:latest</code>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
