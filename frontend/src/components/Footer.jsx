import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Shield className="h-7 w-7" style={{ color: '#fd366e' }} />
              <span className="text-xl font-bold">SecureHub</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Free, open-source platform providing secure container images with enterprise-grade features. 
              Built by the community, for the community.
            </p>
            
            {/* Community CTA */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Join Our Community</h4>
              <div className="flex space-x-2">
                <Button 
                  style={{ backgroundColor: '#fd366e' }}
                  className="text-white hover:opacity-90 text-sm"
                  size="sm"
                >
                  Contribute on GitHub
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Help us improve security for everyone
              </p>
            </div>
          </div>

          {/* Features Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Features</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Container Images
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  SBOM Generation
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Vulnerability Scanning
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Provenance Tracking
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Image Signing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Daily Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Community</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Forum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contribute
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Code of Conduct
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contributors
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Events & Webinars
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Trust Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4">About</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Mission
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Sponsors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright and Legal Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-xs text-gray-500">
                © 2025 SecureHub. All Rights Reserved.
              </p>
              <div className="flex space-x-4 text-xs">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <span className="text-gray-700">•</span>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  Terms of Use
                </a>
                <span className="text-gray-700">•</span>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  Cookie Policy
                </a>
                <span className="text-gray-700">•</span>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  Security
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="bg-gray-950 py-3">
        <div className="container mx-auto px-8 text-center">
          <p className="text-xs text-gray-600">
            Free & Open Source Container Security for Everyone 🌍
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
