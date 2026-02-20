import { TopicContent } from '../topicContent';

export const pastebin: TopicContent = {
  title: 'Design Pastebin',
  description: 'Pastebin is a minimalist service where users upload plain text and get a short, shareable URL. The system must support immense read throughput (100:1 read-to-write ratio), efficiently store billions of tiny objects, and automatically garbage-collect expired text snippets.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="cacheGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <linearGradient id="s3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Left: Write Path -->
  <text x="200" y="30" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">Write Path (Paste Creation)</text>

  <rect x="20" y="60" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="78" fill="#f8fafc" font-size="10" text-anchor="middle">User</text>
  <text x="60" y="90" fill="#94a3b8" font-size="8" text-anchor="middle">Uploads 10KB Text</text>

  <rect x="160" y="60" width="100" height="40" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="210" y="85" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Write API</text>

  <path d="M 100 80 L 160 80" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- KGS Box -->
  <rect x="160" y="140" width="100" height="60" fill="#1e293b" rx="6" stroke="#3b82f6" stroke-width="2"/>
  <text x="210" y="165" fill="#bfdbfe" font-size="10" font-weight="bold" text-anchor="middle">Key Gen (KGS)</text>
  <text x="210" y="180" fill="#93c5fd" font-size="8" text-anchor="middle">Pre-generates Base62</text>
  <rect x="175" y="190" width="70" height="15" fill="#1e40af" rx="2"/>
  <text x="210" y="200" fill="#bfdbfe" font-size="8" font-family="monospace" text-anchor="middle">"aB7x9Q"</text>

  <path d="M 210 140 L 210 100" stroke="#60a5fa" stroke-width="2" fill="none" marker-end="url(#arrow)"/>


  <!-- Database / Storage -->
  <rect x="360" y="50" width="140" height="180" fill="#0f172a" rx="8" stroke="#475569" stroke-width="2"/>
  <text x="430" y="70" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Data Layer</text>

  <rect x="380" y="90" width="100" height="50" fill="url(#dbGrad)" rx="4" stroke="#34d399"/>
  <text x="430" y="110" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Metadata DB</text>
  <text x="430" y="125" fill="#a7f3d0" font-size="8" font-family="monospace" text-anchor="middle">{aB7x9Q, user_id, expiry}</text>

  <rect x="380" y="160" width="100" height="50" fill="url(#s3Grad)" rx="4" stroke="#fbbf24"/>
  <text x="430" y="180" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Object Store (S3)</text>
  <text x="430" y="195" fill="#fde68a" font-size="8" font-family="monospace" text-anchor="middle">"aB7x9Q": "public void main..."</text>

  <!-- Write Flow -->
  <path d="M 260 80 L 320 80 L 320 115 L 380 115" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 260 80 L 320 80 L 320 185 L 380 185" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="320" y="70" fill="#cbd5e1" font-size="9" text-anchor="middle">Save Text + Meta</text>


  <!-- Right: Read Path -->
  <line x1="560" y1="20" x2="560" y2="430" stroke="#334155" stroke-width="2" stroke-dasharray="8"/>
  <text x="680" y="30" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">Read Path</text>

  <rect x="640" y="60" width="100" height="40" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="690" y="85" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Read API</text>

  <rect x="640" y="160" width="100" height="60" fill="url(#cacheGrad)" rx="6" stroke="#fca5a5" stroke-width="2"/>
  <text x="690" y="185" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Redis Cache</text>
  <text x="690" y="200" fill="#fecaca" font-size="9" text-anchor="middle">80% Cache Hit Rate</text>

  <rect x="740" y="260" width="40" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="760" y="285" fill="#f8fafc" font-size="10" text-anchor="middle">Reader</text>

  <!-- Read Flow -->
  <path d="M 760 260 L 760 80 L 740 80" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="750" y="160" fill="#cbd5e1" font-size="9" transform="rotate(-90, 750, 160)" text-anchor="middle">GET /aB7x9Q</text>

  <!-- Cache Hit -->
  <path d="M 690 100 L 690 160" stroke="#fca5a5" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 670 160 L 670 100" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow)"/>
  <text x="640" y="130" fill="#fca5a5" font-size="9" text-anchor="middle">Cache Hit</text>

  <!-- Cache Miss (DB Fetch) -->
  <path d="M 640 80 L 580 80 L 580 140 L 500 140" stroke="#10b981" stroke-width="2" stroke-dasharray="2" fill="none" marker-end="url(#arrow)"/>
  <text x="590" y="110" fill="#a7f3d0" font-size="9">Miss -> Fetch Original</text>


  <!-- Key Explanation -->
  <rect x="60" y="280" width="680" height="140" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="400" y="300" fill="#3b82f6" font-size="12" font-weight="bold" text-anchor="middle">Architecture Concepts</text>
  
  <text x="80" y="330" fill="#94a3b8" font-size="11" font-weight="bold">Key Generation Service (KGS):</text>
  <text x="80" y="345" fill="#cbd5e1" font-size="10">Generating strings (\`aB7x9Q\`) on-the-fly risks DB collisions.</text>
  <text x="80" y="360" fill="#cbd5e1" font-size="10">Instead, a KGS pre-generates millions of unique 6-8 char arrays using Base62</text>
  <text x="80" y="375" fill="#cbd5e1" font-size="10">(A-Z, a-z, 0-9). The Write API just pops an unused string from memory.</text>

  <text x="400" y="330" fill="#94a3b8" font-size="11" font-weight="bold">Storage Split (Metadata vs Blob):</text>
  <text x="400" y="345" fill="#cbd5e1" font-size="10">Tiny SQL/NoSQL rows hold users/expiry. The actual 10KB text payloads</text>
  <text x="400" y="360" fill="#cbd5e1" font-size="10">go entirely to highly compressed S3 buckets or local HashMaps.</text>
  <text x="400" y="375" fill="#cbd5e1" font-size="10">This keeps the database indexes small and instantly scannable.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Base62 Encoding',
      description: 'A Pastebin requires a short URL. Instead of generating a giant UUID (`550e8400-e29b-41d4-a716-446655440000`), it uses Base62 encoding (`A-Z, a-z, 0-9`). A 6-character Base62 string provides `62^6 = 56.8 Billion` unique combinations, which is more than enough for years of pastes.'
    },
    {
      title: 'Key Generation Service (KGS)',
      description: 'If two web servers independently generate `Xy7A2w`, you get a Database Collision constraint error. Instead, a standalone KGS cluster pre-computes unique Base62 strings and loads them into memory. When an API server saves a paste, it simply pops a guaranteed-unique string off the KGS queue in O(1) time.'
    },
    {
      title: 'Storage Strategy',
      description: 'Pastes are small (typically < 10KB plain text), but there are billions of them. Relational databases become incredibly bloated and slow indexing a billion 10KB text rows. Instead, a Metadata DB stores the `paste_id` mapping, while the text itself is dumped to cheap Object Storage (Amazon S3) or a NoSQL Key-Value store (Cassandra).'
    },
    {
      title: 'Garbage Collection',
      description: 'Pastes often expire after 24 hours. The Database records the `expiry_timestamp`. A daemon cron job (or Apache Airflow worker) wakes up daily, queries the Database for `expiry < NOW()`, deletes those rows in batches, and simultaneously deletes the underlying S3 objects to prevent runaway storage costs.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'Pastebin (Large Text)', 'TinyURL (Short Strings)'],
    rows: [
      ['Storage Depth', 'Massive (GBs per user)', 'Small (Bytes per user)'],
      ['File Expiry', 'Required (TTL cleanup)', 'Desired (Cleanup optional)'],
      ['Primary Need', 'Object Storage (S3)', 'Key-Value indexing'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=fMZMm_0ZhK4',
  pitfalls: [
    'Generating Keys at Write-Time: Checking if `Xy7A2w` exists in the DB before inserting requires a read lock, slowing writes down immensely. Always use a pre-generating KGS.',
    'Ignoring Cache Eviction: 20% of pastes (usually viral links or bot traffic) generate 80% of reads. Failing to place a Redis/Memcached layer in front of the Database means high-traffic pastes will cripple the Read servers.',
    'Deleting synchronously: If you design the system to delete the expired S3 file the instant a user requests an expired URL, you delay the user\'s 404 response. Always use lazy background garbage collection.'
  ]
};
