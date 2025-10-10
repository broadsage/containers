'use client';

import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@repo/ui';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8" style={{ color: '#fd366e' }} />
          <span className="text-2xl font-bold" style={{ color: '#fd366e' }}>SecureHub</span>
        </Link>
        
        <nav className="flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Directory
          </Link>
          <Link href="/docs" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Documentation
          </Link>
          <Link href="/community" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Community
          </Link>
          <Link href="/contribute" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Contribute
          </Link>
          <Button 
            size="sm"
            style={{ backgroundColor: '#fd366e' }}
            className="text-white hover:opacity-90 transition-opacity"
          >
            Get Started Free
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
