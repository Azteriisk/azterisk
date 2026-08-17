export type TechCategory =
  | 'framework'
  | 'database'
  | 'auth'
  | 'ai'
  | 'payments'
  | 'backend'
  | 'infra'
  | 'graphics'
  | 'audio'
  | 'language'
  | 'styling'
  | 'tools';

export interface Technology {
  id: string;
  name: string;
  category: TechCategory | string;
  websiteUrl: string;
  iconName?: string;
  color?: string;
}

export type ProjectType =
  | 'subdomain'
  | 'systems'
  | 'desktop'
  | 'cli'
  | 'engine'
  | 'game'
  | 'web';

export interface SubdomainProject {
  id: string;
  name: string;
  subdomain?: string;
  liveUrl?: string;
  githubUrl?: string;
  shortDescription: string;
  fullWriteup: string;
  screenshotUrl?: string;
  nodeColor?: string;
  tagline: string;
  status: 'active' | 'beta' | 'migrated' | 'offline' | 'desktop';
  statusLabel?: string;
  projectType: ProjectType;
  isSubdomain: boolean;
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
    statusLabel: 'Live Subdomain',
    projectType: 'subdomain',
    isSubdomain: true,
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
        color: '#61dafb',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'styling',
        websiteUrl: 'https://tailwindcss.com',
        color: '#38bdf8',
      },
      {
        id: 'webaudio',
        name: 'Web Audio API',
        category: 'audio',
        websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API',
        color: '#a855f7',
      },
      {
        id: 'canvas',
        name: 'HTML5 Canvas',
        category: 'graphics',
        websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
        color: '#eab308',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'language',
        websiteUrl: 'https://www.typescriptlang.org',
        color: '#3178c6',
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
    statusLabel: 'Live Subdomain',
    projectType: 'subdomain',
    isSubdomain: true,
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
        category: 'language',
        websiteUrl: 'https://www.typescriptlang.org',
        color: '#3178c6',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'styling',
        websiteUrl: 'https://tailwindcss.com',
        color: '#06b6d4',
      },
    ],
  },
  {
    id: 'patent-flow',
    name: 'PatentFlow',
    subdomain: 'patentflow.azterisk.net',
    liveUrl: 'https://patentflow.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/PatentFlow',
    tagline: 'USPTO Patent Intelligence Graph & Prior Art Discovery Engine',
    shortDescription:
      'Deep exploration graph visualizing patent citations, classification hierarchies, and prior art clustering.',
    fullWriteup:
      'PatentFlow unrolls USPTO and global patent repositories into high-density interactive citation meshes. It uses vector-embedded claim analysis, automated classification tree traversal (CPC/USPC), and live prior art proximity clustering to help inventors, patent attorneys, and researchers identify whitespace and litigation exposure.',
    screenshotUrl: '/screenshots/patentflow-preview.png',
    status: 'active',
    statusLabel: 'Live Subdomain',
    projectType: 'subdomain',
    isSubdomain: true,
    technologies: [
      {
        id: 'react',
        name: 'React',
        category: 'framework',
        websiteUrl: 'https://react.dev',
        color: '#61dafb',
      },
      {
        id: 'vite',
        name: 'Vite',
        category: 'framework',
        websiteUrl: 'https://vitejs.dev',
        color: '#646cff',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'styling',
        websiteUrl: 'https://tailwindcss.com',
        color: '#38bdf8',
      },
      {
        id: 'uspto',
        name: 'USPTO Open Data',
        category: 'database',
        websiteUrl: 'https://developer.uspto.gov',
        color: '#10b981',
      },
      {
        id: 'solr',
        name: 'Apache Solr Index',
        category: 'backend',
        websiteUrl: 'https://solr.apache.org',
        color: '#f97316',
      },
      {
        id: 'framer-motion',
        name: 'Framer Motion',
        category: 'graphics',
        websiteUrl: 'https://www.framer.com/motion',
        color: '#ef4444',
      },
    ],
  },
  {
    id: 'career-report',
    name: 'CareerReport',
    subdomain: 'careerreport.azterisk.net',
    liveUrl: 'https://careerreport.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/CareerReport',
    tagline: 'AI Executive Career Brief & Automated ATS Resume Engine',
    shortDescription:
      'Automated resume intelligence generator parsing work history into structured ATS-optimized dossiers.',
    fullWriteup:
      'CareerReport converts raw career history into executive-level dossier briefings and target-aligned resume variations. Powered by Gemini Flash models and Supabase Row-Level Security, it runs real-time ATS match scoring, keyword density optimization, and crisp deterministic PDF typography compilation.',
    screenshotUrl: '/screenshots/careerreport-preview.png',
    status: 'active',
    statusLabel: 'Live Subdomain',
    projectType: 'subdomain',
    isSubdomain: true,
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
        name: 'Supabase DB',
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
        id: 'gemini',
        name: 'Google Gemini AI',
        category: 'ai',
        websiteUrl: 'https://ai.google.dev',
        color: '#38bdf8',
      },
      {
        id: 'stripe',
        name: 'Stripe Billing',
        category: 'payments',
        websiteUrl: 'https://stripe.com',
        color: '#635bff',
      },
      {
        id: 'reactpdf',
        name: 'React-PDF Engine',
        category: 'tools',
        websiteUrl: 'https://react-pdf.org',
        color: '#f59e0b',
      },
    ],
  },
  {
    id: 'sales-flow',
    name: 'SalesFlow',
    subdomain: 'salesflow.azterisk.net',
    liveUrl: 'https://salesflow.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/SalesFlow',
    tagline: 'Spatial Territory Prospecting & Offline Field CRM PWA',
    shortDescription:
      'Field sales territory manager with offline route caching, geo-fenced lead drop pins, and fast contact sync.',
    fullWriteup:
      'SalesFlow is an offline-first Progressive Web App built for field reps. It integrates Mapbox geospatial layers, device compass telemetry, background IndexedDB conflict resolution, and one-tap voice-to-text logging for rapid canvassing in zero-connectivity environments.',
    screenshotUrl: '/screenshots/salesflow-preview.png',
    status: 'active',
    statusLabel: 'Live Subdomain',
    projectType: 'subdomain',
    isSubdomain: true,
    technologies: [
      {
        id: 'react',
        name: 'React PWA',
        category: 'framework',
        websiteUrl: 'https://react.dev',
        color: '#61dafb',
      },
      {
        id: 'indexeddb',
        name: 'IndexedDB Offline',
        category: 'database',
        websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
        color: '#3b82f6',
      },
      {
        id: 'gis',
        name: 'Mapbox Geospatial',
        category: 'graphics',
        websiteUrl: 'https://mapbox.com',
        color: '#10b981',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'styling',
        websiteUrl: 'https://tailwindcss.com',
        color: '#38bdf8',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'language',
        websiteUrl: 'https://www.typescriptlang.org',
        color: '#3178c6',
      },
    ],
  },
  {
    id: 'shared-canvas',
    name: 'Shared Canvas',
    subdomain: 'canvas.azterisk.net',
    liveUrl: 'https://canvas.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/spacetimedb-shared-canvas',
    tagline: 'Multiplayer Real-time Collaborative Pixel Canvas',
    shortDescription:
      'Persistent internet graffiti wall and synchronized multiplayer drawing canvas powered by SpacetimeDB WebSockets.',
    fullWriteup:
      'Shared Canvas is an infinite real-time canvas where global users simultaneously draw, layer, and paint. Backed by SpacetimeDB in-memory relational tables and Rust server-side reducers, every brush stroke is broadcasted over persistent binary WebSockets with sub-10ms state synchronization.',
    screenshotUrl: '/screenshots/shared-canvas-preview.png',
    status: 'active',
    statusLabel: 'Live Subdomain',
    projectType: 'subdomain',
    isSubdomain: true,
    technologies: [
      {
        id: 'tanstack',
        name: 'TanStack Start',
        category: 'framework',
        websiteUrl: 'https://tanstack.com/start',
        color: '#f43f5e',
      },
      {
        id: 'spacetimedb',
        name: 'SpacetimeDB',
        category: 'database',
        websiteUrl: 'https://spacetimedb.com',
        color: '#ec4899',
      },
      {
        id: 'rust',
        name: 'Rust Reducers',
        category: 'backend',
        websiteUrl: 'https://www.rust-lang.org',
        color: '#ea580c',
      },
      {
        id: 'websockets',
        name: 'Binary WebSockets',
        category: 'infra',
        websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
        color: '#8b5cf6',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'language',
        websiteUrl: 'https://www.typescriptlang.org',
        color: '#3178c6',
      },
    ],
  },
  {
    id: 'terminal-emulator',
    name: 'Terminal Portfolio',
    subdomain: 'terminal.azterisk.net',
    liveUrl: 'https://terminal.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/terminal-emulator',
    tagline: 'Interactive Next.js Retro CLI with Virtual Filesystem',
    shortDescription:
      'Client-side terminal portfolio emulator featuring a simulated UNIX filesystem and theme switching.',
    fullWriteup:
      'An interactive retro terminal emulator built with Next.js and TypeScript. Includes a simulated virtual filesystem (`cat`, `ls`, `grep`, `cd`), custom terminal color themes, command history, and instant client-side execution.',
    screenshotUrl: '/screenshots/terminal-preview.png',
    status: 'active',
    statusLabel: 'Live Subdomain',
    projectType: 'subdomain',
    isSubdomain: true,
    technologies: [
      { id: 'nextjs', name: 'Next.js 16', category: 'framework', websiteUrl: 'https://nextjs.org', color: '#ffffff' },
      { id: 'typescript', name: 'TypeScript', category: 'language', websiteUrl: 'https://www.typescriptlang.org', color: '#3178c6' },
      { id: 'tailwind', name: 'Tailwind CSS', category: 'styling', websiteUrl: 'https://tailwindcss.com', color: '#38bdf8' },
      { id: 'indexeddb', name: 'SQLite DB', category: 'database', websiteUrl: 'https://sqlite.org', color: '#f59e0b' },
      { id: 'tools', name: 'UNIX CLI Emulation', category: 'tools', websiteUrl: 'https://terminal.azterisk.net', color: '#10b981' },
    ],
  },
  {
    id: 'quickswitch-ui',
    name: 'Quickswitch UI',
    subdomain: 'quickswitch.azterisk.net',
    liveUrl: 'https://quickswitch.azterisk.net',
    githubUrl: 'https://github.com/Azteriisk/quickswitch-ui',
    tagline: 'Live Next.js UI Template Switching Engine & WebGL Particles',
    shortDescription:
      'Live template switcher demonstrating seamless layout transformation with WebGL particle systems.',
    fullWriteup:
      'Quickswitch UI demonstrates real-time DOM restructuring and palette transitions across completely distinct UX design languages without page reloads, accompanied by an interactive GPU particle canvas.',
    screenshotUrl: '/screenshots/quickswitch-preview.png',
    status: 'active',
    statusLabel: 'Live Subdomain',
    projectType: 'subdomain',
    isSubdomain: true,
    technologies: [
      { id: 'nextjs', name: 'Next.js 15', category: 'framework', websiteUrl: 'https://nextjs.org', color: '#ffffff' },
      { id: 'typescript', name: 'TypeScript', category: 'language', websiteUrl: 'https://www.typescriptlang.org', color: '#3178c6' },
      { id: 'webgl', name: 'WebGL Particles', category: 'graphics', websiteUrl: 'https://get.webgl.org', color: '#eab308' },
      { id: 'canvas', name: 'Three.js Engine', category: 'graphics', websiteUrl: 'https://threejs.org', color: '#f43f5e' },
      { id: 'styling', name: 'Dynamic Themes', category: 'styling', websiteUrl: 'https://quickswitch.azterisk.net', color: '#a855f7' },
    ],
  },
];

export const STANDALONE_PROJECTS: SubdomainProject[] = [
  {
    id: 'world-sim',
    name: 'World_Sim',
    githubUrl: 'https://github.com/Azteriisk/World_Sim',
    tagline: 'Multi-layer Earth System & Geological Ecosystem Simulator',
    shortDescription:
      'Multi-layer Earth simulator modeling core-to-surface dynamics for global crop and ecosystem predictions.',
    fullWriteup:
      'World_Sim is a high-performance geological and planetary ecosystem simulation engine built in Rust. It models multi-layer thermodynamics from planetary mantle convection to atmospheric moisture transport, providing a deep computational foundation for global agricultural yield predictions and biome shifts.',
    status: 'offline',
    statusLabel: 'Rust / Simulation',
    projectType: 'systems',
    isSubdomain: false,
    technologies: [
      { id: 'rust', name: 'Rust', category: 'language', websiteUrl: 'https://www.rust-lang.org', color: '#ea580c' },
      { id: 'gis', name: 'Geological GIS', category: 'graphics', websiteUrl: 'https://en.wikipedia.org/wiki/Geographic_information_system', color: '#10b981' },
      { id: 'sim', name: 'Fluid & Climate Dynamics', category: 'backend', websiteUrl: 'https://www.rust-lang.org', color: '#38bdf8' },
    ],
  },
  {
    id: 'spectral-subtractor',
    name: 'SpectralSubtractor',
    githubUrl: 'https://github.com/Azteriisk/SpectralSubtractor',
    tagline: 'Real-Time Spectral Subtraction VST3 Plugin & DSP Audio Analysis',
    shortDescription:
      'Real-time DSP audio plugin built with JUCE and C++ for intelligent background noise suppression.',
    fullWriteup:
      'SpectralSubtractor is a low-latency VST3 audio processing plugin built with JUCE and modern C++. It implements real-time spectral magnitude subtraction, FFT windowing, phase reconstruction, and dynamic noise floor profiling for professional digital audio workstations.',
    screenshotUrl: '/screenshots/spectralsubtractor-preview.png',
    status: 'desktop',
    statusLabel: 'C++ / VST3 Plugin',
    projectType: 'desktop',
    isSubdomain: false,
    technologies: [
      { id: 'cpp', name: 'C++ 20', category: 'language', websiteUrl: 'https://isocpp.org', color: '#00599c' },
      { id: 'juce', name: 'JUCE Framework', category: 'framework', websiteUrl: 'https://juce.com', color: '#00aa55' },
      { id: 'webaudio', name: 'DSP / FFT Audio', category: 'audio', websiteUrl: 'https://juce.com', color: '#a855f7' },
    ],
  },
  {
    id: 'pseudo-ide',
    name: 'PseudoIDE',
    githubUrl: 'https://github.com/Azteriisk/PseudoIDE',
    tagline: 'Offline-First Privacy AI Pseudocode Translation IDE',
    shortDescription:
      'Turning high-level logic and conversational pseudocode into fully functional codebases locally.',
    fullWriteup:
      'PseudoIDE is an offline-first IDE engineered to convert human mental models and pseudocode into clean, typed production software. Built with local AI orchestration in Rust and TypeScript, it ensures zero telemetry, offline execution, and instantaneous logic refactoring.',
    status: 'offline',
    statusLabel: 'Offline AI IDE',
    projectType: 'systems',
    isSubdomain: false,
    technologies: [
      { id: 'rust', name: 'Rust Core', category: 'backend', websiteUrl: 'https://www.rust-lang.org', color: '#ea580c' },
      { id: 'typescript', name: 'TypeScript', category: 'language', websiteUrl: 'https://www.typescriptlang.org', color: '#3178c6' },
      { id: 'gemini', name: 'Local AI LLM', category: 'ai', websiteUrl: 'https://ai.google.dev', color: '#38bdf8' },
    ],
  },
  {
    id: 'gamechat',
    name: 'GameChat',
    githubUrl: 'https://github.com/Azteriisk/gamechat',
    tagline: 'Native Low-Bloat Discord & Matrix Alternative Desktop Client',
    shortDescription:
      'Ultra-lean native chat client built with Rust and Slint UI supporting self-hosted instances and Matrix protocol.',
    fullWriteup:
      'GameChat is a lightweight, zero-bloat gaming communications client designed as an efficient alternative to heavy Electron apps. Written in pure Rust with Slint UI, it consumes less than 40MB of RAM while providing end-to-end encrypted messaging, voice rooms, and Matrix federation.',
    status: 'desktop',
    statusLabel: 'Rust / Desktop Client',
    projectType: 'desktop',
    isSubdomain: false,
    technologies: [
      { id: 'rust', name: 'Rust', category: 'language', websiteUrl: 'https://www.rust-lang.org', color: '#ea580c' },
      { id: 'slint', name: 'Slint UI', category: 'framework', websiteUrl: 'https://slint.dev', color: '#4a90e2' },
      { id: 'websockets', name: 'Matrix / E2EE', category: 'infra', websiteUrl: 'https://matrix.org', color: '#00bfa5' },
    ],
  },
  {
    id: 'crm-term',
    name: 'CRM-Term',
    githubUrl: 'https://github.com/Azteriisk/CRM-Term',
    tagline: 'Lightning-Fast Cross-Platform Terminal-Based CRM',
    shortDescription:
      'Terminal user interface CRM for developers and hackers with vim bindings and instant search.',
    fullWriteup:
      'CRM-Term brings customer relationship management into the command line. Built with Go and modern TUI frameworks, it offers blazing fast keyboard-driven lead workflows, SQLite local persistence, fuzzy searching, and zero cloud dependency.',
    status: 'offline',
    statusLabel: 'Go / Terminal TUI',
    projectType: 'cli',
    isSubdomain: false,
    technologies: [
      { id: 'go', name: 'Go (Golang)', category: 'language', websiteUrl: 'https://go.dev', color: '#00add8' },
      { id: 'indexeddb', name: 'Local SQLite', category: 'database', websiteUrl: 'https://sqlite.org', color: '#003b57' },
      { id: 'tools', name: 'Bubble Tea TUI', category: 'tools', websiteUrl: 'https://github.com/charmbracelet/bubbletea', color: '#f43f5e' },
    ],
  },
  {
    id: 'netflix-visualizer',
    name: 'Netflix Particle Visualizer',
    githubUrl: 'https://github.com/Azteriisk/Netflix-Visualizer',
    tagline: 'Cinematic Canvas Particle Clustering of Global Streaming Trends',
    shortDescription:
      'Interactive particle simulation mapping audience density and popularity across global top 10 titles.',
    fullWriteup:
      'A canvas visualization where thousands of animated autonomous particles cluster dynamically around Netflix top 10 titles based on viewership volume, release velocity, and regional popularity.',
    status: 'active',
    statusLabel: 'Canvas / Data Vis',
    projectType: 'web',
    isSubdomain: false,
    technologies: [
      { id: 'canvas', name: 'HTML5 Canvas', category: 'graphics', websiteUrl: 'https://developer.mozilla.org', color: '#e50914' },
      { id: 'javascript', name: 'JavaScript ES6', category: 'language', websiteUrl: 'https://developer.mozilla.org', color: '#f7df1e' },
    ],
  },
  {
    id: 'free-bot',
    name: 'Free-Bot',
    githubUrl: 'https://github.com/Azteriisk/free-bot',
    tagline: 'Epic Games & Steam Promotion Tracker Bot',
    shortDescription:
      'Automated Discord bot scraping and alerting channels about limited-time free PC game deals.',
    fullWriteup:
      'Free-Bot continuously monitors digital distribution stores (Epic Games Store, Steam) for temporary 100% price cuts, automatically sending rich embed notifications with claim deadlines while filtering out perpetually free-to-play titles.',
    status: 'active',
    statusLabel: 'Python / Discord Bot',
    projectType: 'cli',
    isSubdomain: false,
    technologies: [
      { id: 'python', name: 'Python 3', category: 'language', websiteUrl: 'https://www.python.org', color: '#3776ab' },
      { id: 'docker', name: 'Docker Container', category: 'infra', websiteUrl: 'https://www.docker.com', color: '#2496ed' },
    ],
  },
  {
    id: 'mesh-net',
    name: 'MeshNet',
    githubUrl: 'https://github.com/Azteriisk/MeshNet',
    tagline: 'GPU-Accelerated 3D In-Browser Mesh Engine',
    shortDescription:
      'High-performance browser 3D graphics rendering engine utilizing WebGL shaders at scale.',
    fullWriteup:
      'MeshNet explores custom WebGL vertex and fragment pipeline shaders, providing a lightweight, low-overhead 3D spatial rendering pipeline that runs performantly on mobile and desktop browsers.',
    status: 'active',
    statusLabel: 'WebGL 3D Engine',
    projectType: 'engine',
    isSubdomain: false,
    technologies: [
      { id: 'webgl', name: 'WebGL & GLSL', category: 'graphics', websiteUrl: 'https://get.webgl.org', color: '#990000' },
      { id: 'javascript', name: 'JavaScript', category: 'language', websiteUrl: 'https://developer.mozilla.org', color: '#f7df1e' },
    ],
  },
  {
    id: 'vulkan-tests',
    name: 'Vulkan Pipeline',
    githubUrl: 'https://github.com/Azteriisk/Vulkan_Tests',
    tagline: 'Cross-Platform Low-Level Vulkan Graphics Engine',
    shortDescription:
      'Native C++ graphics engine with explicit memory allocation and command queue management.',
    fullWriteup:
      'A cross-platform exploratory graphics application utilizing the Vulkan API and GLFW, exploring compute pipelines, validation layers, render passes, and explicit memory synchronization on modern GPUs.',
    status: 'desktop',
    statusLabel: 'C++ / Vulkan GPU',
    projectType: 'engine',
    isSubdomain: false,
    technologies: [
      { id: 'cpp', name: 'C++ 20', category: 'language', websiteUrl: 'https://isocpp.org', color: '#00599c' },
      { id: 'vulkan', name: 'Vulkan API', category: 'graphics', websiteUrl: 'https://www.vulkan.org', color: '#a30000' },
    ],
  },
  {
    id: 'sdl-odin',
    name: 'SDLOdin',
    githubUrl: 'https://github.com/Azteriisk/SDLOdin',
    tagline: '2D Game Engine & Arcade Framework in Odin',
    shortDescription:
      'Exploring memory management, data-oriented design, and SDL2 graphics with the Odin programming language.',
    fullWriteup:
      'SDLOdin implements custom 2D sprite rendering, input handling, physics integration, and fixed timestep game loops using Odin and SDL2.',
    status: 'desktop',
    statusLabel: 'Odin / SDL2 Game',
    projectType: 'game',
    isSubdomain: false,
    technologies: [
      { id: 'odin', name: 'Odin Language', category: 'language', websiteUrl: 'https://odin-lang.org', color: '#2396ed' },
      { id: 'graphics', name: 'SDL2', category: 'graphics', websiteUrl: 'https://libsdl.org', color: '#10b981' },
    ],
  },
  {
    id: 'one-last-mission',
    name: 'OneLastMission',
    githubUrl: 'https://github.com/Azteriisk/OneLastMission',
    tagline: '3D Tactical Stealth Adventure Game in Unreal Engine 5',
    shortDescription:
      'Stealth combat adventure featuring Lumen dynamic global illumination and Nanite geometry.',
    fullWriteup:
      'A 3D tactical stealth adventure game developed in Unreal Engine 5 leveraging Nanite virtualized geometry, Lumen real-time lighting, and custom C++ gameplay mechanics.',
    status: 'desktop',
    statusLabel: 'Unreal Engine 5',
    projectType: 'game',
    isSubdomain: false,
    technologies: [
      { id: 'unreal', name: 'Unreal Engine 5', category: 'engine', websiteUrl: 'https://www.unrealengine.com', color: '#0e1128' },
      { id: 'cpp', name: 'C++', category: 'language', websiteUrl: 'https://isocpp.org', color: '#00599c' },
    ],
  },
  {
    id: 'stage',
    name: 'Stage',
    githubUrl: 'https://github.com/Azteriisk/stage',
    tagline: 'Live-Coding Performance Environment for Music & Visuals',
    shortDescription:
      'Browser-based live-coding environment linking a Strudel music runtime to a GLSL shader runtime through a reactive binding layer.',
    fullWriteup:
      'Stage unifies sound and light into a single high-performance live-coding viewport. It links the Strudel pattern music runtime to a GLSL fragment shader pipeline through a central reactive binding layer — every beat, note, and envelope can drive shader uniforms in real time, enabling musical-visual performances entirely in the browser.',
    status: 'active',
    statusLabel: 'TypeScript / Live Code',
    projectType: 'web',
    isSubdomain: false,
    technologies: [
      { id: 'typescript', name: 'TypeScript', category: 'language', websiteUrl: 'https://www.typescriptlang.org', color: '#3178c6' },
      { id: 'glsl', name: 'GLSL Shaders', category: 'graphics', websiteUrl: 'https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language', color: '#990000' },
      { id: 'strudel', name: 'Strudel', category: 'audio', websiteUrl: 'https://strudel.cc', color: '#a855f7' },
    ],
  },
  {
    id: 'sslb',
    name: 'SSLB',
    githubUrl: 'https://github.com/Azteriisk/sslb',
    tagline: 'Turing-Complete Shader Transpiler & Interactive 3D Runner',
    shortDescription:
      'A turing-complete shader transpiler with a high-precision interactive 3D scene runner, built in Rust.',
    fullWriteup:
      'SSLB is a Turing-complete shader language transpiler that compiles a high-level shading language to GPU-executable code, paired with an interactive 3D runner for real-time visual debugging and iteration.',
    status: 'offline',
    statusLabel: 'Rust / Shader Compiler',
    projectType: 'systems',
    isSubdomain: false,
    technologies: [
      { id: 'rust', name: 'Rust', category: 'language', websiteUrl: 'https://www.rust-lang.org', color: '#ea580c' },
      { id: 'glsl', name: 'GLSL / WGSL', category: 'graphics', websiteUrl: 'https://www.w3.org/TR/WGSL/', color: '#990000' },
    ],
  },
  {
    id: 'cs-330-portfolio',
    name: 'CS-330 Portfolio',
    githubUrl: 'https://github.com/Azteriisk/CS-330-Portfolio',
    tagline: 'Computer Graphics & 3D Rendering Coursework Portfolio',
    shortDescription:
      'OpenGL coursework portfolio covering 3D object rendering, lighting models, texture mapping, and transformation hierarchies.',
    fullWriteup:
      'A comprehensive portfolio of CS-330 Computer Science coursework projects. Covers core real-time 3D graphics concepts including OpenGL pipeline setup, Phong lighting and material shading, UV texture mapping, camera systems, and scene transformation hierarchies — all built from scratch in C++ with GLFW and GLAD.',
    status: 'offline',
    statusLabel: 'C++ / OpenGL',
    projectType: 'engine',
    isSubdomain: false,
    technologies: [
      { id: 'cpp', name: 'C++ 17', category: 'language', websiteUrl: 'https://isocpp.org', color: '#00599c' },
      { id: 'opengl', name: 'OpenGL', category: 'graphics', websiteUrl: 'https://www.opengl.org', color: '#5586a4' },
      { id: 'glfw', name: 'GLFW', category: 'framework', websiteUrl: 'https://www.glfw.org', color: '#10b981' },
    ],
  },
];

export const ALL_DIRECTORY_PROJECTS: SubdomainProject[] = [
  ...SUBDOMAIN_PROJECTS,
  ...STANDALONE_PROJECTS,
];
