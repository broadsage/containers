import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Images documentation sidebar
  imagesSidebar: [
    'images/overview',
    {
      type: 'category',
      label: 'Featured Images',
      items: [
        'images/node',
        'images/nginx', 
        'images/postgres',
        'images/python',
        'images/redis',
      ],
    },
    {
      type: 'category',
      label: 'Base Images',
      items: [
        'images/docker',
        'images/mysql',
        'images/mongodb',
        'images/elasticsearch',
      ],
    },
    {
      type: 'category',
      label: 'AI/ML Images',
      items: [
        'images/tensorflow',
        'images/pytorch',
      ],
    },
    {
      type: 'category',
      label: 'Application Images',
      items: [
        'images/php',
        'images/jenkins',
        'images/kafka',
      ],
    },
    {
      type: 'category',
      label: 'Development Images',
      items: [
        'images/go',
      ],
    },
  ],

  // Guides and tutorials sidebar
  guidesSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Security',
      items: [
        'guides/vulnerabilities',
        'guides/sbom',
        'guides/provenance',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'guides/community',
        'guides/contributing',
      ],
    },
  ],
};

export default sidebars;
