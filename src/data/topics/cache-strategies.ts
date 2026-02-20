import { TopicContent } from '../topicContent';

export const cacheStrategies: TopicContent = {
  title: 'Caching Strategies',
  description: 'A cache is a high-speed data storage layer (usually RAM) that stores a subset of data so that future requests for that data are served up exponentially faster than accessing the primary storage location (Database). How you write to that cache defines your strategy.',
  diagram: `
<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <marker id="arrowCa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
    <linearGradient id="cacheGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
  </defs>

  <!-- Cache-Aside (Top Box) -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="760" height="150" fill="#0f172a" rx="12" stroke="#1e293b"/>
    <text x="380" y="30" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Cache-Aside (Lazy Loading)</text>
    
    <!-- Components -->
    <rect x="40" y="60" width="120" height="50" fill="#334155" rx="8" stroke="#3b82f6"/>
    <text x="100" y="90" fill="#93c5fd" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Application</text>

    <rect x="320" y="60" width="120" height="50" fill="url(#cacheGrad)" rx="8"/>
    <text x="380" y="90" fill="#fff" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Cache</text>

    <path d="M 600 60 C 600 50, 680 50, 680 60 L 680 110 C 680 120, 600 120, 600 110 Z" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
    <ellipse cx="640" cy="60" rx="40" ry="10" fill="#312e81" stroke="#6366f1"/>
    <text x="640" y="95" fill="#a5b4fc" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Database</text>

    <!-- Arrows -->
    <!-- App -> Cache (Check) -->
    <path d="M 170 70 L 310 70" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowCa)"/>
    <text x="240" y="60" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">1. Read from Cache</text>
    
    <!-- App -> DB (Miss) -->
    <path d="M 120 120 C 120 145, 640 145, 640 120" stroke="#f43f5e" stroke-width="2" fill="none" marker-end="url(#arrowCa)"/>
    <text x="380" y="140" fill="#f43f5e" font-size="12" font-family="sans-serif" text-anchor="middle">2. Cache Miss -> Read from DB</text>

    <!-- App -> Cache (Write) -->
    <path d="M 170 100 L 310 100" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowCa)"/>
    <text x="240" y="115" fill="#10b981" font-size="12" font-family="sans-serif" text-anchor="middle">3. Write to Cache</text>
  </g>

  <!-- Write-Through (Middle Box) -->
  <g transform="translate(20, 190)">
    <rect x="0" y="0" width="760" height="150" fill="#0f172a" rx="12" stroke="#1e293b"/>
    <text x="380" y="30" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Write-Through</text>
    
    <!-- Components -->
    <rect x="40" y="60" width="120" height="50" fill="#334155" rx="8" stroke="#3b82f6"/>
    <text x="100" y="90" fill="#93c5fd" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Application</text>

    <rect x="320" y="60" width="120" height="50" fill="url(#cacheGrad)" rx="8"/>
    <text x="380" y="90" fill="#fff" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Cache</text>

    <path d="M 600 60 C 600 50, 680 50, 680 60 L 680 110 C 680 120, 600 120, 600 110 Z" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
    <ellipse cx="640" cy="60" rx="40" ry="10" fill="#312e81" stroke="#6366f1"/>
    <text x="640" y="95" fill="#a5b4fc" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Database</text>

    <!-- Arrows -->
    <!-- App -> Cache (Write) -->
    <path d="M 170 85 L 310 85" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arrowCa)"/>
    <text x="240" y="75" fill="#93c5fd" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">1. Write to Cache</text>
    
    <!-- Cache -> DB (Write Sync) -->
    <path d="M 450 85 L 590 85" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arrowCa)"/>
    <text x="520" y="75" fill="#93c5fd" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">2. Synchronous Write to DB</text>

    <text x="380" y="130" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Write is not complete until both succeed (Slow but Safe)</text>
  </g>

  <!-- Write-Back (Bottom Box) -->
  <g transform="translate(20, 360)">
    <rect x="0" y="0" width="760" height="150" fill="#0f172a" rx="12" stroke="#1e293b"/>
    <text x="380" y="30" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Write-Back (Write-Behind)</text>
    
    <!-- Components -->
    <rect x="40" y="60" width="120" height="50" fill="#334155" rx="8" stroke="#3b82f6"/>
    <text x="100" y="90" fill="#93c5fd" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Application</text>

    <rect x="320" y="60" width="120" height="50" fill="url(#cacheGrad)" rx="8"/>
    <text x="380" y="90" fill="#fff" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Cache</text>

    <path d="M 600 60 C 600 50, 680 50, 680 60 L 680 110 C 680 120, 600 120, 600 110 Z" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
    <ellipse cx="640" cy="60" rx="40" ry="10" fill="#312e81" stroke="#6366f1"/>
    <text x="640" y="95" fill="#a5b4fc" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Database</text>

    <!-- Arrows -->
    <!-- App -> Cache (Write) -->
    <path d="M 170 85 L 310 85" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowCa)"/>
    <text x="240" y="75" fill="#34d399" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">1. Write to Cache (Done!)</text>
    
    <!-- Cache -> DB (Async Write) -->
    <path d="M 450 85 L 590 85" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4 2" fill="none" marker-end="url(#arrowCa)"/>
    <text x="520" y="75" fill="#fbbf24" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">2. Asynchronous Async Batch Write</text>

    <text x="380" y="130" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Write completes instantly. Cache syncs to DB later (Fast but Risky)</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'Common Eviction Policies',
      description: 'Since cache RAM is finite, we must decide what to delete when the cache is full. **LRU (Least Recently Used)** discards the least recently accessed items. **LFU (Least Frequently Used)** discards items accessed least often over time. **FIFO (First In, First Out)** is simple but often suboptimal. **TTL (Time to Live)** automatically expires data after a set period, ensuring it doesn\'t stay stale forever.'
    },
    {
      title: 'Serialization & Performance',
      description: 'The CPU cost of turning objects into strings (Serialization) is often the bottleneck in caching. **JSON** is human-readable but slow and bulky. **Protobuf** or **MessagePack** are binary formats that are significantly faster and smaller, reducing network bandwidth between the App and the Cache Cluster.'
    },
    {
      title: 'Cache Invalidation',
      description: 'The hardest problem in CS. You can invalidate data by: 1) **TTL** (Waiting for it to expire). 2) **Explicit Purge** (Deleting the key when the DB is updated). 3) **Versioning** (Adding a version to the key, e.g., `user:1:v2`, so the old version is never read again).'
    }
  ],
  comparisonTable: {
    headers: ['Strategy', 'Read Speed', 'Write Speed', 'In-RAM Efficiency', 'Data Safety'],
    rows: [
      ['Cache-Aside', 'Fast (Hits only)', 'Direct DB Speed', 'High (Selective)', 'High'],
      ['Write-Through', 'Always Fast', 'Slow (Double write)', 'High (Immediate)', 'High'],
      ['Write-Back', 'Always Fast', 'Fastest (RAM)', 'High (Buffered)', 'Low (Risk of loss)']
    ]
  },
  pitfalls: [
    'The "Thundering Herd" on Cache Expiry: If a hot key expires, thousands of requests hit the DB at once. Mitigation: Use "Cache-Aside with Mutex" (only one worker fetches while others wait/read old value) or staggered TTLs.',
    'Ignoring Serialization overhead: Reading 1MB of JSON from Redis can take 10ms just to parse. Use binary formats for large objects.',
    'Stale Data: Assuming the cache is always correct. Always implement a "Version" or "Last Modified" check if absolute consistency is required.',
    'Caching highly volatile data: Caching real-time stock prices or GPS coordinates creates more network load (constant invalidation) than just reading from the primary source.'
  ]
};
