import { TopicContent } from '../topicContent';

export const tinyurl: TopicContent = {
  title: 'Design TinyURL (URL Shortener)',
  description: 'A classic system design interview question. The system generates short, unique aliases for long URLs and handles rapid redirections. It tests your knowledge on hashing algorithms, database sharding, capacity planning, and high-read/low-write caching architectures.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <linearGradient id="cacheGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrowT" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Clients -->
  <rect x="30" y="100" width="100" height="50" fill="#1e293b" rx="6" stroke="#475569" stroke-width="2"/>
  <text x="80" y="125" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Writer</text>
  <text x="80" y="140" fill="#94a3b8" font-size="9" text-anchor="middle">POST long-url</text>

  <rect x="30" y="260" width="100" height="50" fill="#1e293b" rx="6" stroke="#475569" stroke-width="2"/>
  <text x="80" y="285" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Reader</text>
  <text x="80" y="300" fill="#94a3b8" font-size="9" text-anchor="middle">GET /aB3x9</text>

  <!-- API Server -->
  <rect x="220" y="120" width="120" height="180" fill="url(#apiGrad)" rx="8" stroke="#60a5fa" stroke-width="2"/>
  <text x="280" y="150" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">API Server</text>
  
  <rect x="235" y="170" width="90" height="40" fill="#1d4ed8" rx="4"/>
  <text x="280" y="190" fill="#bfdbfe" font-size="10" font-family="monospace" text-anchor="middle">Base62 Encode</text>
  <text x="280" y="202" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">(ID Generator)</text>

  <rect x="235" y="230" width="90" height="40" fill="#1d4ed8" rx="4"/>
  <text x="280" y="250" fill="#bfdbfe" font-size="10" font-family="monospace" text-anchor="middle">HTTP 301/302</text>
  <text x="280" y="262" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">Redirect</text>


  <!-- ZooKeeper / Token Generator -->
  <rect x="420" y="40" width="120" height="70" fill="#4c1d95" rx="6" stroke="#a855f7" stroke-width="2"/>
  <text x="480" y="65" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Ticket Server</text>
  <text x="480" y="80" fill="#e9d5ff" font-size="9" font-family="monospace" text-anchor="middle">(ZooKeeper / Redis)</text>
  <text x="480" y="95" fill="#d8b4fe" font-size="10" font-weight="bold" text-anchor="middle">Issue ID Block: [1-1000]</text>

  <!-- Cache (Redis) -->
  <rect x="420" y="240" width="120" height="80" fill="url(#cacheGrad)" rx="6" stroke="#fbbf24" stroke-width="2"/>
  <text x="480" y="270" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Redis Cache</text>
  <text x="480" y="285" fill="#fde68a" font-size="10" font-family="monospace" text-anchor="middle">High Read Volume</text>
  <text x="480" y="300" fill="#fde68a" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">aB3x9 -> https://...</text>


  <!-- Database -->
  <rect x="620" y="120" width="120" height="200" fill="url(#dbGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="680" y="150" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Database</text>
  <text x="680" y="170" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">RDBMS or NoSQL</text>
  
  <line x1="620" y1="190" x2="740" y2="190" stroke="#064e3b" stroke-width="2"/>
  <text x="680" y="215" fill="#6ee7b7" font-size="10" font-family="monospace" text-anchor="middle">ID: 15489432</text>
  <text x="680" y="235" fill="#6ee7b7" font-size="10" font-family="monospace" text-anchor="middle">Hash: aB3x9</text>
  <text x="680" y="255" fill="#6ee7b7" font-size="9" font-family="monospace" text-anchor="middle">URL: https://google...</text>
  <line x1="620" y1="270" x2="740" y2="270" stroke="#064e3b" stroke-width="2"/>


  <!-- Flow Lines -->
  <!-- Write Flow -->
  <path d="M 130 120 L 220 140" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowT)"/>
  
  <path d="M 310 120 L 420 80" stroke="#a855f7" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowT)"/>
  <text x="375" y="90" fill="#d8b4fe" font-size="9" font-family="sans-serif" transform="rotate(-30, 375, 90)">1. Request ID</text>

  <path d="M 340 160 L 620 160" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowT)"/>
  <text x="490" y="150" fill="#6ee7b7" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">2. Insert Base62 Row</text>

  <!-- Read Flow -->
  <path d="M 130 280 L 220 250" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowT)"/>

  <path d="M 340 260 L 420 275" stroke="#fbbf24" stroke-width="3" fill="none" marker-end="url(#arrowT)"/>
  <text x="380" y="260" fill="#fde68a" font-size="10" font-weight="bold" font-family="sans-serif" transform="rotate(20, 380, 260)">3. Check Cache</text>

  <path d="M 340 220 L 620 220" stroke="#10b981" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowT)"/>
  <text x="490" y="210" fill="#6ee7b7" font-size="10" font-family="sans-serif" text-anchor="middle">4. (Cache Miss) DB Query</text>


  <!-- Note -->
  <rect x="250" y="380" width="300" height="40" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="400" y="405" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">Caching is critical: 100:1 Read-to-Write Ratio</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Encoding Strategy (Base62 vs MD5)',
      description: 'Using a counter (base 10) converted to Base62 is superior to MD5/MurmurHash as it avoids collisions entirely. A 7-character string in Base62 ($[a-zA-Z0-9]$) supports $62^7 \\approx 3.5$ trillion combinations.'
    },
    {
      title: 'Key Generation Service (KGS)',
      description: 'To solve the bottleneck of a single SQL auto-increment, a dedicated KGS (using ZooKeeper) distributes "ranges" of keys (e.g., 1M-2M) to different application servers. This allows servers to generate unique short IDs in-memory without cross-node locks.'
    },
    {
      title: 'High-Performance Redirection',
      description: 'TinyURL is 99% reads. Redirections are optimized via Redis using a standard `GET {hash}`. Cache misses trigger a DB lookup which then populates the cache for future requests using an LRU eviction policy.'
    }
  ],
  comparisonTable: {
    headers: ['Factor', '301 (Permanent)', '302 (Temporary)', 'Impact'],
    rows: [
      ['Browser Behavior', 'Caches locally', 'Re-requests every time', '301 reduces server load.'],
      ['SEO/Analytics', 'Hard to track clicks', 'Easy to track every click', '302 gives better insights.'],
      ['Link Juice', 'Transferred to target', 'Minimal transfer', '301 is better for SEO.'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=fMZMm_0ZhK4',
  approaches: [
    {
      title: 'KGS + Pre-Allocation Template',
      content: '```python\n# API Server Logic\nclass ShortenerServer:\n    def __init__(self, kgs_client):\n        self.current_range = kgs_client.get_new_block() # e.g., (1000, 2000)\n        self.pointer = self.current_range[0]\n\n    def generate_short(self, long_url):\n        id = self.get_next_id()\n        hash = base62_encode(id)\n        db.save(id, hash, long_url)\n        return hash\n```',
      complexity: { time: 'O(1) in-memory', space: 'O(1)' }
    }
  ],
  pitfalls: [
    'Capacity Planning: billons of URLs consume Terabytes of storage. Using a NoSQL store like Cassandra facilitates easier horizontal sharding by URL hash.',
    'Guessable URLs: Sequential IDs allow bots to "crawl" your entire database. Add a random salt or shuffle the Base62 alphabet to make tokens non-sequential.',
    'Dead Client IDs: If an API server crashes, its pre-allocated block of IDs is lost. This is an acceptable trade-off for speed and complexity.'
  ]
};
