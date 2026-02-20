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
      title: 'Encoding Scheme (Base62)',
      description: 'URLs are shortened by converting a database auto-increment ID into a Base62 string (a-z, A-Z, 0-9). For example, ID `1` = `a`, ID `125` = `cb`. A 7-character Base62 string provides 62^7 = ~3.5 Trillion unique hashes, plenty for a system projected to live for 50 years.'
    },
    {
      title: 'Distributed ID Generation',
      description: 'You cannot use a single SQL database for auto-incrementing IDs at massive scale—it becomes a bottleneck. Instead, use a Ticket Server (or ZooKeeper). An API server requests a "block" of IDs (e.g., 1 to 1000). The API server then independently loops through these IDs in memory. If the server crashes, those IDs are lost, but it prevents DB collision.'
    },
    {
      title: 'Caching Strategy',
      description: 'TinyURL is incredibly read-heavy (usually a 100:1 read-to-write ratio). Every redirect checks Redis first. If the hash is found, it bypasses the database entirely. Cache eviction policies (like LRU) ensure only actively clicked links take up expensive RAM.'
    },
    {
      title: 'HTTP Redirection (301 vs 302)',
      description: 'The API returns a 301 (Permanent Redirect) if you want the browser to cache the translation locally (lowers server load). It returns a 302 (Temporary Redirect) if you need to track analytics (click rates, locations) for every single click.'
    }
  ],
  comparisonTable: {
    headers: ['Approach', 'How it works', 'Pros', 'Cons'],
    rows: [
      ['Random MD5 Hashing', 'Compute MD5 of long URL, take first 7 chars. Handle collisions iteratively.', 'Stateless, same URL always yields same hash.', 'Collisions are inevitable and resolving them requires DB trips.'],
      ['Base62 with Counter', 'Use a global counter/ID, convert base 10 to base 62 string.', 'Guaranteed zero collisions. Extremely fast.', 'Sequential IDs are guessable (predictable URLs).'],
      ['Snowflake IDs', 'Generate Twitter Snowflake ID -> Base62', 'Sortable, highly distributed, collision-resistant.', '64-bit ID usually results in an 11-character hash instead of 7.']
    ]
  },
  pitfalls: [
    'Relying purely on a relational database auto-increment: If you scale horizontally to 10 API servers, they cannot efficiently coordinate hitting the DB for the next ID at 10,000 Writes/sec. An ID generation strategy (like ticketing) is mandatory.',
    'Not utilizing an LRU Cache: Querying an indexed DB table for billions of URLs is fast, but handling 100,000 Reads/sec will still saturate DB connections and I/O. Memory caching is a non-negotiable requirement for this architecture.',
    'Ignoring malicious behavior: Rate limiting must be discussed. Abusers can write a script to generate billions of TinyURLs, exhausting the 3.5 trillion address space and inflating database storage costs.'
  ]
};
