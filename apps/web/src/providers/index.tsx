'use client';

import React from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Root providers component
 * Add global providers here (theme, auth, query client, etc.)
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}
