// Mock data for Docker images, SBOM, and vulnerabilities

export const categories = [
  { id: 'featured', name: 'Featured', icon: '⭐' },
  { id: 'starter', name: 'Starter', icon: '🚀' },
  { id: 'ai', name: 'AI', icon: '🤖' },
  { id: 'application', name: 'Application', icon: '📦' },
  { id: 'base', name: 'Base', icon: '🏗️' },
  { id: 'fips', name: 'FIPS', icon: '🔒' },
];

export const dockerImages = [
  {
    id: 1,
    name: 'node',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    lastChanged: '11 hours ago',
    latestTag: '24.10.0',
    isFree: true,
    category: 'featured',
    description: 'Node.js JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    downloads: 1250000,
    size: '45MB',
    fips: false,
    badge: 'official'
  },
  {
    id: 2,
    name: 'nginx',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    lastChanged: '21 hours ago',
    latestTag: 'mainline',
    isFree: true,
    category: 'featured',
    description: 'High-performance HTTP server and reverse proxy',
    downloads: 2340000,
    size: '25MB',
    fips: false,
    badge: 'community'
  },
  {
    id: 3,
    name: 'postgres',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    lastChanged: '18 hours ago',
    latestTag: '18.0',
    isFree: true,
    category: 'featured',
    description: 'Powerful, open source object-relational database system',
    downloads: 1890000,
    size: '120MB',
    fips: false,
    badge: 'verified'
  },
  {
    id: 4,
    name: 'python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    lastChanged: '15 hours ago',
    latestTag: '3.13.1',
    isFree: true,
    category: 'starter',
    description: 'Python is a programming language that lets you work quickly',
    downloads: 3450000,
    size: '50MB',
    fips: false,
    badge: 'official'
  },
  {
    id: 5,
    name: 'redis',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    lastChanged: '12 hours ago',
    latestTag: '7.4.2',
    isFree: false,
    category: 'featured',
    description: 'In-memory data structure store, used as database, cache',
    downloads: 1670000,
    size: '35MB',
    fips: true,
    badge: 'verified'
  },
  {
    id: 6,
    name: 'go',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    lastChanged: '18 hours ago',
    latestTag: '1.25.2',
    isFree: true,
    category: 'starter',
    description: 'Go is an open source programming language',
    downloads: 890000,
    size: '340MB',
    fips: false,
    badge: 'community'
  },
  {
    id: 7,
    name: 'php',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    lastChanged: '23 hours ago',
    latestTag: '8.4.13',
    isFree: true,
    category: 'application',
    description: 'Popular general-purpose scripting language',
    downloads: 1230000,
    size: '78MB',
    fips: false,
    badge: 'official'
  },
  {
    id: 8,
    name: 'mysql',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    lastChanged: '16 hours ago',
    latestTag: '9.1.0',
    isFree: false,
    category: 'base',
    description: 'MySQL is an open-source relational database',
    downloads: 2120000,
    size: '145MB',
    fips: false,
    badge: 'community'
  },
  {
    id: 9,
    name: 'mongodb',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    lastChanged: '14 hours ago',
    latestTag: '8.0.4',
    isFree: false,
    category: 'base',
    description: 'MongoDB is a source-available cross-platform document-oriented database',
    downloads: 1780000,
    size: '420MB',
    fips: true,
    badge: 'verified'
  },
  {
    id: 10,
    name: 'tensorflow',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    lastChanged: '20 hours ago',
    latestTag: '2.18.0',
    isFree: false,
    category: 'ai',
    description: 'An end-to-end open source platform for machine learning',
    downloads: 560000,
    size: '1.2GB',
    fips: false,
    badge: 'community'
  },
  {
    id: 11,
    name: 'pytorch',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    lastChanged: '22 hours ago',
    latestTag: '2.6.0',
    isFree: false,
    category: 'ai',
    description: 'Tensors and Dynamic neural networks in Python',
    downloads: 480000,
    size: '980MB',
    fips: false,
    badge: 'verified'
  },
  {
    id: 12,
    name: 'jenkins',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
    lastChanged: '20 hours ago',
    latestTag: '2.530',
    isFree: false,
    category: 'application',
    description: 'Jenkins automation server',
    downloads: 670000,
    size: '280MB',
    fips: false,
    badge: 'official'
  },
  {
    id: 13,
    name: 'elasticsearch',
    logo: 'https://www.svgrepo.com/show/373574/elasticsearch.svg',
    lastChanged: '17 hours ago',
    latestTag: '8.17.2',
    isFree: false,
    category: 'base',
    description: 'Distributed, RESTful search and analytics engine',
    downloads: 890000,
    size: '520MB',
    fips: true,
    badge: 'verified'
  },
  {
    id: 14,
    name: 'kafka',
    logo: 'https://www.svgrepo.com/show/353952/kafka-icon.svg',
    lastChanged: '13 hours ago',
    latestTag: '3.9.0',
    isFree: false,
    category: 'application',
    description: 'Distributed event streaming platform',
    downloads: 720000,
    size: '380MB',
    fips: false,
    badge: 'community'
  },
  {
    id: 15,
    name: 'docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    lastChanged: '9 hours ago',
    latestTag: '28.0.0',
    isFree: true,
    category: 'base',
    description: 'Docker container runtime',
    downloads: 5670000,
    size: '95MB',
    fips: false,
    badge: 'official'
  },
];

export const generateVulnerabilities = (imageId) => {
  const vulnerabilities = [
    { severity: 'critical', cve: 'CVE-2024-1234', package: 'openssl', version: '1.1.1', fixed: '1.1.1w', score: 9.8 },
    { severity: 'high', cve: 'CVE-2024-5678', package: 'curl', version: '7.68.0', fixed: '7.88.1', score: 7.5 },
    { severity: 'medium', cve: 'CVE-2024-9012', package: 'libxml2', version: '2.9.10', fixed: '2.9.14', score: 5.3 },
    { severity: 'low', cve: 'CVE-2024-3456', package: 'zlib', version: '1.2.11', fixed: '1.2.13', score: 3.7 },
    { severity: 'high', cve: 'CVE-2024-7890', package: 'nginx', version: '1.18.0', fixed: '1.24.0', score: 7.2 },
    { severity: 'medium', cve: 'CVE-2024-2468', package: 'pcre', version: '8.44', fixed: '8.45', score: 4.9 },
  ];
  
  return vulnerabilities.slice(0, Math.floor(Math.random() * 4) + 2);
};

export const generateSBOM = (imageName) => {
  const commonPackages = [
    { name: 'openssl', version: '1.1.1w', license: 'Apache-2.0', type: 'library' },
    { name: 'curl', version: '7.88.1', license: 'MIT', type: 'library' },
    { name: 'zlib', version: '1.2.13', license: 'Zlib', type: 'library' },
    { name: 'libxml2', version: '2.9.14', license: 'MIT', type: 'library' },
    { name: 'pcre', version: '8.45', license: 'BSD', type: 'library' },
    { name: 'glibc', version: '2.35', license: 'LGPL-2.1', type: 'library' },
    { name: 'bash', version: '5.1.16', license: 'GPL-3.0', type: 'application' },
    { name: 'coreutils', version: '9.1', license: 'GPL-3.0', type: 'application' },
  ];

  const specificPackages = {
    node: [
      { name: 'nodejs', version: '24.10.0', license: 'MIT', type: 'runtime' },
      { name: 'npm', version: '10.9.2', license: 'Artistic-2.0', type: 'package-manager' },
      { name: 'v8', version: '13.4.388', license: 'BSD-3-Clause', type: 'library' },
    ],
    nginx: [
      { name: 'nginx', version: '1.27.3', license: 'BSD-2-Clause', type: 'application' },
      { name: 'ngx_http_ssl_module', version: '1.27.3', license: 'BSD-2-Clause', type: 'module' },
    ],
    postgres: [
      { name: 'postgresql', version: '18.0', license: 'PostgreSQL', type: 'database' },
      { name: 'libpq', version: '18.0', license: 'PostgreSQL', type: 'library' },
    ],
    python: [
      { name: 'python', version: '3.13.1', license: 'PSF', type: 'runtime' },
      { name: 'pip', version: '24.3.1', license: 'MIT', type: 'package-manager' },
    ],
  };

  return [
    ...(specificPackages[imageName] || []),
    ...commonPackages,
  ];
};

export const stats = {
  projects: 1756,
  versions: 105204,
  images: 208548,
  builds: 308074969,
};