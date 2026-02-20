import { TopicContent } from '../topicContent';

export const instagram: TopicContent = {
  title: 'Design Instagram (Photo Sharing)',
  description: 'Instagram focuses on extreme scalability for heavy objects (images/videos). Designing Instagram requires mastering object storage, CDN caching strategies, metadata separation, and global unique ID generation to ensure a seamless photo viewing experience worldwide.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="s3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5b21b6" />
    </linearGradient>
    <linearGradient id="cdnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- User Uploading -->
  <rect x="40" y="80" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="80" y="98" fill="#f8fafc" font-size="10" text-anchor="middle">Alice</text>
  <text x="80" y="110" fill="#94a3b8" font-size="8" text-anchor="middle">(Uploads Photo)</text>

  <!-- Upload API (Writes) -->
  <rect x="200" y="60" width="100" height="80" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="250" y="90" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Write API</text>
  <text x="250" y="105" fill="#bfdbfe" font-size="9" text-anchor="middle">(Stateless Servers)</text>
  <rect x="210" y="115" width="80" height="15" fill="#1e40af" rx="2"/>
  <text x="250" y="125" fill="#bfdbfe" font-size="8" text-anchor="middle">Gen: "ID_492"</text>

  <!-- Object Storage (S3) -->
  <rect x="420" y="40" width="120" height="80" fill="url(#s3Grad)" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="480" y="70" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Object Storage</text>
  <text x="480" y="85" fill="#fde68a" font-size="9" text-anchor="middle">(Amazon S3)</text>
  <text x="480" y="100" fill="#fef3c7" font-size="8" font-family="monospace" text-anchor="middle">File: ID_492.jpg</text>

  <!-- Metadata DB (PostgreSQL) -->
  <rect x="420" y="160" width="120" height="80" fill="url(#dbGrad)" rx="8" stroke="#a855f7" stroke-width="2"/>
  <text x="480" y="190" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Metadata DB</text>
  <text x="480" y="205" fill="#e9d5ff" font-size="9" text-anchor="middle">(Postgres Shards)</text>
  <rect x="430" y="215" width="100" height="15" fill="#4c1d95" rx="2"/>
  <text x="480" y="225" fill="#ddd6fe" font-size="8" font-family="monospace" text-anchor="middle">row: 492 | User: Alice | url: /ID_492.jpg</text>


  <!-- Flow Lines (Write) -->
  <path d="M 120 100 L 200 100" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="160" y="90" fill="#cbd5e1" font-size="9" text-anchor="middle">5MB Image</text>

  <path d="M 300 80 L 420 80" stroke="#fbbf24" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="360" y="70" fill="#fbbf24" font-size="9" text-anchor="middle">Save File</text>

  <path d="M 300 120 L 420 180" stroke="#a855f7" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="360" y="145" fill="#a855f7" font-size="9" transform="rotate(30, 360, 145)">Save DB Row</text>


  <!-- The CDN Edge Layer -->
  <rect x="200" y="320" width="340" height="80" fill="url(#cdnGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="370" y="345" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Global Content Delivery Network (CDN)</text>
  <text x="370" y="360" fill="#a7f3d0" font-size="10" text-anchor="middle">Caches: Paris, Tokyo, New York (Points of Presence)</text>
  <text x="370" y="380" fill="#6ee7b7" font-size="9" font-family="monospace" text-anchor="middle">Hit: Instantly Returns Image -> Miss: Fetch from Origin (S3)</text>


  <!-- User Viewing -->
  <rect x="40" y="340" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="80" y="358" fill="#f8fafc" font-size="10" text-anchor="middle">Bob in Tokyo</text>
  <text x="80" y="370" fill="#94a3b8" font-size="8" text-anchor="middle">(Views Feed)</text>

  <rect x="620" y="320" width="100" height="80" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="670" y="350" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Read API</text>
  <text x="670" y="365" fill="#bfdbfe" font-size="9" text-anchor="middle">(Timeline Gen)</text>
  <rect x="630" y="375" width="80" height="15" fill="#1e40af" rx="2"/>
  <text x="670" y="385" fill="#bfdbfe" font-size="8" text-anchor="middle">Fetches DB Rows</text>


  <!-- Flow Lines (Read) -->
  <path d="M 80 340 L 80 200 L 620 200 L 620 320" stroke="#60a5fa" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow)"/>
  <text x="360" y="190" fill="#93c5fd" font-size="10" font-weight="bold" text-anchor="middle">1. Get Timeline Feed (Returns JSON with Photo URLs)</text>

  <path d="M 670 320 L 670 200 L 540 200" stroke="#a855f7" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- CDN Request -->
  <path d="M 120 360 L 200 360" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="160" y="350" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">2. Get Image</text>

  <path d="M 480 320 L 480 120" stroke="#fbbf24" stroke-width="2" fill="none" stroke-dasharray="2" marker-end="url(#arrow)"/>
  <text x="490" y="280" fill="#fcd34d" font-size="9" font-style="italic" transform="rotate(-90, 490, 280)">Origin Fetch (Miss)</text>

  
  <!-- Critical Distinctions -->
  <rect x="600" y="40" width="180" height="120" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="690" y="60" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Storage Patterns</text>
  
  <rect x="610" y="70" width="160" height="40" fill="#0f172a" rx="4"/>
  <text x="620" y="85" fill="#fca5a5" font-size="10" font-weight="bold">BLOB Storage (Images)</text>
  <text x="620" y="100" fill="#fca5a5" font-size="9">Cheap, infinite scale, slow reads</text>

  <rect x="610" y="115" width="160" height="40" fill="#0f172a" rx="4"/>
  <text x="620" y="130" fill="#a7f3d0" font-size="10" font-weight="bold">RDBMS (Metadata)</text>
  <text x="620" y="145" fill="#a7f3d0" font-size="9">Indexed, heavily cached, ultra fast</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Decoupling Metadata from Blobs',
      description: 'You never store a 4MB picture directly in a SQL database alongside user data (row logic). You store the massive bytes in an Object Store (Amazon S3) which is "dumb" but infinitely scalable. The SQL database (Metadata DB) only stores a tiny 100-byte row explaining *who* uploaded it, the *caption*, and the `Image_S3_URL` string.'
    },
    {
      title: 'CDN Edge Delivery',
      description: 'If S3 is hosted in Virginia, a Japanese user downloading a 4MB photo receives terrible latency. A Content Delivery Network (CDN like Cloudflare or Akamai) fixes this. The user requests the image from a Tokyo CDN node. If it isn\'t there (Cache Miss), the Node fetches it from Virginia S3, saves a copy locally, and serves the user. All future users in Asia then load it instantly from the Tokyo cache.'
    },
    {
      title: 'Reliable Unique ID Generation',
      description: 'Instagram cannot rely on single-node Auto-Increment Databases (like `id++`). They must shard across thousands of databases. They use customized 64-bit Timestamp-based IDs composed of 41 bits (Custom Epoch Time), 13 bits (Database Shard ID), and 10 bits (Auto-increment ID). This ensures every photo globally has a unique chronological integer.'
    },
    {
      title: 'Aggressive Image Optimization',
      description: 'No one downloads original 12-Megapixel iPhone photos. Background workers instantly resize uploaded images into 3 standardized resolutions (e.g., Small, Medium, Large) and convert them to modern formats (WebP). The DB stores 3 localized URLs.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'Relational DB (Posts)', 'Object Storage (Media)'],
    rows: [
      ['Data Type', 'Metadata & Relations', 'Binary Images/Videos'],
      ['Scalability', 'Sharded Clusters', 'Global Edge CDN'],
      ['Primary Need', 'Strict consistency', 'High throughput & global reach'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=QmX2NPkJTKg',
  pitfalls: [
    'Putting Images through API bounds: If an App Server intercepts and reads a 5MB image from S3, and then passes it out to the client, the Application Server will max out its Network Interface Card (NIC bandwidth) and crash. App Servers should only deal with JSON and JSON URLs.',
    'Hot DB Shards: If Leonardo DiCaprio posts an image, millions of likes flood to `PhotoID_88`. That single Database Shard must process 10,000 updates a second. Write queries must hit Redis or Memcached arrays first to aggregate counting.',
    'Unpredictable Cache Eviction: S3 storage scales forever. CDN edge nodes do not. If you do not configure LRU (Least Recently Used) cache eviction smartly depending on geo-location photo popularity, you waste exabytes of expensive Edge transfer.'
  ]
};
