import React from 'react';
import Link from 'next/link';
import { Shield, Twitter, Linkedin, Github, Mail, Heart, Sparkles, Book, Users, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Shield className="h-10 w-10 text-primary-400 relative" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold gradient-text">OpenHub</span>
                <span className="text-xs text-gray-400">Container Registry</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
              Free, open-source platform for secure, minimal container images. 
              Built by developers, for developers. Zero CVEs, complete transparency.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                className="group p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="group p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="group p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@openhub.dev"
                className="group p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Images Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/helm-charts" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Helm Charts</span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">API Access</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Security Scanning</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center">
              <Book className="w-4 h-4 mr-2" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Documentation</span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">API Reference</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Blog</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Tutorials</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Changelog</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Community
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Discord Server</span>
                </a>
              </li>
              <li>
                <Link href="/contribute" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Contribute</span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Roadmap</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Get notified about new images, security updates, and features
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
            <p className="flex items-center">
              © 2025 OpenHub. Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by the community
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">License</a>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Code className="w-4 h-4" />
            <span>Open Source • MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
