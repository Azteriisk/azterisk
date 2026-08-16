export type TechCategory =
  | 'framework'
  | 'database'
  | 'auth'
  | 'ai'
  | 'payments'
  | 'backend'
  | 'infra'
  | 'graphics'
  | 'audio';

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  websiteUrl: string;
  iconName?: string;
  color?: string;
}

export interface SubdomainProject {
  id: string;
  name: string;
  subdomain: string;
  liveUrl: string;
  githubUrl?: string;
  shortDescription: string;
  fullWriteup: string;
  screenshotUrl?: string;
  nodeColor?: string;
  tagline: string;
  status: 'active' | 'beta' | 'migrated';
  technologies: Technology[];
}

export const SUBDOMAIN_PROJECTS: SubdomainProject[] = [
  {
    id: 'unknown-frequencies',
    name: 'Unknown Frequencies',
    subdomain: 'unknown.azterisk.net',
    liveUrl: 'https://unknown.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/UnknownFouriers',
    tagline: 'Real-time Web Audio Fourier Transform & Ridgeline Synth',
    shortDescription:
      'A real-time Web Audio Fourier Transform Ridgeline Visualizer inspired by Joy Division’s Unknown Pleasures pulsar cover (CP 1919).',
    fullWriteup:
      'Unknown Frequencies transforms live audio signals into continuous mathematical waterfall topography. Inspired by Peter Saville’s iconic 1979 album cover transposing signal pulse data from Pulsar CP 1919, the engine implements continuous frequency slicing, 3D terrain perspective projection, real-time Fourier analysis, custom multi-stop spectral gradients, an embedded QWERTY/MIDI synth, and zero-latency YouTube player integration with 100% client-side privacy.',
    screenshotUrl: '/screenshots/unknown-hero.png',
    status: 'active',
    technologies: [
      {
        id: 'nextjs',
        name: 'Next.js 16',
        category: 'framework',
        websiteUrl: 'https://nextjs.org',
        color: '#ffffff',
      },
      {
        id: 'react',
        name: 'React 19',
        category: 'framework',
        websiteUrl: 'https://react.dev',
        color: '#58c4dc',
      },
      {
        id: 'webaudio',
        name: 'Web Audio API',
        category: 'audio',
        websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API',
        color: '#ff5c97',
      },
      {
        id: 'canvas',
        name: 'HTML5 Canvas',
        category: 'graphics',
        websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
        color: '#e0a96d',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'infra',
        websiteUrl: 'https://www.typescriptlang.org',
        color: '#3178c6',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'framework',
        websiteUrl: 'https://tailwindcss.com',
        color: '#38bdf8',
      },
    ],
  },
  {
    id: 'career-report',
    name: 'CareerReport',
    subdomain: 'careerreport.azterisk.net',
    liveUrl: 'https://careerreport.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/CareerReport',
    tagline: 'Next-Gen Professional Network & AI ATS Resume Engine',
    shortDescription:
      'A premium networking platform for modern professionals with ATS-optimized resume generation and recruiter monetization.',
    fullWriteup:
      'CareerReport redefines how technical professionals showcase their achievements and connect with hiring teams. Features live recruiter monetization with tiered Stripe subscription billing, sponsored candidate listings with algorithmic ranking boosts, Supabase PostgreSQL persistence with Row-Level Security, Clerk identity management, Google Gemini AI resume tailoring, and client-side high-fidelity PDF compilation.',
    screenshotUrl: '/screenshots/careerreport.png',
    status: 'active',
    technologies: [
      {
        id: 'nextjs',
        name: 'Next.js 16',
        category: 'framework',
        websiteUrl: 'https://nextjs.org',
        color: '#ffffff',
      },
      {
        id: 'supabase',
        name: 'Supabase',
        category: 'database',
        websiteUrl: 'https://supabase.com',
        color: '#3ecf8e',
      },
      {
        id: 'clerk',
        name: 'Clerk Auth',
        category: 'auth',
        websiteUrl: 'https://clerk.com',
        color: '#6c47ff',
      },
      {
        id: 'stripe',
        name: 'Stripe',
        category: 'payments',
        websiteUrl: 'https://stripe.com',
        color: '#635bff',
      },
      {
        id: 'gemini',
        name: 'Gemini AI',
        category: 'ai',
        websiteUrl: 'https://ai.google.dev',
        color: '#8ab4f8',
      },
      {
        id: 'reactpdf',
        name: 'React PDF',
        category: 'infra',
        websiteUrl: 'https://react-pdf.org',
        color: '#ff6b6b',
      },
      {
        id: 'framer-motion',
        name: 'Framer Motion',
        category: 'framework',
        websiteUrl: 'https://motion.dev',
        color: '#f08',
      },
    ],
  },
  {
    id: 'sales-flow',
    name: 'SalesFlow',
    subdomain: 'salesflow.azterisk.net',
    liveUrl: 'https://salesflow.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/SalesFlow',
    tagline: 'Gamified Offline-First Field Sales & Territory Mapping PWA',
    shortDescription:
      'An offline-first sales mapping and territory prospecting PWA built for field representatives.',
    fullWriteup:
      'SalesFlow is an offline-first field sales intelligence tool designed to eliminate dead travel time and maximize sales rep velocity. Built on client-side IndexedDB persistence and spatial geospatial mapping, reps can log visits, tag prospects, discover nearby establishments, compute optimized daily routes, and monitor quota streaks with zero cellular connectivity required.',
    screenshotUrl: '/screenshots/salesflow.png',
    status: 'active',
    technologies: [
      {
        id: 'react',
        name: 'React 19',
        category: 'framework',
        websiteUrl: 'https://react.dev',
        color: '#58c4dc',
      },
      {
        id: 'vite',
        name: 'Vite',
        category: 'infra',
        websiteUrl: 'https://vitejs.dev',
        color: '#646cff',
      },
      {
        id: 'indexeddb',
        name: 'IndexedDB',
        category: 'database',
        websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
        color: '#f59e0b',
      },
      {
        id: 'gis',
        name: 'Mapbox / GIS',
        category: 'graphics',
        websiteUrl: 'https://mapbox.com',
        color: '#00b4d8',
      },
      {
        id: 'pwa',
        name: 'PWA Offline',
        category: 'infra',
        websiteUrl: 'https://web.dev/explore/progressive-web-apps',
        color: '#a855f7',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'framework',
        websiteUrl: 'https://tailwindcss.com',
        color: '#38bdf8',
      },
    ],
  },
  {
    id: 'patent-flow',
    name: 'PatentFlow',
    subdomain: 'patentflow.azterisk.net',
    liveUrl: 'https://patentflow.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/PatentFlow',
    tagline: 'USPTO Patent Intelligence, TSDR Lens & Trademark Monitor',
    shortDescription:
      'Direct USPTO Patent & TSDR integration with timeline tracking, watchlists, and PDF case brief generator.',
    fullWriteup:
      'PatentFlow delivers real-time intellectual property intelligence directly from official USPTO Open Data Portal (ODP) REST APIs and TSDR endpoints. It empowers inventors and IP attorneys to track prosecution deadlines, inspect multi-class Goods & Services, monitor portfolio watchlists with automatic rate-limited batch sync, perform complex Lucene/Solr boolean searches, and generate client-side print-ready PDF case dossiers.',
    screenshotUrl: '/screenshots/patentflow.png',
    status: 'active',
    technologies: [
      {
        id: 'react',
        name: 'React 19',
        category: 'framework',
        websiteUrl: 'https://react.dev',
        color: '#58c4dc',
      },
      {
        id: 'vite',
        name: 'Vite',
        category: 'infra',
        websiteUrl: 'https://vitejs.dev',
        color: '#646cff',
      },
      {
        id: 'uspto',
        name: 'USPTO ODP API',
        category: 'backend',
        websiteUrl: 'https://developer.uspto.gov',
        color: '#10b981',
      },
      {
        id: 'solr',
        name: 'Lucene / Solr',
        category: 'database',
        websiteUrl: 'https://lucene.apache.org',
        color: '#f97316',
      },
      {
        id: 'reactpdf',
        name: 'React PDF',
        category: 'infra',
        websiteUrl: 'https://react-pdf.org',
        color: '#ff6b6b',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'framework',
        websiteUrl: 'https://tailwindcss.com',
        color: '#38bdf8',
      },
    ],
  },
  {
    id: 'shared-canvas',
    name: 'Shared Canvas',
    subdomain: 'canvas.azterisk.net',
    liveUrl: 'https://canvas.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/spacetimedb-shared-canvas',
    tagline: 'Massive Multiplayer Real-Time Collaborative Graffiti Wall',
    shortDescription:
      'Infinite interactive collaborative canvas powered by high-performance SpacetimeDB Rust WebSocket engine.',
    fullWriteup:
      'Shared Canvas is a real-time multiplayer internet graffiti wall where every pixel and stroke is synchronized over ultra-low-latency binary WebSockets. Powered by SpacetimeDB—a relational database executing directly in memory with server-side Rust reducers—hundreds of simultaneous creators can paint, manipulate layers, and collaborate without traditional database bottlenecks.',
    screenshotUrl: '/screenshots/canvas-preview.png',
    status: 'active',
    technologies: [
      {
        id: 'spacetimedb',
        name: 'SpacetimeDB',
        category: 'backend',
        websiteUrl: 'https://spacetimedb.com',
        color: '#7c3aed',
      },
      {
        id: 'rust',
        name: 'Rust Reducers',
        category: 'backend',
        websiteUrl: 'https://www.rust-lang.org',
        color: '#f97316',
      },
      {
        id: 'tanstack',
        name: 'TanStack Start',
        category: 'framework',
        websiteUrl: 'https://tanstack.com/start',
        color: '#ec4899',
      },
      {
        id: 'react',
        name: 'React 19',
        category: 'framework',
        websiteUrl: 'https://react.dev',
        color: '#58c4dc',
      },
      {
        id: 'canvas',
        name: 'HTML5 Canvas',
        category: 'graphics',
        websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
        color: '#e0a96d',
      },
      {
        id: 'websockets',
        name: 'WebSockets',
        category: 'infra',
        websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
        color: '#06b6d4',
      },
    ],
  },
  {
    id: 'makerspace',
    name: 'Makerspace Hub',
    subdomain: 'makerspace.azterisk.net',
    liveUrl: 'https://makerspace.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/makerspace',
    tagline: 'Digital Fabrication Lab & Rapid Prototyping Workshop System',
    shortDescription:
      'Community workshop platform with 3D printer scheduling, laser cutter queue management, and safety certs.',
    fullWriteup:
      'Makerspace Hub streamlines rapid prototyping workshop operations. It provides an intuitive reservation system for CNC mills, SLA/FDM 3D printers, and fiber laser cutters while enforcing safety certification prerequisites, material stock consumption tracking, and project showcase directories for maker communities.',
    screenshotUrl: '/screenshots/makerspace-preview.png',
    status: 'active',
    technologies: [
      {
        id: 'nextjs',
        name: 'Next.js',
        category: 'framework',
        websiteUrl: 'https://nextjs.org',
        color: '#ffffff',
      },
      {
        id: 'supabase',
        name: 'Supabase',
        category: 'database',
        websiteUrl: 'https://supabase.com',
        color: '#3ecf8e',
      },
      {
        id: 'clerk',
        name: 'Clerk Auth',
        category: 'auth',
        websiteUrl: 'https://clerk.com',
        color: '#6c47ff',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'infra',
        websiteUrl: 'https://www.typescriptlang.org',
        color: '#3178c6',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'framework',
        websiteUrl: 'https://tailwindcss.com',
        color: '#38bdf8',
      },
    ],
  },
];
